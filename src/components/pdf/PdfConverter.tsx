/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const convertTypes = [
    { label: "Image to PDF", value: "img2pdf", icon: "🖼️" },
    { label: "Text to PDF", value: "txt2pdf", icon: "📄" },
    { label: "PDF to Images", value: "pdf2img", icon: "🖼️" },
    { label: "PDF to Text", value: "pdf2txt", icon: "🔤" },
];

const PdfConverter: React.FC = () => {
    const [convertType, setConvertType] = useState<string>("img2pdf");
    const [inputFile, setInputFile] = useState<File | null>(null);
    const [outputUrl, setOutputUrl] = useState<string | null>(null);
    const [status, setStatus] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [pageOption, setPageOption] = useState<"all" | "single">("single");
    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [pdfPageCount, setPdfPageCount] = useState<number>(1);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setInputFile(e.target.files[0]);
            setOutputUrl(null);
            setStatus("");
            setImageUrls([]);
            setSelectedPage(1);
            setPdfPageCount(1);
            // If PDF, get page count for selection
            if (convertType === "pdf2img") {
                const arrayBuffer = await e.target.files[0].arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                setPdfPageCount(pdf.numPages);
            }
        }
    };

    const handleClear = () => {
        setInputFile(null);
        setOutputUrl(null);
        setStatus("");
        setLoading(false);
        setImageUrls([]);
        setSelectedPage(1);
        setPdfPageCount(1);
    };

    const handleConvert = async () => {
        if (!inputFile) {
            setStatus("Please select a file.");
            return;
        }
        setStatus("");
        setLoading(true);
        setImageUrls([]);
        try {
            if (convertType === "img2pdf") {
                // Image to PDF
                const pdfDoc = await PDFDocument.create();
                const imgBytes = await inputFile.arrayBuffer();
                let img;
                if (inputFile.type === "image/png") {
                    img = await pdfDoc.embedPng(imgBytes);
                } else {
                    img = await pdfDoc.embedJpg(imgBytes);
                }
                const dims = img.scale(1);
                const page = pdfDoc.addPage([dims.width, dims.height]);
                page.drawImage(img, { x: 0, y: 0, width: dims.width, height: dims.height });
                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
                setOutputUrl(URL.createObjectURL(blob));
                setStatus("Converted image to PDF.");
            } else if (convertType === "txt2pdf") {
                // Text to PDF
                const pdfDoc = await PDFDocument.create();
                const page = pdfDoc.addPage([595, 842]);
                const text = await inputFile.text();
                page.drawText(text, { x: 50, y: 750, size: 14, maxWidth: 495 });
                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
                setOutputUrl(URL.createObjectURL(blob));
                setStatus("Converted text to PDF.");
            } else if (convertType === "pdf2img") {
                // PDF to Images (all pages or single page)
                const arrayBuffer = await inputFile.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let urls: string[] = [];
                if (pageOption === "all") {
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const viewport = page.getViewport({ scale: 1.5 });
                        const canvas = document.createElement("canvas");
                        const context = canvas.getContext("2d")!;
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;

                        // await page.render({ canvasContext: context, viewport }).promise;
                        await page.render({ canvas, canvasContext: context, viewport }).promise;

                        urls.push(canvas.toDataURL("image/png"));
                    }
                    setImageUrls(urls);
                    setStatus(`Converted all ${pdf.numPages} pages to images.`);
                } else {
                    if (selectedPage < 1 || selectedPage > pdf.numPages) {
                        setStatus("Invalid page number.");
                        setLoading(false);
                        return;
                    }
                    const page = await pdf.getPage(selectedPage);
                    const viewport = page.getViewport({ scale: 1.5 });
                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d")!;
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    await page.render({ canvas, canvasContext: context, viewport }).promise;

                    // await page.render({ canvasContext: context, viewport }).promise;
                    setImageUrls([canvas.toDataURL("image/png")]);
                    setStatus(`Converted page ${selectedPage} to image.`);
                }
                setLoading(false);
                return;
            } else if (convertType === "pdf2txt") {
                // PDF to Text (first page only for demo)
                const arrayBuffer = await inputFile.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                const page = await pdf.getPage(1);
                const textContent = await page.getTextContent();
                const text = textContent.items.map((item: any) => item.str).join(" ");
                const blob = new Blob([text], { type: "text/plain" });
                setOutputUrl(URL.createObjectURL(blob));
                setStatus("Extracted text from PDF (first page).");
            }
            setLoading(false);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setStatus("Conversion failed.");
            setLoading(false);
        }
    };

    // Drag & drop handlers
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await handleFileChange({ target: { files: e.dataTransfer.files } } as any);
        }
    };

    return (
        <div className="pdf-tool-container" style={{ marginTop: "32px", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "24px" }}>PDF Converter</h2>
            <div style={{ display: "flex", gap: "12px", marginBottom: "18px", flexWrap: "wrap", justifyContent: "center" }}>
                {convertTypes.map(t => (
                    <button
                        key={t.value}
                        onClick={() => { setConvertType(t.value); handleClear(); }}
                        style={{
                            padding: "12px 18px",
                            borderRadius: "8px",
                            border: convertType === t.value ? "2px solid #1890ff" : "1px solid #ddd",
                            background: convertType === t.value ? "#e6f7ff" : "#fafafa",
                            fontWeight: 500,
                            fontSize: "1em",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "all 0.2s"
                        }}
                        title={t.label}
                    >
                        <span style={{ fontSize: "1.3em" }}>{t.icon}</span> {t.label}
                    </button>
                ))}
            </div>
            <div style={{
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                padding: "24px",
                marginBottom: "16px"
            }}>
                {/* Drag & Drop Upload Box */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                        border: dragActive ? "2px dashed #1890ff" : "2px dashed #ccc",
                        borderRadius: "12px",
                        padding: "32px",
                        textAlign: "center",
                        background: dragActive ? "#e6f7ff" : "#fafafa",
                        marginBottom: "18px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                    }}
                    title="Click or drag file here"
                >
                    <div style={{ fontSize: "2em", marginBottom: "8px" }}>📂</div>
                    <div style={{ fontWeight: 500, fontSize: "1.1em" }}>
                        {dragActive ? "Drop your file here..." : "Drag & drop your file here, or click to select"}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={
                            convertType === "img2pdf"
                                ? "image/png,image/jpeg"
                                : convertType === "txt2pdf"
                                    ? "text/plain"
                                    : "application/pdf"
                        }
                        multiple
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>

                {/* PDF to Image page selection */}
                {inputFile && convertType === "pdf2img" && (
                    <div style={{ marginBottom: "12px", color: "#444" }}>
                        <label>
                            <input
                                type="radio"
                                checked={pageOption === "single"}
                                onChange={() => setPageOption("single")}
                                style={{ marginRight: "6px" }}
                            />
                            Single page
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={pdfPageCount}
                            value={selectedPage}
                            onChange={e => setSelectedPage(Number(e.target.value))}
                            disabled={pageOption !== "single"}
                            style={{ width: "60px", margin: "0 12px" }}
                        />
                        <label>
                            <input
                                type="radio"
                                checked={pageOption === "all"}
                                onChange={() => setPageOption("all")}
                                style={{ marginRight: "6px" }}
                            />
                            All pages
                        </label>
                        <span style={{ marginLeft: "12px", color: "#888" }}>
                            (Total pages: {pdfPageCount})
                        </span>
                    </div>
                )}
                {inputFile && (
                    <div style={{ marginBottom: "10px", color: "#444" }}>
                        <strong>File:</strong> {inputFile.name} &nbsp;
                        <span style={{ color: "#888" }}>
                            ({inputFile.size > 1024 * 1024
                                ? `${(inputFile.size / (1024 * 1024)).toFixed(2)} MB`
                                : `${(inputFile.size / 1024).toFixed(2)} KB`}
                            )
                        </span>
                        <button onClick={handleClear} style={{
                            marginLeft: "16px",
                            background: "#ff4d4f",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "2px 10px",
                            cursor: "pointer",
                            fontWeight: 500
                        }}>Clear</button>
                    </div>
                )}
                <button
                    onClick={handleConvert}
                    disabled={!inputFile || loading}
                    style={{
                        background: "#1890ff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "8px 24px",
                        fontWeight: 500,
                        fontSize: "1em",
                        cursor: !inputFile || loading ? "not-allowed" : "pointer",
                        marginRight: "12px"
                    }}
                >
                    Convert
                </button>
                {loading && (
                    <span style={{ marginLeft: "12px" }}>
                        <svg width="22" height="22" viewBox="0 0 50 50">
                            <circle cx="25" cy="25" r="20" fill="none" stroke="#1890ff" strokeWidth="5" strokeDasharray="31.4 31.4" strokeLinecap="round">
                                <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.8s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </span>
                )}
            </div>
            {status && <div style={{ margin: "12px 0", color: "#666", textAlign: "center" }}>{status}</div>}
            {/* Show image previews for PDF to Image */}
            {imageUrls.length > 0 && convertType === "pdf2img" && (
                <div style={{ textAlign: "center" }}>
                    <div style={{ marginBottom: "12px", fontWeight: 500 }}>
                        {imageUrls.length === 1
                            ? "Converted Image"
                            : `Converted Images (${imageUrls.length})`}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
                        {imageUrls.map((url, idx) => (
                            <div key={idx} style={{ marginBottom: "12px" }}>
                                <a href={url} download={`page${idx + 1}.png`} className="download-btn" style={{ display: "block", marginBottom: "6px" }}>
                                    Download Page {idx + 1}
                                </a>
                                <img src={url} alt={`PDF Page ${idx + 1}`} style={{ maxWidth: "180px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {outputUrl && convertType === "pdf2txt" && (
                <div style={{ textAlign: "center" }}>
                    <a href={outputUrl} download="extracted.txt" className="download-btn" style={{ marginBottom: "12px", display: "inline-block" }}>
                        Download Text
                    </a>
                    <iframe src={outputUrl} width="100%" height="200px" title="Extracted Text" style={{ borderRadius: "8px", background: "#fafafa" }} />
                </div>
            )}
            {outputUrl && (convertType === "img2pdf" || convertType === "txt2pdf") && (
                <div style={{ textAlign: "center" }}>
                    <a href={outputUrl} download="converted.pdf" className="download-btn" style={{ marginBottom: "12px", display: "inline-block" }}>
                        Download PDF
                    </a>
                    <iframe src={outputUrl} width="100%" height="400px" title="Converted PDF Preview" style={{ borderRadius: "8px", background: "#fafafa" }} />
                </div>
            )}
            {/* <div style={{ marginTop: "16px", color: "#c00", fontWeight: 500, textAlign: "center" }}>
        Note: Office file conversion (Word, Excel, PowerPoint) requires a backend or third-party API.<br />
        This demo supports images/text to PDF and PDF to image/text (first page only).
      </div> */}
        </div>
    );
};

export default PdfConverter;
