import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../server/app';

const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const onSuccess = async (googleResponse:any) => {
        console.log("2")
        const token = googleResponse.credential;
        console.log("1")
        console.log(token);
        try {
            const data = await sendToken(token);
            console.log(data)
            if (data.email) {
                setEmail(data.email);
                navigate('/users');
            }
        } catch (err) {
            console.log("4")
            console.log('Error during token verification:', err);
        }
    };

    const sendToken = async (token:string) => {
        console.log("5")
        try {
            const response = await checkToken(token);
            console.log("6")
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const onError = () => {
        console.log('Login Failed');
        console.log("7")
    };

    return (
        <div className="flex justify-center mt-6 w-full">
            <div className="w-full max-w-xs">
                <GoogleLogin 
                    onSuccess={onSuccess}
                    onError={onError}
                />
            </div>
        </div>
    );
};
export default GoogleLoginButton;