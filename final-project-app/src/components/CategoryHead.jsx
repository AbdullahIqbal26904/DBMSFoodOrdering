import React, { useRef, useState } from 'react'
import pic10 from '../pics/istockphoto-836012728-612x612.jpg'
import pic11 from '../pics/istockphoto-938158500-612x612.jpg'
import pic12 from '../pics/lunch.jpeg'
import './CategoryHead.css';
import { useDispatch, useSelector } from 'react-redux';
import arrow from '../pics/arrow.png';
import Productcard from '../components/Productcard';
import axios from 'axios';
import { toast } from 'react-toastify';
function CategoryHead() {
  const { categories } = useSelector((state) => state.allCart);
  const [lunch, setlunch] = useState();
  const [showlunch, setshowlunch] = useState(false);
  const sliderRef = useRef(null);

  // Scroll Left Function
  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  // Scroll Right Function
  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };
  async function showbrakfast() {
    console.log('first')
    setshowlunch(false);
    // console.log("hello world!")
    const category = "Breakfast"; // Assuming you want to send this as a query parameter
    try {
      const response = await axios.get(`http://localhost:3002/lunch?category=${category}`);
      setlunch(response.data);
      console.log(response.data); // Log response correctly
    } catch (err) {
      // console.log(err);
      toast.error("Server Error");
    }
  }
  // useEffect(async () => {
  //   const category = "Breakfast"; // Assuming you want to send this as a query parameter
  //   try {
  //     const response = await axios.get(`http://localhost:3002/lunch?category=${category}`);
  //     setlunch(response.data);
  //     console.log(response.data); // Log response correctly
  //   } catch (err) {
  //     // console.log(err);
  //     toast.error("Server Error");
  //   }
  // })
  return (
    <div>
      <button className="slider-btn left" onClick={scrollLeft}>{"<"}</button>
      <div ref={sliderRef} onClick={showbrakfast} className="categoryhead">
        {categories &&
          categories.map((item) => {
            return (
              <div key={item.food_catid}>
                <div onClick={scrollRight} className="category1">
                  <img src={pic11} alt="" />
                </div>
                <span>{item.food_catname}</span>
              </div>
            );
          })}
      </div>
      <button className="slider-btn right" onClick={scrollRight}>{">"}</button>
      <div className={showlunch ? 'visible' : 'notvisible'}>
            <button className={'prebtn'}><img src={arrow} alt="" /></button>
            <button className={'nxtbtn'}><img src={arrow} alt="" /></button>
            <div className={'productcontainer'}>
              {lunch && lunch.map((item) => {
                return (
                  <div className={'productcard'} key={item.id}>
                    <Productcard data={item} />
                  </div>
                );
              })}
            </div>
          </div>
    </div>
  )
}

export default CategoryHead