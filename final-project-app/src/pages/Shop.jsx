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
  <FoodItems/>
    </div>
  );
}

export default ShopPage;
