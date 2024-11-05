import React from 'react'
import './Checkoutheader.css'
import { FaCartPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Checkoutheader() {


  return (
    <div className='div'>
      <h3>Carrera.pk</h3>
      <Link to={'/'}> <FaCartPlus className='icon' /></Link>
    </div>
  )
}

export default Checkoutheader