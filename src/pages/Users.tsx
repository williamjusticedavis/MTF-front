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
  const [tableKey, setTableKey] = useState(0);
  const [isDownloadPopupVisible, setIsDownloadPopupVisible] = useState<boolean>(false);

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
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between items-center mb-4">
          <button
            onClick={showCard}
            className="flex items-center justify-center p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 shadow w-full md:w-auto md:max-w-xs"
          >
            <img src="../../add user wite.png" alt="Add User" className="w-6 h-6 inline-block" />
            <span className="ml-2 hidden md:inline">Add User</span>
          </button>

          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center md:ml-4">
            <button
              onClick={showDownloadPopup}
              className="flex items-center justify-center p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 shadow w-full md:w-auto md:mr-2"
            >
              <img src="../../xl wite.png" alt="Download" className="w-6 h-6 inline-block" />
              <span className="ml-2 hidden md:inline">Download List</span>
            </button>
            <div className="w-full md:w-auto mt-2 md:mt-0">
              <SearchUsers />
            </div>
          </div>
        </div>



        {/* פופ-אפ להורדה */}
        {isDownloadPopupVisible && (
          <DownloadUserList setIsDownloadPopupVisible={setIsDownloadPopupVisible} />
        )}

        {/* פופ-אפ ליצירת משתמש חדש */}
        {isCardVisible && (
          <PopUpCardCreate onClose={hideCard} onUserCreated={handleUserCreated} />
        )}

        {/* טבלה */}
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
