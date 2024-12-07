import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';

function Addcategoryadmin() {
    const [categorydetails, setcategorydetails] = useState({ name: '', imageurl: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categorydetails.name || !categorydetails.imageurl) {
            toast.error("Both Category Name and Image URL are required.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3002/addcategory',
                {
                    name: categorydetails.name,
                    imgurl: categorydetails.imageurl,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success("Category Successfully Added.", { position: 'top-right' });
        } catch (error) {
            toast.error(`Error adding Category: ${error.response ? error.response.data : error.message}`, { position: 'top-right' });
            console.error('There was an error adding the category!', error);
        }
    };

    const setData = (e) => {
        const { name, value } = e.target;
        setcategorydetails({
            ...categorydetails,
            [name]: value,
        });
    };

    return (
        <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-6">Add Category</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-8" controlId="formBasicName">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Category Name: "
                        name="name"
                        value={categorydetails.name}
                        onChange={setData}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Image URL: "
                        name="imageurl"
                        value={categorydetails.imageurl}
                        onChange={setData}
                        required
                    />
                </Form.Group>
                <Button className="button" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Addcategoryadmin;