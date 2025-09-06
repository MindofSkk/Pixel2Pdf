// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Home.css";

// const tools = [
//   {
//     label: "Merge PDF Online",
//     description:
//       "Easily merge multiple PDF files into a single document for free. Fast, secure, and works directly in your browser.",
//     icon: "↔️",
//     color: "#faad14",
//     link: "/merge-pdf",
//   },
//   {
//     label: "Split PDF Online",
//     description:
//       "Extract or separate specific pages from your PDF into a new file instantly. No signup required.",
//     icon: "✂️",
//     color: "#faad14",
//     link: "/split-pdf",
//   },
//   {
//     label: "Compress PDF Online",
//     description:
//       "Reduce PDF file size without losing quality. Optimize PDFs for web, email, or storage in seconds.",
//     icon: "🗜️",
//     color: "#52c41a",
//     link: "/compress-pdf",
//   },
//   {
//     label: "Convert PDF to Word",
//     description:
//       "Convert PDF to editable Word documents (.docx) online. Preserve formatting and layout with high accuracy.",
//     icon: "📄",
//     color: "#1890ff",
//     link: "/pdf-to-word",
//   },
//   {
//     label: "Convert PDF to JPG",
//     description:
//       "Turn PDF pages into high-quality JPG images. Download all pages or selected ones quickly.",
//     icon: "🖼️",
//     color: "#faad14",
//     link: "/pdf-to-jpg",
//   },
//   {
//     label: "Unlock PDF (Remove Password)",
//     description:
//       "Remove password protection from secured PDF files instantly. Access your locked PDF without hassle.",
//     icon: "🔓",
//     color: "#52c41a",
//     link: "/unlock-pdf",
//   },
//   {
//     label: "Protect PDF with Password",
//     description:
//       "Encrypt and secure your PDF with a strong password. Prevent unauthorized access to sensitive files.",
//     icon: "🔒",
//     color: "#1890ff",
//     link: "/protect-pdf",
//   }
// ];


// const featureTabs = [
// 	"All Tools",
// 	"Quick Flows",
// 	"Arrange PDFs",
// 	"Shrink & Optimize",
// 	"Convert Files",
// 	"Edit & Annotate",
// 	"Secure & Protect",
// ];

// const Home: React.FC = () => {
// 	const [activeTab, setActiveTab] = useState(0);

// 	return (
// 		<div className="home2-root">
// 			{/* Hero Section */}
//         <div
//                       style={{
//                           textAlign: "center",
//                           padding: "48px 0 32px 0",
//                           background:
//                               "linear-gradient(90deg,#e6f7ff 0%,#fff 100%)",
//                           borderRadius: "0 0 32px 32px",
//                       }}
//                   >
//                       <h1
//                           style={{
//                               fontSize: "2.6em",
//                               fontWeight: 800,
//                               marginBottom: "16px",
//                               color: "#222",
//                           }}
//                       >
//                           All your PDF tools in one place
//                       </h1>
//                       <div
//                           style={{
//                               fontSize: "1.25em",
//                               color: "#555",
//                               marginBottom: "32px",
//                               fontWeight: 500,
//                           }}
//                       >
//                           Merge, split, compress, convert, and protect—fast, free, and
//                           private.
//                           <br />
//                           Everything runs in your browser, so your files stay with you.
//                       </div>
//                       {/* <Link to="/merge">
//                           <button
//                               style={{
//                                   background: "#1890ff",
//                                   color: "#fff",
//                                   fontWeight: 700,
//                                   fontSize: "1.15em",
//                                   border: "none",
//                                   borderRadius: "8px",
//                                   padding: "16px 48px",
//                                   boxShadow: "0 2px 8px rgba(24,144,255,0.10)",
//                                   cursor: "pointer",
//                                   marginBottom: "8px",
//                               }}
//                           >
//                               Start Free
//                           </button>
//                       </Link> */}
//                       <Link to="/merge">
// 						<button className="home2-cta-btn">Start Free</button>
// 					</Link>
//                   </div>
			

// 			{/* Feature Categories Tabs (Horizontal) + Tools */}
// 			<div className="home2-main">
// 				{/* Horizontal Tabs */}
// 				<div className="home2-tabs-horizontal">
// 					{featureTabs.map((tab, idx) => (
// 						<button
// 							key={tab}
// 							onClick={() => setActiveTab(idx)}
// 							className={`home2-tab-btn${
// 								activeTab === idx ? " active" : ""
// 							}`}
// 						>
// 							{tab}
// 						</button>
// 					))}
// 				</div>

// 				<div className="home2-tools-grid">
// 					{tools.map((tool, idx) => (
// 						<div key={idx} className="home2-tool-card animated-card" >
// 							<Link to={tool.link} className="home2-tool-link"   >
// 								<div
// 									className="home2-tool-icon"
// 									style={{ color: tool.color }}
// 								>
// 									{tool.icon}
// 								</div>
// 								<div className="home2-tool-label">{tool.label}</div>
// 								<div className="home2-tool-desc">
// 									{tool.description}
// 								</div>
// 							</Link>
// 						</div>
// 					))}
// 				</div>
// 			</div>

// 			{/* Trust Section */}
// 			{/* <div className="home2-trust">
// 				<div className="home2-trust-title">Why trust Pixel2PDF?</div>
// 				<div className="home2-trust-list">
// 					<div className="home2-trust-item">No sign-up required</div>
// 					<div className="home2-trust-item">100% free to use</div>
// 					<div className="home2-trust-item">Works in your browser</div>
// 					<div className="home2-trust-item">Files never leave your device</div>
// 				</div>
// 			</div> */}
// 		</div>
// 	);
// };

// export default Home;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// Define tools
// const tools = [
//   { label: "Merge PDF Online", description: "Easily merge PDFs.", icon: "↔️", color: "#faad14", link: "/merge-pdf" },
//   { label: "Split PDF Online", description: "Extract specific pages.", icon: "✂️", color: "#faad14", link: "/split-pdf" },
//   { label: "Compress PDF Online", description: "Reduce PDF size.", icon: "🗜️", color: "#52c41a", link: "/compress-pdf" },
//   { label: "Convert PDF to Word", description: "Convert to editable Word.", icon: "📄", color: "#1890ff", link: "/pdf-to-word" },
//   { label: "Convert PDF to JPG", description: "Turn PDF into images.", icon: "🖼️", color: "#faad14", link: "/pdf-to-jpg" },
//   { label: "Unlock PDF", description: "Remove PDF password.", icon: "🔓", color: "#52c41a", link: "/unlock-pdf" },
//   { label: "Protect PDF", description: "Add password protection.", icon: "🔒", color: "#1890ff", link: "/protect-pdf" },
// ];
const tools = [
  {
    label: "Merge PDF Online",
    description:
      "Easily merge multiple PDF files into a single document for free. Fast, secure, and works directly in your browser.",
    icon: "↔️",
    color: "#faad14",
    link: "/merge-pdf",
  },
  {
    label: "Split PDF Online",
    description:
      "Extract or separate specific pages from your PDF into a new file instantly. No signup required.",
    icon: "✂️",
    color: "#faad14",
    link: "/split-pdf",
  },
  {
    label: "Compress PDF Online",
    description:
      "Reduce PDF file size without losing quality. Optimize PDFs for web, email, or storage in seconds.",
    icon: "🗜️",
    color: "#52c41a",
    link: "/compress-pdf",
  },
  {
    label: "Convert PDF to Word",
    description:
      "Convert PDF to editable Word documents (.docx) online. Preserve formatting and layout with high accuracy.",
    icon: "📄",
    color: "#1890ff",
    link: "/pdf-to-word",
  },
  {
    label: "Convert PDF to JPG",
    description:
      "Turn PDF pages into high-quality JPG images. Download all pages or selected ones quickly.",
    icon: "🖼️",
    color: "#faad14",
    link: "/pdf-to-jpg",
  },
  {
    label: "Unlock PDF (Remove Password)",
    description:
      "Remove password protection from secured PDF files instantly. Access your locked PDF without hassle.",
    icon: "🔓",
    color: "#52c41a",
    link: "/unlock-pdf",
  },
  {
    label: "Protect PDF with Password",
    description:
      "Encrypt and secure your PDF with a strong password. Prevent unauthorized access to sensitive files.",
    icon: "🔒",
    color: "#1890ff",
    link: "/protect-pdf",
  }
];

// Optional tabs (if needed)
const featureTabs = [
  "All Tools", "Quick Flows", "Arrange PDFs", "Shrink & Optimize",
  "Convert Files", "Edit & Annotate", "Secure & Protect"
];

// Map each route to its lazy import
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lazyImports: Record<string, () => Promise<any>> = {
  "/merge-pdf": () => import("../pdf/PdfMerger"),
  "/split-pdf": () => import("../pdf/SplitPdf"),
  "/compress-pdf": () => import("../pdf/CompressPdf"),
  "/pdf-to-word": () => import("../pdf/PdfToWord"),
  "/pdf-to-jpg": () => import("../pdf/PdfToJpg"),
  "/unlock-pdf": () => import("../pdf/UnlockPdf"),
  "/protect-pdf": () => import("../pdf/ProtectPdf"),
};

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleToolClick = async (link: string) => {
    if (lazyImports[link]) await lazyImports[link](); // Preload component
    navigate(link); // Navigate after preload
  };

  return (
    <div className="home2-root">
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "48px 0 32px 0",
          background: "linear-gradient(90deg,#e6f7ff 0%,#fff 100%)",
          borderRadius: "0 0 32px 32px",
        }}
      >
        <h1 style={{ fontSize: "2.6em", fontWeight: 800, marginBottom: "16px", color: "#222" }}>
          All your PDF tools in one place
        </h1>
        <div style={{ fontSize: "1.25em", color: "#555", marginBottom: "32px", fontWeight: 500 }}>
          Merge, split, compress, convert, and protect—fast, free, and private.
          <br />
          Everything runs in your browser, so your files stay with you.
        </div>
        <button className="home2-cta-btn" onClick={() => handleToolClick("/merge-pdf")}>
          Start Free
        </button>
      </div>

      {/* Feature Tabs */}
      <div className="home2-main">
        <div className="home2-tabs-horizontal">
          {featureTabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(idx)}
              className={`home2-tab-btn${activeTab === idx ? " active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="home2-tools-grid">
          {tools.map((tool, idx) => (
            <div key={idx} className="home2-tool-card animated-card">
              <div
                className="home2-tool-link"
                style={{ cursor: "pointer" }}
                onClick={() => handleToolClick(tool.link)}
                onMouseEnter={() => lazyImports[tool.link]?.()} // preload on hover
              >
                <div className="home2-tool-icon" style={{ color: tool.color }}>{tool.icon}</div>
                <div className="home2-tool-label">{tool.label}</div>
                <div className="home2-tool-desc">{tool.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
