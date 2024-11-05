import React, { useState } from 'react';
import Checkoutheader from '../components/Checkoutheader';
import Checkoutdiv2 from '../components/Checkoutdiv2';
import Checkoutdiv1 from '../components/Checkoutdiv1';
import './checkout.css';
function Checkout() {
  return (
    <div style={{ "backgroundColor": '#eee', 'minHeight': '100%', 'margin': '0', 'padding': '0', 'overflowX': 'hidden' }}>
      <Checkoutheader />
      <div className='row'>
        <div className='item1 col-md-5'>
          <Checkoutdiv1 />
        </div>
        <div className='item2 col-md-5'>
          <Checkoutdiv2 />
        </div>
      </div>
      {/* <button onClick={printdata}>click me</button> */}
    </div>
  );
}

export default Checkout;
