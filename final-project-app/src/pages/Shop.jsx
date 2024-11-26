import React, { useEffect, useState } from 'react';
import './Shop.css';
import axios from 'axios'; 
import Productcard from '../components/Productcard'; 
import Navbar from '../components/Navbar';
import FoodCard from '../components/FoodCard';
import FoodItems from '../components/FoodItems';
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
    // async function fetchProducts() {
    //   const response = await fetch('http://localhost:3002/getproducts');
    //   const data = await response.json();
    //   setProducts(data);
    // }
    // fetchProducts();
  }, []);

  return (
    <div>
      <Navbar/>
    <div className="shopPage-container">
  <FoodItems/>
    </div>
    </div>
  );
}

export default ShopPage;
