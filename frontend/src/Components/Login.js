import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './css/login.css'; // Ensure the CSS file is correctly referenced

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { username, email, password, walletAddress });
            if (response.status === 200) {
                console.log('Login successful');
            } else {
                console.log(`Login failed with status: ${response.status}`);
            }
        } catch (error) {
            console.log('An error occurred while logging in:', error);
        }
    };

    return (
        <div>
            <Navbar />
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
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
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
                    <div className="field-container">
                        <label htmlFor="walletAddress">Wallet Address:</label>
                        <input
                            type="text"
                            id="walletAddress"
                            value={walletAddress}
                            onChange={e => setWalletAddress(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
