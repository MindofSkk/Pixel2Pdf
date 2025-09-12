import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../subcomponents/Logo";
import "./Header.css";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container" ref={menuRef}>
        {/* Logo Section */}
        <div className="logo">
          <Link to="/" aria-label="Pixel2PDF Home" onClick={() => setIsOpen(false)}>
            <Logo />
          </Link>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className={`menu-toggle ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="nav-menu"
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        {/* Navigation */}
        <nav
          id="nav-menu"
          className={`nav ${isOpen ? "open" : ""}`}
          aria-label="Main Navigation"
        >
          <Link to="/merge-pdf" onClick={() => setIsOpen(false)} title="Merge PDF Online - Free Tool">
            Merge
          </Link>
          <Link to="/split-pdf" onClick={() => setIsOpen(false)} title="Split PDF Pages Easily">
            Split
          </Link>
          <Link to="/compress-pdf" onClick={() => setIsOpen(false)} title="Compress PDF Files Online">
            Compress
          </Link>
          {/* <Link to="/pdf-to-word" onClick={() => setIsOpen(false)} title="Convert PDF to Word">Convert</Link> */}
          <Link to="/about-us" onClick={() => setIsOpen(false)} title="About Pixel2PDF">
            About Us
          </Link>
          <Link to="/privacy-policy" onClick={() => setIsOpen(false)} title="Privacy Policy">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" onClick={() => setIsOpen(false)} title="Terms and Conditions">
            Terms
          </Link>
          <Link to="/contact-us" onClick={() => setIsOpen(false)} title="Contact Pixel2PDF">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};
