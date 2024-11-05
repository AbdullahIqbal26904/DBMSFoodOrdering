// ShoppingCartModal.js
import React from 'react';
import './ShoppingCartModal.css';

const ShoppingCartModal = ({ products, isOpen, onClose, updateQuantity, updateSize, removeProduct, calculateTotal }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Your Cart</h2>
                <div className="cart-products">
                    {products.map((product, index) => (
                        <div className="cart-product" key={index}>
                            <img src={product.image} alt={product.name} className="product-image" />
                            <div className="product-details">
                                <div className="product-name">{product.name}</div>
                                <div className="product-price">${product.price.toFixed(2)}</div>
                                <div className="size-selection">
                                    <select value={product.size} onChange={(e) => updateSize(index, e.target.value)}>
                                        <option value="Small">Small</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                    </select>
                                </div>
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(index, product.quantity - 1)}>-</button>
                                    <span>{product.quantity}</span>
                                    <button onClick={() => updateQuantity(index, product.quantity + 1)}>+</button>
                                </div>
                                <button className="delete-button" onClick={() => removeProduct(index)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                    <div className="total-price">
                        Total: ${calculateTotal(products).toFixed(2)}
                    </div>
                    <button className="checkout-button">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartModal;
