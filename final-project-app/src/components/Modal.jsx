import React from 'react';
import './Modal.css';

function Modal({ show, onClose, data }) {
  if (!show) return (
    <div></div>
  );
  return (
    <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        data-backdrop="false"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-body">
                    <div className="card">
                        <div className="photo">
                            <img src={data.imgdata ? `http://localhost:3002/uploads/${data.imgdata}` : data.imgurl}  alt="Product" />
                        </div>
                        <div className="description">
                            <h2>{data.name}</h2>
                            <h4>Popular House Plant</h4>
                            <h1>RS. {data.price}</h1>
                            <p>{data.description}</p>
                            <button className="btn btn-primary">Add to Cart</button>
                        </div>
                        <button className="close-button" onClick={onClose}>×</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    )
}

export default Modal;
