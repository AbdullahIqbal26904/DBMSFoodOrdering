import React from 'react'
import Profilecomp from '../components/Profilecomp'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function Profile() {
  return (
    <div>
        <section>
            <Navbar/>
        </section>
        <section className='my-14'>
            <Profilecomp/>
        </section>
        <section>
            <Footer/>
        </section>
    </div>
  )
}

export default Profile