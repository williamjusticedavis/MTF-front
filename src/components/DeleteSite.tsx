import React, { useState } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

interface DeleteSiteProps {
  siteId: string;  // ID of the site to be deleted
  onDelete: () => void; // Callback to refresh or update the list after deletion
}

const DeleteSite: React.FC<DeleteSiteProps> = ({ siteId, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteSite = async () => {
    setLoading(true);
    try {
      console.log(siteId);
      
      // Replace 'your-api-url' with the actual base URL of your API
      const response = await axios.delete(`http://localhost:3000/api/site/deleteSite/${siteId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Optional: Attach token if needed
        },
      });
      console.log('Delete response:', response.data);

      setShowModal(false);
      onDelete();  // Call the callback to update the list of sites after successful deletion
    } catch (err) {
      setError('Failed to delete the site');
      console.error('Error deleting site:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        className='text-gray-500 transition-transform duration-200 transform hover:text-gray-800 hover:scale-150 focus:scale-150 focus:outline-none'
        onClick={() => setShowModal(true)}
      >
        <MdDelete />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this site? This action cannot be undone.
            </p>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteSite}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Confirm Delete'}
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteSite;
