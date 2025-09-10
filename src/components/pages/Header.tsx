
// // import React from "react";
// // import { Link } from "react-router-dom";
// // import Logo from "../../subcomponents/Logo";

// // export const Header: React.FC = () => {
// //   return (
// //     <header
// //       style={{
// //         width: "100%",
// //         backgroundColor: "#e6f7ff",
// //         padding: "10px 20px",
// //         position: "fixed",
// //         top: 0,
// //         left: 0,
// //         zIndex: 1000,
// //         color: "black",
// //         boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
// //       }}
// //     >
// //       <div
// //         style={{
// //           maxWidth: "1200px",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "space-between",
// //         }}
// //       >
// //         {/* Logo Section */}
// //         <div style={{ width: "200px", height: "50px" }}>
// //           <Link to="/" style={{ color: "black", textDecoration: "none" }}>
// //             <Logo />
// //           </Link>

// //         </div>

// //         {/* Navigation */}
// //         <nav style={{ display: "flex", gap: "20px" }}>
// //           <Link to="/merge-pdf" style={{ color: "black", textDecoration: "none" }}>
// //             Merge
// //           </Link>
// //           <Link to="/split-pdf" style={{ color: "black", textDecoration: "none" }}>
// //             Split
// //           </Link>
// //           <Link to="/compress-pdf" style={{ color: "black", textDecoration: "none" }}>
// //             Compress
// //           </Link>
// //           {/* <Link to="/pdf-to-word" style={{ color: "black", textDecoration: "none" }}>
// //             Convert
// //           </Link> */}
// //           <Link to="/about-us" style={{ color: "black", textDecoration: "none" }}>
// //             About Us
// //           </Link>
// //           <Link to="/privacy-policy" style={{ color: "black", textDecoration: "none" }}>
// //             Privacy Policy
// //           </Link>
// //           <Link to="/terms-and-conditions" style={{ color: "black", textDecoration: "none" }}>
// //             Terms
// //           </Link>
// //           <Link to="/contact-us" style={{ color: "black", textDecoration: "none" }}>
// //             Contact
// //           </Link>

// //         </nav>
// //       </div>
// //     </header>
// //   );
// // };
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Logo from "../../subcomponents/Logo";
// import "./Header.css"; // external CSS for SEO + clean styles

// export const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="header">
//       <div className="header-container">
//         {/* Logo Section */}
//         <div className="logo">
//           <Link to="/" aria-label="Home">
//             <Logo />
//           </Link>
//         </div>

//         {/* Hamburger Button (mobile) */}
//         <button
//           className={`menu-toggle ${isOpen ? "active" : ""}`}
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label="Toggle menu"
//         >
//           ☰
//         </button>

//         {/* Navigation */}
//         <nav className={`nav ${isOpen ? "open" : ""}`}>
//           <Link to="/merge-pdf">Merge</Link>
//           <Link to="/split-pdf">Split</Link>
//           <Link to="/compress-pdf">Compress</Link>
//           {/* <Link to="/pdf-to-word">Convert</Link> */}
//           <Link to="/about-us">About Us</Link>
//           <Link to="/privacy-policy">Privacy Policy</Link>
//           <Link to="/terms-and-conditions">Terms</Link>
//           <Link to="/contact-us">Contact</Link>
//         </nav>
//       </div>
//     </header>
//   );
// };
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../subcomponents/Logo";
import "./Header.css";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo">
          <Link to="/" aria-label="Pixel2PDF Home">
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
        <nav id="nav-menu" className={`nav ${isOpen ? "open" : ""}`} aria-label="Main Navigation">
          <Link to="/merge-pdf" title="Merge PDF Online - Free Tool">Merge</Link>
          <Link to="/split-pdf" title="Split PDF Pages Easily">Split</Link>
          <Link to="/compress-pdf" title="Compress PDF Files Online">Compress</Link>
          {/* <Link to="/pdf-to-word" title="Convert PDF to Word">Convert</Link> */}
          <Link to="/about-us" title="About Pixel2PDF">About Us</Link>
          <Link to="/privacy-policy" title="Privacy Policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions" title="Terms and Conditions">Terms</Link>
          <Link to="/contact-us" title="Contact Pixel2PDF">Contact</Link>
        </nav>
      </div>
    </header>
  );
};
