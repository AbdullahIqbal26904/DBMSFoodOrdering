import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import styles from './homepage.module.css';
import Productcard from '../components/Productcard';
import pic4 from '../pics/f1.png';
import pic5 from '../pics/f2.png';
import pic7 from '../pics/f4.png';
import pic8 from '../pics/f5.png';
import pic9 from '../pics/f6.png';
import CategoryHead from '../components/CategoryHead.jsx';
import rotate from '../pics/hero.png'
import axios from 'axios';
import './CartModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, set_show_cart, setcategory } from '../redux/features/cartSlice';
import Cart_comp from '../components/Cart_comp';
import Footer from '../components/Footer.jsx'
import ParallaxSection from '../components/ParallaxSection.jsx';
import HomeReviews from '../components/HomeReviews.jsx';
import Team from '../components/Team.jsx';

function Home() {
  const [products, setproducts] = useState();
  const { cart, show_cart_details } = useSelector((state) => state.allCart);
  const dispatch = useDispatch();
  const [getdata, setgetdata] = useState(true);
  const [cartfromdb, setcartfromdb] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchdata = async () => {
      try {
        const { data } = await axios.get("http://localhost:3002/getcartdata", {
          params: { cart_id: cart.cartid },
        });
        setcartfromdb(data);
        data.forEach((item) => dispatch(addtocart(item)));
      } catch (err) {
        console.log('Error fetching cart data:', err);
      }
    };

    const fetchTopSellingProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3002/topselling");
        setproducts(data);
      } catch (error) {
        console.error('Error loading top selling products:', error);
      }
    };
    const getCategory = async () => {

      try {
        const response = await axios.get('http://localhost:3002/getcategory');
        const dataforcat = response.data;
        dispatch(setcategory(dataforcat));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    if (getdata) {
      fetchdata();
      fetchTopSellingProducts();
      getCategory();
      setgetdata(false); // Prevents further fetching on re-renders
    }
    setCartOpen(show_cart_details);
    setIsLoading(false);

  }, [getdata, show_cart_details, cart.cartid, dispatch]);

  const [cartOpen, setCartOpen] = useState(false);
  const toggleCart = () => {
    if (cartOpen === false) {
      setgetdata(true);
    }
    setCartOpen(!cartOpen);
    dispatch(set_show_cart(false));
  };
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
      document.body.style.overflow = 'auto'; // Enable scroll
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [cartOpen]);
  return (
    <div>
      <div className={styles.mainhai}>
        <div className={`cart-modal ${cartOpen ? 'open' : ''}`}>
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <button className="close-button" onClick={toggleCart}>×</button>
          </div>
          <Cart_comp data={cartfromdb} />
        </div>
        <div className={styles.nav2}>
          <Navbar />
        </div>
        <div className={cartOpen ? 'blurred' : ''}>
          <div id={styles.hero}>
            <div id={styles.herochild1}>
              <div className={styles.info}>
                <h4>Trade-in-Offer</h4>
                <h2>Super Value Deals <br /> <span>On all Products.</span></h2>
                <p>Save more with coupons & upto 70% off</p>
                <button className={styles.batan}>Shop Now</button>
              </div>
              <img className={styles.rotateimg} src={rotate} alt="" />
            </div>
          </div>
          <div id={styles.feature}>
            <div className={styles.febox}>
              <img src={pic4} alt="" />
              <h6>Free Shipping</h6>
            </div>
            <div className={styles.febox}>
              <img src={pic5} alt="" />
              <h6>Online Order</h6>
            </div>
            <div className={styles.febox}>
              <img src={pic7} alt="" />
              <h6>Promotions</h6>
            </div>
            <div className={styles.febox}>
              <img src={pic8} alt="" />
              <h6>Happy Sell</h6>
            </div>
            <div className={styles.febox}>
              <img src={pic9} alt="" />
              <h6>F24/7 Support</h6>
            </div>
          </div>
          <div style={{ 'width': '100%', 'display': 'flex', "textAlign": 'center', "justifyContent": "center", "margin": "20px" }}>
            <h1 className={styles.abc}>Top Selling Products</h1>

          </div>
          <div className={styles.product}>
            {/* ref={sliderRef} */}
            <div className={styles.productcontainer} >
              {products &&
                products.map((item, index) => {
                  return (
                    <div
                      // ${index === focusedIndex ? styles.focused : ''

                      className={`${styles.productcard} `}
                      key={index}
                    >
                      <Productcard data={item} />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={styles.banner}>
            <h4>Repair Services</h4>
            <h2>Up to <span>70%</span> off-On all Lunch Items</h2>
            <button>Explore more</button>
          </div>
        </div>
        <CategoryHead />
        <div>
          <Team />
        </div>
        <div>
          <ParallaxSection />
        </div>
        <div style={{ 'padding': '40px 40px', 'background': 'transparent' }} >
          <HomeReviews />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
export default Home;
