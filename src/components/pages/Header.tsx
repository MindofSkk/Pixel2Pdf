// export const Header: React.FC = () => {
//   return (
//     <header
//       style={{
//         width: "100%",
//         backgroundColor: "#e6f7ff",
//         padding: "10px 20px",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         zIndex: 1000,
//         color: "black",
//         boxShadow: "0 2px 4px rgba(0,0,0,0.1)",

//       }}
//     >
//       <div
//         style={{
//           maxWidth: "1200px",
//           // margin: "0 auto",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <div className="" style={{
//           width: "200px",
//           height: "50px"
//         }}>


//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 160" className="logo-svg">
//             <rect x="20" y="40" width="25" height="100" rx="8" ry="8" fill="#1c2230" />
//             <rect x="20" y="115" width="100" height="25" rx="8" ry="8" fill="#1c2230" />

//             <g transform="translate(40,20)">
//               <rect x="0" y="0" width="100" height="120" rx="12" ry="12" fill="#368cefff" />
//               <polygon points="100,0 100,30 70,0" fill="#ff6f6fff" />
//             </g>

//             <text x="180" y="100" font-size="72" font-family="Arial, sans-serif" font-weight="700" fill="#1c2230" dominant-baseline="middle">
//               Pixel<tspan fill="#368cefff">2</tspan>Pdf
//             </text>
//           </svg>


//         </div>
//         <nav style={{ display: "flex", gap: "20px" }}>
//           <a href="#merge" style={{ color: "black", textDecoration: "none" }}>
//             Merge
//           </a>
//           <a href="#split" style={{ color: "black", textDecoration: "none" }}>
//             Split
//           </a>
//           <a href="#compress" style={{ color: "black", textDecoration: "none" }}>
//             Compress
//           </a>
//           <a href="#convert" style={{ color: "black", textDecoration: "none" }}>
//             Convert
//           </a>
//         </nav>
//       </div>
//     </header>
//   );
// };
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../subcomponents/Logo";

export const Header: React.FC = () => {
  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "#e6f7ff",
        padding: "10px 20px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        color: "black",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo Section */}
        <div style={{ width: "200px", height: "50px" }}>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            <Logo />
          </Link>

        </div>

        {/* Navigation */}
        <nav style={{ display: "flex", gap: "20px" }}>
          <Link to="/merge-pdf" style={{ color: "black", textDecoration: "none" }}>
            Merge
          </Link>
          <Link to="/split-pdf" style={{ color: "black", textDecoration: "none" }}>
            Split
          </Link>
          <Link to="/compress-pdf" style={{ color: "black", textDecoration: "none" }}>
            Compress
          </Link>
          <Link to="/pdf-to-word" style={{ color: "black", textDecoration: "none" }}>
            Convert
          </Link>
        </nav>
      </div>
    </header>
  );
};
