
// import React, { useState, useRef, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Logo from "../../subcomponents/Logo";
// import "./Header.css";

// export const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);
//   const location = useLocation();

//   // Close menu on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const navItems = [
//     { to: "/", label: "Home" },
//     { to: "/convert", label: "Convert" },
//     { to: "/merge-pdf", label: "Merge PDF" },
//     { to: "/split-pdf", label: "Split PDF" },
//     { to: "/compress-pdf", label: "Compress PDF" },
//     { to: "/tools", label: "Tools" },
//   ];

//   return (
//     <header className="header">
//       <div className="header-container" ref={menuRef} style={{ fontWeight: "bold", color: "#007bff" }}>


//         <Link to="/" onClick={() => setIsOpen(false)} aria-label="Pixel2PDF Home">
//           <div className="logo" >
//             <Logo />
//           </div>

//         </Link>

//         {/* Hamburger button (mobile only) */}
//         <button
//           className={`menu-toggle ${isOpen ? "active" : ""}`}
//           onClick={() => setIsOpen(!isOpen)}
//           aria-expanded={isOpen}
//           aria-controls="nav-menu"
//           aria-label="Toggle navigation menu"
//         >
//           ☰
//         </button>

//         {/* Nav links */}
//         <nav id="nav-menu" className={`nav ${isOpen ? "open" : ""}`} aria-label="Main Navigation">
//           {navItems.map(({ to, label }) => (
//             <Link
//               key={to}
//               to={to}
//               onClick={() => setIsOpen(false)}
//               className={location.pathname === to ? "active" : ""}
//             >
//               {label}
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </header>
//   );
// };
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../subcomponents/Logo";
import "./Header.css";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSubmenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-container" ref={menuRef}>
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)} aria-label="Pixel2PDF Home">
          <div className="logo">
            <Logo />
          </div>
        </Link>

        {/* Hamburger button (mobile only) */}
        <button
          className={`menu-toggle ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="nav-menu"
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        {/* Nav links */}
        <nav id="nav-menu" className={`nav ${isOpen ? "open" : ""}`} aria-label="Main Navigation">
          <Link to="/" onClick={() => setIsOpen(false)} className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>

          {/* Submenu */}
          <div
            className={`nav-item dropdown ${submenuOpen ? "open" : ""}`}
            onMouseEnter={() => setSubmenuOpen(true)}
            onMouseLeave={() => setSubmenuOpen(false)}
          >
            <button
              className="dropdown-toggle"
              onClick={() => setSubmenuOpen(!submenuOpen)}
              style={{ fontWeight: "bold" }}

            >
              Convert ▾
            </button>
            <div className="dropdown-menu">
              <Link to="/pdf-to-word" onClick={() => setIsOpen(false)}>PDF to Word</Link>
              <Link to="/pdf-to-excel" onClick={() => setIsOpen(false)}>PDF to Excel</Link>
              <Link to="/pdf-to-text" onClick={() => setIsOpen(false)}>PDF to Text</Link>
              <Link to="/pdf-to-image" onClick={() => setIsOpen(false)}>PDF to Image</Link>
              <Link to="/pdf-to-powerpoint" onClick={() => setIsOpen(false)}>PDF to PowerPoint</Link>
            </div>
          </div>

          <Link to="/merge-pdf" onClick={() => setIsOpen(false)} className={location.pathname === "/merge-pdf" ? "active" : ""}>
            Merge PDF
          </Link>
          <Link to="/split-pdf" onClick={() => setIsOpen(false)} className={location.pathname === "/split-pdf" ? "active" : ""}>
            Split PDF
          </Link>
          <Link to="/compress-pdf" onClick={() => setIsOpen(false)} className={location.pathname === "/compress-pdf" ? "active" : ""}>
            Compress PDF
          </Link>
          <Link to="/tools" onClick={() => setIsOpen(false)} className={location.pathname === "/tools" ? "active" : ""}>
            Tools
          </Link>
        </nav>
      </div>
    </header>
  );
};
