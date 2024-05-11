import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Item = ({ id, name, price, imagePath, brand, font }) => {
    return (
        <div className='items'>
            <Link to={`/products/${id}`}> {/* Use Link to create a clickable area that routes to the detail page */}
                <img src={imagePath} alt={name} />
                <p>Sponsored</p>
                <p>{font}</p>
                <p>{price}€</p>
            </Link>
        </div>
    );
};

export default Item;