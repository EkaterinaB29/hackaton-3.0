import React from 'react';
import Item from './Item'
import './css/dashboard.css'
import './css/item.css'


const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <div className="grid-container">
                <Item font="Lacoste" price="139.95" imagePath={require("./Pictures/shopping-bag.png").default} brand=""/>
                <Item font="Lacoste" price="111.95" imagePath="" brand=""/>
                <Item font="Lacoste" price="111.95" imagePath="" brand=""/>
                <Item font="Armani Exchange" price="99.95" imagePath="" brand=""/>
                <Item font="Armani Exchange" price="94.85" imagePath="" brand=""/>
                <Item font="11" price="54.95" imagePath="" brand=""/>
                <Item font="13" price="99.95" imagePath="" brand=""/>
                <Item font="15" price="73.95" imagePath="" brand=""/>
            </div>
        </div>
    );
};


export default Dashboard;