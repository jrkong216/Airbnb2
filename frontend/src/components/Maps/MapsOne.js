// frontend/src/components/Maps/Maps.js
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

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

  const svgMarker = {
    fillColor: "red",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
  }
console.log("setIcon google error")
  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
        >
           <Marker
      icon={svgMarker}
      position={center}
    />
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
