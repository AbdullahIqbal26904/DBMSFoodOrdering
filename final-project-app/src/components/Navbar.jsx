import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar-main.css';
import logo from '../pics/logo.webp';
import { FiShoppingCart } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { useSelector,useDispatch } from 'react-redux';
import { set_show_cart } from '../redux/features/cartSlice';
import Profile from '../pages/Profile';
function Navbar() {
  const [menuOpen, setmenuOpen] = useState(false);
  const { userDetails } = useSelector((state) => state.allCart);
  const [openCartmodal,setopenCartmodal] = useState();
  const dispatch = useDispatch(); 
  const hello = () => {
    // console.log('first');
    dispatch(set_show_cart(true));
  }
  return (
    <div>
      <nav>
        <Link className={'title'} to="/">
          <img className='logo' src={logo} alt="logo" />
          TasteBuds Cafe
        </Link>
        <div>
          <span className='menu' onClick={() => {
            setmenuOpen(!menuOpen)
          }}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <ul className={[menuOpen ? "open" : ""]}>
          <li>
            <NavLink to="/" className="NavLink">HOME</NavLink>
          </li>
          <li>
            <NavLink to="/shop" className="NavLink">SHOP</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="NavLink">CONTACT</NavLink>
          </li>
          <li>
            <NavLink to="/Aboutus" className="NavLink">About Us</NavLink>
          </li>
          <li>
            <NavLink onClick={hello} className="NavLink"><FiShoppingCart /></NavLink>
          </li>
          {/* Account Icon with Dropdown */}
          <li className="account-dropdown">
            <NavLink  className="NavLink"><FaUserAlt /></NavLink>
            <div className="dropdown">
              {userDetails ? (
                <>
                  <NavLink to="/Profile" className="dropdown-item">Previous Orders</NavLink>
                  <NavLink to="/Loginpage" className="dropdown-item">Login</NavLink>
                </>
              ) : (
                <NavLink to="/Loginpage" className="dropdown-item">Login</NavLink>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
