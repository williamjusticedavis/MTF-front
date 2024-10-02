import React from 'react';
import { LuMenu } from 'react-icons/lu';

// הגדרת הטיפוס עבור הפרופס
interface HeaderProps {
  toggleAside: () => void; // פונקציה שלא מחזירה ערך
}

const Header: React.FC<HeaderProps> = ({ toggleAside }) => {
  return (
    <header className="bg-white flex justify-between items-center h-16 relative">
      <img className='w-auto h-full object-contain' src="../../icon1.png" alt="icon for page" />
      <div className="flex items-center justify-center w-12 h-8 mr-4 border-2 border-gray-400 rounded-lg hover:bg-slate-300 m-2 cursor-pointer" onClick={toggleAside}>
        <LuMenu className="w-12 h-6 text-gray-600" />
      </div>
    </header>
  );
};

export default Header;
