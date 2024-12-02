import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login_comp1.css';
import axios from 'axios';
import { setCartDetails, setUserDetails } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


function Login_comp() {
    const [login, setLogin] = useState({ email: '', password: '' });
    const [signup, setSignup] = useState({ name: '', email: '', password: '', Customer: 'Customer' });
    const [classActive, setClassActive] = useState(false);
    const navigate = useNavigate();
    const dispathch = useDispatch();
    // const [cart, setcart] = useState({ cart_id: 0, created_date: '', created_time: '', id: 0 });
    function hover() {
        setClassActive(!classActive);
    }


    function handleChange(e) {
        const { name, value } = e.target;
        setLogin({
            ...login,
            [name]: value,
        });
        // console.log(login.email); // Updated to log email
        // console.log(login.password);
    }
    async function getCart(userid) {
        const cartFetchResponse = await axios.get(`http://localhost:3002/getCart/${userid}`);
        dispathch(setCartDetails(cartFetchResponse.data[0]));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/login', login);
            const {token,user} = response.data;
            // Login successful
            localStorage.setItem('jwtToken', token);
            toast.success('Login Successful!', { position: 'top-right',autoClose: 1000 });
            const userData = {
                username: user.name,
                useremail: user.email,
                userid: user.id,
                role: user.role
            };
            console.log(userData);
            // return;

            dispathch(setUserDetails(userData));

            if (user.role === 'ADMIN') {
                navigate('/Admin');
                return;
            }



            const currDate = new Date();
            const createdDate = currDate.toISOString().split('T')[0];
            const createdTime = currDate.toTimeString().split(' ')[0];

            const finalcart = {
                created_date: createdDate,
                created_time: createdTime,
                id: userData.userid
            };

            try {
                const cartResponse = await axios.post('http://localhost:3002/createCart', finalcart);
                toast.info('Cart created successfully', { position: 'top-right',autoClose: 1000 });
            } catch (err) {
                if (err.response && err.response.data.message === 'Cart already exists for this user.') {
                    toast.warn('Cart already exists for this user', { position: 'top-right',autoClose: 1000 });
                } else {
                    toast.error('Error creating cart', { position: 'top-right',autoClose: 1000 });
                }
            }

            getCart(userData.userid);
            navigate('/');

        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Invalid credentials, please try again.', { position: 'top-right',autoClose: 1000 });
            } else {
                toast.error('An error occurred during login. Please try again later.', { position: 'top-right',autoClose: 1000 });
            }
            console.error('Login error:', error);
        }
    }


    function handleChange2(e) {
        setSignup({ ...signup, [e.target.name]: e.target.value });
        // console.log(signup.name);
        // console.log(signup.email);
    }

    function handleSubmit2(e) {
        e.preventDefault();
        axios.post('http://localhost:3002/signup', signup)
            .then(response => {
                // console.log(response.data);
                toast.success("Account Successfuly created.", { position: 'top-right',autoClose: 1000 });
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    toast.error("User already exists.", { position: 'top-right',autoClose: 1000 })
                } else {
                    toast.error("There was an error for signup", { position: 'top-right',autoClose: 1000 })
                }
            });
        // console.log(signup);
    }


    return (
        <div>
            <div className={classActive ? 'active container-login' : 'container-login'}>
                <div className='form-container sign-up'>
                    <form onSubmit={handleSubmit2}>
                        <h1>Create Account</h1>
                        <div className='social-icons'>
                            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder='Name' name='name' onChange={handleChange2} required />
                        <input type="email" placeholder='Email' name='email' onChange={handleChange2} required />
                        <input type="password" placeholder='Password' name='password' onChange={handleChange2} required />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={handleSubmit}>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email and password</span>
                        <input name='email' type="email" placeholder="Email" onChange={handleChange} required />
                        <input name='password' type="password" placeholder="Password" onChange={handleChange} required />
                        <a href="#">Forget Your Password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Get Started by Logging In</h1>
                            <p>Enter Your Credentials and Let’s Feast!</p>
                            <button className="hidd" onClick={hover} id="login">Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Reconnect with Your Taste Buds!</h1>
                            <p>New Here? Sign Up and Join the Fun!</p>
                            <button className="hidd" onClick={hover} id="register">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login_comp;
