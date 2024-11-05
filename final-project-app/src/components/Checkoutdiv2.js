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
  const createOrder = async () => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0];
    console.log(currentDate, currentTime);
    console.log(cartTotal);
    console.log(orderDetails);
    const Order = {
      date: currentDate,
      time: currentTime,
      total: totalAfterDiscount,
      status: 'Ordered',
      id: userDetails.userid
    }

    try {
      const response = await axios.put('http://localhost:3002/createOrder', Order);
      toast.success('Order Placed.', { position: 'top-right',autoClose: 500 });
      // console.log(response.data);
      setorder_id(response.data.orderId);
      let deliveryid;
      let orderid = response.data.orderId;
      //nested api
      try {
        const delivery = {
          email: orderDetails.email,
          address: orderDetails.address,
          city: orderDetails.city,
          paymentmethod: orderDetails.paymentMethod,
          postalcode: orderDetails.postalCode,
          phoneno: orderDetails.phone,
          userid: userDetails.userid
        }
        console.log('delvery', delivery);
        const insertinDeliveryTable = await axios.put('http://localhost:3002/deliveryinfo', delivery);

        toast.success('userdetails added to delivery table..', { position: 'top-right',autoClose: 500 });
        setdelivery_id(insertinDeliveryTable.data.id);
        deliveryid = insertinDeliveryTable.data.id;
        // console.log(insertinDeliveryTable.data);
      } catch (err) {
        console.log('error adding to delivery table.', err);
      }

      try {
        const insertindeliveryorder = {
          deliver_yid: deliveryid,
          ordera_id: orderid
        }
        const insertindeliveryordertable = await axios.put('http://localhost:3002/deliveryOrder', insertindeliveryorder);
        toast.success('added in deliveryorder table.', { position: 'top-right',autoClose: 500 });
        // console.log(insertindeliveryordertable.data);
      } catch (err) {
        toast.error('error inserting in delivery order table.');
      }
      try {
        console.log(carts);
        for (let i = 0; i < carts.length; i++) {
          console.log(carts[i].id);
          const orderproducts = {
            prod_id: carts[i].id,
            orderrrid: orderid,
            quantity: carts[i].quantity
          }
          const updateStock = {
            productid: carts[i].id,
            productquantity: carts[i].quantity
          }
          console.log(orderproducts);
          const orderproductstable = await axios.put('http://localhost:3002/orderproductstable', orderproducts);
          const updatestockinproductstable = await axios.put('http://localhost:3002/updatestock', updateStock);
        }
        toast.success('Stock updated');
        toast.success('checked out');
      } catch (err) {
        console.log(err);
        toast.error('Error occured',{ position: 'top-right',autoClose: 500 });
      }
      try {
        const emptycart = {
          useraid: userDetails.userid // Ensure this matches the server's expected variable name
        };
        console.log('User ID:', userDetails.userid);

        // Send the DELETE request with the `data` payload
        const emptycartitemstable = await axios.delete('http://localhost:3002/emptycart', {
          data: emptycart
        });
        toast.success(`Cart emptied. ${emptycartitemstable.data.message}`, { position: 'top-right' });
        console.log('Cart emptied successfully');
      } catch (err) {
        console.error('Error occurred:', err);
        toast.error(`Error occurred: ${err.message}`, { position: 'top-right',autoClose: 500 });
      }

      navigate('/OrderDetails7');
    } catch (err) {
      toast.error('Server Error Occured.', { position: 'top-right',autoClose: 500 });
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
    console.log(totalAfterDiscount);
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
