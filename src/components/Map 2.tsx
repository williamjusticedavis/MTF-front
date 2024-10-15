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

// Define square bounds around Israel's approximate center
const bounds = {
  north: 33.5,
  south: 29.0,
  west: 30.5,
  east: 39.5
};

const Map: React.FC = () => {
  const handleRightClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log("Right-clicked at:", { lat, lng });
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
          streetViewControl: false,
          zoomControl: false,
          clickableIcons: false,
          styles: mapStyle,
          minZoom: 2,  // Allow maximum zoom-out for larger view
          maxZoom: 18,
          restriction: {
            latLngBounds: bounds,
            strictBounds: true // Keep within bounds
          }
        }}
        onRightClick={handleRightClick}
      >
        {/* Additional map components */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;