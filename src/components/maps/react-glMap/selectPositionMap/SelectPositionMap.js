import React, { useState, useEffect } from 'react';
import LocationPicker from 'react-location-picker';

const SelectPositonMap = ({ handleLocationChange, initialState }) => {
  const [defaultPosition, setDefaultPositon] = useState(
    initialState.postion || {
      lat: 33.8869,
      lng: 9.5375,
    }
  );
  useEffect(() => {
    setDefaultPositon(initialState.positon);
  }, []);
  return (
    <>
      <LocationPicker
        containerElement={<div style={{ height: '100%', width: '100%' }} />}
        mapElement={<div style={{ height: '300px' }} />}
        defaultPosition={defaultPosition}
        onChange={data => handleLocationChange(data.position, data.address)}
      />
    </>
  );
};

export default SelectPositonMap;
