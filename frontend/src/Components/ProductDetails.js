import React from 'react';
import './css/productDetails.css'; // Ensure to create and import CSS for styling
import { useParams } from 'react-router-dom';


const ProductDetails = ({ products }) => {
    const { id } = useParams(); // Get the id from the URL
    const product = products.find((product) => product.id === Number(id)); // Find the product with the matching id

    if (!product) {
        return <div>No product found!</div>;
    }

    return (
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
                <button>Add to Basket</button>
                <div className="delivery-info">
                    <p>Sold and shipped by Lumus</p>
                    <p>2 - 5 working days</p>
                    <p>Standard delivery free of charge</p>
                    <p>Free shipping and free returns</p>
                    <p>100-day return period</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
