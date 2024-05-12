import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/payment.css'; // Ensure to write your CSS accordingly
import axios from 'axios';

const Payment = () => {
    const savedBasket = JSON.parse(localStorage.getItem('basket') || '[]');
    const [paymentMethod, setPaymentMethod] = useState('credit'); // Default to credit card
    const navigate = useNavigate();
    const [walletAddress, setWalletAddress] = useState('');

    const products = [
        {id: 1, name: "Product Name 1", price: 139.95, imagePath: "https://img01.ztat.net/article/spp-media-p1/7c1f83e40a21341f8272c9763c039def/23f4071413334e9a83667339719ed1ed.jpg?imwidth=1800", brand: "Lacoste"},
        {id: 2, name: "Product Name 2", price: 111.95, imagePath: "https://img01.ztat.net/article/spp-media-p1/725fb679e7c74782b71fad68f48b9a03/edf76db3189648bb866c0c63115eaabd.jpg?imwidth=1800", brand: "Lacoste"},
        {id: 3, name: "Product Name 3", price: 111.95, imagePath: "https://img01.ztat.net/article/spp-media-p1/d12cb8d2529741a1b2ab00811592684a/7341ead863b342b68d77628697082304.jpg?imwidth=1800", brand: "Lacoste"},
        {id: 4, name: "Product Name 4", price: 99.95, imagePath: "https://img01.ztat.net/article/spp-media-p1/55a06a8c257c3f089e0445b156b71157/fe9c49d1e9b44b83a7884126e6336a5b.jpg?imwidth=1800", brand: "Armani Exchange"},
        {id: 5, name: "Product Name 5", price: 94.85, imagePath: "https://img01.ztat.net/article/spp-media-p1/b54d2df36dfe3397b5540d4ec57fd205/ea695d5e126747728447f9156c1cbbf3.jpg?imwidth=1800", brand: "Armani Exchange"},
        {id: 6, name: "Product Name 6", price: 54.95, imagePath: "https://img01.ztat.net/article/spp-media-p1/a1be23eca5574f518fe7082b58acc5b8/13f132d60c264c7e8fc09efaded036e2.jpg?imwidth=1800", brand: "11"},
        {id: 7, name: "Product Name 7", price: 99.95, imagePath: "https://img01.ztat.net/article/spp-media-p1/7cfde39fc6253805a23e5cef3e8a7682/e879723b876b41a4b91b65359dfe8c47.jpg?imwidth=1800", brand: "13"},
        {id: 8, name: "Product Name 8", price: 73.95, imagePath: "https://img01.ztat.net/article/spp-media-p1/e9e3174d034f38f09bd7003120e6e91f/ab67f76608a645e68a935aff7a0b52ff.jpg?imwidth=1800", brand: "15"}
    ];

    const handlePaymentSelection = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleProceed = async () => {
        const email = localStorage.getItem('email'); // Replace with the key you used to save the email
        const toAddress = document.getElementById('walletAddress').value;
        const amount = total;
    
        try {
            const response = await axios.post('http://88.200.64.122:6500/initiate-payment/', { email, toAddress, amount, walletAddress });
    
            // Handle success
            console.log('Payment initiated successfully:', response.data);
            // if it's a succesful payment, you can redirect the user to the success page
            // check if response is successful and redirect to the success page
            // check response success, if true redirect to success page
            if (response.data.success) {
                alert('Payment initiated successfully');
                navigate('/confirm');
            }
        } catch (error) {
            // Handle error
            console.error('Payment initiation failed:', error.response.data);
        }
    };

    const total = savedBasket.reduce((acc, productId) => {
        const product = products.find(product => product.id === productId);
        return product ? acc + product.price : acc;
    }, 0).toFixed(2);

    return (
        <div>
            <div className="payment-container">
            <h1>METHOD OF PAYMENT</h1>
            <div className="payment-options">
                <label className="option">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="credit"
                        checked={paymentMethod === 'credit'}
                        onChange={handlePaymentSelection}
                    />
                    <label>Credit/debit card</label>
                {/* Display additional fields based on the selected payment method */}
                {paymentMethod === 'credit' && (
                    <div className="credit-card-info">
                        <input placeholder="Cardholder Name" />
                        <input placeholder="Card Number" />
                        <input placeholder="Expiration Date MM/YY" />
                        <input placeholder="Security Code CVC/CVV" />
                    </div>
                )}
                </label>
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
                        {paymentMethod === 'cash' && (
                        <div className="credit-card-info"></div>
                    )}
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
                        {paymentMethod === 'paypal' && (
                            <p className='smaller'>We will redirect you to PayPal to complete your payment.</p>
                        )}
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
                        {paymentMethod === 'bank' && (
                    <div className="credit-card-info">
                        <input placeholder="Bank provider" />
                        <input placeholder="Bank number" />
                    </div>
                )}
                    </div>
                    <div className="option">
                        <input
                            type="radio"
                            id="bank"
                            name="paymentMethod"
                            value="crypto"
                            checked={paymentMethod === 'crypto'}
                            onChange={handlePaymentSelection}
                        />
                        <label htmlFor="bank">Cryptocurrency payment</label>
                        {paymentMethod === 'crypto' && (
                            <div className="crypto-info">
                
                                <input type="text" id="walletAddress" value={walletAddress}
                                       onChange={e => setWalletAddress(e.target.value)} placeholder="Enter wallet address" />
                            </div>
                        )}
                    </div>

                
                </div>
                <div className="payment-summary">
                    <h2>Total (VAT included): €{total}</h2>
                    <button onClick={handleProceed}>GO AHEAD</button>
                </div>
            </div>
        </div>
    );
};

export default Payment;