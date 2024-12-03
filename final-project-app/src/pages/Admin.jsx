import React, { useEffect, useState } from 'react';
import './Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
const Admin = () => {
    const [productdetails, setproductdetails] = useState({ name: '', description: '', category: '', price: '', ratings: '', qnty: '', imageUrl: '' });
    const [imgdata, setImgdata] = useState(null); // Separate state for file
    const [showadd, setshowadd] = useState(false);
    const [showedit, setshowedit] = useState(false);
    const [showallorders, setshowallorders] = useState(true);
    const [searchbyname, setsearchbyname] = useState(false);
    const [searchbycategory, setsearchbycategory] = useState(false);
    const [formData1, setFormData1] = useState({ getname: '' });
    const [Product, setProduct] = useState();
    const [table, showtable] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderProducts, setorderProducts] = useState([]);
    const status = ['Prepared', 'dispatched', 'delivered'];
    const [isOpen, setisOpen] = useState(false);
    //for product updation
    const [showeditform, setshoweditform] = useState(false);
    const [initialvalue, setinitialvalue] = useState();

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData1({ ...formData1, [name]: value });
        // console.log(formData1);
    };
    const [formData2, setFormData2] = useState({ getcategory: '' });
    const handleInputChange2 = (e) => {
        const { name, value } = e.target;
        setFormData2({ ...formData2, [name]: value });
        // console.log(formData2);
    };
    const setData = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setproductdetails({
            ...productdetails,
            [name]: value,
        });
    }

    const handleFileChange = (e) => {

        setImgdata(e.target.files[0]); // Store the file
    }
    const handleSubmit = (e) => {
        // console.log(imgdata);
        // console.log(productdetails.name);
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', productdetails.name);
        formData.append('description', productdetails.description);
        formData.append('category', productdetails.category);
        formData.append('price', productdetails.price);
        formData.append('ratings', productdetails.ratings);
        formData.append('qnty', productdetails.qnty);
        formData.append('imgdata', imgdata); // Append file
        formData.append('imageUrl', productdetails.imageUrl);
        axios.post('http://localhost:3002/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                // console.log(response.data);
                toast.success("Product Successfuly Added.", { position: 'top-right' });
            })
            .catch(error => {
                console.error('There was an error adding the product!', error);
            });
    }
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        // setshoweditform(true);
        // console.log("hello", formData1.getname);
        try {
            const response = await axios.get('http://localhost:3002/getproductsforeditordelete', {
                params: { name: formData1.getname },

            });
            // console.log(response.data)
            setProduct(response.data);
            showtable(true);
            // console.log(Product)
        } catch (err) {
            console.log(err)
        }
    }
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

    function default_show() {
        setshowadd(false);
        setshowedit(false);
        setshowallorders(true);
    }
    function add() {
        setshowadd(true);
        setshowedit(false);
        setshowallorders(false);
    }
    function edit() {
        setshowedit(true);
        setshowadd(false);
        setshowallorders(false);
    }
    function searchName() {
        setsearchbyname(true);
        setsearchbycategory(false);
    }
    function searchCategory() {
        setsearchbycategory(true);
        setsearchbyname(false);
    }
    const handleEdit = (item) => {
        console.log('Edit Item:', item);
        setinitialvalue(item);
        setshoweditform(true);
        showtable(false);
    };
    const handleDelete = (item) => {
        console.log('Delete Item:', item);
        setshoweditform(true);
        axios.delete(`http://localhost:3002/delete-product/${item.id}`).then((response) => { alert(response.data); setProduct(Product.filter((product) => product.id !== item.id)) }).catch((error) => {
            console.log('error deleting product: ', error);
        })
    };
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
    const handleEditChange = (e) => {
        e.preventDefault();
        setinitialvalue({ ...initialvalue, [e.target.name]: e.target.value });
        console.log(initialvalue);
    }
    const handleEditSubmit = (e) => {
        e.preventDefault();
        try {
            const response = axios.put('http://localhost:3002/updateProduct', initialvalue)
            console.log(response.data);
            console.log(initialvalue);
            toast.success('Product Updated', { position: 'top-right' });
            setshoweditform(false);
        } catch (err) {
            console.log(err);
        }
        showtable(true);
    }
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
    return (
        <div className='mainyehai'>
            <div className='admin_header'>
                <h1 className='text-center mt-2'>Admin Page</h1>
                <Link to={'/'}> <FaCartPlus className='icon' /></Link>
                <DropdownButton className='dropdown' id="dropdown-basic-button" title="Action">
                    <Dropdown.Item onClick={add}>Add Product</Dropdown.Item>
                    <Dropdown.Item onClick={edit}>Edit Product</Dropdown.Item>
                    <Dropdown.Item onClick={default_show} href="">All Orders</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className='main111'>
                <span className='div111'></span>
                <span className='div222'></span>
                <div className={showallorders ? 'abc table-container mt-2' : 'visible'}>
                    <h2>All Orders</h2>
                    <div className="order-list">
                        {orders.map((order) => (
                            <div key={order.order_id} className="order-card">
                                <h3>Order #{order.order_id}</h3>
                                <div className="order-header">

                                    <p><strong>User:</strong> {order.name}</p>
                                    <p><strong>Email:</strong> {order.email}</p>
                                    <p><strong>Order Date:</strong> {order.order_Date}</p>
                                    <p><strong>Order Time:</strong> {order.order_Time}</p>
                                    <p className={`status ${order.status}`}>Status: {order.order_status}</p>
                                </div>
                                <p className={`status ${order.order_status}`}>
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
                    </div>
                </div>
                <div className={showadd ? 'abc container mt-2' : 'visible'}>
                    <h1>Add Product</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product Name: " name='name' onChange={setData} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product Description: " name='description' onChange={setData} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Product Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product Category: " name='category' onChange={setData} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type="float" placeholder="price" name='price' onChange={setData} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Product Rating</Form.Label>
                            <Form.Control type="float" placeholder="Rating" name='ratings' onChange={setData} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" placeholder="quantity" name='qnty' onChange={setData} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control type="file" name='imgdata' onChange={handleFileChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Product Image Url</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product Image url: " name='imageUrl' onChange={setData} />
                        </Form.Group>
                        <Button className='button' variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div className={showedit ? 'abc container mt-2' : 'visible'}>
                    <h1>Edit Product</h1>
                    <DropdownButton className='dropdown' id="dropdown-basic-button" title="Select Product by:">
                        <Dropdown.Item onClick={searchName}>Name</Dropdown.Item>
                        <Dropdown.Item onClick={searchCategory}>category</Dropdown.Item>
                    </DropdownButton>
                    <Form onSubmit={handleSubmit2}>
                        <Form.Group className={searchbyname ? "mb-3" : 'visible'} controlId="formBasicEmail">
                            <Form.Label>Search By Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product Name: " name='getname' onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className={searchbycategory ? "mb-3" : 'visible'} controlId="formBasicEmail">
                            <Form.Label>Product Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product Category: " name='getcategory' onChange={handleInputChange2} required />
                        </Form.Group>
                        <Button className='button' onClick={handleSubmit2} variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                    <div className={showeditform ? '' : 'visible'}>
                        <h2>Edit Product</h2>

                        <Form onSubmit={handleEditSubmit} >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={initialvalue ? initialvalue.name : ''}
                                    name="name"
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={initialvalue ? initialvalue.description : ''}
                                    name="description"
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Product Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={initialvalue ? initialvalue.category : ''}
                                    name="category"
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Product Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder={initialvalue ? initialvalue.price : ''}
                                    name="price"
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Product Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder={initialvalue ? initialvalue.qnty : ''}
                                    name="qnty"
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Product Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={initialvalue ? initialvalue.imgurl : ''}
                                    name="imgurl"
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">Update Product</Button>
                        </Form>
                    </div>
                    <div className={table ? "table-container" : "visible"}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Image</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>total sold</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Product && Product.map(item => <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td><img src={item.imgdata ? `http://localhost:3002/uploads/${item.imgdata}` : item.imgurl} alt="Product 1" /></td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.category}</td>
                                        <td>{item.price}</td>
                                        <td>{item.qnty}</td>
                                        <td>{item.prod_sold}</td>
                                        <td className='butun'>
                                            <button className='button' onClick={() => handleEdit(item)} >Edit</button>
                                            <button className='button' onClick={() => handleDelete(item)} >Delete</button>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;

