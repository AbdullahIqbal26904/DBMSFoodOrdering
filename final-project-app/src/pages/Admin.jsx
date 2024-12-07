import React, { useEffect, useState } from 'react';
import './Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import Addprodadmin from '../components/Addprodadmin';
import Editprodadmin from '../components/Editprodadmin';
import ShowordersAdmin from '../components/ShowordersAdmin';
const Admin = () => {
    const [showadd, setshowadd] = useState(false);
    const [showedit, setshowedit] = useState(false);
    const [showallorders, setshowallorders] = useState(true);

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
                    <ShowordersAdmin />
                </div>
                <div className={showadd ? 'abc container mt-2' : 'visible'}>
                    <Addprodadmin />
                </div>
                <div className={showedit ? 'abc container mt-2' : 'visible'}>
                    <Editprodadmin />
                </div>
            </div>
        </div>
    )
}

export default Admin;

