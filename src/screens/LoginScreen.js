import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginScreen({ setIsAuth }) {
    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem('isAuth', true);
            setIsAuth(true);
            navigate('/');
        });
    };

    return (
        <div className="loginPage">
            <p>Sign in with Google</p>
            <button
                className="btn login-btn login-with-google-btn"
                onClick={signInWithGoogle}
            >
                Sign
            </button>
        </div>
    );
}
