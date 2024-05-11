import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ id, name, price, imagePath, brand, font, handleAddToBasket }) => {
    const product = { id, name, price, imagePath, brand, font };
    
    return (
        <div className='items'>
            <Link to={`/products/${id}`}>
                <img src={imagePath} alt={name} />
                <p>Sponsored</p>
                <p>{font}</p>
                <p>{price}€</p>
            </Link>
            <button onClick={() => handleAddToBasket(product)}>Add to Basket</button>
        </div>
    );
};

export default Item;
