import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import SearchPlace from './SearchPlace';

const containerStyle = {
  width: '100%',
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
  north: 33.5,
  south: 29.0,
  west: 30.5,
  east: 39.5
};

const Map: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [zoom, setZoom] = useState(8); 
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePlaceSelected = useCallback((place: google.maps.places.PlaceResult) => {
    if (place.geometry && place.geometry.location && !isAnimating) {
      const newCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      setIsAnimating(true); // Start animation

      if (place.geometry.viewport) {
        // Use the viewport to adjust the map to the selected place
        mapRef.current?.fitBounds(place.geometry.viewport);
        setMapCenter(newCenter); // Update center
        setIsAnimating(false); // End animation
      } else {
        // Fallback zoom logic if viewport is not available
        const originalZoom = mapRef.current?.getZoom() || 8; 

        // Zoom out to level 8
        let currentZoom = originalZoom;
        const zoomOutInterval = setInterval(() => {
          if (currentZoom > 8) {
            currentZoom--;
            mapRef.current?.setZoom(currentZoom);
          } else {
            clearInterval(zoomOutInterval);
            
            // Pan to the new center after zooming out
            mapRef.current?.panTo(newCenter);

            // Zoom in to level 15
            let zoomInInterval = setInterval(() => {
              if (currentZoom < 15) {
                currentZoom++;
                mapRef.current?.setZoom(currentZoom);
              } else {
                clearInterval(zoomInInterval);
                setIsAnimating(false); // End animation
                setMapCenter(newCenter); // Update state to reflect new center
              }
            }, 200);
          }
        }, 200);
      }
    }
  }, [isAnimating]);

  const handleRightClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log("Right-clicked at:", { lat, lng });
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <div className="relative h-full w-full flex flex-col items-center justify-start">
        {/* תיבת חיפוש */}
        <div className="absolute top-[30px] right-5 w-80 z-10">
          <SearchPlace onPlaceSelected={handlePlaceSelected} />
        </div>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={zoom}
          options={{
            mapTypeId: 'hybrid',
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
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
          onLoad={(map) => { mapRef.current = map }}
          onRightClick={handleRightClick}
        />
      </div>
    </LoadScript>
  );
};

export default Map;
