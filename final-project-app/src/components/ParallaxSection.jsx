// ParallaxSection.js
import React from 'react';
import './ParallaxSection.css';
import { useNavigate } from 'react-router-dom';
const ParallaxSection = () => {
  const navigate = useNavigate();
  const gotoShop = () => {
    navigate('/Shop')
  }
  return (
    <div className="mt-12 parallax-container">
      <div className="parallax-background">
        <h2>Savor Every Bite at TasteBuds Cafe</h2>
        <p>Experience the joy of delightful flavors and perfect dishes curated just for you.</p>
        <button onClick={gotoShop} className="order-now">Order Now</button>
      </div>
    </div>
  );
};

export default ParallaxSection;
