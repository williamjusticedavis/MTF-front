import React, { useState } from 'react';

const Otp: React.FC = () => {
    const [otp, setOtp] = useState<string>(''); 
    const [error, setError] = useState<string | null>(null);
    const [resendAvailable, setResendAvailable] = useState<boolean>(false);

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // כאן אפשר לבצע בדיקת קוד בעתיד
    };

    const handleResendOtp = () => {
        // פונקציה לשליחת OTP מחדש בעתיד
        console.log("Resend OTP");
        setResendAvailable(false); // נניח שאחרי לחיצה הכפתור יושבת לזמן מסוים
        setTimeout(() => {
            setResendAvailable(true); // אחרי זמן מה הכפתור יופעל מחדש
        }, 30000); // 30 שניות
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-700 to-blue-900 p-4">
            <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg">
                {/* לוגו */}
                <div className="flex justify-center mb-8">
                    <img 
                        src="../../logo-MTF.png" 
                        alt="logo mtf" 
                        className="h-28 md:h-36 lg:h-48 transition-transform duration-300 hover:scale-105 drop-shadow-lg"
                    />
                </div>

                {/* טופס ה-OTP */}
                <form onSubmit={handleOtpSubmit}>
                    <div className="mb-6">
                        <label htmlFor="otp" className="block text-gray-200 text-lg font-semibold mb-3">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            id="otp"
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter the OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
                    </div>

                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            className="bg-purple-600 text-white w-full px-4 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Verify OTP
                        </button>

                        {/* כפתור שליחה מחדש */}
                        <button
                            type="button"
                            className={`w-full px-4 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                                resendAvailable ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                            }`}
                            disabled={!resendAvailable}
                            onClick={handleResendOtp}
                        >
                            {resendAvailable ? 'Didn’t receive OTP? Resend' : 'Please wait 30 seconds to resend'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Otp;
