import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './css/address.css'; // Ensure you have the appropriate styles defined

const Address = () => {
    const [selectedOption, setSelectedOption] = useState('pickup'); // Default to pickup
    const navigate = useNavigate();

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleContinue = () => {
        // Proceed to the next step
        navigate('/payment');
    };

    return (
        <div>
            
            <div className="address-container">
                <h1>SHIPPING ADDRESS</h1>
                <div className="options">
                    <div className={`option ${selectedOption === 'pickup' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            id="pickup"
                            name="addressOption"
                            value="pickup"
                            checked={selectedOption === 'pickup'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="pickup">Pickup point</label>
                    </div>
                    <div className={`option ${selectedOption === 'myAddress' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            id="myAddress"
                            name="addressOption"
                            value="myAddress"
                            checked={selectedOption === 'myAddress'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="myAddress">My address</label>
                    </div>
                </div>
                <button className='but' onClick={handleContinue}>Continue</button>
            </div>
        </div>
    );
};

export default Address;
