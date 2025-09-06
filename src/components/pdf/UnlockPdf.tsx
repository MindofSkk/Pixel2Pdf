import React from "react";

const UnlockPdf: React.FC = () => {
  return (
    <div className="container my-5">
      <h1>Unlock PDF</h1>
      <p>Remove password protection from your secured PDF file.</p>

      <div className="border p-3 text-center">
        <input type="file" accept="application/pdf" />
        <button className="btn btn-success mt-3">Unlock PDF</button>
      </div>
    </div>
  );
};

export default UnlockPdf;
