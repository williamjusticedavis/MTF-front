import React, { useState } from 'react';
import PopUpCard from '../components/PopUpCard';

const Home: React.FC = () => {
  const [isCardVisible, setCardVisible] = useState(false);

  const showCard = () => {
    setCardVisible(true);
  };

  const hideCard = () => {
    setCardVisible(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button onClick={showCard}className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">Open Pop-Up</button>
      {isCardVisible && <PopUpCard onClose={hideCard} />}
    </div>
  );
};

export default Home;