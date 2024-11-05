import React from 'react';
import './About.css';
import AboutChef1 from '../pics/about-chef1.jpg';
import AboutChef2 from '../pics/about-chef2.jpg';
import { ImageGallery } from '../components/ImageGallery';
import { Reviews } from '../components/Reviews';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
function AboutUs() {
    return (
        <div className='about-page'>
          <Navbar/>
            <header className='mt-5'>
                <div className='container h-100 d-flex align-items-center justify-content-center'>
                    <h1 className='text-light'>About</h1>
                </div>
            </header>

            <div className='container my-5'>
                <h2>Welcome to TasteBuds Cafe!</h2>
                <p>At TasteBuds Cafe, we believe that every meal should be a delightful journey for your taste buds. Nestled in the heart of the city, our cozy cafe is more than just a place to eat—it's a space where food, comfort, and community come together. From the moment you step through our doors, you'll be greeted by the comforting aroma of freshly brewed coffee, the warmth of our friendly staff, and a menu crafted to satisfy every craving.</p>
                <h3>Our Story</h3>
                <p>TasteBuds Cafe was born out of a passion for good food and even better company. What started as a small idea between friends quickly blossomed into a gathering spot for food lovers near and far. We wanted to create a place where people could escape the hustle and bustle of daily life, share a meal with loved ones, and create memories that linger long after the last bite. Every dish we serve is made with the freshest ingredients, a dash of creativity, and a whole lot of love.</p>
                <h3>What we Offer</h3>
                <p>Our menu is a celebration of flavors, offering everything from hearty breakfasts to satisfying lunches and indulgent dinners. Whether you're in the mood for a classic cappuccino, a vibrant salad, or a comforting bowl of pasta, we've got something to satisfy your cravings. Our talented chefs take pride in creating dishes that are as visually appealing as they are delicious, ensuring that every meal is a feast for both the eyes and the palate.</p>
                <h3>A Place for Everyone</h3>
                <p>At TasteBuds Cafe, we believe that good food is best enjoyed in good company. That's why we've designed our space to be welcoming to all—whether you're a solo coffee lover looking for a quiet nook, a family enjoying a weekend brunch, or a group of friends catching up over dinner. Our cafe is more than just a place to dine; it's a community hub where people come together to share stories, celebrate special moments, and find comfort in the little things.</p>
                <h3>Our Commitment</h3> 
                <p>We are committed to providing an exceptional dining experience, and we believe that starts with using the best ingredients and providing top-notch service. We work closely with local suppliers to ensure that our dishes are made with the freshest produce, and we pride ourselves on supporting sustainable practices. At TasteBuds Cafe, we aim to not only serve delicious food but also to make a positive impact on our community and the environment.</p>
                <div className='row'>
                    <div className='col-lg-6'>
                        <img src={AboutChef1} className='img-fluid my-4' alt="" />
                    </div>
                    <div className='col-lg-6'>
                        <img src={AboutChef2} className='img-fluid my-4' alt="" />
                    </div>
                </div>

                <h2>Come Visit Us!</h2>

                <p>Whether you're stopping by for your morning coffee, a leisurely lunch, or an evening treat, we promise that every visit to TasteBuds Cafe will leave you with a smile. We invite you to come and experience the warmth and charm of our little corner of the world—where every bite is a new adventure, and every visit feels like coming home.</p>
            </div>

            <div className='bg-dark text-light'>
                <ImageGallery />
            </div>

            <div className='my-5'>
                <Reviews />
                <Footer/>
            </div>
        </div>
    )
}

export default AboutUs;