import React, { useState } from 'react';
import axios from 'axios'; // Import axios

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { username, password });
            if (response.status === 200) {
                // Login successful
                console.log('Login successful');
                // You can redirect the user to another page here, or set user data in your state
            } else {
                // The server responded with a status other than 200
                console.log(`Login failed with status: ${response.status}`);
            }
        } catch (error) {
            // An error occurred while performing the request
            console.log('An error occurred while logging in:', error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;