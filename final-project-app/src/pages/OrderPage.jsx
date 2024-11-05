// OrderPage.js
import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import './OrderPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
const OrderPage = () => {
    const { userDetails } = useSelector((state) => state.allCart);
    const [order, setOrder] = useState(null); // Initialize with null or an empty array if needed
    async function getorderss() {
        const data = {
            userrid: userDetails.userid
        }
        console.log(data);
        try{
            const getallorders = await axios.get(`http://localhost:3002/getorders?userrid=${userDetails.userid}`);
            console.log(getallorders.data);
            setOrder(getallorders.data);
        }catch(err){
            console.log('error occuring, ',err);
        }
        
    }
    useEffect(() => {
        // Check if userDetails is not undefined or null
        // if (userDetails && userDetails.userid !== 0) {
            const data = {
                userrid: userDetails.userid
            }
        //     console.log(data);
        //     try {
        //         // setOrder(getallorders.data);
        //     }
        //     catch(err){
        //         console.log(err);
        //     }
        //     // setOrder(userDetails);
        //     // console.log(userDetails);
        // }
    }, [userDetails]); // Dependency array to re-run effect when userDetails changes

    return (
        <div className="order-page">
            <h1 className="order-title">Order Details</h1>
            <div className="order-summary">
            <button onClick={getorderss}>Click mee</button>
                {/* <h2>Order ID: {order.id}</h2>
                <p>Date: {order.date}</p>
                <p>Time: {order.time}</p>
                <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                <p>Status: {order.status}</p>
                <h3>User Information</h3>
                <p>Name: {order.user.name}</p>
                <p>Email: {order.user.email}</p> */}
            </div>
            <h2>Ordered Products</h2>
            <div className="products-list">
                {order && order.map((product, index) => (
                    <OrderCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default OrderPage;
