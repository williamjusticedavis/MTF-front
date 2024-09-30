import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Side from '../components/Side';
import Table from '../components/Table';

const Dev: React.FC = () => {
  const [isAsideOpen, setAsideOpen] = useState<boolean>(false);

  const toggleAside = () => {
    setAsideOpen(!isAsideOpen);
  };

  return (
    <div className={`flex flex-col min-h-screen transition-transform duration-300 ${isAsideOpen ? 'mr-[150px]' : 'mr-0'}`}>
      <Header toggleAside={toggleAside} />
      <main className="flex-grow bg-gray-100 p-4"> {/* הוספת padding לכל הצדדים */}
        <div className="container mx-auto bg-white shadow-md rounded-lg p-6"> {/* קונטיינר עם גבול ורקע */}
          <Table />
        </div>
      </main>
      <Footer />
      <Side isOpen={isAsideOpen} />
    </div>
  );
};

export default Dev;
