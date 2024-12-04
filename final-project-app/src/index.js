import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from './redux/app/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <BrowserRouter>
        <Provider store={store}>
        <div >
        <App/>
      </div>
        <ToastContainer/>
        </Provider>
       </BrowserRouter>
    </React.StrictMode>
)