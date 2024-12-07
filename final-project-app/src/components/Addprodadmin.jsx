import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';
function Addprodadmin() {
    const [productdetails, setproductdetails] = useState({ name: '', description: '', category: '', price: '', ratings: '', qnty: '', imageUrl: '' });
    const [imgdata, setImgdata] = useState(null); // Separate state for file
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
        axios.post('http://localhost:3002/addproductstodb', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                // console.log(response.data);
                toast.success("Product Successfuly Added.", { position: 'top-right' });
            })
            .catch(error => {
                toast.error('Error adding Product: ', error);
                console.error('There was an error adding the product!', error);
            });
    }
    const setData = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setproductdetails({
            ...productdetails,
            [name]: value,
        });
    }
    return (
        <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4 mt-6">Add Product</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-8" controlId="formBasicEmail">
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
    )
}

export default Addprodadmin