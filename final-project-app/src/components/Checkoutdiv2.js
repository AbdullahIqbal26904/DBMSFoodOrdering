import React, { useState, useEffect } from 'react';
import './Checkoutdiv2.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Checkoutdiv2() {
  const [discount, setDiscount] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [inputCode, setInputCode] = useState('');
  const { cart, userDetails, carts, total, shipping_charges, discount_code, cartTotal, orderDetails } = useSelector((state) => state.allCart);
  const [disableButton, setDisableButton] = useState(true);
  const [order_id, setorder_id] = useState();
  const [delivery_id, setdelivery_id] = useState();
  const [userOrder, setuserOrder] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const productList = carts.map(item => `${item.id}:${item.quantity}`).join(',');
    // console.log(orderDetails)
  })
  const createOrder = async () => {
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0];
      const currentTime = now.toTimeString().split(' ')[0];
      // console.log(currentDate, currentTime);
      // console.log(cartTotal);
      // console.log(orderDetails);
      const Order = {
        date: `${currentDate}`,
        time: `${currentTime}`,
        total: totalAfterDiscount,
        status: 'Ordered',
        id: userDetails.userid,
        email: `${orderDetails.email}`,
        address: `${orderDetails.address}`,
        city: `${orderDetails.city}`,
        paymentmethod: `${orderDetails.paymentMethod}`,
        postalcode: orderDetails.postalCode,
        phoneno: `${orderDetails.phone}`
      }
    try {
      const createOrder = await axios.put('http://localhost:3002/placeorder', Order);
      toast.success(`Order Placed`);
      // console.log('ajeeb harkaten hain', createOrder.data)
      // let orderid = createOrder.data[0];
      // console.log('order id ye hai: ', orderid[0].order_id)
      navigate('/OrderDetails7');
    } catch (err) {
      // console.log('ab kya kru')
      toast.error('Yaha error aya hai.', { position: 'top-right', autoClose: 500 });
    }

  }
  useEffect(() => {
    calculateTotal();
  }, [carts, discount]);

  useEffect(() => {
    // console.log('Order Details Updated: ', orderDetails);
    isOrderDetailsValid(); // Call to check order details validity
  }, [orderDetails]);

  const calculateTotal = () => {
    const subtotal = cartTotal;
    setTotalAfterDiscount(subtotal + shipping_charges - discount);
    // console.log(totalAfterDiscount);
  };

  const handleApplyDiscount = () => {
    if (inputCode === discount_code) {
      setDiscount(50);
    } else {
      setDiscount(0);
    }
  };

  const isOrderDetailsValid = () => {
    // Check if any required fields are empty
    if (
      orderDetails.email === '' ||
      orderDetails.firstname === '' ||
      orderDetails.lastname === '' ||
      orderDetails.address === '' ||
      orderDetails.city === '' ||
      orderDetails.phone === ''
    ) {
      setDisableButton(true); // Disable the button if any required field is empty
    } else {
      setDisableButton(false); // Enable the button if all required fields are filled
    }
  };

  return (
    <div className='container3'>
      <h2>Product Summary</h2>
      <ul>
        {carts.map((item, index) => (
          <li key={index}>
            <div className='prod_sum container'>
              <span className='qnty'>{item.quantity}</span>
              <img src={item.imgdata ? `http://localhost:PORT/uploads/${item.imgdata}` : item.imgurl}
                alt={item.name} />
              <p className='prod_name'>{item.name}</p>
              <p className='prod_price'>Total Rs. {item.price * item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className='summary'>
        <input
          type='text'
          placeholder='Discount Code'
          className='inp'
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button onClick={handleApplyDiscount} className='btn btn-danger'>
          Apply
        </button>
        <p>Subtotal: Rs. {cartTotal}</p>
        <p>Shipping: Rs. {shipping_charges}</p>
        <p>Total: Rs. {totalAfterDiscount}</p>
        <button
          onClick={createOrder}
          className='btn btn-danger'
          disabled={disableButton} // Disable button if orderDetails are invalid
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkoutdiv2;
