import React from 'react';

const Item = ({ name, price, imagePath, brand, font }) => {
    return (
        <div className='items'>
            <img src={imagePath} alt={name} />
            <p>Sponsored</p>
            <p>{font}</p>
            <p>{price}€</p>
        </div>
    );
};

export default Item;