import React from 'react'

const DownloadUserList: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-4">
      <p className="text-gray-700 text-lg font-medium">Are you sure you want to download the user list?</p> 
      <div className="flex justify-end space-x-3">
        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
          Back
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
          Download
        </button>
      </div>
    </div>
  )
}

export default DownloadUserList

