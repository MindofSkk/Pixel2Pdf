import React from "react";
import { Link } from "react-router-dom"; // Use if using React Router
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Pixel2PDF. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
          <Link to="/about-us">About Us</Link>

          <Link to="/contact-us">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
