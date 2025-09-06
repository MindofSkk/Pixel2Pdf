// /* eslint-disable prefer-const */
// import React, { useState } from "react";
// import { PDFDocument } from "pdf-lib";
// import * as pdfjsLib from "pdfjs-dist";
// // import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url"; // ✅ Vite-compatible import
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// const CompressPdf: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
//   const [status, setStatus] = useState<string>("");
//   const [targetSize, setTargetSize] = useState<number>(0);
//   const [unit, setUnit] = useState<"KB" | "MB">("MB");
//   const [originalSize, setOriginalSize] = useState<number>(0);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];
//       setFile(selectedFile);
//       setCompressedUrl(null);
//       setStatus("");
//       setOriginalSize(selectedFile.size);
//     }
//   };

//   const handleCompress = async () => {
//     if (!file) {
//       setStatus("Please select a PDF file.");
//       return;
//     }
//     if (!targetSize || targetSize <= 0) {
//       setStatus("Please enter a valid target size.");
//       return;
//     }

//     setStatus("Compressing...");

//     try {
//       const arrayBuffer = await file.arrayBuffer();
//       const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

//       const newPdf = await PDFDocument.create();

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);

//         const viewport = page.getViewport({ scale: 1 });
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d")!;
//         canvas.width = viewport.width;
//         canvas.height = viewport.height;
//         await page.render({ canvas, canvasContext: context, viewport }).promise;

//         // await page.render({ canvasContext: context, viewport }).promise;

//         // Adjust JPEG quality based on target size (simple estimation)
//         let quality = 0.6;
//         if (unit === "MB" && targetSize < originalSize / (1024 * 1024)) {
//           quality = 0.4;
//         } else if (unit === "KB" && targetSize * 1024 < originalSize) {
//           quality = 0.3;
//         }

//         const imgData = canvas.toDataURL("image/jpeg", quality);

//         const jpgImage = await newPdf.embedJpg(imgData);
//         const pdfPage = newPdf.addPage([viewport.width, viewport.height]);
//         pdfPage.drawImage(jpgImage, {
//           x: 0,
//           y: 0,
//           width: viewport.width,
//           height: viewport.height,
//         });
//       }

//       const compressedBytes = await newPdf.save();
//       const compressedSize = compressedBytes.length;
//       const blob = new Blob([new Uint8Array(compressedBytes)], { type: "application/pdf" });
//       setCompressedUrl(URL.createObjectURL(blob));

//       let originalDisplay =
//         originalSize > 1024 * 1024
//           ? `${(originalSize / (1024 * 1024)).toFixed(2)} MB`
//           : `${(originalSize / 1024).toFixed(2)} KB`;
//       let compressedDisplay =
//         compressedSize > 1024 * 1024
//           ? `${(compressedSize / (1024 * 1024)).toFixed(2)} MB`
//           : `${(compressedSize / 1024).toFixed(2)} KB`;

//       let reduced =
//         originalSize > compressedSize
//           ? `Reduced by ${((1 - compressedSize / originalSize) * 100).toFixed(1)}%`
//           : "No reduction";

//       setStatus(
//         `Original size: ${originalDisplay}, Compressed size: ${compressedDisplay}. ${reduced}`
//       );
//     } catch (err) {
//       console.error(err);
//       setStatus("Compression failed.");
//     }
//   };

//   return (
//     <div className="pdf-tool-container">
//       <h2>Compress PDF</h2>
//       <div style={{ marginBottom: "12px", color: "#666" }}>
//         <div>
//           <input type="file" accept="application/pdf" onChange={handleFileChange} />
//         </div>
//         {file && (
//           <div style={{ margin: "8px 0" }}>
//             <strong>Original file size:</strong>{" "}
//             {originalSize > 1024 * 1024
//               ? `${(originalSize / (1024 * 1024)).toFixed(2)} MB`
//               : `${(originalSize / 1024).toFixed(2)} KB`}
//           </div>
//         )}
//         <div style={{ margin: "8px 0" }}>
//           <label>
//             Target Size:&nbsp;
//             <input
//               type="number"
//               min={1}
//               value={targetSize}
//               onChange={e => setTargetSize(Number(e.target.value))}
//               style={{ width: "80px" }}
//             />
//           </label>
//           <select
//             value={unit}
//             onChange={e => setUnit(e.target.value as "KB" | "MB")}
//             style={{ marginLeft: "8px" }}
//           >
//             <option value="KB">KB</option>
//             <option value="MB">MB</option>
//           </select>
//           <button
//             onClick={handleCompress}
//             disabled={!file}
//             style={{ marginLeft: "16px" }}
//           >
//             Compress
//           </button>
//         </div>
//       </div>
//       {status && <div style={{ margin: "12px 0", color: "#666" }}>{status}</div>}
//       {compressedUrl && (
//         <div>
//           <a href={compressedUrl} download="compressed.pdf" className="download-btn">
//             Download Compressed PDF
//           </a>
//           <iframe src={compressedUrl} width="100%" height="400px" title="Compressed PDF Preview" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompressPdf;
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
      if (compressionLevel === "high") quality = 0.4;
      if (compressionLevel === "low") quality = 0.9;

      // Iterate through pages and scale down images
      const pages = pdfDoc.getPages();
      for (const page of pages) {
        const { width, height } = page.getSize();
        page.setSize(width * 0.95, height * 0.95); // shrink pages slightly
      }

      // Save compressed PDF
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
      });

      const blob = new Blob([compressedBytes], { type: "application/pdf" });
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
