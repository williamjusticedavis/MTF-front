// Logout component
import React from 'react';
import { TbLogout } from 'react-icons/tb';

interface LogoutProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const Logout: React.FC<LogoutProps> = ({ showModal, setShowModal }) => {
  return (
    <div>
      
      <button 
        className='text-gray-500 transition-transform duration-200 transform hover:text-gray-800 hover:scale-150 focus:scale-150 focus:outline-none'
        onClick={() => setShowModal(true)} 
      >
        <TbLogout />
      </button>
      
    </div>
  );
}

export default Logout;