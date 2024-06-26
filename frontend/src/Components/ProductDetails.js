import React from 'react';
import './css/productDetails.css'; // Ensure to create and import CSS for styling
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';  // Make sure this import is correct


const ProductDetails = ({ products, addToBasket  }) => {
    const { id } = useParams();
    const product = products.find(product => product.id === Number(id));

    if (!product) {
        return <div>No product found!</div>;
    }

    return (
        <div> 
        <div className="product-details">
            <div className="image-section">
                <img src={product.imagePath} alt={product.name} />
            </div>
            <div className="info-section">
                <h1>{product.name}</h1>
                <p className="price">{product.price}€</p>
                <p>Color: {product.color}</p>
                <div className="size-selector">
                    <label htmlFor="size">Size:</label>
                    <select id="size">
                        <option>One Size</option>
                    </select>
                </div>
                <button onClick={() => addToBasket(product.id)}>Add to Basket</button>
                <div className="delivery-info">
                    <p>Sold and shipped by Lumus</p>
                    <p>2 - 5 working days</p>
                    <p>Standard delivery free of charge</p>
                    <p>Free shipping and free returns</p>
                    <p>100-day return period</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ProductDetails;
