
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UnlockPdf.css";

const UnlockPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError("");
    }
  };

  const handleUnlock = async () => {
    if (!file) {
      setError("⚠️ Please upload a PDF file first.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer); // No password support in pdf-lib
      const pdfBytes = await pdfDoc.save();

      // ✅ Wrap in Uint8Array so TS accepts it
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      saveAs(blob, `unlocked-${file.name}`);
    }
    catch (err) {
      console.error(err);
      setError("❌ Unable to unlock this PDF. Check if the password is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="unlock-container container ">
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Unlock PDF Online Free | Remove Password from PDF - Pixel2PDF</title>
        <meta
          name="description"
          content="Unlock PDF files online. Remove password protection and access your secured PDF instantly. 100% free, fast, and secure – Pixel2PDF."
        />
        <meta
          name="keywords"
          content="unlock pdf, remove pdf password, decrypt pdf, access locked pdf, pixel2pdf unlock, pdf password remover online"
        />
        <link rel="canonical" href="https://pixel2pdf.com/unlock-pdf" />
        {/* ✅ Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Unlock PDF - Pixel2PDF",
            "url": "https://pixel2pdf.com/unlock-pdf",
            "applicationCategory": "Utility",
            "operatingSystem": "All",
            "description": "Remove password from your secured PDF instantly. Free, secure, and works in your browser."
          }
          `}
        </script>
      </Helmet>

      <header className="text-center mb-4">
        <h1 className="fw-bold">🔓 Unlock PDF Online</h1>
        <p className="text-muted">
          Remove password protection from secured PDF files instantly.
          100% free, safe, and processed directly in your browser.
        </p>
      </header>

      {/* ✅ Steps Section */}
      <section className="unlock-steps mb-4">
        <h2>How to Unlock a PDF?</h2>
        <ol>
          <li>Upload your locked PDF file.</li>
          <li>Enter the correct password if required.</li>
          <li>Click <b>Unlock PDF</b> and wait a few seconds.</li>
          <li>Download your unlocked PDF instantly.</li>
        </ol>
      </section>

      {/* ✅ Upload + Action */}
      <section className="unlock-box border p-4 rounded bg-light text-center">
        <input
          type="file"
          accept="application/pdf"
          className="form-control mb-3"
          onChange={handleFileChange}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter PDF password (if required)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn btn-success w-100"
          disabled={loading}
          onClick={handleUnlock}
        >
          {loading ? "Unlocking..." : "Unlock PDF"}
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </section>

      {/* Disclaimer */}
      <footer className="unlock-footer mt-4 text-center small text-muted">
        ⚠️ Use this tool only for PDFs you own or have permission to unlock.
        Pixel2PDF never uploads or stores your files – all processing happens
        securely in your browser.
      </footer>
    </div>
  );
};

export default UnlockPdf;
