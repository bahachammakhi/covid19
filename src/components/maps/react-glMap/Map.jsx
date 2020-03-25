import React from 'react';
import DeckGL from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import { PathLayer, ScatterplotLayer, ArcLayer, IconLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';

import faker from 'faker';

const LayeredMap = ({ data }) => {
  const ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 320, height: 320, mask: true },
  };

  let i = 0;
  while (i < 50) {
    let lang = faker.address.longitude();
    let lat = faker.address.latitude();
    let obj = { COORDINATES: [parseInt(lat), parseInt(lang)], WEIGHT: 10 };
    data.push(obj);
    i++;
  }
  const heatLayer = new HeatmapLayer({
    id: 'heatmapLayer',
    data: data,
    getPosition: d => d.COORDINATES,
    getWeight: d => d.WEIGHT,
  });
  const iconLayer = new IconLayer({
    id: 'icon-layer',
    data,
    pickable: true,
    // iconAtlas and iconMapping are required
    // getIcon: return a string
    iconAtlas: 'images/icon-atlas.png',
    iconMapping: ICON_MAPPING,
    getIcon: d => 'marker',
    sizeScale: 15,
    getPosition: d => d.COORDINATES,
    getSize: d => 500,
    getColor: d => [Math.sqrt(d.exits), 140, 0],
    onHover: ({ object, x, y }) => {
      const tooltip = `${object.name}\n${object.address}`;
      /* Update tooltip
         http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
      */
    },
  });
  const layer = [heatLayer, iconLayer];

  return (
    <React.Fragment>
      <DeckGL
        style={{ top: '12%', left: window.innerWidth > 768 ? '25%' : '35%', zIndex: '0' }}
        initialViewState={{
          longitude: 9.5375,
          latitude: 33.8869,
          zoom: 6,
        }}
        height="80%"
        width="70%"
        controller={true}
        layers={layer} // layer here
      >
        <StaticMap
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken="pk.eyJ1IjoiYmFoYWNoYW1tYWtoaSIsImEiOiJjazd1Y3V6bHUxNzMyM25xdHBtaThocTM2In0.PqWTvTjfUcEvdpVHlW_hLQ"
        />
      </DeckGL>
    </React.Fragment>
  );
};
export default LayeredMap;
