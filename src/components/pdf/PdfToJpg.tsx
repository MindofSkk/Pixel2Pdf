/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "./PdfToJpg.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfToJpg: React.FC = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [pageOption, setPageOption] = useState<"single" | "all">("single");
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [pdfPageCount, setPdfPageCount] = useState<number>(1);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setInputFile(e.target.files[0]);
      setStatus("");
      setImageUrls([]);
      setSelectedPage(1);
      setPdfPageCount(1);

      if (e.target.files[0].type !== "application/pdf") {
        setStatus("Please upload a PDF file.");
        setInputFile(null);
        return;
      }

      const arrayBuffer = await e.target.files[0].arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPdfPageCount(pdf.numPages);
    }
  };

  const handleClear = () => {
    setInputFile(null);
    setStatus("");
    setImageUrls([]);
    setSelectedPage(1);
    setPdfPageCount(1);
  };

  const handleConvert = async () => {
    if (!inputFile) {
      setStatus("Please select a file.");
      return;
    }

    setLoading(true);
    setStatus("");
    setImageUrls([]);

    try {
      const arrayBuffer = await inputFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let urls: string[] = [];

      if (pageOption === "all") {
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d")!;
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvas, canvasContext: context, viewport }).promise;
          urls.push(canvas.toDataURL("image/png"));
        }
        setStatus(`Converted all ${pdf.numPages} pages to JPG.`);
      } else {
        if (selectedPage < 1 || selectedPage > pdf.numPages) {
          setStatus("Invalid page number.");
          setLoading(false);
          return;
        }
        const page = await pdf.getPage(selectedPage);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvas, canvasContext: context, viewport }).promise;
        urls.push(canvas.toDataURL("image/png"));
        setStatus(`Converted page ${selectedPage} to JPG.`);
      }

      setImageUrls(urls);
    } catch (err) {
      console.error(err);
      setStatus("Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  // Drag & Drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFileChange({ target: { files: e.dataTransfer.files } } as any);
    }
  };

  // Download all images as ZIP
  const handleDownloadAll = async () => {
    if (imageUrls.length === 0) return;
    const zip = new JSZip();
    imageUrls.forEach((url, idx) => {
      const base64 = url.split(",")[1];
      zip.file(`page${idx + 1}.png`, base64, { base64: true });
    });
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, inputFile?.name.replace(".pdf", ".zip") || "pages.zip");
  };

  return (
    <div className="pdftojpg-container">
      <h1 className="pdftojpg-heading">PDF to JPG Converter</h1>
      <p className="pdftojpg-paragraph">Convert each page of your PDF into high-quality JPG images.</p>

      <div
        className={`pdftojpg-converter-card ${dragActive ? "active" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="pdftojpg-file-input"
        />

        {inputFile && (
          <div className="pdftojpg-file-info">
            <span>{inputFile.name} ({(inputFile.size / 1024).toFixed(2)} KB)</span>
            <button onClick={handleClear} className="pdftojpg-clear-btn">Clear</button>
          </div>
        )}

        {inputFile && (
          <div className="pdftojpg-page-selection">
            <label>
              <input type="radio" checked={pageOption === "single"} onChange={() => setPageOption("single")} /> Single page
            </label>
            <input type="number" min={1} max={pdfPageCount} value={selectedPage} onChange={e => setSelectedPage(Number(e.target.value))} disabled={pageOption !== "single"} />
            <label>
              <input type="radio" checked={pageOption === "all"} onChange={() => setPageOption("all")} /> All pages
            </label>
            <span>Total pages: {pdfPageCount}</span>
          </div>
        )}

        <button onClick={handleConvert} disabled={!inputFile || loading} className="pdftojpg-btn">
          Convert to JPG
        </button>
        {loading && <span className="pdftojpg-loading">⏳ Converting...</span>}
      </div>

      {status && <div className="pdftojpg-status">{status}</div>}

      {imageUrls.length > 0 && (
        <div className="pdftojpg-preview">
          <button className="pdftojpg-download-all-btn" onClick={handleDownloadAll}>Download All as ZIP</button>
          <div className="pdftojpg-pages-grid">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="pdftojpg-page-card">
                <a href={url} download={`page${idx + 1}.png`} className="pdftojpg-download-btn">Download Page {idx + 1}</a>
                <img src={url} alt={`Page ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pdftojpg-adsense">
        {/* Place your AdSense code here */}
      </div>
    </div>
  );
};

export default PdfToJpg;
