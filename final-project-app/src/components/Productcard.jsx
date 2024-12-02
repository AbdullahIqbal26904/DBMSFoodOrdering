import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import './Productcard.css';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addtocart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import { FaEye } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

function Productcard(props) {
  const dispatch = useDispatch();
  const [element, setelement] = useState(props.data);
  const [showModal, setShowModal] = useState(false);
  const [showdiscounttag, setshowdiscounttag] = useState(false);
  const [delimg, setdelimg] = useState("https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp");
  const [arrimg, setarrimg] = useState("https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp");
  const { userDetails, cart } = useSelector((state) => state.allCart);
  const navigate = useNavigate();

  const send = async (product) => {
    // console.log(cart);
    // console.log(props.data.id)
    const data = {
      cart_id: cart.cartid,
      product_id: props.data.id,
      quantity: 1,
      price: props.data.price
    }
    if (userDetails.username === '') {
      toast.info("Login to add products.", { position: 'top-right', autoClose: 500 });
      navigate('/Loginpage');
      return;
    }
    const productToCart = { ...product, qnty: 1 }; // Set quantity to 1
    const updatedProduct = { ...product, quantity: 1 };

    try {
      const response = await axios.post("http://localhost:3002/addtocart", data)
      toast.success("Item successfuly added.", { position: 'top-right', autoClose: 500 });
      dispatch(addtocart(updatedProduct));

      console.log(response.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        toast.error(`${err.response.data.message}`, { position: 'top-right', autoClose: 500 });
      } else {
        alert('Error Adding to cart.');
      }
    }
  }
  function showdiscount() {
    if (element.discount === 0) {
      setshowdiscounttag(false)
    } else {
      setshowdiscounttag(true)
    }
  }
  function toggleModal() {
    setShowModal(!showModal);
  }
  function show() {
    // console.log(element.imgdata)
  }
  return (
    <>
      <section className='item_section mt-4 container '>
        <div className='row mt-2 d-flex justify-content-around align-items-center'>
          <Card style={{ width: "20rem", border: "none" }} className='hove mb-4'>
            <Card.Img variant='top' className='cd' onMouseEnter={show}
              src={element.imgdata ? `http://localhost:3002/uploads/${element.imgdata}` : element.imgurl}

            />
            <button className="circle_button" onClick={toggleModal}><FaEye className='eye' /></button>

            <div className="card_body">
              <div className="upper_data d-flex justify-content-between align-items-center">
                <h4 className='mt-2'>{element.name}</h4>
                <span>{element.ratings}&nbsp;★</span>
              </div>

              <div className="lower_data d-flex justify-content-between ">
                <h5>{element.category}</h5>
                <span>RS. {element.price}</span>
              </div>

              <div className="last_data d-flex justify-content-between align-items-center">
                <img src={arrimg} className='limg' alt="" />
                <Button style={{ width: "150px", background: "#088178", border: "none" }} variant='outline-light'
                  className='mt-2 mb-2'
                  onClick={() => send(element)}
                >Add TO Cart</Button>
                <img src={delimg} className='laimg' alt="" />

              </div>
            </div>
          </Card>
          <Modal show={showModal} onClose={toggleModal} data={element} />


        </div>
      </section>
    </>
  );
}

export default Productcard;
