// /* eslint-disable @typescript-eslint/no-explicit-any */
// // import React from "react";
// // import styled from "styled-components";
// // import { Link } from "react-router-dom";

// // const Wrapper = styled.div`
// //   font-family: 'Inter', sans-serif;
// //   background: #f8f9fa;
// // `;

// // const Header = styled.header`
// //   background: #1e1e2f;
// //   color: white;
// //   padding: 1rem 2rem;
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;

// //   nav a {
// //     color: white;
// //     margin-left: 1rem;
// //     text-decoration: none;
// //     font-weight: 500;

// //     &:hover {
// //       color: #00bfff;
// //     }
// //   }
// // `;

// // const Hero = styled.section`
// //   text-align: center;
// //   padding: 3rem 1rem;
// //   background: white;

// //   h1 {
// //     font-size: 2.5rem;
// //     font-weight: 700;
// //   }

// //   p {
// //     font-size: 1.2rem;
// //     color: #6c757d;
// //   }

// //   button {
// //     margin-top: 1rem;
// //   }
// // `;

// // const Grid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
// //   gap: 1.5rem;
// //   padding: 2rem 1rem;
// // `;

// // const Card = styled.div`
// //   background: white;
// //   border: 1px solid #dee2e6;
// //   border-radius: 8px;
// //   padding: 1rem;
// //   text-align: center;
// //   box-shadow: 0 2px 6px rgba(0,0,0,0.05);

// //   h5 {
// //     margin-bottom: 0.5rem;
// //   }
// // `;

// // const Steps = styled.section`
// //   background: #ffffff;
// //   padding: 2rem 1rem;

// //   .step {
// //     text-align: center;
// //     margin-bottom: 1.5rem;
// //   }

// //   h5 {
// //     font-weight: 600;
// //   }

// //   p {
// //     color: #6c757d;
// //   }
// // `;

// // export const ConvertPage: React.FC = () => {
// //   const tools = [
// //     "PDF to Word", "PDF to JPG", "PDF to Excel", "PDF to PPT",
// //     "PDF to PNG", "PDF to TXT", "PDF to HTML", "PDF to DOC", "PDF to DOCX"
// //   ];

// //   return (
// //     <Wrapper>
// //       <Header>
// //         <div><strong>Pixel2PDF</strong></div>
// //         <nav>
// //           <Link to="/">Home</Link>
// //           <Link to="/tools">All Tools</Link>
// //           <Link to="/pricing">Pricing</Link>
// //           <Link to="/api">API</Link>
// //           <Link to="/login">Login</Link>
// //         </nav>
// //       </Header>

// //       <Hero>
// //         <h1>Convert PDF Files With Ease</h1>
// //         <p>Convert your PDF documents into all your desired formats.</p>
// //         <button className="btn btn-primary">Choose Files</button>
// //       </Hero>

// //       <section>
// //         <h2 className="text-center mt-5">Most Popular Conversion Tools</h2>
// //         <Grid>
// //           {["PDF to Word", "PDF to JPG", "PDF to Excel"].map(tool => (
// //             <Card key={tool}>
// //               <h5>{tool}</h5>
// //               <button className="btn btn-outline-primary">Choose Files</button>
// //             </Card>
// //           ))}
// //         </Grid>
// //       </section>

// //       <section>
// //         <h2 className="text-center mt-5">All Conversion Tools</h2>
// //         <Grid>
// //           {tools.map(tool => (
// //             <Card key={tool}>
// //               <h5>{tool}</h5>
// //               <button className="btn btn-outline-primary">Choose Files</button>
// //             </Card>
// //           ))}
// //         </Grid>
// //       </section>

// //       <Steps>
// //         <h2 className="text-center mb-4">How It Works</h2>
// //         <div className="step">
// //           <h5>Step 1</h5>
// //           <p>Choose the file format you want to convert your PDF into.</p>
// //         </div>
// //         <div className="step">
// //           <h5>Step 2</h5>
// //           <p>Upload your PDF file from your device or cloud storage.</p>
// //         </div>
// //         <div className="step">
// //           <h5>Step 3</h5>
// //           <p>Download the converted file instantly after the conversion is complete.</p>
// //         </div>
// //       </Steps>
// //     </Wrapper>
// //   );
// // };

// import React, { useCallback, useRef, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// // import * as pdfjsLib from "pdfjs-dist";
// import { saveAs } from "file-saver";
// import JSZip from "jszip";
// import imageCompression from "browser-image-compression";

// import * as pdfjsLib from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// // Make the PDF worker work with Vite bundling
// // (this pattern works with Vite+pdfjs-dist)
// // (pdfjsLib as any).GlobalWorkerOptions = (pdfjsLib as any).GlobalWorkerOptions || {};
// // (pdfjsLib as any).GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

// interface UploadedFile {
//   id: string;
//   file: File;
//   name: string;
//   size: number; // bytes
//   pages?: number;
//   password?: string | null;
//   needsPassword?: boolean;
//   error?: string | null;
// }

// const uid = () => Math.random().toString(36).slice(2, 9);

// export default function AllInOnePdfToWord(): JSX.Element {
//   const [files, setFiles] = useState<UploadedFile[]>([]);
//   const [useOCR, setUseOCR] = useState(false);
//   const [compressImages, setCompressImages] = useState(true);
//   const [mergeIntoOne, setMergeIntoOne] = useState(true);
//   const [previewHtml, setPreviewHtml] = useState<string | null>(null);
//   const [processing, setProcessing] = useState(false);
//   const dropRef = useRef<HTMLDivElement | null>(null);

//   const onFilesPicked = (fileList: FileList | null) => {
//     if (!fileList) return;
//     const newFiles: UploadedFile[] = Array.from(fileList).map((f) => ({
//       id: uid(),
//       file: f,
//       name: f.name,
//       size: f.size,
//       password: null,
//       needsPassword: false,
//       error: null,
//     }));
//     setFiles((prev) => [...prev, ...newFiles]);
//   };

//   const onDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     onFilesPicked(e.dataTransfer.files);
//   };
//   const onDragOver = (e: React.DragEvent) => e.preventDefault();

//   const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

//   // Helper: render page to canvas and return a Blob (jpeg)
//   const renderPageToImageBlob = async (page: any, scale = 1.5): Promise<Blob> => {
//     const viewport = page.getViewport({ scale });
//     const canvas = document.createElement("canvas");
//     canvas.width = Math.round(viewport.width);
//     canvas.height = Math.round(viewport.height);
//     const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
//     const renderContext = { canvasContext: ctx, viewport };
//     await page.render(renderContext).promise;
//     return await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b as Blob), "image/jpeg", 0.92));
//   };

//   // Convert a single PDF file to a HTML string (that will be saved as .doc)
//   const pdfFileToHtml = async (file: File, password: string | null): Promise<{ html: string; title: string; }> => {
//     const arrayBuffer = await file.arrayBuffer();
//     let loadingTask: any;
//     try {
//       loadingTask = (pdfjsLib as any).getDocument({ data: arrayBuffer, password });
//       const pdf: any = await loadingTask.promise;
//       const numPages = pdf.numPages;
//       const pagesHtml: string[] = [];

//       for (let p = 1; p <= numPages; p++) {
//         const page = await pdf.getPage(p);

//         // 1) Try to extract selectable text
//         const textContent = await page.getTextContent();
//         const textItems = textContent.items as any[];
//         let extractedText = "";
//         if (textItems && textItems.length > 0) {
//           // Group by approximate y-position -> lines
//           let lastY = null as number | null;
//           let line = "";
//           const lines: string[] = [];
//           for (const item of textItems) {
//             const transform = item.transform; // transform[5] is Y
//             const y = Math.round(transform ? transform[5] : 0);
//             if (lastY === null) {
//               lastY = y;
//               line = item.str;
//             } else if (Math.abs(y - lastY) > 10) {
//               lines.push(line.trim());
//               line = item.str;
//               lastY = y;
//             } else {
//               line += " " + item.str;
//             }
//           }
//           if (line) lines.push(line.trim());
//           extractedText = lines.join("\n\n");
//         }

//         // 2) Render page as image (helps preserve charts/graphs/complex layout)
//         const imgBlob = await renderPageToImageBlob(page, 1.5);
//         let finalImgBlob = imgBlob;
//         if (compressImages) {
//           try {
//             const compressed = await imageCompression(imgBlob as any, { maxSizeMB: 0.8, maxWidthOrHeight: 2000 });
//             finalImgBlob = compressed as Blob;
//           } catch (err) {
//             // fallback: use original
//             finalImgBlob = imgBlob;
//           }
//         }
//         const dataUrl = await new Promise<string>((res) => {
//           const reader = new FileReader();
//           reader.onload = () => res(reader.result as string);
//           reader.readAsDataURL(finalImgBlob);
//         });

//         // Decide what to include in HTML for this page:
//         // - If there is extracted text, keep it (helps accessibility & searchability)
//         // - Always include the rendered image to preserve layout/graphs; user can choose to exclude if they want smaller file.
//         const pageHtml = `
//           <div class="pdf-page" style="page-break-after: always; margin-bottom:16px">
//             ${extractedText ? `<div class="extracted-text" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; white-space: pre-wrap; margin-bottom:8px">${escapeHtml(extractedText)}</div>` : ""}
//             <div class="page-image"><img style='max-width:100%;height:auto' src='${dataUrl}' alt='page-${p}'/></div>
//           </div>
//         `;
//         pagesHtml.push(pageHtml);
//       }

//       const html = `
//         <!doctype html>
//         <html>
//           <head>
//             <meta charset="utf-8" />
//             <title>${escapeHtml(file.name)}</title>
//             <style>
//               body { font-family: Arial, Helvetica, sans-serif; color:#111; padding: 12px }
//               .pdf-page { box-shadow: 0 2px 6px rgba(0,0,0,0.06); padding: 8px; border-radius:6px; background:#fff; }
//             </style>
//           </head>
//           <body>
//             ${pagesHtml.join("\n")}
//           </body>
//         </html>
//       `;

//       return { html, title: file.name };
//     } catch (err: any) {
//       // Detect password required
//       const message = err && err.message ? String(err.message) : String(err);
//       if (message && /password/i.test(message)) {
//         throw new Error("PASSWORD_REQUIRED");
//       }
//       throw err;
//     }
//   };

//   // Escape HTML helper
//   const escapeHtml = (str: string) => {
//     return String(str)
//       .replaceAll("&", "&amp;")
//       .replaceAll("<", "&lt;")
//       .replaceAll(">", "&gt;")
//       .replaceAll('"', "&quot;")
//       .replaceAll("'", "&#039;");
//   };

//   // Convert all uploaded files according to options
//   const handleConvert = useCallback(async () => {
//     if (files.length === 0) return alert("Koi file select nahi kiya");
//     setProcessing(true);
//     try {
//       if (mergeIntoOne) {
//         // Merge all into single HTML doc (then save as .doc)
//         const documentParts: string[] = [];
//         for (const uf of files) {
//           try {
//             const { html } = await pdfFileToHtml(uf.file, uf.password || null);
//             // Remove outer HTML/head/body from each (we only want body contents)
//             const body = html.split('<body>')[1].split('</body>')[0];
//             documentParts.push(`<h3 style="margin-top:8px">${escapeHtml(uf.name)}</h3>` + body);
//           } catch (err: any) {
//             if (err.message === "PASSWORD_REQUIRED") {
//               // mark needs password
//               setFiles((prev) => prev.map((f) => (f.id === uf.id ? { ...f, needsPassword: true, error: null } : f)));
//               throw new Error(`Password required for ${uf.name}. Enter password and convert again.`);
//             } else {
//               setFiles((prev) => prev.map((f) => (f.id === uf.id ? { ...f, error: String(err) } : f)));
//             }
//           }
//         }
//         const finalHtml = `<!doctype html><html><head><meta charset="utf-8"/><title>Converted</title></head><body>${documentParts.join('<hr/>')}</body></html>`;
//         // Save as .doc (HTML inside). MS Word opens this fine. For true .docx, see notes below.
//         const blob = new Blob([finalHtml], { type: 'application/msword' });
//         saveAs(blob, 'converted.doc');
//       } else {
//         // Convert each file separately and zip them
//         const zip = new JSZip();
//         for (const uf of files) {
//           try {
//             const { html, title } = await pdfFileToHtml(uf.file, uf.password || null);
//             const blob = new Blob([html], { type: 'application/msword' });
//             zip.file(`${title}.doc`, blob);
//           } catch (err: any) {
//             if (err.message === "PASSWORD_REQUIRED") {
//               setFiles((prev) => prev.map((f) => (f.id === uf.id ? { ...f, needsPassword: true, error: null } : f)));
//               throw new Error(`Password required for ${uf.name}. Enter password and convert again.`);
//             } else {
//               setFiles((prev) => prev.map((f) => (f.id === uf.id ? { ...f, error: String(err) } : f)));
//             }
//           }
//         }
//         const zipBlob = await zip.generateAsync({ type: 'blob' });
//         saveAs(zipBlob, 'converted-docs.zip');
//       }
//     } catch (err: any) {
//       if (String(err).includes('Password required')) {
//         alert(String(err));
//       } else {
//         console.error(err);
//         alert('Conversion failed: ' + String(err).slice(0, 120));
//       }
//     } finally {
//       setProcessing(false);
//     }
//   }, [files, mergeIntoOne, compressImages]);

//   const handlePreview = async () => {
//     if (files.length === 0) return alert('Select file(s) first');
//     setProcessing(true);
//     try {
//       // Preview first file only (for speed)
//       const uf = files[0];
//       const { html } = await pdfFileToHtml(uf.file, uf.password || null);
//       setPreviewHtml(html);
//     } catch (err: any) {
//       if (String(err).includes('PASSWORD_REQUIRED')) {
//         alert('Password required for preview. Enter password in the file row.');
//         setFiles((prev) => prev.map((f) => (f.id === files[0].id ? { ...f, needsPassword: true } : f)));
//       } else {
//         console.error(err);
//         alert('Preview failed: ' + String(err).slice(0, 120));
//       }
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleSetPassword = (id: string, pwd: string) => {
//     setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, password: pwd, needsPassword: false } : f)));
//   };

//   return (
//     <div className="container my-3">
//       <h3 className="text-center mb-3">PDF → Word (One page) — Pixel2PDF</h3>

//       <div
//         ref={dropRef}
//         onDrop={onDrop}
//         onDragOver={onDragOver}
//         className="card p-3 mb-3"
//         style={{ borderStyle: 'dashed', cursor: 'pointer' }}
//       >
//         <div className="d-flex justify-content-between align-items-center">
//           <div>
//             <strong>Drag & drop files here</strong>
//             <div className="small text-muted">(or click to pick files)</div>
//           </div>
//           <div>
//             <input
//               id="fileInput"
//               type="file"
//               multiple
//               accept="application/pdf,image/*"
//               onChange={(e) => onFilesPicked(e.target.files)}
//               style={{ display: 'inline-block' }}
//               className="form-control"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="card mb-3 p-2">
//         <div className="row align-items-center">
//           <div className="col-12 col-md-6">
//             <div className="form-check form-switch">
//               <input className="form-check-input" type="checkbox" checked={useOCR} onChange={(e) => setUseOCR(e.target.checked)} id="useOCR" />
//               <label className="form-check-label" htmlFor="useOCR">Use OCR for scanned PDFs (optional — needs tesseract.js for better accuracy)</label>
//             </div>
//             <div className="form-check form-switch mt-2">
//               <input className="form-check-input" type="checkbox" checked={compressImages} onChange={(e) => setCompressImages(e.target.checked)} id="compressImages" />
//               <label className="form-check-label" htmlFor="compressImages">Compress page images (smaller Word files)</label>
//             </div>
//           </div>
//           <div className="col-12 col-md-6 text-md-end mt-2 mt-md-0">
//             <div className="form-check form-switch d-inline-block me-3">
//               <input className="form-check-input" type="checkbox" checked={mergeIntoOne} onChange={(e) => setMergeIntoOne(e.target.checked)} id="mergeIntoOne" />
//               <label className="form-check-label" htmlFor="mergeIntoOne">Merge into single Word</label>
//             </div>
//             <button className="btn btn-primary me-2" onClick={handlePreview} disabled={processing}>Preview</button>
//             <button className="btn btn-success" onClick={handleConvert} disabled={processing}>{processing ? 'Processing...' : 'Convert'}</button>
//           </div>
//         </div>
//       </div>

//       {files.length > 0 && (
//         <div className="card mb-3 p-2">
//           <h6>Files</h6>
//           <ul className="list-group">
//             {files.map((f) => (
//               <li key={f.id} className="list-group-item d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2">
//                 <div style={{ flex: 1 }}>
//                   <strong style={{ display: 'block' }}>{f.name}</strong>
//                   <div className="small text-muted">{(f.size / 1024 / 1024).toFixed(2)} MB</div>
//                   {f.error && <div className="text-danger small">Error: {String(f.error).slice(0, 120)}</div>}
//                 </div>
//                 <div className="d-flex flex-column align-items-end">
//                   {f.needsPassword ? (
//                     <div className="d-flex gap-2" style={{ minWidth: 220 }}>
//                       <input type="password" className="form-control" placeholder="Enter password" onBlur={(e) => handleSetPassword(f.id, e.target.value)} />
//                     </div>
//                   ) : null}
//                   <div className="mt-2">
//                     <button className="btn btn-sm btn-outline-danger me-2" onClick={() => removeFile(f.id)}>Remove</button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {previewHtml && (
//         <div className="card mb-3 p-2">
//           <h6>Preview (first file)</h6>
//           <div style={{ border: '1px solid #eee', minHeight: 200 }}>
//             <iframe title="preview" srcDoc={previewHtml} style={{ width: '100%', height: 400, border: 0 }} />
//           </div>
//           <div className="mt-2">
//             <button className="btn btn-secondary" onClick={() => { const blob = new Blob([previewHtml], { type: 'application/msword' }); saveAs(blob, 'preview.doc'); }}>Download preview as .doc</button>
//           </div>
//         </div>
//       )}

//       <div className="text-muted small mt-3">Notes: This client-side converter produces a <strong>.doc</strong> (HTML inside) that MS Word opens. For true .docx (OpenXML) output, or for higher-accuracy OCR on scanned docs, install server-side or add <code>tesseract.js</code> and/or <code>docx</code> library — instructions below.</div>

//       <div className="mt-3 text-end">
//         <small className="text-muted">Built with: pdfjs-dist · pdf-lib (optional) · jszip · browser-image-compression · file-saver</small>
//       </div>
//     </div>
//   );
// }
