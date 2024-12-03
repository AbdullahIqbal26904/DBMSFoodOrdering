import React from 'react'
import Profilecomp from '../components/Profilecomp'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function Profile() {
  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div>
            <Profilecomp/>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default Profile