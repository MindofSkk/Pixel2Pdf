import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import "./PdfMerger.css";
import PdfCompressor from "./PdfCompressor";

const PdfMerger: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [rotations, setRotations] = useState<number[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      const copiedPages = await mergedPdf.copyPages(
        pdf,
        pdf.getPageIndices()
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([new Uint8Array(mergedPdfBytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setMergedPdfUrl(url);
  };

  // Drag and Drop Handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedFiles = [...files];
    const [movedFile] = updatedFiles.splice(draggedIndex, 1);
    updatedFiles.splice(index, 0, movedFile);
    setFiles(updatedFiles);
    setDraggedIndex(null);
  };

  return (
    <div className="pdf-tool-container">
      <h2 className="title">Pixel2PDF – Merge PDF Files</h2>

      {/* Upload Box */}
      <div className="upload-box">
        <p>
          Drag and drop your files, or click to select (single or multiple PDFs)
        </p>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
        />
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <div
          className="file-list"
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
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
                  transition: "background 0.2s",
                }}
                title="Drag to reorder"
              >
                {/* Remove Button */}
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
                    fontWeight: "bold",
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                  title="Remove"
                >
                  ×
                </button>
                {/* Rotate Button */}
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
                    fontWeight: "bold",
                    fontSize: "16px",
                    lineHeight: "24px",
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
                    transition: "transform 0.2s",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.95em",
                    fontWeight: 500,
                    textAlign: "center",
                    wordBreak: "break-all",
                    marginBottom: "4px",
                  }}
                >
                  {file.name}
                </span>
              </div>
            );
          })}
          <small style={{ width: "100%" }}>
            Drag and drop cards to reorder before merging.
          </small>
        </div>
      )}

      {/* Action Buttons */}
      <div className="button-group">
        <button
          className="btn merge-btn"
          onClick={mergePdfs}
          disabled={files.length < 2}
        >
          Merge
        </button>
        <button className="btn split-btn" disabled>
          Split
        </button>
        <button
          className="btn compress-btn"
          disabled={files.length === 0}
          onClick={() => setMergedPdfUrl(null)}
        >
          Compress
        </button>
        <button className="btn convert-btn" disabled>
          Convert
        </button>
      </div>

      {/* Download Section */}
      {mergedPdfUrl && (
        <div className="download-box">
          <h4>Download PDF</h4>
          <a
            href={mergedPdfUrl}
            download="merged.pdf"
            className="download-btn"
          >
            Download PDF
          </a>
          <iframe
            src={mergedPdfUrl}
            width="100%"
            height="400px"
            title="PDF Preview"
          />
        </div>
      )}

      {/* PDF Compressor Section */}
      {files.length > 0 && (
        <div style={{ marginTop: "48px" }}>
          <PdfCompressor />
        </div>
      )}
    </div>
  );
};

export default PdfMerger;

