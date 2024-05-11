import React from 'react';
import './css/productDetails.css'; // Ensure to create and import CSS for styling

const ProductDetails = ({ product }) => {
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
                <p className="price">{product.price}€ VAT is included</p>
                <p>Color: {product.color}</p>
                <div className="size-selector">
                    <label htmlFor="size">Size:</label>
                    <select id="size">
                        <option>One Size</option>
                    </select>
                </div>
                <button>Add to Basket</button>
                <div className="delivery-info">
                    <p>Sold and shipped by Zalando</p>
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
