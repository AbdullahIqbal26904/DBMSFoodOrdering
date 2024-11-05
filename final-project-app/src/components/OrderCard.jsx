// OrderCard.js
import React from 'react';
import './OrderCard.css';

const OrderCard = ({ product }) => {
    return (
        <div className="order-card">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price.toFixed(2)}</p>
            <p className="product-quantity">Quantity: {product.quantity}</p>
            <p className="product-total">
                Total: ${(product.price * product.quantity).toFixed(2)}
            </p>
        </div>
    );
};

export default OrderCard;
