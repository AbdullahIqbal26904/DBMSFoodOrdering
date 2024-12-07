import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
function Editprodadmin() {
    const [initialvalue, setinitialvalue] = useState();
    const [showeditform, setshoweditform] = useState(false);
    const [table, showtable] = useState(false);
    const [searchbyname, setsearchbyname] = useState(false);
    const [searchbycategory, setsearchbycategory] = useState(false);
    const [Product, setProduct] = useState();
    const [formData1, setFormData1] = useState({ getname: '' });
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
    const handleEditChange = (e) => {
        e.preventDefault();
        setinitialvalue({ ...initialvalue, [e.target.name]: e.target.value });
        console.log(initialvalue);
    }
    function searchName() {
        setsearchbyname(true);
        setsearchbycategory(false);
    }
    function searchCategory() {
        setsearchbycategory(true);
        setsearchbyname(false);
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
    return (
        <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-6">Edit Product</h2>
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
    )
}

export default Editprodadmin