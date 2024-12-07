import React, { useState, useEffect } from 'react';
import './ShoppingCartModal.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, deleteProduct, settotalcartprice } from '../redux/features/cartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

function Cart_comp() {
  const [total, setTotal] = useState();
  const [gettotal, setgettotal] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState({});
  const navigate = useNavigate();
  const { cartTotal, carts, cart } = useSelector((state) => state.allCart);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch_total_price = async () => {
      const data2 = { cart_id2: cart.cartid };
      try {
        const response2 = await axios.get(`http://localhost:3002/getcarttotal`, { params: data2 });
        setTotal(response2.data[0].total);

        dispatch(settotalcartprice(response2.data));
      } catch (err) {
        toast.error(`Error fetching total of cart${err}`, { position: 'top-left', autoClose: 500 });
      }
    };

    if (gettotal) {
      fetch_total_price();
      setgettotal(false);
    }
  }, [gettotal, cart.cartid]);

  const handleButtonClick2 = () => {
    navigate('/Checkout');
  };

  async function handleQuantityChange(prod, num) {
    const put_qnty = {
      qnty_fr_db: num,
      prod_id: prod.id,
      cart_id: cart.cartid,
      prod_price: prod.price,
    };
   
    try {
      const response = await axios.put("http://localhost:3002/updatequantity", put_qnty);
      toast.success("Quantity updated ", { position: 'top-left', autoClose: 500 });
      const update_at_redux = { number: num, id: prod.id };
      dispatch(updateQuantity(update_at_redux));
      setgettotal(true);

    } catch (err) {
      toast.error("Quantity cannot be 0 ", { position: 'top-left', autoClose: 500 });
      // console.log('cannot be updated');
    }
  }

  function handleDelete(prod) {
    dispatch(deleteProduct(prod));
    axios.delete(`http://localhost:3002/deletefromcart/${prod.id}/${cart.cartid}`)
      .then(() => {
        toast.success("Product removed from cart.", { position: 'top-left', autoClose: 500 });
      })
      .catch((err) => {
        // console.log('error deleting from cart', err);
        toast.error("server error occured.")
      });
    setgettotal(true);
  }

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: size,
    }));
  };

  const toggleDropdown = (productId) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div className="modal-content">

      <div className="cart-products">
        {carts.length === 0 ? (
          <div className="empty-cart-message">
            Your cart is empty.
          </div>
        ) : (
          carts.map((product, index) => (
            <div className="cart-product" key={index}>
              <img
                src={product.imgdata ? `http://localhost:3002/uploads/${product.imgdata}` : product.imgurl}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <div className="product-name">{product.name}</div>
                <div className="product-price">Rs.{product.price.toFixed(2)}</div>
                <div className="size-selection">
                  <select value={product.size} onChange={(e) => handleSizeChange(product.id, e.target.value)}>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(product, -1)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => handleQuantityChange(product, 1)}>+</button>
                </div>
                <button className="delete-button" onClick={() => handleDelete(product)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-summary">
        <div className="total-price">
          Total: Rs.{cartTotal}
        </div>
        <button
          onClick={handleButtonClick2}
          className="checkout-button"
          disabled={carts.length === 0} // Disable if cart is empty
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart_comp;
