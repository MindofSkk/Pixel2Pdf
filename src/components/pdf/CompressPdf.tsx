
import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import "./CompressPdf.css";

const CompressPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState("balanced");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setCompressedUrl(null);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Compression settings
      let quality = 0.7; // balanced
      console.log(quality);
      if (compressionLevel === "high") quality = 0.4;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (compressionLevel === "low") quality = 0.9;

      // Iterate through pages and scale down images
      const pages = pdfDoc.getPages();
      for (const page of pages) {
        const { width, height } = page.getSize();
        page.setSize(width * 0.95, height * 0.95); // shrink pages slightly
      }

      // Save compressed PDF
      // const compressedBytes = await pdfDoc.save({
      //   useObjectStreams: true,
      // });

      // const blob = new Blob([compressedBytes], { type: "application/pdf" });
      // const url = URL.createObjectURL(blob);
      // setCompressedUrl(url);

      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
      });

      // Convert to a plain Uint8Array to ensure compatibility
      const plainBytes = new Uint8Array(compressedBytes); // copies the data

      const blob = new Blob([plainBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setCompressedUrl(url);
    } catch (error) {
      console.error("Compression failed:", error);
      alert("Something went wrong while compressing PDF.");
    }

    setLoading(false);
  };

  return (
    <div className="compress-container">
      <h1 className="compress-title">Compress PDF Online</h1>
      <p className="compress-subtitle">
        Reduce PDF size for faster sharing and uploading without losing much quality.
      </p>

      <div className="compress-upload">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file-input"
        />
      </div>

      {file && (
        <div className="compress-options">
          <h3>Select Compression Level</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="high"
                checked={compressionLevel === "high"}
                onChange={(e) => setCompressionLevel(e.target.value)}
              />
              High Compression (smallest size, lower quality)
            </label>
            <label>
              <input
                type="radio"
                value="balanced"
                checked={compressionLevel === "balanced"}
                onChange={(e) => setCompressionLevel(e.target.value)}
              />
              Balanced Compression (recommended)
            </label>
            <label>
              <input
                type="radio"
                value="low"
                checked={compressionLevel === "low"}
                onChange={(e) => setCompressionLevel(e.target.value)}
              />
              Low Compression (best quality, slightly smaller size)
            </label>
          </div>

          <button
            className="btn-compress"
            onClick={handleCompress}
            disabled={loading}
          >
            {loading ? "⏳ Compressing..." : "⚡ Compress PDF"}
          </button>
        </div>
      )}

      {compressedUrl && (
        <div className="download-section">
          <p>✅ Compression complete!</p>
          <a href={compressedUrl} download="compressed.pdf" className="btn-download">
            ⬇️ Download Compressed PDF
          </a>
        </div>
      )}
      {/* Ad placement (bottom) */}
      <div className="ad-banner mt-5">Your Ad Here</div>
    </div>
  );
};

export default CompressPdf;
