import React from 'react';
    

const Item = ({ name, price, imagePath, brand, font }) => {
    return (
        <div className='items'>
            <p>Sponsored</p>
            <p>{font}</p>
            <img src={imagePath} alt={name} />
            <p>{price}€</p>
        </div>
    );
};

export default Item;