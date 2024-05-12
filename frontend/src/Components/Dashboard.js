import React, { useState } from 'react';
import Navbar from './Navbar';
import Item from './Item';
import Basket from './Basket'; // Assuming you have a Basket component
import './css/dashboard.css';
import './css/item.css';

const Dashboard = ({ products }) => {
    const [basketItems, setBasketItems] = useState([]);
    const [isBasketVisible, setIsBasketVisible] = useState(false);

    const toggleBasketVisibility = () => {
        setIsBasketVisible(!isBasketVisible);
    };

    const handleAddToBasket = (product) => {
        if (!basketItems.some(item => item.id === product.id)) {  // Only add if not already added
            setBasketItems(prevItems => [...prevItems, product]);
        }
        setIsBasketVisible(true);
    };

    const handleRemoveFromBasket = (product) => {
        setBasketItems(prevItems => prevItems.filter(item => item.id !== product.id));
    };

    const isInBasket = (product) => {
        return basketItems.some(item => item.id === product.id);
    };

    return (
        <div>
            <h1 className='sunglasses-header'>Sunglasses</h1>
            <div className="grid-container">
                {products.map((product) => (
                    <Item 
                        key={product.id}
                        id={product.id}
                        font={product.font}
                        price={product.price}
                        imagePath={product.imagePath}
                        brand={product.brand}
                        handleAddToBasket={handleAddToBasket}
                        handleRemoveFromBasket={handleRemoveFromBasket}
                        navBool={basketItems.some(item => item.id === product.id)}  // Pass true if item is in the basket
                    />
                ))}
            </div>
            {isBasketVisible && <Basket items={basketItems} />}
        </div>
    );
};

export default Dashboard;