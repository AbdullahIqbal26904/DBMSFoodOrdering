import { AiFillStar } from "react-icons/ai";
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
function FoodCard (props)  {
   const dispatch = useDispatch();
   const [element, setelement] = useState(props.data);
   const { userDetails, cart } = useSelector((state) => state.allCart);
   const navigate = useNavigate();
   const send = async (product) => {
      // console.log(userDetails)
      // console.log(cart);
      // console.log(props.data.id)
      const data = {
        cart_id: cart.cartid,
        product_id: props.data.id,
        quantity: 1,
        price: props.data.price
      }
      if (userDetails.username === '') {
        toast.info("Login to add products.",{ position: 'top-right',autoClose: 500 });
        navigate('/Loginpage');
        // console.log('helo')
        return;
      }
      const productToCart = { ...product, qnty: 1 }; // Set quantity to 1
      // console.log("Add to cart dabaya hai: ", product);
      // const product = { name: 'abc', price: 200 };
      const updatedProduct = { ...product, quantity: 1 };
  
      // console.log(updatedProduct);  // Output: { name: 'abc', price: 200, quantity: 1 }
  
      try {
        const response = await axios.post("http://localhost:3002/addtocart", data)
        // alert('Item successfully added: ',response.data.message);
        toast.success("Item successfuly added.", { position: 'top-right',autoClose: 500 });
        dispatch(addtocart(updatedProduct));
  
      //   console.log(response.data);
      } catch (err) {
        if (err.response) {
         //  console.log(err.response.data)
          toast.error(`${err.response.data.message}`,{ position: 'top-right',autoClose: 500 });
          // alert(err.response.data.message);
        } else {
  
          alert('Error Adding to cart.');
        }
        // console.log('Error', err.response ? err.response.data : err.message);
      }
    }
   return (
      <div
         className="font-bold w-[250px] bg-white p-5 flex flex-col rounded-2xl gap-2 shadow-xl
      ">
         <img
            src={element.imgdata ? `http://localhost:3002/uploads/${element.imgdata}` : element.imgurl}
            alt=""
            className="w-auto h-[130px]  hover:scale-110 cursor-grab transition-all duration-500 ease-in-out "
         />
         <div className="flex justify-between text-sm">
            <h2>{element.name}</h2>
            <span className="text-yellow ">{element.price}</span>
         </div>
         <p className="text-sm font-normal">{element.description.slice(0, 25)}...</p>
         <div className="flex justify-between ">
            <span className="flex items-center justify-center">
               <AiFillStar className="mr-1 text-yellow" /> {element.ratings}
            </span>

            {/* Add to Cart */}
            <button
               onClick={() => send(element)}
               className="p-1 text-sm text-white rounded-lg bg-yellow hover:text-black">
               Add to cart
            </button>
         </div>
      </div>
   );
};

export default FoodCard;
