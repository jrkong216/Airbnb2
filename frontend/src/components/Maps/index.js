// frontend/src/components/Maps/index.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/maps';
import MapsOne from './MapsOne.js';

const MapContainer = () => {
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();
console.log("is this even printing?")
  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }
  console.log("THIS IS  KEY!!********", key)

  return (
    <MapsOne apiKey={key} />
  );
};

export default MapContainer;
