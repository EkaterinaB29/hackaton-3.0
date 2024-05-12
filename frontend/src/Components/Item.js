import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ id, name, price, imagePath, brand, font, navBool, handleAddToBasket }) => {
    const product = { id, name, price, imagePath, brand, font, navBool };
    
    return (
        <div className='items'>
            <Link to={`/products/${id}`}>
                <img src={imagePath} alt={name} />
                <p>Sponsored</p>
                <p>{font}</p>
                <p>{price}€</p>
            </Link>
            {navBool && <button onClick={() => handleAddToBasket(product)}>Add to basket</button>}
            {!navBool }
        </div>
    );
};

export default Item;
