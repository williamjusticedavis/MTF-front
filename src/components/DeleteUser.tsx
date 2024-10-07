import React from 'react';
import { MdDelete } from "react-icons/md";

const DeleteUser: React.FC = () => {
  
  

  return (
    <div>
     <button className='text-gray-500 transition-transform duration-200 transform hover:text-gray-800  hover:scale-150 focus:scale-150 focus:outline-none'><MdDelete /></button>
    </div>
  );
};

export default DeleteUser;