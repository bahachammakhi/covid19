import React, { useState } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import { Popover, Button } from 'antd';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYmFoYWNoYW1tYWtoaSIsImEiOiJjazd1Y3V6bHUxNzMyM25xdHBtaThocTM2In0.PqWTvTjfUcEvdpVHlW_hLQ',
});

const layerPaint = {
  'heatmap-weight': {
    property: 'priceIndicator',
    type: 'exponential',
    stops: [
      [0, 0],
      [5, 2],
    ],
  },
  // Increase the heatmap color weight weight by zoom level
  // heatmap-ntensity is a multiplier on top of heatmap-weight
  'heatmap-intensity': {
    stops: [
      [0, 0],
      [5, 1.2],
    ],
  },
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  'heatmap-color': [
    'interpolate',
    ['linear'],
    ['heatmap-density'],
    0,
    'rgba(33,102,172,0)',
    0.25,
    'rgb(103,169,207)',
    0.5,
    'rgb(209,229,240)',
    0.8,
    'rgb(253,219,199)',
    1,
    'rgb(239,138,98)',
    2,
    'rgb(178,24,43)',
  ],
};
const MapBox = ({ data }) => {
  const [position, SetPosition] = useState([9.4575, 35.8869]);
  const [zoom, setZoom] = useState([7]);
  const [suspect, setSuspect] = useState();
  const clickMarker = (positon, suspect) => {
    SetPosition(positon);
    setZoom([14]);
    setSuspect(suspect);
  };
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '80vh',
        width: '100vw',
      }}
      center={position}
      zoom={zoom}
    >
      <Layer type="heatmap" layerPaint={layerPaint}>
        {data.map(el => {
          return <Feature coordinates={el.COORDINATES} />;
        })}
      </Layer>
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'harbor-15' }}>
        {data.map(el => {
          return (
            <Feature onClick={() => clickMarker(el.COORDINATES, el.suspect)} coordinates={el.COORDINATES} />
          );
        })}
      </Layer>

      {suspect && (
        <Popup
          coordinates={position}
          offset={{
            'bottom-left': [12, -38],
            bottom: [0, -38],
            'bottom-right': [-12, -38],
          }}
        >
          {suspect.name}
        </Popup>
      )}
    </Map>
  );
};

export default MapBox;
