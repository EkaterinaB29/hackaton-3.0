import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './css/payment.css'; // Ensure to write your CSS accordingly

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('credit'); // Default to credit card
    const navigate = useNavigate();

    const handlePaymentSelection = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleProceed = () => {
        // Placeholder function to proceed to confirmation
        navigate('/confirm');
    };

    return (
        <div>
            <div className="payment-container">
                <h1>METHOD OF PAYMENT</h1>
                <div className="payment-options">
                    <div className="option">
                        <input
                            type="radio"
                            id="credit"
                            name="paymentMethod"
                            value="credit"
                            checked={paymentMethod === 'credit'}
                            onChange={handlePaymentSelection}
                        />
                        <label htmlFor="credit">Credit/debit card</label>
                    </div>
                    <div className="option">
                        <input
                            type="radio"
                            id="cash"
                            name="paymentMethod"
                            value="cash"
                            checked={paymentMethod === 'cash'}
                            onChange={handlePaymentSelection}
                        />
                        <label htmlFor="cash">Cash on delivery</label>
                    </div>
                    <div className="option">
                        <input
                            type="radio"
                            id="paypal"
                            name="paymentMethod"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={handlePaymentSelection}
                        />
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                    <div className="option">
                        <input
                            type="radio"
                            id="bank"
                            name="paymentMethod"
                            value="bank"
                            checked={paymentMethod === 'bank'}
                            onChange={handlePaymentSelection}
                        />
                        <label htmlFor="bank">Advance payment (bank transfer)</label>
                    </div>
                    <div className="option">
                        <input
                            type="radio"
                            id="bank"
                            name="paymentMethod"
                            value="bank"
                            checked={paymentMethod === 'bank'}
                            onChange={handlePaymentSelection}
                        />
                        <label htmlFor="bank">Cryptocurrency payment</label>
                    </div>
                </div>
                <div className="payment-summary">
                    <h2>Total (VAT included): €729.65</h2>
                    <button onClick={handleProceed}>GO AHEAD</button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
