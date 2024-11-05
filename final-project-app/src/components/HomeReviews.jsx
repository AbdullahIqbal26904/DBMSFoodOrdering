import React, { useState, useEffect } from 'react';
import './HomeReviews.css';
import { Typewriter } from 'react-simple-typewriter';
import pic1 from '../pics/person1.jpg';
import pic2 from '../pics/person2.jpg';
import pic3 from '../pics/person3.jpg';
import pic4 from '../pics/person4.jpg';
function HomeReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of testimonials
  const testimonials = [
    {
      text: '"TasteBuds Cafe has the best coffee in town!" ☕',
      image: pic1
    },
    {
      text: '"The ambiance is so cozy and inviting." 🌿',
      image: pic2
    },
    {
      text: '"Delicious food and friendly staff." 🍽️',
      image: pic3
    },
    {
      text: '"A perfect spot for brunch with friends!" 🥂',
      image: pic4
    }
  ];

  // Update index when Typewriter changes text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); // Change every 3 seconds (or adjust the delay as needed)

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="container-fluid main-div">
      <div className="row">
        <div className="col-md-6 header-content">
          <h1>What Our Customers Say</h1>
          <h2 className="reviewerName">Customer {currentIndex + 1}</h2>
          <h2>
            <Typewriter
              words={testimonials.map((testimonial) => testimonial.text)}
              loop={Infinity}
              cursor
              cursorStyle="_"
              typeSpeed={30}
              deleteSpeed={20}
              delaySpeed={1000} // Same delay as the interval above
              wrapper="b"
            />
          </h2>
          <p>
            We value our customers' feedback and strive to make every visit a memorable one. Hear what others have to say about their experiences at TasteBuds Cafe!
          </p>
        </div>
        
        {/* Image container */}
        <div className="col-md-6 profile_img-container">
          <img
            src={testimonials[currentIndex].image}
            className="testimonial-image"
          />
        </div>
      </div>
    </div>
  );
}

export default HomeReviews;
