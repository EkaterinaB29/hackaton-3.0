// Basket.js
import React from 'react';
import './css/basket.css'; // Ensure you have this CSS

const Basket = ({ items, onClose }) => {
    return (
        <div className="basket-overlay" onClick={onClose}>
            <div className="basket-content" onClick={e => e.stopPropagation()}>
                <button onClick={onClose}>Close</button>
                <h2>Your basket</h2>
                {items.map(item => (
                    <div key={item.id} className="basket-item">
                        <h4>{item.name}</h4>
                        <p>Price: €{item.price}</p>
                        <p>Quantity: 1</p> {/* Update as needed */}
                    </div>
                ))}
                <button onClick={() => alert('Proceed to checkout')}>Go to cart</button>
            </div>
        </div>
    );
};

export default Basket;
