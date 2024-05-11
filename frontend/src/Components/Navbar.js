import React, { useState } from 'react';
import './css/navbar.css';
import Item from './Item';



const Navbar = () => {
    const [isHovered, setIsHovered] = useState(false);

    const products = [
        {id: 1, font: "Lacoste", price: "139.95", imagePath: "https://img01.ztat.net/article/spp-media-p1/7c1f83e40a21341f8272c9763c039def/23f4071413334e9a83667339719ed1ed.jpg?imwidth=1800", brand: ""},
        {id: 2, font: "Lacoste", price: "111.95", imagePath: "https://img01.ztat.net/article/spp-media-p1/725fb679e7c74782b71fad68f48b9a03/edf76db3189648bb866c0c63115eaabd.jpg?imwidth=1800&filter=packshot", brand: ""},
        {id: 3, font: "Lacoste", price: "111.95", imagePath: "https://img01.ztat.net/article/spp-media-p1/d12cb8d2529741a1b2ab00811592684a/7341ead863b342b68d77628697082304.jpg?imwidth=1800&filter=packshot", brand: ""},
        {id: 4, font: "Armani Exchange", price: "99.95", imagePath: "https://img01.ztat.net/article/spp-media-p1/55a06a8c257c3f089e0445b156b71157/fe9c49d1e9b44b83a7884126e6336a5b.jpg?imwidth=1800&filter=packshot", brand: ""},
        {id: 5, font: "Armani Exchange", price: "94.85", imagePath: "https://img01.ztat.net/article/spp-media-p1/b54d2df36dfe3397b5540d4ec57fd205/ea695d5e126747728447f9156c1cbbf3.jpg?imwidth=1800", brand: ""},
        {id: 6, font: "11", price: "54.95", imagePath: "https://img01.ztat.net/article/spp-media-p1/a1be23eca5574f518fe7082b58acc5b8/13f132d60c264c7e8fc09efaded036e2.jpg?imwidth=1800&filter=packshot", brand: ""},
        {id: 7, font: "13", price: "99.95", imagePath: "https://img01.ztat.net/article/spp-media-p1/7cfde39fc6253805a23e5cef3e8a7682/e879723b876b41a4b91b65359dfe8c47.jpg?imwidth=1800&filter=packshot", brand: ""},
        {id: 8, font: "15", price: "73.95", imagePath: "https://img01.ztat.net/article/spp-media-p1/e9e3174d034f38f09bd7003120e6e91f/ab67f76608a645e68a935aff7a0b52ff.jpg?imwidth=1800", brand: ""}
    ];

    const [basket, setBasket] = useState(() => {
        const savedBasket = localStorage.getItem('basket');
        return savedBasket ? JSON.parse(savedBasket) : [];
    });
    

    return (
        <nav className="navbar-container">
            <div className="navbar-center">
                <div className="navbar-left">
                    <a href="/">Women</a>
                    <a href="/">Men</a>
                    <a href="/">Children</a>
                </div>
                <div>
                <a className="lumos-name" href="/">Lumos</a>
                </div>
                <div className="navbar-right">
                    <input type="search" placeholder="Search" className="search-input" />
                    <a href="/login" className="icon-link"><img src="https://cdn-icons-png.flaticon.com/512/4308/4308439.png" alt="Heart Icon" className='icon' /></a>
                    <a href="/basket" className="icon-link" data-tip 
                data-for='basketTooltip' 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
                ><img src="https://cdn-icons-png.flaticon.com/512/2956/2956820.png" alt="User Icon" className='icon' /></a>
                 {isHovered && basket && (
                    basket.map((productId) => {
                        const product = products.find(product => product.id === productId);
                        return (
                            <Item 
                                key={product.id} 
                                id={product.id} 
                                font={product.font} 
                                price={product.price} 
                                imagePath={product.imagePath} 
                                brand={product.brand}
                            />
                        );
                    })
                )}
                </div>
            </div>
        </nav>
    
    );
};



export default Navbar;
