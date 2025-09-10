import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} <strong>Pixel2PDF</strong>. All rights reserved.  
          <span className="footer-version"> V 0.1</span>
        </p>

        <nav className="footer-links" aria-label="Footer Navigation">
          <Link to="/privacy-policy" title="Read our Privacy Policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions" title="Read our Terms & Conditions">Terms & Conditions</Link>
          <Link to="/about-us" title="Learn more About Pixel2PDF">About Us</Link>
          <Link to="/contact-us" title="Get in touch with Pixel2PDF Support">Contact Us</Link>
        </nav>

        <div className="footer-credits">
          <p>
            Built with ❤️ by <strong>Pixel2PDF</strong> | 
            <a 
              href="https://pixel2pdf.com" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Free Online PDF Converter"
            >
              Free Online PDF Converter
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
