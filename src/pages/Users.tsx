import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Side from '../components/Side';
import Table from '../components/Table';
import PopUpCardCreate from '../components/PopUpCardCreate';
import DownloadUserList from '../components/DownloadUserList';
import SearchUsers from '../components/SearchUsers';

const Users: React.FC = () => {
  const [isAsideOpen, setAsideOpen] = useState<boolean>(false);
  const [isCardVisible, setCardVisible] = useState(false);
  const [tableKey, setTableKey] = useState(0); // Use a number as the key
  const [isDownloadPopupVisible, setIsDownloadPopupVisible] = useState<boolean>(false)

  const toggleAside = () => {
    setAsideOpen(!isAsideOpen);
  };

  const showCard = () => {
    setCardVisible(true);
  };

  const showDownloadPopup = () => {
    setIsDownloadPopupVisible(!isDownloadPopupVisible);
  };

  const hideCard = () => {
    setCardVisible(false);
  };

  // Function to reload the table after user creation
  const handleUserCreated = () => {
    setTableKey(prevKey => prevKey + 1);
    hideCard();
  };

  useEffect(() => {
    const handleResize = () => {
      setAsideOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`flex flex-col min-h-screen transition-transform duration-300 ${isAsideOpen ? 'mr-[150px]' : 'mr-0'}`}>
      <Header toggleAside={toggleAside} />
      <main className="flex-grow bg-gray-100 p-4">
        <SearchUsers />
        <button onClick={showCard} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">Create new user</button>
        <button onClick={showDownloadPopup} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
          Download
        </button>
        {isDownloadPopupVisible && (
          <DownloadUserList setIsDownloadPopupVisible={setIsDownloadPopupVisible} />
        )}
        {isCardVisible && (
          <PopUpCardCreate onClose={hideCard} onUserCreated={handleUserCreated} />
        )}

        <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
          <Table key={tableKey} />
        </div>
      </main>
      <Footer />
      <Side isOpen={isAsideOpen} />
    </div>
  );
};

export default Users;
