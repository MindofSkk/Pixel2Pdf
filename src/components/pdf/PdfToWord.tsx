import React, { useState } from "react";
import { PDFDocument } from "pdf-lib"; // optional if you want manipulation
import { saveAs } from "file-saver";
import "./PdfToWord.css";

const PdfToWord: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a PDF file.");
        setFile(null);
        return;
      }
      setError(null);
      setFile(selectedFile);
    }
  };

  // Convert PDF to Word
  const handleConvert = async () => {
    if (!file) {
      setError("No file selected.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const arrayBuffer = await file.arrayBuffer();

      // Simple text extraction example
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      let textContent = "";

      pages.forEach((page) => {
        // pdf-lib doesn't provide getTextContent directly
        // For demo purposes, we'll just mention page number
        textContent += `Page ${pages.indexOf(page) + 1}\n\n`;
      });

      // Create a basic Word file (text only)
      const blob = new Blob([textContent], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      saveAs(blob, file.name.replace(".pdf", ".docx"));
    } catch (err) {
      console.error(err);
      setError("Conversion failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdftoword-container">
      <h1 className="pdftoword-heading">PDF to Word Converter</h1>
      <p className="pdftoword-paragraph">
        Convert your PDF files into editable Word documents.
      </p>

      <div className="pdftoword-converter-card">
        <input
          type="file"
          accept="application/pdf"
          className="pdftoword-file-input"
          onChange={handleFileChange}
        />
        <button
          className="pdftoword-btn mt-3"
          onClick={handleConvert}
          disabled={loading}
        >
          {loading ? "Converting..." : "Convert to Word"}
        </button>
        {error && <p className="pdftoword-error">{error}</p>}
      </div>

      <div className="pdftoword-adsense mt-4 text-center">
        {/* Add your AdSense code here */}
      </div>
    </div>
  );
};

export default PdfToWord;
