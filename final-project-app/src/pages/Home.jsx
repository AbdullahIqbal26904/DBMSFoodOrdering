import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import styles from './homepage.module.css';
import Productcard from '../components/Productcard';
import pic4 from '../pics/f1.png';
import pic5 from '../pics/f2.png';
import pic7 from '../pics/f4.png';
import pic8 from '../pics/f5.png';
import pic9 from '../pics/f6.png';
import pic10 from '../pics/istockphoto-836012728-612x612.jpg'
import pic11 from '../pics/istockphoto-938158500-612x612.jpg'
import pic12 from '../pics/lunch.jpeg'
import arrow from '../pics/arrow.png';
import rotate from '../pics/hero.png'
import axios from 'axios';
import './CartModal.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, set_show_cart } from '../redux/features/cartSlice';
// import { useNavigate } from 'react-router-dom';
import Cart_comp from '../components/Cart_comp';
import Footer from '../components/Footer.jsx'
import ParallaxSection from '../components/ParallaxSection.jsx';
import HomeReviews from '../components/HomeReviews.jsx';
function Home() {
  const [products, setproducts] = useState();
  const [lunch, setlunch] = useState();
  const [showlunch, setshowlunch] = useState(false);
  const { cart, show_cart_details } = useSelector((state) => state.allCart);
  const dispatch = useDispatch();
  const [getdata, setgetdata] = useState(true);
  // const navigate = useNavigate();
  const [cartfromdb, setcartfromdb] = useState();
  // const [carttotal, setcarttotal] = useState();
  const [isLoading, setIsLoading] = useState(false);
  async function showbrakfast() {
    setshowlunch(false);
    // console.log("hello world!")
    setIsLoading(true);
    const category = "Breakfast"; // Assuming you want to send this as a query parameter
    try {
      const response = await axios.get(`http://localhost:3002/lunch?category=${category}`);
      setlunch(response.data);
      // console.log(response.data); // Log response correctly
    } catch (err) {
      // console.log(err);
      toast.error("Server Error");
    }
    setIsLoading(false);
  }
  async function showlunchh() {
    // console.log(userDetails);
    setshowlunch(true);
    setIsLoading(true);
    // console.log("hello world2!");
    const category = "Lunch"; // Assuming you want to send this as a query parameter
    try {
      const response = await axios.get(`http://localhost:3002/lunch?category=${category}`);
      setlunch(response.data);
      // console.log(response.data); // Log response correctly
    } catch (err) {
      // console.log(err);
      toast.error("Server Error");
    }
    setIsLoading(false);
  }

  async function showdinner() {
    // console.log("hello world3!")
    setIsLoading(true);
    const category = "Dinner"; // Assuming you want to send this as a query parameter
    try {
      const response = await axios.get(`http://localhost:3002/lunch?category=${category}`);
      setlunch(response.data);
      // console.log(response.data); // Log response correctly
    } catch (err) {
      // console.log(err);
      toast.error("Server Error");
    }

    setshowlunch(true);
    setIsLoading(false);
  }

  // useEffect(() => {

  //   const fetchdata = async () => {
  //     const data = {
  //       cart_id: cart.cartid
  //     }
  //     const response = await axios.get("http://localhost:3002/getcartdata", {
  //       params: data
  //     })
  //       .then((res) => {
  //         // console.log('yele b: ',res.data);
  //         setcartfromdb(res.data);
  //         for (let i = 0; i < res.data.length; i++) {
  //           dispatch(addtocart(res.data[i]));
  //           // console.log(res.data[i])
  //         }
  //       }).catch((err) => {
  //         console.log('error', err);
  //       })
  //   }
  //   const fetchTopSellingProducts = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3002/topselling");
  //       setproducts(response.data);
  //     } catch (error) {
  //       console.error('Error loading top selling products:', error);
  //     }
  //   };
  //   if (getdata) {
  //     fetchdata();
  //     fetchTopSellingProducts();
  //     setgetdata(false); // Prevent fetching again on re-renders
  //   }
  //   show_cart_details ? setCartOpen(true) : setCartOpen(false);
  //   console.log('bar bar chal raha hai?');
  // }, [getdata, show_cart_details, cart.cartid]);

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

    if (getdata) {
      fetchdata();
      fetchTopSellingProducts();
      setgetdata(false); // Prevents further fetching on re-renders
    }

    setCartOpen(show_cart_details);

    console.log('Effect is running');
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
    setIsLoading(true);

    if (cartOpen) {
      document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
      document.body.style.overflow = 'auto'; // Enable scroll
    }

    // Cleanup function to reset overflow when the component is unmounted or cartOpen changes
    return () => {
      document.body.style.overflow = 'auto';
    };
    setIsLoading(false);

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


          {/* Cart Modal */}

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
          {/* {<button className="show-cart-button" onClick={toggleCart}>Show Cart</button>} */}
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
                      key={item.id}
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
          <div className={styles.categoryhead}>
            <div>
              <div onClick={showbrakfast} className={styles.category1}>
                <img src={pic11} alt="" />
              </div>
              <span>breakfast</span>
            </div>
            <div>
              <div onClick={showlunchh} className={styles.category1}>
                <img src={pic12} alt="" />
              </div>
              <span>lunch</span>
            </div>
            <div>
              <div onClick={showdinner} className={styles.category1}>
                <img src={pic10} alt="" />
              </div>
              <span>dinner</span>
            </div>
          </div>
          <div className={showlunch ? styles.visible : styles.notvisible}>
            <button className={styles.prebtn}><img src={arrow} alt="" /></button>
            <button className={styles.nxtbtn}><img src={arrow} alt="" /></button>
            <div className={styles.productcontainer}>
              {lunch && lunch.map((item) => {
                return (
                  <div className={styles.productcard} key={item.id}>
                    <Productcard data={item} />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
       
        <div>
          <ParallaxSection />
        </div>
        <div style={{'padding':'40px 40px','background':'transparent'}} >
              <HomeReviews/>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
export default Home;
