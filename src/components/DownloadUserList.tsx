import React from 'react'
import axios from 'axios'

interface DownloadUserListProps {
  setIsDownloadPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DownloadUserList: React.FC<DownloadUserListProps> = ({ setIsDownloadPopupVisible }) => {
  const handleClose = () => {
    setIsDownloadPopupVisible(false);
  }
  const downloadUsers: () => Promise<void> = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/export-users', {
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Download User List</h2>
        <p>Are you sure you want to download the user list?</p>
        <div className="mt-4 flex justify-end">
          <button onClick={handleClose} className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600">
            Cancel
          </button>
          <button onClick={downloadUsers} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Download
          </button>
        </div>
      </div>
    </div>
  )
}

export default DownloadUserList

