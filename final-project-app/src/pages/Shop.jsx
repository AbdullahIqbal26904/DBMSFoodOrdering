import React, { useEffect, useState } from 'react';
import './Shop.css';
import axios from 'axios'; 
import Productcard from '../components/Productcard'; 
import Navbar from '../components/Navbar';
function ShopPage() {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 10, max: 2000 });

  const fetchProductsByPrice = async (min, max) => {
    try {
      const response = await axios.get('http://localhost:3002/productsbyrange', {
        params: { minPrice: min, maxPrice: max },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePriceChange = (e) => {
    const newMaxPrice = e.target.value;
    setPriceRange((prevRange) => ({ ...prevRange, max: newMaxPrice }));
  };

  useEffect(() => {
    fetchProductsByPrice(priceRange.min, priceRange.max);
  }, [priceRange]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('http://localhost:3002/getproducts');
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar/>
    <div className="shopPage-container">
      {/* Banner Section */}
      <div className="shopPage-banner">
        <h1 className="shopPage-bannerText">Discover Your Perfect Art Supplies</h1>
        <p className="shopPage-bannerSubText">Unleash your creativity with our wide range of premium products!</p>
      </div>

      {/* Price Range Filter Section */}
      <div className="shopPage-priceFilter">
        <h3>Filter by Price</h3>
        <input
          type="range"
          min="10"
          max="8000"
          step="10"
          value={priceRange.max}
          onChange={handlePriceChange}
        />
        <p>Price Range: ${priceRange.min} - ${priceRange.max}</p>
      </div>

      {/* Product Grid Section */}
      <h2 className="shopPage-title">Our Products</h2>
      <div className="shopPage-productGrid">
        {products.map((product, index) => (
          <Productcard key={index} data={product} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default ShopPage;
