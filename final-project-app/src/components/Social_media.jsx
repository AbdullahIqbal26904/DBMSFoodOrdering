import React from 'react'
import './social_media.css'
import { FaFacebook,FaInstagram,FaTiktok,FaYoutube } from "react-icons/fa";

function Social_media() {
  return (
    <div>
        <div className='social'>
        <FaFacebook className='links'/>
        <FaInstagram className='links'/>
        <FaTiktok className='links'/>
        <FaYoutube className='links'/>
        </div>
    </div>
  )
}

export default Social_media