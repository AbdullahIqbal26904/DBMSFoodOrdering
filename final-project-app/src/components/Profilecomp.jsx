import React, { useEffect, useState } from "react";
import axios from "axios";
import './Profilecomp.css';
import { useSelector } from 'react-redux';

const Profilecomp = () => {
    const [orders, setOrders] = useState([]);
    const { userDetails } = useSelector((state) => state.allCart);
    const [orderProducts, setorderProducts] = useState([]);
    const [Product, setProduct] = useState();

    useEffect(() => {
        const fetchProductsForOrders = async () => {
            if (orders.length > 0) {
                try {
                    for (const order of orders) {
                        await getProductsOfOrder(order.order_id);
                    }
                } catch (error) {
                    console.error('Error fetching products for orders:', error);
                }
            }
        };
        fetchProductsForOrders();
    }, [orders]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3002/userprevorders', {
                    params: { user_id: userDetails.userid }
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [Product]);

    const getProductsOfOrder = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:3002/orders/product?orderId=${orderId}`);
            setorderProducts((prevProducts) => ({
                ...prevProducts,
                [orderId]: response.data,
            }));
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    const handleReplaceOrder = async (orderId) => {
        try {
            const response = await axios.post("http://localhost:3002/replaceOrder", {
                old_order_id: orderId,
                user_id: userDetails.userid,
            });
            alert(`Order replaced successfully! New Order ID: ${response.data.order_id}`);
        } catch (error) {
            console.error("Error replacing order:", error);
            alert("Failed to replace order.");
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-content">
                {orders.length > 0 ? (
                    <div className="order-list">
                        
                        {orders.map((order) => (
                            <div key={order.order_id} className="order-card">
                                <h3>Order #{order.order_id}</h3>
                                <div className="order-header">
                                    <p><strong>User:</strong> {order.name}</p>
                                    <p><strong>Email:</strong> {order.email}</p>
                                    <p><strong>Order Date:</strong> {order.order_Date}</p>
                                    <p><strong>Order Time:</strong> {order.order_Time}</p>
                                    <p className={`status ${order.order_status}`}>Status: {order.order_status}</p>
                                </div>
                                <button onClick={() => handleReplaceOrder(order.order_id)}>
                                    Replace Order
                                </button>
                                <div className="delivery-info">
                                    <p><strong>Address:</strong> {order.delivery_address}</p>
                                    <p><strong>Phone:</strong> {order.phoneNo}</p>
                                    <p><strong>City:</strong> {order.delivery_city}</p>
                                    <p><strong>Payment Method:</strong> {order.payment_method}</p>
                                </div>
                                <div className="product-table">
                                    <h4>Products</h4>
                                    <div className="product-list">
                                        {(orderProducts[order.order_id] || []).map((product) => (
                                            <div key={product.id} className="product-item">
                                                <img src={product.imgdata ? `http://localhost:3002/uploads/${product.imgdata}` : product.imgurl}
                                                    alt={product.name} className="product-image" />
                                                <div className="product-details">
                                                    <p><strong>{product.name}</strong></p>
                                                    <p>Quantity: {product.quantity}</p>
                                                    <p>Price: ${product.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-orders">
                        <h2>No orders placed yet.</h2>
                        <p>Explore our products and place your first order!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profilecomp;
