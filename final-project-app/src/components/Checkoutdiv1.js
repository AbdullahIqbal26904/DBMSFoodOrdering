import React, { useState } from 'react';
import './Checkoutdiv1.css';
import {useDispatch} from 'react-redux';
import { updateOrderDetails } from '../redux/features/cartSlice';
import { useEffect } from 'react';
function Checkoutdiv1() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const geo = navigator.geolocation.getCurrentPosition((position) => {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;
    setLatitude(userLatitude);
    setLongitude(userLongitude);
  });

  const getUserLocation = async () => {
    try {
      let url = `https://api.opencagedata.com/geocode/v1/json?key=b834cc60e8ee4ce98d82daf8a7fbc06f&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;
      const loc = await fetch(url);
      const data = await loc.json();

      if (data.results && data.results.length > 0) {
        setAddress(data.results[0].formatted);
        setCity(data.results[0].components.city);
        setPostalCode(data.results[0].components.postcode);
      } else {
        alert('Location Access needed');
        console.log('No results found');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
      alert('Server error');
    }
  };

  async function displayLocation() {
    await getUserLocation();
  }
  
  useEffect(() => {
    // Check if all required fields are filled and valid
    if (isFormValid()) {
      const data = {
        addr: address,
        city_for_redux: city,
        postalCode_for_redux: postalCode,
        firstName_for_redux: firstName,
        lastname_for_redux: lastName,
        email_for_redux: email,
        phoneno_for_redux: phone,
        billing_addr_for_redux: billingAddress,
        billing_city_for_redux: billingCity,
        billingPostalCode_for_redux: billingPostalCode,
      };
      dispatch(updateOrderDetails(data));
    }
  }, [
    address, city, postalCode, firstName, lastName, email,
    phone, billingAddress, billingCity, billingPostalCode,
    showBillingForm,
  ]);

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      address.trim() &&
      city.trim() &&
      postalCode.trim() &&
      phone.trim() &&
      (!showBillingForm || (billingAddress.trim() && billingCity.trim() && billingPostalCode.trim()))
    );
  };

  return (
    <div className='container'>
      <div className='section email-info'>
        <h3>Contact Information</h3>
        <div className='form-floating mb-3'>
          <input
           type="email" className="form-control" id="contactEmail" placeholder="name@example.com" required
           value={email}
           onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="contactEmail">Email address</label>
        </div>
        <div className='checkbox-group'>
          <input type='checkbox' id='newsOffers' />
          <label htmlFor='newsOffers'>Email me with news and offers</label>
        </div>
      </div>

      <div className='section delivery-info'>
        <h3>Delivery Information</h3>
        <div className='f-lcont'>
          <div className='form-floating mb-3'>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
        </div>
        <div className='form-floating mb-3'>
          <input
            value={address}
            type="text"
            className="form-control"
            id="address"
            placeholder="Address"
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="address">Address</label>
        </div>
        <div className='f-lcont'>
          <div className='form-floating mb-3'>
            <input
              value={city}
              type="text"
              className="form-control"
              id="city"
              placeholder="City"
              required
              onChange={(e) => setCity(e.target.value)}
            />
            <label htmlFor="city">City</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              value={postalCode}
              type="text"
              className="form-control"
              id="postalCode"
              placeholder="Postal Code"
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <label htmlFor="postalCode">Postal Code</label>
          </div>
        </div>
        <div className='form-floating mb-3'>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="Phone Number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="phone">Phone</label>
        </div>

        <div className='checkbox-group'>
          <input type='checkbox' id='saveInfo' />
          <label htmlFor='saveInfo'>Save this information for next time</label>
        </div>
      </div>
      <button style={{ marginBottom: '20px' }} className='btn btn-complete bg-danger' onClick={displayLocation}>Get current location</button>

      <div className='section shipping-method'>
        <h3>Shipping Method</h3>
        <select className="form-select mb-3">
          <option value="standard">Standard (Cash)</option>
        </select>
      </div>

      <div className='section payment-method'>
        <h3>Payment Method</h3>
        <div className='form-check'>
          <input className="form-check-input" type="radio" name="paymentMethod" id="cod" value="cod" checked />
          <label className="form-check-label" htmlFor="cod">
            COD - Cash on Delivery
          </label>
        </div>
      </div>
    </div>
  );
}

export default Checkoutdiv1;
