import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOtp, sendOtp } from '../server/app'; // Adjust the path based on your setup

const Otp: React.FC = () => {
    const [otp, setOtp] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [resendAvailable, setResendAvailable] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(30);
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(intervalId);
                    setResendAvailable(true);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
    
        try {
            const result = await verifyOtp({ email: localStorage.getItem('email')!, otpCode: otp });
            console.log('OTP verified successfully:', result);
    
            if (result.token) {
                // Store the token and navigate to the users page
                localStorage.setItem('token', result.token);
                navigate('/users');
            }
        } catch (error: any) {
            console.error('Error verifying OTP:', error);
            setError('Invalid or expired OTP.');
        }
    };

    const handleResendOtp = async () => {
        setResendAvailable(false);
        setTimer(30);
        setError(null);

        try {
            await sendOtp({ email: 'user@example.com' }); // Replace with actual user email
            console.log("OTP resent successfully");
        } catch (error) {
            console.error("Error resending OTP:", error);
            setError("Failed to resend OTP. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center p-4" style={{ backgroundImage: `url('../../bg.png')` }}>
            <div className="bg-opacity-70 bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg">
                <div className="flex justify-center mb-8">
                    <img
                        src="../../logo-MTF.png"
                        alt="logo mtf"
                        className="h-28 md:h-36 lg:h-48 transition-transform duration-300 hover:scale-105 drop-shadow-lg"
                    />
                </div>

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
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value) && value.length <= 6) {
                                    setOtp(value);
                                }
                            }}
                        />
                        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
                    </div>

                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            className="bg-teal-600 text-white w-full px-4 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Verify OTP
                        </button>

                        <button
                            type="button"
                            className={`w-full px-4 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl ${resendAvailable ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'
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