import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './css/confirm.css'; // Make sure you have the appropriate CSS

const Confirm = () => {
    const navigate = useNavigate();
    const handleConfirm = () => {
        // Placeholder for confirmation logic, e.g., finalizing payment and order
        alert('Order Confirmed!');
        navigate('/'); // Navigate to a completion page or back to home
    };

    // Placeholder data, fetch from local storage or state management
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails') || '{}');

    return (
        <div>
            <div className="confirm-container">
                <h1>Thank you for the order!</h1>
                
                <div className='img-div'>
                    <img className="image-done" src="https://cdn-icons-png.flaticon.com/512/1442/1442912.png"></img>
                </div>
                <button onClick={handleConfirm} className="confirm-button">Go back Home</button>
            </div>
        </div>
    );
};

export default Confirm;
