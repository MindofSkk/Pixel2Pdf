import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import "./SplitPdf.css";

const SplitPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [splitMode, setSplitMode] = useState("pages");
  const [pageRange, setPageRange] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleSplit = async () => {
    if (!file) return;

    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);

    if (splitMode === "each") {
      // Split each page
      for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);
        const pdfBytes = await newPdf.save();
        downloadFile(pdfBytes, `page-${i + 1}.pdf`);
      }
    } else if (splitMode === "range" && pageRange) {
      // Split by range
      const ranges = pageRange.split(",").map(r => r.trim());
      let index = 1;
      for (const range of ranges) {
        const [start, end] = range.split("-").map(Number);
        const newPdf = await PDFDocument.create();
        for (let i = start - 1; i < (end || start); i++) {
          const [page] = await newPdf.copyPages(pdfDoc, [i]);
          newPdf.addPage(page);
        }
        const pdfBytes = await newPdf.save();
        downloadFile(pdfBytes, `range-${index++}.pdf`);
      }
    }
  };

  const downloadFile = (bytes: Uint8Array, name: string) => {
    const blob = new Blob([bytes], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
  };

  return (
    <div className="split-container container my-5 mt-5">
      <h1 className="split-title">Split PDF Online – Free & Secure</h1>
      <p className="split-desc">
        Extract pages, split every page, or divide your PDF into multiple smaller files.
      </p>

      <div className="split-upload border p-4 text-center">
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
      </div>

      {file && (
        <div className="split-options mt-4">
          <h5>Choose Split Option:</h5>

          <div className="form-check">
            <input
              type="radio"
              name="splitMode"
              value="each"
              className="form-check-input"
              checked={splitMode === "each"}
              onChange={(e) => setSplitMode(e.target.value)}
            />
            <label className="form-check-label">Split each page</label>
          </div>

          <div className="form-check mt-2">
            <input
              type="radio"
              name="splitMode"
              value="range"
              className="form-check-input"
              checked={splitMode === "range"}
              onChange={(e) => setSplitMode(e.target.value)}
            />
            <label className="form-check-label">
              Split by range (e.g., 1-3, 5, 7-9)
            </label>
            {splitMode === "range" && (
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter ranges..."
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
              />
            )}
          </div>

          <button className="btn btn-success mt-4" onClick={handleSplit}>
            Split PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default SplitPdf;
