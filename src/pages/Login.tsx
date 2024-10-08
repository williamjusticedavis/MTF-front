import React, { useState } from 'react';
import { checkEmail } from '../server/app';
import { emailValidation } from '../validation/userValidation';


const Login: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // מונע את שליחת הטופס ברירת המחדל
        setLoading(true); // מגדיר מצב טעינה
        setError(null); // מאפס את שגיאת הקודם

        // בדוק אם הדוא"ל תקין
        if (!emailValidation.pattern.value.test(email)) {
            setError(emailValidation.pattern.message); // מציג את הודעת השגיאה המוגדרת באובייקט הוולידציה
            setLoading(false); // מסיים את מצב הטעינה
            return; // מפסיק את הבדיקה
        }
        

        try {
            const result = await checkEmail({ email }); // כאן נשלח אובייקט עם כתובת הדוא"ל
            console.log('Email checked successfully:', result);
            // כאן תוכל להוסיף לוגיקה נוספת לאחר בדיקת הדוא"ל
        } catch (error) {
            console.error('Error checking email:', error);
            setError('Failed to check email. Please try again.'); // מעדכן את מצב השגיאה
        } finally {
            setLoading(false); // מסיים את מצב הטעינה
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-[url('../../bacLogin.jpeg')] bg-cover bg-center p-4">
            <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm md:max-w-md lg:min-h-[500px]">
                {/* לוגו */}
                <div className="flex justify-center mb-6">
                    <img src="../../logo-MTF.png" alt="logo mtf" className="h-24 md:h-44" />
                </div>

                {/* טופס התחברות */}
                <form onSubmit={handleSubmit}>
                    {/* שדה קלט של Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* כפתורים */}
                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white w-full px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Send me a verification code to my email
                        </button>

                        <button
                            type="button"
                            // onClick={handleSignup}
                            className="bg-gray-500 text-white w-full px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
                        >
                            Create a new account
                        </button>

                        {/* כפתור נוסף */}
                        <button
                            type="button"
                            className="bg-green-500 text-white w-full px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                        >
                            Additional Button
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
