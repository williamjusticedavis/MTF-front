import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Side from '../components/Side';



const Websites: React.FC = () => {
    const [isAsideOpen, setAsideOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    // מצב למודאל התנתקות
    const [showModal, setShowModal] = useState(false);

    const toggleAside = () => {
        setAsideOpen(!isAsideOpen);
    };

    const handleLogOut = () => {
        navigate("/login");
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

            </main>


            <Footer />
            <Side isOpen={isAsideOpen} showLogoutModal={() => setShowModal(true)} />

            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to Logout?
                        </p>

                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleLogOut}
                            >
                                Confirm Logout
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Websites;