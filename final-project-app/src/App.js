import Checkout from './pages/Checkout'
import React,{useState} from 'react'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import AboutUs from './pages/AboutUs'
import { Routes, Route } from 'react-router-dom'
// import Cart_comp from './components/Cart_comp'
import Loginpage from './pages/Loginpage'
import Admin from './pages/Admin'
import OrderPage from './pages/OrderPage'
import PrivateRoute from './components/PrivateRoute'
import OrderDetails7 from './components/OrderDetails7'
import FoodCard from './components/FoodCard'
const App = () => {
    
    return (
        <div className={'main'}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/Aboutus' element={<AboutUs />} />
                <Route path='/Checkout' element={<Checkout />} />
                <Route path='/Loginpage' element={<Loginpage />} />
                <Route
                    path='/Admin'
                    element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                    }
                />
                <Route path='/OrderPage' element={<OrderPage />} />
                <Route path='/OrderDetails7' element={<OrderDetails7 />} />
            </Routes>
            {/* <HomeReviews/> */}
             {/* <button onClick={() => setIsCartOpen(true)}>Open Cart</button>
            <ShoppingCartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> */}
                {/* <Route path='/FoodCard' element={<FoodCard />} /> */}

        </div>
    )
}

export default App
