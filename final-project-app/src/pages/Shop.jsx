import React, { useEffect, useState } from 'react';
import './Shop.css';
import axios from 'axios';
import Productcard from '../components/Productcard';
import Navbar from '../components/Navbar';
import FoodCard from '../components/FoodCard';
import FoodItems from '../components/FoodItems';
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, set_show_cart, setcategory } from '../redux/features/cartSlice';
import Cart_comp from '../components/Cart_comp';
import './CartModal.css'
// import './homepage.module.css'
import Footer from '../components/Footer';
function ShopPage() {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 10, max: 2000 });
  const dispatch = useDispatch();
  const { carts, show_cart_details } = useSelector((state) => state.allCart);
  useEffect(() => {
    // async function fetchProducts() {
    //   const response = await fetch('http://localhost:3002/getproducts');
    //   const data = await response.json();
    //   setProducts(data);
    // }
    // fetchProducts();
  }, []);
  const [cartOpen, setCartOpen] = useState(false);
  const toggleCart = () => {
    setCartOpen(!cartOpen);
    dispatch(set_show_cart(false));
  };
  return (
    <div>

      <Navbar />
      <div className={`cart-modal ${show_cart_details ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-button" onClick={toggleCart}>×</button>
        </div>
        <Cart_comp data={carts} />
      </div>
      <div className={show_cart_details ? 'blurred' : ''}>
      <FoodItems />
      <div>
        <Footer />
      </div>
      
      </div>
    </div>
  );
}

export default ShopPage;
