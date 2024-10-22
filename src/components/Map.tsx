import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { renderToString } from 'react-dom/server';

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
  coordinates: [number, number]; // [lng, lat]
}

const Map: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [sites, setSites] = useState<Site[]>([]); // Store the fetched sites

  // Fetch sites from the backend
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/site/getAllSites');
        if (response.data.success) {
          setSites(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching sites:', error);
      }
    };

    fetchSites();
  }, []);

  // Convert the icon to a base64 data URL
  const getIconUrl = () => {
    const iconSvgString = renderToString(<FaMapMarkerAlt size={32} color="red" />);
    return `data:image/svg+xml;base64,${btoa(iconSvgString)}`;
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="relative h-full w-full flex flex-col items-center justify-start">
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
            }
          }}
          onLoad={(map) => { mapRef.current = map }}
        >
          {sites.map(site => (
            <Marker
              key={site._id}
              position={{ lat: site.coordinates[1], lng: site.coordinates[0] }} // Coordinates as [lng, lat]
              title={site.name} // Optional, for displaying the name on hover
              icon={{
                url: getIconUrl(), // Custom icon URL from react-icons
                scaledSize: new google.maps.Size(32, 32), // Size of the marker
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
