import React from 'react';
import bg from '../pics/contact_bg.jpg'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../constants.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const Contact = () => {

  const [isSubmitted, setisSubmitted] = useState(false);

  const [data , setData] =useState({
    name:"" ,
    email:"" ,
    phone :"" ,
    message:"" ,
  });

  const {name , email , phone , message}=data;

  const handleChange=(e)=>{
    setData({...data , [e.target.name] : e.target.value});
  }


  const handleSubmit=  async (e) =>{

    console.log("submit");
    e.preventDefault();

    //  // Validation for name
     if (!name.trim()) {
      toast.error('Please enter your name');
      
    }
  
    // Validation for email
    if (!email.trim()) {
      toast.error('Please enter your email');
      
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address');
      
    }
  
    // Validation for phone
    if (!phone.trim()) {
      toast.error('Please enter your phone number');
      
    } else if (!/^\d{10}$/.test(phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      
    }
  
    // Validation for message
    if (!message.trim()) {
      toast.error('Please enter your message');
      
    }

    try{

      const response =await fetch(API_URL ,{
        method :'POST' ,
        headers :{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify([
          [name , email , phone,message , new Date().toLocaleString()]
        ])

        
      }
      );

      console.log("");

      await response.json();
      setData({...data , name:"" , email:"" , phone:"" , message:""});
      setisSubmitted(true);
      setTimeout(() => setisSubmitted(false), 3000);
      toast.success('Form submitted successfully!');
      console.log(response);
       
    } catch(err){
      console.log(err);
    }

  }
  return (

    <div >

    <div>
      <Navbar/>
    </div>
      <div className=' flex mt-7'>
        <img src={bg} alt={bg} width="500px" height="450px" className='absolute  hidden  sm:mt-[100px] sm:block  sm:ml-[150px] '/>

      </div>
      <div className=' text-3xl p-10 ml-9 mt-[20px] flex jusify-center sm:mt-4 sm:text-4xl text-[#2a68ff] sm:ml-[830px]'>
        <strong>Contact</strong> <span className='lack font-bold ml-2'> Form</span>
      </div>
      
      {/* Form div */}
      <div className=' w-[80%] p-5 ml-9 border-4 sm:p-10  sm:w-[30%] h-[40%] sm:m-auto sm:mr-[300px] border-x-4 border-black-400 rounded-sm '>

        <form className='  flex-col justify-between space-y-5 ' onSubmit={handleSubmit}>
          <div className="pt-0 mb-3">
            <input
              type="text"
              placeholder="Your name"
              name="name"
              value={name}
              onChange={handleChange}
              className="  focus:outline-none focus:ring w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
              required
            />
          </div>
          <div className="pt-0 mb-3">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
              className="focus:outline-none focus:ring w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
              required
            />
          </div>

          <div className="pt-0 mb-3">
            <input
              type="tel" 
              placeholder="Phone Number"
              name="phone"
              value={phone}
              onChange={handleChange}
              className="focus:outline-none focus:ring w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
              required
            />
          </div>
          <div className="pt-0 mb-3">
            <textarea
              placeholder="Your message"
              name="message"
              value={message}
              onChange={handleChange}
              className="focus:outline-none focus:ring w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
            Submit
          </button>
          {isSubmitted && (
            <div className='absolute right-5 bg-green-500 top-4 text-white p-3 rounded'>
              Form submitted successfully!
            </div>
          )}
        </form>
        

      </div>
      <div>
        <Footer/>
      </div>
    </div>
    


  );
};

export default Contact;