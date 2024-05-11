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

    // Function to handle adding items to the basket
    const handleAddToBasket = (product) => {
        setBasketItems([...basketItems, product]);
        setIsBasketVisible(true); // Open the basket overlay when an item is added
    };

    // Function to close the basket overlay
    const handleCloseBasket = () => {
        setIsBasketVisible(false);
    };

        // Define addToBasket function
        const addToBasket = (product) => {
            const newBasketItems = [...basketItems, product];
            setBasketItems(newBasketItems);
            setIsBasketVisible(true); // Show basket when item is added
        };

    return (
        <div>
            <Navbar onBasketHover={toggleBasketVisibility} />
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
                        handleAddToBasket={handleAddToBasket} // Pass this function to each Item
                    />
                ))}
            </div>
            {/* Conditionally render the Basket component based on isBasketVisible */}
            {isBasketVisible && <Basket items={basketItems} />}
        </div>
    );
};

export default Dashboard;
