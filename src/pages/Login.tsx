import React, { useState } from 'react';
import { checkEmail } from '../server/app'; // עדכון הנתיב ל-services/api
import { emailValidation } from '../validation/userValidation';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // בדיקת תקינות האימייל לפי ה-regex המוגדר
        if (!emailValidation.pattern.value.test(email)) {
            setError(emailValidation.pattern.message);
            setLoading(false);
            return;
        }

        try {
            const result = await checkEmail({ email });
            
            // בדיקת התוצאה מהשרת
            if (result.exists) {
                // אם האימייל קיים, ננווט לדף ה-OTP
                console.log('Email exists, navigating to OTP page.');
                navigate('/login/otp');
            } else {
                // אם האימייל לא קיים, נציג הודעת שגיאה
                setError('Email not found.');
            }
        } catch (error) {
            console.error('Error checking email:', error);
            setError('Failed to check email. Please try again.');
        } finally {
            setLoading(false);
        }
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

                {/* טופס התחברות */}
                <form onSubmit={handleSubmit}>
                    {/* שדה קלט של Email */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-200 text-lg font-semibold mb-3">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
                    </div>

                    {/* כפתור שליחה */}
                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            className="bg-purple-600 text-white w-full px-4 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            {loading ? 'Loading...' : 'Send Verification Code'}
                        </button>
                    </div>
                </form>

                {/* קו מפריד */}
                <div className="mt-8 flex items-center justify-center">
                    <span className="w-1/4 border-b border-gray-500"></span>
                    <span className="text-gray-400 mx-3">or</span>
                    <span className="w-1/4 border-b border-gray-500"></span>
                </div>

                {/* כפתור התחברות עם גוגל */}
                <div className="mt-6">
                    <button
                        className="flex items-center justify-center bg-white text-gray-800 w-full px-4 py-3 rounded-lg border border-gray-300 shadow-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-xl"
                    >
                        <FcGoogle className='w-6 h-6 mr-3'/>
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
