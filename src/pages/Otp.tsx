import React, { useState, useEffect } from 'react';

const Otp: React.FC = () => {
    const [otp, setOtp] = useState<string>(''); 
    const [error, setError] = useState<string | null>(null); // ה-error state לשגיאות, לא נעשה בו שימוש כרגע
    const [resendAvailable, setResendAvailable] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(30); // התחלת טיימר ב-30 שניות

    // הפעלת הטיימר מיד כשהקומפוננטה נטענת
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(intervalId);
                    setResendAvailable(true); // הפעלת הכפתור אחרי שהטיימר מסתיים
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        // ניקוי הטיימר אם הקומפוננטה יוצאת מהמסך
        return () => clearInterval(intervalId);
    }, []);

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // כאן אפשר לבצע בדיקת קוד ה-OTP בעתיד
        console.log("OTP submitted: ", otp);
    };

    const handleResendOtp = () => {
        console.log("Resend OTP");
        setResendAvailable(false);
        setTimer(30); // אתחל את הטיימר שוב ל-30 שניות
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center p-4" style={{ backgroundImage: `url('../../bg.png')` }}>
            <div className="bg-opacity-70 bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg">
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
                        <label htmlFor="otp" className="block text-white text-lg font-semibold mb-3">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            id="otp"
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                            placeholder="000000"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            className="bg-teal-600 text-white w-full px-4 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
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
                            {resendAvailable ? 'Didn’t receive OTP? Resend' : `Please wait ${timer} seconds to resend`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Otp;
