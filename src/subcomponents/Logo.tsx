import React from "react";

const Logo: React.FC = () => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 700 160"
        className="logo-svg"
      >
        {/* Left stacked shapes */}
        <rect x="20" y="40" width="25" height="100" rx="8" ry="8" fill="#1c2230" />
        <rect x="20" y="115" width="100" height="25" rx="8" ry="8" fill="#1c2230" />

        {/* Document block with folded corner */}
        <g transform="translate(40,20)">
          <rect x="0" y="0" width="100" height="120" rx="12" ry="12" fill="#368cef" />
          <polygon points="100,0 100,30 70,0" fill="#ff6f6f" />
        </g>

        {/* Text */}
        <text
          x="180"
          y="100"
          fontSize="72"
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fill="#1c2230"
          dominantBaseline="middle"
        >
          Pixel<tspan fill="#368cef">2</tspan>Pdf
        </text>
      </svg>
  );
};

export default Logo;
