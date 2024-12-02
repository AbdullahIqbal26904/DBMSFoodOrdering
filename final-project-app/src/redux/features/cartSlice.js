import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: [],
  total: 0,
  shipping_charges: 200,
  discount_code: 'AZADI72',
  cartTotal: 0,
  show_cart_details: false,
  userDetails: {
    username: '',
    useremail: '',
    userid: 0,
    userrole: ''
  },
  cart: {
    cartid: 0,
    created_date: '',
    created_time: '',
    user_id: 0
  },
  orderDetails: {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'COD'
  },
  //after the user has checked out
  orderid: 0,
  delivery_id: 0,
  categories: []
};

const cartSlice = createSlice({
  name: "cartslice",
  initialState,
  reducers: {
    addtocart: (state, action) => {
      const product = state.carts.find(item => item.id === action.payload.id);
      if(product){
        return;
      }else{
        state.addSuccess = true
        state.carts = [...state.carts, action.payload];
        state.cartTotal = state.cartTotal + state.carts[state.carts.length - 1].price;
        // console.log(state.total);
        // console.log('cart me add hogaya:',state.carts)
      }
    },
    settotalcartprice: (state,action) => {
      state.cartTotal = action.payload[0].total;
      console.log('total: ',action.payload[0].total);
    },
    set_show_cart: (state,action) => {
      console.log(action.payload);
      state.show_cart_details = action.payload;
      // console.log('cart kholni hai: ',action.payload)
    },
    updateQuantity: (state, action) => {
      const id = action.payload.id;
      const number = action.payload.number;
      const product = state.carts.find(item => item.id === id);
      if (product) {
        product.quantity = product.quantity + number;
      }
    },
    deleteProduct: (state, action) => {
      console.log(action.payload.id);
      // state.total = state.total - (action.payload.id.qnty * action.payload.id.price);
      state.carts = state.carts.filter(item => item.id !== action.payload.id);
      // console.log('delete hi nahi horaha',state.carts);

      // console.log(state.total);
    },
    updateOrderDetails: (state,action) => {
      state.orderDetails.address = action.payload.addr;
      state.orderDetails.city = action.payload.city_for_redux;
      state.orderDetails.postalCode = action.payload.postalCode_for_redux;
      state.orderDetails.phone = action.payload.phoneno_for_redux;
      state.orderDetails.firstName = action.payload.firstName_for_redux;
      state.orderDetails.lastName = action.payload.lastname_for_redux;
      state.orderDetails.email = action.payload.email_for_redux;
      // console.log('here is all data: ',state.orderDetails.address);
    },
    setUserDetails: (state,action) => {
      // console.log(action.payload);
      state.userDetails.username = action.payload.username;
      state.userDetails.useremail = action.payload.useremail;
      state.userDetails.userid = action.payload.userid;
      state.userDetails.userrole = action.payload.role;
      // console.log(state.userDetails.username);
      // console.log(state.userDetails);
    },
    setCartDetails: (state,action) => {
      state.cart.cartid = action.payload.cart_id;
      state.cart.created_date = action.payload.created_date;
      state.cart.created_time = action.payload.created_time;
      state.cart.user_id = action.payload.id;
      // console.log("Yele",state.cart.cartid)
      // console.log('Fetched Cart:', action.payload);

    },
    setcategory: (state, action) => {
      state.categories = action.payload;
      // console.log(action.payload)  // Update the categories array with the payload
      // console.log('Categories updated:', state.categories);
    }
  }
});

export const { setcategory,settotalcartprice,addtocart, updateQuantity, deleteProduct , updateOrderDetails , setUserDetails,setCartDetails,set_show_cart } = cartSlice.actions;
export default cartSlice.reducer;
