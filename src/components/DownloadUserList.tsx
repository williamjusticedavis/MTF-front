import React from 'react'
import axios from 'axios'

const DownloadUserList: React.FC = () => {
  const downloadUsers: () => Promise<void> = async () => {
    try {
      const response = await axios.get('/export-users', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.xlsx'); // שם הקובץ
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  };
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-4">
      <p className="text-gray-700 text-lg font-medium">Are you sure you want to download the user list?</p> 
      <div className="flex justify-end space-x-3">
        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
          Back
        </button>
        <button onClick={downloadUsers} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
          Download
        </button>
      </div>
    </div>
  )
}

export default DownloadUserList

