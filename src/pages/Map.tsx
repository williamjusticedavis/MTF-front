import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 31.7683,
  lng: 35.2137,
};

const mapStyle = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "poi.business",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "landscape.natural",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }]
  }
];

const bounds = {
  north: 85,
  south: -85,
  west: -179,
  east: 179
};

const Map: React.FC = () => {
  const handleRightClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log("Right-clicked at:", { lat, lng });
      // Add your desired functionality here, such as opening a custom menu
    }
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={{
          mapTypeId: 'hybrid',
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: true,
          zoomControl: false,
          clickableIcons: false,
          styles: mapStyle,
          minZoom: 2,
          maxZoom: 18,
          restriction: {
            latLngBounds: bounds,
            strictBounds: true
          }
        }}
        onRightClick={handleRightClick}
      >
        {/* Additional map components can go here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;