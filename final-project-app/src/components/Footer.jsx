import React, { useRef, useEffect, useState } from "react";
import "./Footer.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from 'mapbox-gl';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      className={isVisible ? "fade-in" : ""}
    >
      <div className="leftFooter">
        <h4>Get New Updates</h4>
        <div className="subscribe-container">
          <input type="email" placeholder="Enter your Email*" />
          <button>Subscribe</button>
        </div>
        <p>Stay informed with our latest news and exclusive content.</p>
      </div>

      <div className="midFooter">
        <h1>TasteBuds Cafe</h1>
        <p>Savor the Flavors: Where Every Bite is a Culinary Adventure!</p>
        <p>© 2023 Saadustu. All Rights Reserved.</p>
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      <div className="rightFooter">
        <h4>Our Location</h4>
        <div style={{ width: "100%" }}>
          <iframe
            width="400"
            height="300"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?width=300&amp;height=300&amp;hl=en&amp;q=Dha%20phase%208%20karachi+(The%20Cafe)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
