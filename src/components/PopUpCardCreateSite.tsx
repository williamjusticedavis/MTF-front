import React, { useEffect, useRef, useState } from 'react';
import { createSite } from '../server/app';

const PopUpCardCreateSite = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [latitudeCoordinate, setLatitudeCoordinate] = useState('');
  const [longitudeCoordinate, setLongitudeCoordinate] = useState('');

  const popUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closePopUp = (event: MouseEvent) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
        onClose(); 
      }
    };

    document.addEventListener('mousedown', closePopUp);
    return () => {
      document.removeEventListener('mousedown', closePopUp);
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !address || !latitudeCoordinate || !longitudeCoordinate) {
      alert("All fields are required!");
      return;
    }

    const siteData = {
      name,
      address,
      coordinates: [parseFloat(longitudeCoordinate), parseFloat(latitudeCoordinate)], 
    };

    console.log('Site Data Submitted:', siteData);
    
    try {
      await createSite(siteData); 
      onClose();
    } catch (error) {
      console.error('Error creating site:', error);
      alert('Failed to create site. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div ref={popUpRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Site</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude Coordinate:</label>
            <input
              id="latitude"
              type="text"
              value={latitudeCoordinate}
              onChange={(event) => setLatitudeCoordinate(event.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude Coordinate:</label>
            <input
              id="longitude"
              type="text"
              value={longitudeCoordinate}
              onChange={(event) => setLongitudeCoordinate(event.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button 
              type="button" 
              className="w-1/2 bg-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-400 transition duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="w-1/2 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUpCardCreateSite;
