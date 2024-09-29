import React from 'react';

interface CardProps {
  onClose: () => void;
}

const PopUpCard: React.FC<CardProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create New User</h2>

        <div className="flex flex-col space-y-2">
          <label htmlFor="firstName" className="text-gray-600">First Name</label>
          <input id="firstName"type="text"placeholder="First name"className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="lastName" className="text-gray-600">Last Name</label>
          <input id="lastName"type="text"placeholder="Last name"className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="role" className="text-gray-600">Role</label>
          <div className="relative">
            <select id="role"className="appearance-none border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-gray-600">Email</label>
          <input id="email"type="email"placeholder="Email"className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div className="flex justify-end space-x-3">
          <button onClick={onClose}className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PopUpCard;