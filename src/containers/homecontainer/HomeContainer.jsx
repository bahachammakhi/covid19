import React, { useState, useEffect } from 'react';
import classes from './home.module.scss';
import MapComponent from '../../components/maps/react-glMap/Map';
import useApi from '../../hooks/useApi';
import { getStart, testRequest } from '../../requests/requests';
import MapBox from '../../components/maps/react-glMap/selectPositionMap/MapBox';

const HomeContainer = ({ props }) => {
  console.log('response', props);
  const [state, setState] = useState({ lat: 51.505, lng: -0.09, zoom: 13 });
  const [viewport, setViewPort] = useState({ center: [51.505, -0.09], zoom: 13 });
  const { ...calls } = useApi({ getStart });
  // const position = [state.lat, state.lng];
  useEffect(() => {
    calls.getStart.call();
  }, []);
  const data = [
    {
      COORDINATES: [9.5375, 33.8869],
      WEIGHT: 10,
      suspect: {
        id: '1',
        name: 'Just some random',
        position: [9.5375, 33.8869],
      },
    },
    {
      COORDINATES: [-122.466233, 37.684638],
      WEIGHT: 10,
      suspect: {
        id: '1',
        name: 'Just some random',
        position: [9.5375, 33.8869],
      },
    },
    {
      COORDINATES: [9.4575, 35.8869],
      WEIGHT: 10,
      suspect: {
        id: '1',
        name: 'Just some random',
        position: [9.5375, 33.8869],
      },
    },
    {
      COORDINATES: [9.6975, 35.8869],
      WEIGHT: 10,
      suspect: {
        id: '1',
        name: 'Just some random',
        position: [9.5375, 33.8869],
      },
    },
    {
      COORDINATES: [9.7375, 35.8869],
      WEIGHT: 10,
      suspect: {
        id: '1',
        name: 'Just some random',
        position: [9.5375, 33.8869],
      },
    },
    {
      COORDINATES: [9.8375, 35.8869],
      WEIGHT: 10,
      suspect: {
        id: '1',
        name: 'Just some random',
        position: [9.5375, 33.8869],
      },
    },
    {
      COORDINATES: [9.8375, 35.8869],
      WEIGHT: 10,
      suspect: {
        id: '1',
        name: 'Just some random',
        position: [9.5375, 33.8869],
      },
    },
    {
      COORDINATES: [9.8375, 35.8869],
      WEIGHT: 10,
      suspect: {
        id: '1',
        name: 'Just some random',
        position: [9.5375, 33.8869],
      },
    },
  ];
  return (
    <div className={classes.map}>
      {' '}
      {/* <MapComponent data={data} />{' '} */}
      <MapBox data={data} />
    </div>
  );
};

export default HomeContainer;
