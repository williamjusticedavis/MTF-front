import React from 'react';

interface CardProps {
  onClose: () => void;
}

const Card: React.FC<CardProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Pop-Up Card</h2>
        <p className="mb-4">This is a simple pop-up card using Tailwind CSS.</p>
        <button onClick={onClose}className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
      </div>
    </div>
  );
};

export default Card;