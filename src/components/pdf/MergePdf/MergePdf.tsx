import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mergepdf.css"
// import { Helmet } from "react-helmet-async";
import { MergePdfSEOContent } from "./MergePdfSeo";
// import { MERGE_PDF_FAQ_SCHEMA, MERGE_PDF_RATING_SCHEMA, MERGE_PDF_SEO } from "./utils";
import { SEO_CONFIG } from "../../utils/Seo/seoConfig";
import { SEO } from "../../utils/Seo/seo";

interface UploadedFile {
    id: number;
    file: File;
    name: string;
    size: string;
    pages: number | null;
}

const MergePDF: React.FC = () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [outputName, setOutputName] = useState("Merged_Document.pdf");
    const [loading, setLoading] = useState(false);

    // Format size (MB/KB)
    const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    // Handle file upload
    // const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!event.target.files) return;
    //     await processFiles(event.target.files);
    //     // if (!event.target.files) return;
    //     const uploaded = Array.from(event.target.files);

    //     const mappedFiles = await Promise.all(
    //         uploaded.map(async (file, index) => {
    //             let pageCount = null;
    //             try {
    //                 const pdf = await PDFDocument.load(await file.arrayBuffer());
    //                 pageCount = pdf.getPageCount();
    //             } catch {
    //                 pageCount = null;
    //             }
    //             return {
    //                 id: Date.now() + index,
    //                 file,
    //                 name: file.name,
    //                 size: formatSize(file.size),
    //                 pages: pageCount,
    //             };
    //         })
    //     );

    //     setFiles((prev) => [...prev, ...mappedFiles]);
    // };

    const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        await processFiles(event.target.files); // ✅ This is enough
    };
    // Remove file
    const removeFile = (id: number) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    // Move file up or down
    const moveFile = (index: number, direction: "up" | "down") => {
        const newFiles = [...files];
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= files.length) return;
        [newFiles[index], newFiles[targetIndex]] = [
            newFiles[targetIndex],
            newFiles[index],
        ];
        setFiles(newFiles);
    };

    // Merge PDFs
    const mergePDFs = async () => {
        if (files.length < 2) return;
        setLoading(true);
        try {
            const mergedPdf = await PDFDocument.create();
            for (const f of files) {
                const pdf = await PDFDocument.load(await f.file.arrayBuffer());
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }
            //
            const mergedBytes = await mergedPdf.save();

            // Convert to regular Uint8Array if needed
            const uint8Array = new Uint8Array(mergedBytes as unknown as ArrayBuffer);

            saveAs(new Blob([uint8Array], { type: "application/pdf" }), outputName);

        } catch (err) {
            console.error("Error merging PDFs", err);
        }
        setLoading(false);
    };
    // Add this helper so you can pass FileList to your handleFiles easily
    const processFiles = async (fileList: FileList) => {
        const uploaded = Array.from(fileList);

        const mappedFiles = await Promise.all(
            uploaded.map(async (file, index) => {
                let pageCount = null;
                try {
                    const pdf = await PDFDocument.load(await file.arrayBuffer());
                    pageCount = pdf.getPageCount();
                } catch {
                    pageCount = null;
                }
                return {
                    id: Date.now() + index,
                    file,
                    name: file.name,
                    size: formatSize(file.size),
                    pages: pageCount,
                };
            })
        );

        setFiles((prev) => [...prev, ...mappedFiles]);
    };


    // Drag & Drop handlers
    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            await processFiles(event.dataTransfer.files);
            event.dataTransfer.clearData();
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Needed so drop works
    };

    // ✅ Schema Markup

    return (

        <>


            <SEO {...SEO_CONFIG.merge} />

            <div className="merge-container">
                <h2 className="text-center fw-bold mb-3">
                    Merge PDF Files</h2>
                <p className="text-center text-muted">
                    Combine multiple PDFs into a single document. Rearrange pages, customize
                    the output, and get your merged PDF in seconds.
                </p>
                <div
                    className="pdf-upload-box"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept="application/pdf"
                        multiple
                        className="d-none"
                        id="pdfInput"
                        onChange={handleFiles}
                    />
                    <label htmlFor="pdfInput" className="upload-label">
                        <div className="upload-icon">📄</div>
                        <div className="upload-text">
                            <strong>Click to choose PDF files</strong>
                            <span>or drag & drop them here</span>
                        </div>
                    </label>
                </div>





                {/* {files.length > 0 && (
                    <div className="file-table-container mt-4">
                        <table className="file-table">
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>Size</th>
                                    <th>Pages</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map((f, index) => (
                                    <tr key={f.id}>
                                        <td className="file-name">
                                            <i className="fa fa-file-pdf-o pdf-icon" aria-hidden="true"></i>
                                            {f.name}
                                        </td>
                                        <td>{f.size}</td>
                                        <td>{f.pages ?? "-"}</td>
                                        <td className="actions">
                                            <button
                                                className="action-btn up"
                                                onClick={() => moveFile(index, "up")}
                                                title="Move Up"
                                                disabled={index === 0} // Disable if first element
                                            >
                                                <i className="fa fa-arrow-up"></i>
                                            </button>
                                            <button
                                                className="action-btn down"
                                                onClick={() => moveFile(index, "down")}
                                                title="Move Down"
                                                disabled={index === files.length - 1} // Disable if last element
                                            >
                                                <i className="fa fa-arrow-down"></i>
                                            </button>
                                            <button
                                                className="action-btn remove"
                                                onClick={() => removeFile(f.id)}
                                                title="Remove"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )} */}
                {files.length > 0 && (
                    <>
                        {/* Desktop View */}
                        <div className="file-table-container desktop-view mt-4">
                            <table className="file-table">
                                <thead>
                                    <tr>
                                        <th>File Name</th>
                                        <th>Size</th>
                                        <th>Pages</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.map((f, index) => (
                                        <tr key={f.id}>
                                            <td className="file-name">
                                                <i className="fa fa-file-pdf-o pdf-icon" aria-hidden="true"></i>
                                                {f.name}
                                            </td>
                                            <td>{f.size}</td>
                                            <td>{f.pages ?? "-"}</td>
                                            <td className="actions">
                                                <button
                                                    className="action-btn up"
                                                    onClick={() => moveFile(index, "up")}
                                                    title="Move Up"
                                                    disabled={index === 0}
                                                >
                                                    <i className="fa fa-arrow-up"></i>
                                                </button>
                                                <button
                                                    className="action-btn down"
                                                    onClick={() => moveFile(index, "down")}
                                                    title="Move Down"
                                                    disabled={index === files.length - 1}
                                                >
                                                    <i className="fa fa-arrow-down"></i>
                                                </button>
                                                <button
                                                    className="action-btn remove"
                                                    onClick={() => removeFile(f.id)}
                                                    title="Remove"
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View */}
                        <div className="mobile-view mt-4">
                            {files.map((f, index) => (
                                <div key={f.id} className="file-card">
                                    <div className="file-top-row">
                                        <div className="file-name">
                                            <i className="fa fa-file-pdf-o pdf-icon" aria-hidden="true"></i>
                                            <span title={f.name}>{f.name}</span>
                                        </div>
                                        <div className="actions">
                                            <button
                                                className="action-btn up"
                                                onClick={() => moveFile(index, "up")}
                                                disabled={index === 0}
                                            >
                                                <i className="fa fa-arrow-up"></i>
                                            </button>
                                            <button
                                                className="action-btn down"
                                                onClick={() => moveFile(index, "down")}
                                                disabled={index === files.length - 1}
                                            >
                                                <i className="fa fa-arrow-down"></i>
                                            </button>
                                            <button
                                                className="action-btn remove"
                                                onClick={() => removeFile(f.id)}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="file-details">
                                        Size: {f.size} &nbsp;&nbsp; Pages: {f.pages ?? "-"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}






                {/* Output Name */}
                {files.length > 0 && (
                    <div className="output-name-container mt-4">
                        <label className="form-label fw-semibold mb-2">
                            <i className="fa fa-file-text-o me-2" aria-hidden="true"></i>
                            Output File Name
                        </label>
                        <input
                            type="text"
                            className="form-control output-name-input"
                            value={outputName}
                            onChange={(e) => setOutputName(e.target.value)}
                            placeholder="Enter output file name"
                        />
                    </div>
                )}

                {/* Merge Button */}
                {files.length > 1 && (
                    <div className="merge-btn-container d-flex justify-content-center mt-3">
                        <button
                            className="btn btn-success merge-btn d-flex align-items-center justify-content-center"
                            onClick={mergePDFs}
                            disabled={loading}
                        >
                            <i className={`fa ${loading ? "fa-spinner fa-spin me-2" : "fa-file-pdf-o me-2"}`}></i>
                            {loading ? "Merging..." : "Merge PDFs"}
                        </button>
                    </div>
                )}


                {/* Preview Section */}
                {/* {files?.length > 0 && (
                    <div className="preview-card">
                        <h4 className="section-title">Preview & Arrange Pages</h4>
                        <div className="preview-grid">
                            {files.map((file, idx) => (
                                <div className="preview-box" key={idx}>
                                    <span>{file.name.slice(0, 10)}...</span>

                                </div>
                            ))}
                        </div>
                    </div>
                )} */}

                {/* <div className="preview-card mt-4">
                <h4 className="section-title mb-3">Preview & Arrange Pages</h4>
                <div className="d-flex flex-wrap gap-4">
                    {files.map((file, idx) => {
                        const fileURL = URL.createObjectURL(file.file) + "#toolbar=0&navpanes=0&scrollbar=0";
                        return (
                            <div
                                key={idx}
                                className="border rounded shadow-sm p-2 bg-white"
                                style={{ width: "320px" }}
                            >
                                <p className="fw-semibold small text-truncate mb-2">{file.name}</p>
                                <iframe
                                    src={fileURL}
                                    width="100%"
                                    height="400"
                                    style={{ border: "1px solid #ddd", borderRadius: "6px" }}
                                    title={`preview-${idx}`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div> */}
                < MergePdfSEOContent />

            </div>
        </>

    );
};

export default MergePDF;
