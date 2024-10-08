import React from 'react';
import { NavLink } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";

// הגדרת הטיפוסים של הפרופס
interface SideProps {
  isOpen: boolean;
}

const Side: React.FC<SideProps> = ({ isOpen }) => {
  return (
    <aside 
      className={`fixed top-0 right-0 w-[150px] h-full bg-black text-white p-4 transition-transform duration-500 ease-in-out flex flex-col justify-between ${isOpen ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-75'}`}
      style={{ zIndex: 1000 }}
    >
      {/* לוגו */}
      <div className='flex justify-center items-center'>
        <img src="../../egale.png" alt="egale icon" />
      </div>
      
      {/* קישורים במרכז */}
      <div className='flex flex-col items-center space-y-4'>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? 'text-green-400 border-b-2 border-green-400' : 'hover:border-b-2 hover:border-green-400'
          }
        >
          users
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'text-green-400 border-b-2 border-green-400' : 'hover:border-b-2 hover:border-green-400'
          }
        >
          About
        </NavLink>
   
      </div>
      
      {/* כפתור התנתקות בתחתית */}
      <div className='flex flex-col items-center'>
        <h2 className='mb-4'>Msbit</h2>
        <NavLink to="/logout" className="text-xl">
          <TbLogout />
        </NavLink>
      </div>
    </aside>
  );
};

export default Side;
