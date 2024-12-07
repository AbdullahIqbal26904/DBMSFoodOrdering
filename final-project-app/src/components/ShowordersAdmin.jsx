import React, { useEffect, useState } from 'react';
import axios from 'axios';
function ShowordersAdmin() {
    const [orders, setOrders] = useState([]);
    const [orderProducts, setorderProducts] = useState([]);
    const [Product, setProduct] = useState();
    useEffect(() => {
        // Fetch orders only once when the component mounts
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3002/admin/orders');
                setOrders(response.data);
                console.log('Orders fetched', response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        // console.log('batao bhai ab')
        fetchOrders();
    }, [Product]); // Only dependent on Product
    const getProductsOfOrder = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:3002/orders/product?orderId=${orderId}`);
            // Store the fetched products in the `orderProducts` state using the `orderId` as the key
            setorderProducts((prevProducts) => ({
                ...prevProducts,
                [orderId]: response.data,
            }));
            console.log('products of order: ', response.data);
            console.log(orderProducts);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };
    const [orderStatus, setOrderStatus] = useState({});

    // Function to handle status update API call
    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:3002/updateOrderStatus`, {
                order_id: orderId,
                order_status: newStatus,
            });
            // Update local state after successful update
            setOrderStatus((prevState) => ({
                ...prevState,
                [orderId]: newStatus,
            }));
            alert(`Order #${orderId} status updated to ${newStatus}`);
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("Failed to update order status.");
        }
    };
    // Fetch products when the `orders` array updates (after fetching orders)
    useEffect(() => {
        const fetchProductsForOrders = async () => {
            // Check if there are orders before fetching products
            if (orders.length > 0) {
                try {
                    for (const order of orders) {
                        await getProductsOfOrder(order.order_id);
                        // console.log(`Fetched products for order ${order.order_id}`);
                    }
                } catch (error) {
                    console.error('Error fetching products for orders:', error);
                }
            }
        };
        // console.log(status);
        // console.log('firstabsahihai')
        fetchProductsForOrders();
    }, [orders]); // Only dependent on orders
    return (
        <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-6">All Orders</h2>


            <div className="">
                {orders.map((order) => (
                    <div key={order.order_id} className="order-card">
                        <h3>Order #{order.order_id}</h3>
                        <div className="order-header">

                            <p><strong>User:</strong> {order.name}</p>
                            <p><strong>Email:</strong> {order.email}</p>
                            <p><strong>Order Date:</strong> {order.order_Date}</p>
                            <p><strong>Order Time:</strong> {order.order_Time}</p>
                        </div>
                        <p className={`status `}>
                            Status: {orderStatus[order.order_id] || order.order_status}
                        </p>
                        <select
                            value={orderStatus[order.order_id] || order.order_status}
                            onChange={(e) =>
                                handleUpdateStatus(order.order_id, e.target.value)
                            }
                        >
                            <option value="Ordered" disabled>
                                Ordered
                            </option>
                            <option value="Prepared">Prepared</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                        </select>
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
            </div></div>
    )
}

export default ShowordersAdmin