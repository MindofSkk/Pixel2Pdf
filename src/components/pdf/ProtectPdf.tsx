import React, { useState } from "react";

const ProtectPdf: React.FC = () => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`PDF will be protected with password: ${password}`);
  };

  return (
    <div className="container my-5">
      <h1>Password Protect PDF</h1>
      <p>Add password protection to secure your PDF files.</p>

      <form onSubmit={handleSubmit} className="border p-3 text-center">
        <input type="file" accept="application/pdf" className="mb-3" />
        <div className="mb-3">
          <input
            type="password"
            placeholder="Enter Password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success" type="submit">
          Protect PDF
        </button>
      </form>
    </div>
  );
};

export default ProtectPdf;
