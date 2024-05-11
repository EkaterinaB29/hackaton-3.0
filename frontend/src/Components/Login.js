import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './css/login.css'; // Ensure the CSS file is correctly referenced

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); // Email and walletAddress removed as per the requirement

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginUrl = 'http://88.200.64.122:6500/api/login'; // HTTP or HTTPS based on your server config

        try {
            const response = await axios.post(loginUrl, { username, password });
            if (response.data.loggedIn) { // Assuming the API sends back a field `loggedIn`
                console.log('Login successful');
                // Optionally redirect the user or perform further actions
            } else {
                console.log('Login failed: ', response.data.message); // Assuming there's a message field in the response
            }
        } catch (error) {
            console.log('An error occurred while logging in:', error.response ? error.response.data : error.message);
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