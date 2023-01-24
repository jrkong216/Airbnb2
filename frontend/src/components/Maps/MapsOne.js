// frontend/src/components/Maps/Maps.js
import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const Maps = ({ apiKey, spotInfo }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: spotInfo.lat,
    lng: spotInfo.lng
  };
  console.log("this is center", center)

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        />
      )}
    </>
  );
};

export default React.memo(Maps);
