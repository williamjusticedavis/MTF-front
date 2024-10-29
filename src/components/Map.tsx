import React, { useEffect, useState, useCallback, useRef } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { renderToString } from 'react-dom/server';
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
];

const bounds = {
  north: 33.5,
  south: 29.0,
  west: 30.5,
  east: 39.5
};

interface Site {
  _id: string;
  name: string;
  address: string;
  coordinates: [number, number];
}

const Map: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [sites, setSites] = useState<Site[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/site/getAllSites');
        if (response.data.isSuccessful) {
          setSites(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching sites:', error);
      }
    };

    fetchSites();
  }, []);

  const getIconUrl = () => {
    const iconSvgString = renderToString(<FaMapMarkerAlt size={32} color="red" />);
    return `data:image/svg+xml;base64,${btoa(iconSvgString)}`;
  };

  const createIcon = () => {
    if (window.google && google.maps && google.maps.Size) {
      return {
        url: getIconUrl(),
        scaledSize: new google.maps.Size(32, 32),
      };
    }
    return undefined;
  };

  const handlePlaceSelected = useCallback((place: google.maps.places.PlaceResult) => {
    if (place.geometry && place.geometry.location && !isAnimating) {
      const newCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setIsAnimating(true);
      if (place.geometry.viewport) {
        mapRef.current?.fitBounds(place.geometry.viewport);
        setMapCenter(newCenter);
        setIsAnimating(false);
      } else {
        const originalZoom = mapRef.current?.getZoom() || 8;
        let currentZoom = originalZoom;
        const zoomOutInterval = setInterval(() => {
          if (currentZoom > 8) {
            currentZoom--;
            mapRef.current?.setZoom(currentZoom);
          } else {
            clearInterval(zoomOutInterval);
            mapRef.current?.panTo(newCenter);

            let zoomInInterval = setInterval(() => {
              if (currentZoom < 15) {
                currentZoom++;
                mapRef.current?.setZoom(currentZoom);
              } else {
                clearInterval(zoomInInterval);
                setIsAnimating(false);
                setMapCenter(newCenter);
              }
            }, 200);
          }
        }, 200);
      }
    }
  }, [isAnimating]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <div className="relative h-full w-full flex flex-col items-center justify-start">
        <div className="absolute top-[30px] right-5 w-80 z-10">
          <SearchPlace onPlaceSelected={handlePlaceSelected} />
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={8}
          options={{
            mapTypeId: 'hybrid',
            styles: mapStyle,
            minZoom: 2,
            maxZoom: 18,
            restriction: {
              latLngBounds: bounds,
              strictBounds: true
            },
            fullscreenControl: false,
            zoomControl: false,
            mapTypeControl: false,
          }}
          onLoad={(map) => { mapRef.current = map }}
        >
          {sites.map(site => (
            <Marker
              key={site._id}
              position={{ lat: site.coordinates[1], lng: site.coordinates[0] }}
              title={site.name}
              icon={createIcon()}
            />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;