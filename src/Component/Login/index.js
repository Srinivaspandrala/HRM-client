import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            if (response.ok) {
                Cookies.set('token', data.token, { expires: 1 });
                setMessage('Login successful!');
                
                if (data.loginDateTime) {
                    Cookies.set('loginDate', data.loginDateTime.logDate,{ expires: 1 });
                    Cookies.set('loginTime', data.loginDateTime.logTime,{ expires: 1 });
                }
    
                navigate('/home');
            } else {
                setMessage(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setMessage('Login failed. Please try again.');
        }
    };
    
    const onHandleSignup = () => {
        navigate('/register');
    };

    return (
        <div className="login-form">
            <form className="login-form__container" onSubmit={handleLogin}>
                <div className="login-form__input-container">
                    <label className="login-form__label">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-form__input"
                        required
                    />
                </div>
                <div className="login-form__input-container">
                    <label className="login-form__label">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-form__input"
                        required
                    />
                </div>
                {message && <p className="login-form__error">{message}</p>}
                <button className="login-form__signup-button" onClick={onHandleSignup}>Signup</button>
            </form>
        </div>
    );
};

export default LoginComponent;
