import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Helmet } from "react-helmet-async";
import "./PdfMerger.css";
import SchemaMarkup from "../../subcomponents/SchemaMarkup";

const PdfMerger: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [rotations, setRotations] = useState<number[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // File Select (append files, not replace)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      setRotations((prev) => [...prev, ...newFiles.map(() => 0)]);
    }
  };

  // Remove file
  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setRotations((prev) => prev.filter((_, i) => i !== index));
  };

  // Rotate file preview
  const handleRotate = (index: number) => {
    setRotations((prev) =>
      prev.map((rot, i) => (i === index ? (rot + 90) % 360 : rot))
    );
  };

  // Merge PDFs
  const mergePdfs = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files to merge.");
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([new Uint8Array(mergedPdfBytes)], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    setMergedPdfUrl(url);
    setShowPreview(false);
  };

  // Drag & Drop Handlers
  const handleDragStart = (index: number) => setDraggedIndex(index);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedFiles = [...files];
    const [movedFile] = updatedFiles.splice(draggedIndex, 1);
    updatedFiles.splice(index, 0, movedFile);
    setFiles(updatedFiles);
    setDraggedIndex(null);
  };

  //  schema markup (tick sign + rating)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pixel2PDF - Merge PDF Online",
    "url": "https://pixel2pdf.com/merge-pdf",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "description": "Easily merge multiple PDF files into one PDF online for free with Pixel2PDF. Fast, safe, and no installation required.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120"
    }
  };

  // FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I merge PDF files online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upload your files to Pixel2PDF, arrange them in order, and click Merge. You can preview and download instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Is Pixel2PDF free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Pixel2PDF is 100% free, safe, and requires no signup."
        }
      }
    ]
  };
  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Merge PDF Online Free | Pixel2PDF PDF Merger Tool</title>
        <meta
          name="description"
          content="Merge PDF files online for free with Pixel2PDF. Combine multiple PDFs into one document instantly. Fast, secure, and works directly in your browser."
        />
        <meta
          name="keywords"
          content="merge pdf, merge pdf online, combine pdf, pdf merger free, join pdf files, pixel2pdf, pixeltopdf, pixels2pdf, combine multiple pdfs, merge pdf without signup, merge pdf fast, free pdf merger, merge pdf tool"
        />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://pixel2pdf.com/merge-pdf" />

        {/* Open Graph */}
        <meta property="og:title" content="Merge PDF Online Free | Pixel2PDF" />
        <meta
          property="og:description"
          content="Easily merge multiple PDF files into one with Pixel2PDF. 100% free, secure, and no signup required."
        />
        <meta property="og:url" content="https://pixel2pdf.com/merge-pdf" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pixel2PDF" />
        <meta property="og:image" content="https://pixel2pdf.com/og-merge.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Merge PDF Online Free | Pixel2PDF" />
        <meta
          name="twitter:description"
          content="Free online PDF merger. Merge, combine, and join multiple PDF files instantly using Pixel2PDF."
        />
        <meta name="twitter:image" content="https://pixel2pdf.com/twitter-merge.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <SchemaMarkup
        name="Pixel2PDF - Merge PDF Online"
        description="Easily merge multiple PDF files into one PDF online for free with Pixel2PDF. Fast, safe, and no installation required."
        ratingValue="4.9"
        reviewCount="120"
      />
      <div className="pdf-tool-container">
        <h2 className="title">Pixel2PDF – Merge PDF Files</h2>

        {/* Upload Box */}
        <div className="upload-box">
          <p>Drag and drop your files, or click to select (single or multiple PDFs)</p>
          <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
        </div>

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="file-list" style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <h4 style={{ width: "100%" }}>Selected Files</h4>
            {files.map((file, i) => {
              const fileUrl = URL.createObjectURL(file);
              const rotation = rotations[i] || 0;
              return (
                <div
                  key={i}
                  draggable
                  onDragStart={() => handleDragStart(i)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(i)}
                  style={{
                    cursor: "move",
                    background: draggedIndex === i ? "#f0f0f0" : "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    padding: "16px",
                    width: "180px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                  }}
                  title="Drag to reorder"
                >
                  <button
                    onClick={() => handleRemove(i)}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      background: "#ff4d4f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      cursor: "pointer",
                    }}
                    title="Remove"
                  >
                    ×
                  </button>
                  <button
                    onClick={() => handleRotate(i)}
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      background: "#1890ff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      cursor: "pointer",
                    }}
                    title="Rotate preview"
                  >
                    ⟳
                  </button>
                  <iframe
                    src={fileUrl}
                    width="100"
                    height="140"
                    title={`Preview-${file.name}`}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      marginBottom: "12px",
                      background: "#fafafa",
                      transform: `rotate(${rotation}deg)`,
                    }}
                  />
                  <span style={{ fontSize: "0.95em", fontWeight: 500, textAlign: "center" }}>
                    {file.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Buttons */}
        <div className="button-group">
          <button className="btn merge-btn" onClick={mergePdfs} disabled={files.length < 2}>
            Merge
          </button>
          <button
            className="btn merge-btn"
            disabled={!mergedPdfUrl}
            onClick={() => setShowPreview((prev) => !prev)}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>

        {/* Download + Preview */}
        {mergedPdfUrl && (
          <div className="download-box">
            <h4>Download PDF</h4>
            <a href={mergedPdfUrl} download="merged.pdf" className="download-btn">
              Download PDF
            </a>
          </div>
        )}
        {showPreview && mergedPdfUrl && (
          <div className="download-box" style={{ marginTop: "20px" }}>
            <h4>PDF Preview</h4>
            <iframe src={mergedPdfUrl} width="100%" height="400px" title="PDF Preview" />
          </div>
        )}
      </div>

      {/* ✅ Step-by-Step SEO Section */}
      {/* <div className="steps-section" style={{ marginTop: "40px" }}>
        <h3>How to Merge PDF Files Online – Quick & Free</h3>
        <p>
          Follow these steps to combine multiple PDF files into one using Pixel2PDF – the best free
          online PDF merger tool.
        </p>
        <ol>
          <li><strong>Upload PDFs</strong> – drag & drop or select files.</li>
          <li><strong>Arrange order</strong> – reorder files as needed.</li>
          <li><strong>Rotate pages</strong> – fix orientation.</li>
          <li><strong>Merge PDFs</strong> – click merge and wait.</li>
          <li><strong>Preview</strong> – check result before saving.</li>
          <li><strong>Download</strong> – save your combined PDF instantly.</li>
        </ol>
        <p>
          Pixel2PDF lets you merge PDF files securely in your browser. No signup required. Fast,
          free, and private – ideal for students, professionals, and businesses.
        </p>
      </div> */}
      {/* ✅ SEO Content Section */}
      <div className="pdf-merge seo-content">
        <h2>Free Online PDF Merger – Combine PDF Files Instantly</h2>
        <p>
          Pixel2PDF makes it simple to merge multiple PDF files into one clean, organized document.
          Whether you are a student compiling notes, a professional preparing reports, or just someone
          managing digital documents, our tool is designed to be fast, secure, and completely free.
          All the merging happens in your browser, ensuring your files remain private.
        </p>

        <h3>Step-by-Step: Merge PDF Files Online</h3>
        <ol>
          <li><strong>Upload PDFs</strong> – drag and drop or select multiple files.</li>
          <li><strong>Reorder</strong> – arrange files into the sequence you want.</li>
          <li><strong>Rotate</strong> – adjust page orientation with one click.</li>
          <li><strong>Merge</strong> – press merge and let Pixel2PDF combine them.</li>
          <li><strong>Preview & Download</strong> – check the result and save instantly.</li>
        </ol>

        <h3>Why Use Pixel2PDF?</h3>
        <ul className="features-list">
          <li>✔ <strong>100% Free</strong> – no hidden fees or trial limits.</li>
          <li>✔ <strong>Secure</strong> – files are processed in your browser, no upload needed.</li>
          <li>✔ <strong>Fast</strong> – merge large PDFs within seconds.</li>
          <li>✔ <strong>No Signup</strong> – start merging instantly without registration.</li>
          <li>✔ <strong>Cross-Platform</strong> – works on Windows, Mac, Linux, and mobile.</li>
        </ul>

        <h3>Frequently Asked Questions</h3>

        <div className="faq-item">
          <h4>Is Pixel2PDF safe to use?</h4>
          <p>
            Yes. All processing is done locally in your browser using JavaScript. Your files never leave
            your device, ensuring complete privacy.
          </p>
        </div>

        <div className="faq-item">
          <h4>What is the maximum file size?</h4>
          <p>
            You can merge files up to 50MB each in most browsers without issues. For extremely large PDFs,
            consider splitting them first.
          </p>
        </div>

        <div className="faq-item">
          <h4>Do I need to install software?</h4>
          <p>
            No. Pixel2PDF works entirely online. Just open the site, upload, merge, and download your PDF.
          </p>
        </div>
      </div>

    </>
  );
};

export default PdfMerger;
