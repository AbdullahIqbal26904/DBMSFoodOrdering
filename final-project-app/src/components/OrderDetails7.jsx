import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn
} from "mdb-react-ui-kit";
import "./OrderDetails7.css";
import axios from "axios";

export default function OrderDetails2() {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [showclg, setshowclg] = useState(false);
  const statusSteps = ["Ordered", "Food Prepared", "On the way", "Delivered"];
  const { userDetails } = useSelector((state) => state.allCart);
  const [orderDetails, setorderDetails] = useState({});
  const [orderproducts, setorderproducts] = useState([]); // Initialize as an empty array

  const handleNextStatus = () => {
    setshowclg(!showclg);
    setCurrentStatus((prevStatus) => Math.min(prevStatus + 1, statusSteps.length - 1));
  };

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3002/orders', {
          params: {
            userid: userDetails.userid,
          },
        });
        const products = await axios.get('http://localhost:3002/getorderedproducts', {
          params: {
            userid: userDetails.userid,
          }
        });
        setorderproducts(products.data);
        console.log('products ye hai: ',products.data)
        console.log('response ye hai: ',response.data);
        setorderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    getOrderDetails();

    console.log(userDetails.userid);
    // console.log(carts);
  }, [userDetails.userid]);

  return (
    <>
      <section className="h-100" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" xl="6">
              <MDBCard className="border-top border-bottom border-3 border-color-custom">
                <MDBCardBody className="p-5">
                  <p className="lead fw-bold mb-5" style={{ color: "#f37a27" }}>
                    Purchase Receipt
                  </p>

                  <MDBRow>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Date</p>
                      <p>{orderDetails?.order_Date || 'N/A'}</p>
                    </MDBCol>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Order No.</p>
                      <p>{orderDetails?.order_id || 'N/A'}</p>
                    </MDBCol>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Time</p>
                      <p>{orderDetails?.order_Time || 'N/A'}</p>
                    </MDBCol>
                  </MDBRow>

                  <ul style={{ backgroundColor: "#f2f2f2" }}>
                    {orderproducts.length > 0 ? (
                      orderproducts.map((item, index) => (
                        <li key={index}>
                          <div className='prod_sum container'>
                            <span className='qnty'>{item.quantity}</span>
                            <img src={item.imgdata ? `http://localhost:3002/uploads/${item.imgdata}` : item.imgurl}
   alt={item.name} />
                            <p className='prod_name'>{item.name}</p>
                            <p className='prod_price'>Total Rs. {item.price * item.quantity}</p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p>No products found.</p>
                    )}
                  </ul>

                  <MDBRow className="my-4">
                    <MDBCol md="4" className="offset-md-8 col-lg-3 offset-lg-9">
                      <p className="lead fw-bold mb-0" style={{ color: "#f37a27" }}>
                        Total: RS.{orderDetails?.total_amount || 'N/A'}
                      </p>
                    </MDBCol>
                  </MDBRow>

                  <p className="lead fw-bold mb-4 pb-2" style={{ color: "#f37a27" }}>
                    Tracking Order
                  </p>

                  <MDBRow>
                    <MDBCol lg="12">
                      <div className="horizontal-timeline" style={{ position: "relative", height: "24px" }}>
                        <div
                          className="highlight-line"
                          style={{
                            width: `${(currentStatus / (statusSteps.length - 1)) * 100}%`,
                            backgroundColor: "#f37a27",
                            height: "10px",
                            position: "absolute",
                            top: "5%", // Adjust this value for better alignment
                            transform: "translateY(-50%)",
                            transition: "width 0.3s ease-in-out",
                            zIndex: 1, // Ensures the line appears behind the status points
                          }}
                        />
                        <ul className="list-inline items d-flex justify-content-between" style={{ position: "relative", zIndex: 2 }}>
                          {statusSteps.map((step, index) => (
                            <li key={index} className="list-inline-item items-list">
                              <p
                                className={`py-1 px-2 rounded ${index <= currentStatus ? "text-white" : "text-muted"
                                  }`}
                                style={{
                                  backgroundColor: index <= currentStatus ? "#f37a27" : "#ccc",
                                }}
                              >
                                {step}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </MDBCol>
                  </MDBRow>



                  <MDBBtn className="mt-4" onClick={handleNextStatus} color="primary">
                    Next Status
                  </MDBBtn>

                  <p className="mt-4 pt-2 mb-0">
                    Want any help?{" "}
                    <a href="#!" style={{ color: "#f37a27" }}>
                      Please contact us
                    </a>
                  </p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
