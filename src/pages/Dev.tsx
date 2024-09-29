import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Side from '../components/Side';

// הגדרת טיפוסי הפרופס אם יש צורך (לרוב במקרה זה אין צורך כי לא מקבלים פרופס)
const Dev: React.FC = () => {
  const [isAsideOpen, setAsideOpen] = useState<boolean>(false); // הגדרת טיפוס עבור useState

  const toggleAside = () => {
    setAsideOpen(!isAsideOpen);
  };

  return (
    <div className={`flex flex-col min-h-screen transition-transform duration-300 ${isAsideOpen ? 'mr-[150px]' : 'mr-0'}`}>
      <Header toggleAside={toggleAside} />
      <main className="flex-grow bg-gray-100">
        {/* תוכן נוסף יכול להיכנס כאן */}
      </main>
      <Footer />
      <Side isOpen={isAsideOpen} />
    </div>
  );
};

export default Dev;
