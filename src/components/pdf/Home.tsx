import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const tools = [
	{
		label: "Merge PDF",
		description:
			"Combine PDFs in the order you want with the easiest PDF merger available.",
		icon: "↔️",
		color: "#faad14",
		link: "/merge",
	},
	{
		label: "Split PDF",
		description:
			"Separate one page or a whole set for easy conversion into independent PDF files.",
		icon: "↔️",
		color: "#faad14",
		link: "/split",
	},
	{
		label: "Compress PDF",
		description:
			"Reduce file size while optimizing for maximal PDF quality.",
		icon: "🟩",
		color: "#52c41a",
		link: "/compress",
	},
	{
		label: "PDF to Word",
		description:
			"Easily convert your PDF files into easy to edit DOC and DOCX documents.",
		icon: "🟦",
		color: "#1890ff",
		link: "/pdf-to-word",
	},
	{
		label: "PDF to PowerPoint",
		description:
			"Turn your PDF files into easy to edit PPT and PPTX slideshows.",
		icon: "🟧",
		color: "#faad14",
		link: "/pdf-to-ppt",
	},
	{
		label: "PDF to Excel",
		description:
			"Pull data straight from PDFs into Excel spreadsheets in a few short seconds.",
		icon: "🟩",
		color: "#52c41a",
		link: "/pdf-to-excel",
	},
	{
		label: "Word to PDF",
		description:
			"Make DOC and DOCX files easy to read by converting them to PDF.",
		icon: "🟦",
		color: "#1890ff",
		link: "/word-to-pdf",
	},
	{
		label: "PowerPoint to PDF",
		description:
			"Make PPT and PPTX slideshows easy to view by converting them to PDF.",
		icon: "🟧",
		color: "#faad14",
		link: "/ppt-to-pdf",
	},
];

const featureTabs = [
	"All Tools",
	"Quick Flows",
	"Arrange PDFs",
	"Shrink & Optimize",
	"Convert Files",
	"Edit & Annotate",
	"Secure & Protect",
];

const Home: React.FC = () => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="home2-root">
			{/* Hero Section */}
        <div
                      style={{
                          textAlign: "center",
                          padding: "48px 0 32px 0",
                          background:
                              "linear-gradient(90deg,#e6f7ff 0%,#fff 100%)",
                          borderRadius: "0 0 32px 32px",
                      }}
                  >
                      <h1
                          style={{
                              fontSize: "2.6em",
                              fontWeight: 800,
                              marginBottom: "16px",
                              color: "#222",
                          }}
                      >
                          All your PDF tools in one place
                      </h1>
                      <div
                          style={{
                              fontSize: "1.25em",
                              color: "#555",
                              marginBottom: "32px",
                              fontWeight: 500,
                          }}
                      >
                          Merge, split, compress, convert, and protect—fast, free, and
                          private.
                          <br />
                          Everything runs in your browser, so your files stay with you.
                      </div>
                      {/* <Link to="/merge">
                          <button
                              style={{
                                  background: "#1890ff",
                                  color: "#fff",
                                  fontWeight: 700,
                                  fontSize: "1.15em",
                                  border: "none",
                                  borderRadius: "8px",
                                  padding: "16px 48px",
                                  boxShadow: "0 2px 8px rgba(24,144,255,0.10)",
                                  cursor: "pointer",
                                  marginBottom: "8px",
                              }}
                          >
                              Start Free
                          </button>
                      </Link> */}
                      <Link to="/merge">
						<button className="home2-cta-btn">Start Free</button>
					</Link>
                  </div>
			

			{/* Feature Categories Tabs (Horizontal) + Tools */}
			<div className="home2-main">
				{/* Horizontal Tabs */}
				<div className="home2-tabs-horizontal">
					{featureTabs.map((tab, idx) => (
						<button
							key={tab}
							onClick={() => setActiveTab(idx)}
							className={`home2-tab-btn${
								activeTab === idx ? " active" : ""
							}`}
						>
							{tab}
						</button>
					))}
				</div>

				<div className="home2-tools-grid">
					{tools.map((tool, idx) => (
						<div key={idx} className="home2-tool-card animated-card">
							<Link to={tool.link} className="home2-tool-link">
								<div
									className="home2-tool-icon"
									style={{ color: tool.color }}
								>
									{tool.icon}
								</div>
								<div className="home2-tool-label">{tool.label}</div>
								<div className="home2-tool-desc">
									{tool.description}
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>

			{/* Trust Section */}
			{/* <div className="home2-trust">
				<div className="home2-trust-title">Why trust Pixel2PDF?</div>
				<div className="home2-trust-list">
					<div className="home2-trust-item">No sign-up required</div>
					<div className="home2-trust-item">100% free to use</div>
					<div className="home2-trust-item">Works in your browser</div>
					<div className="home2-trust-item">Files never leave your device</div>
				</div>
			</div> */}
		</div>
	);
};

export default Home;
