// Checkout.js
import React from 'react';
import './css/checkout.css'; // Ensure this CSS file is styled appropriately

const BasketProcess = ({ basket }) => {
    const savedBasket = basket || JSON.parse(localStorage.getItem('basket') || '[]');
    const products = [
        {id: 1, name: "Product Name 1", price: 139.95, imagePath: "https://img01.ztat.net/article/spp-media-p1/7c1f83e40a21341f8272c9763c039def/23f4071413334e9a83667339719ed1ed.jpg?imwidth=1800", brand: "Lacoste"},
        {id: 2, name: "Product Name 2", price: 111.95, imagePath: "https://img01.ztat.net/article/spp-media-p1/725fb679e7c74782b71fad68f48b9a03/edf76db3189648bb866c0c63115eaabd.jpg?imwidth=1800", brand: "Lacoste"},
        {id: 3, name: "Product Name 3", price: 111.95, imagePath: "https://img01.ztat.net/article/spp-media-p1/d12cb8d2529741a1b2ab00811592684a/7341ead863b342b68d77628697082304.jpg?imwidth=1800", brand: "Lacoste"},
        {id: 4, name: "Product Name 4", price: 99.95, imagePath: "https://img01.ztat.net/article/spp-media-p1/55a06a8c257c3f089e0445b156b71157/fe9c49d1e9b44b83a7884126e6336a5b.jpg?imwidth=1800", brand: "Armani Exchange"},
        {id: 5, name: "Product Name 5", price: 94.85, imagePath: "https://img01.ztat.net/article/spp-media-p1/b54d2df36dfe3397b5540d4ec57fd205/ea695d5e126747728447f9156c1cbbf3.jpg?imwidth=1800", brand: "Armani Exchange"},
        {id: 6, name: "Product Name 6", price: 54.95, imagePath: "https://img01.ztat.net/article/spp-media-p1/a1be23eca5574f518fe7082b58acc5b8/13f132d60c264c7e8fc09efaded036e2.jpg?imwidth=1800", brand: "11"},
        {id: 7, name: "Product Name 7", price: 99.95, imagePath: "https://img01.ztat.net/article/spp-media-p1/7cfde39fc6253805a23e5cef3e8a7682/e879723b876b41a4b91b65359dfe8c47.jpg?imwidth=1800", brand: "13"},
        {id: 8, name: "Product Name 8", price: 73.95, imagePath: "https://img01.ztat.net/article/spp-media-p1/e9e3174d034f38f09bd7003120e6e91f/ab67f76608a645e68a935aff7a0b52ff.jpg?imwidth=1800", brand: "15"}
    ];

    return (
        <div>
        {savedBasket.length > 0 ? (
          savedBasket.map((productId) => {
              const product = products.find(product => product.id === productId);
              return product ? (
                <div key={product.id} className="basket-item">
                    <img src={product.imagePath} alt={product.name} className="basket-item-image" />
                    <div>
                        <h2>{product.name}</h2>
                        <p>Brand: {product.brand}</p>
                        <p>Price: €{product.price.toFixed(2)}</p>
                    </div>
                </div>
              ) : <div key={productId}>Product not found.</div>;
          })
        ) : (
          <p>No items in basket.</p>
        )}
      </div>
    );
};

export default BasketProcess;
