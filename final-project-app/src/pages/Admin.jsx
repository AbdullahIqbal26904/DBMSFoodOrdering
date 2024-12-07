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
import Addcategoryadmin from '../components/Addcategoryadmin';
const Admin = () => {
    const [showadd, setshowadd] = useState(false);
    const [showedit, setshowedit] = useState(false);
    const [showallorders, setshowallorders] = useState(true);
    const [showaddcat,setshowaddcat] = useState(false);
    function default_show() {
        setshowadd(false);
        setshowedit(false);
        setshowallorders(true);
        setshowaddcat(false);
    }
    function add() {
        setshowadd(true);
        setshowedit(false);
        setshowallorders(false);
        setshowaddcat(false);
    }
    function edit() {
        setshowedit(true);
        setshowadd(false);
        setshowallorders(false);
        setshowaddcat(false);
    }
    function addcat(){
        setshowedit(false);
        setshowadd(false);
        setshowallorders(false);
        setshowaddcat(true);
    }
    return (
        <div className='mainyehai'>
            <section className='admin_header'>
                <h1 className='text-center mt-2'>Admin Page</h1>
                <Link to={'/'}> <FaCartPlus className='icon' /></Link>
                <DropdownButton className='dropdown' id="dropdown-basic-button" title="Action">
                    <Dropdown.Item onClick={add}>Add Product</Dropdown.Item>
                    <Dropdown.Item onClick={edit}>Edit Product</Dropdown.Item>
                    <Dropdown.Item onClick={default_show} href="">All Orders</Dropdown.Item>
                    <Dropdown.Item onClick={addcat}>Add Category</Dropdown.Item>
                </DropdownButton>
            </section>
            <section className='main111'>
                <div className={showallorders ? '' : 'visible'}>
                    <ShowordersAdmin />
                </div>
                <div className={showadd ? '' : 'visible'}>
                    <Addprodadmin />
                </div>
                <div className={showedit ? '' : 'visible'}>
                    <Editprodadmin />
                </div>
                <div className={showaddcat ? '' : 'visible'}>
                    <Addcategoryadmin />
                </div>
            </section>
        </div>
    )
}

export default Admin;

