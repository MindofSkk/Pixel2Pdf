import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Home.css";

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
    if (lazyImports[link]) await lazyImports[link]();
    navigate(link);
  };

  return (
    <div className="home2-root">
      {/* ✅ SEO Meta Tags */}
      <Helmet>

        <title>
          Pixel2PDF - Free Online PDF Tools | Merge, Split, Compress, Convert &
          Protect PDFs
        </title>
        <meta
          name="description"
          content="Pixel2PDF is your free online PDF toolkit. Merge, split, compress, convert, unlock, and protect PDF files instantly. 100% secure, fast, and works directly in your browser."
        />

        {/* 🔑 Strong Keywords */}
        <meta
          name="keywords"
          content="Pixel2PDF, pixel2 pdf, pixeltopdf, pixels2pdf, pixel to pdf, merge pdf online free, split pdf, compress pdf, reduce pdf size, pdf to word, convert pdf to word, pdf to jpg, convert pdf to jpg, unlock pdf, remove pdf password, protect pdf, encrypt pdf, secure pdf, free online pdf editor, edit pdf online, pdf tools free, pdf compressor, pdf converter"
        />
  <meta name="robots" content="index, follow" />

        {/* ✅ Canonical URL */}
        <link rel="canonical" href="https://pixel2pdf.com/" />

        {/* 🌐 Open Graph (Facebook/LinkedIn) */}
        <meta property="og:title" content="Pixel2PDF - Free Online PDF Tools" />
        <meta
          property="og:description"
          content="Merge, split, compress, convert, and protect PDFs online for free. Pixel2PDF is fast, secure, and works in your browser."
        />
        <meta property="og:url" content="https://pixel2pdf.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pixel2PDF" />
        <meta
          property="og:image"
          content="https://pixel2pdf.com/og-image.jpg"
        />

        {/* 🐦 Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Pixel2PDF - Free Online PDF Tools"
        />
        <meta
          name="twitter:description"
          content="Free PDF tools: merge, split, compress, convert, unlock & protect PDFs online."
        />
        <meta
          name="twitter:image"
          content="https://pixel2pdf.com/twitter-image.jpg"
        />
      </Helmet>

      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "48px 0 32px 0",
          borderRadius: "0 0 32px 32px",
          backgroundColor: "#eff9fdff",
          marginBottom: "32px",
          marginTop: "60px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
          Merge, split, compress, convert, and protect—fast, free, and private.
          <br />
          Everything runs in your browser, so your files stay with you.
        </div>
        <button
          className="home2-cta-btn"
          onClick={() => handleToolClick("/merge-pdf")}
        >
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
                onMouseEnter={() => lazyImports[tool.link]?.()}
              >
                <div
                  className="home2-tool-icon"
                  style={{ color: tool.color }}
                >
                  {tool.icon}
                </div>
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
