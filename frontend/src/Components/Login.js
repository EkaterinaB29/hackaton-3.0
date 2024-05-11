import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './css/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const loginUrl = 'http://88.200.64.122:6500/api/login';

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/'); // Redirect to address step if already logged in
        }
        else {
            console.log('User not logged in');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(loginUrl, { username, password });
            if (response.data.loggedIn) {
                localStorage.setItem('token', response.data.token); // Save the token
                navigate('/address'); // Navigate to address page
                console.log('Login successful'); // Just for debugging, can remove later
            } else {
                console.log('Login failed: ', response.data.message); // Show in console for debugging
                alert('Login failed: ' + (response.data.message || 'Unknown error')); // Handle cases where message might be undefined
            }
        } catch (error) {
            console.error('An error occurred while logging in:', error);
            alert('An error occurred while logging in: ' + (error.response ? error.response.data.message : 'Network error')); // Making sure to handle network errors too
        }
    
    };
    

    return (
        <div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="field-container">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="field-container">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
