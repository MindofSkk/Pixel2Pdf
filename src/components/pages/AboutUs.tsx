import React from "react";
import "./About.css"; // Ensure correct path

const AboutUs: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Pixel2PDF – Free Online PDF Converter & Editor</h1>

      <p>
        <strong>Pixel2PDF</strong> is a <strong>free online PDF converter and editor</strong> 
        that helps you convert, edit, compress, merge, and secure PDF documents quickly 
        and easily. Whether you need to turn Word, Excel, PowerPoint, or images into PDFs — 
        or convert PDFs back into editable formats — our all-in-one platform is designed to 
        save time and boost productivity.
      </p>

      <h2>Why Choose Pixel2PDF?</h2>
      <p>
        All tools on Pixel2PDF are <strong>completely free to use</strong> — no subscriptions, 
        no watermarks, and no hidden fees. We believe that 
        <strong> everyone should have access to professional PDF tools</strong> 
        without needing to install software or create an account.
      </p>

      <h2>Our Free PDF Tools</h2>
      <ul>
        <li>Convert to and from PDF (Word, Excel, PowerPoint, Images, Text, HTML)</li>
        <li>Merge, split, rotate, reorder, and delete PDF pages</li>
        <li>Compress PDF files and optimize them for the web</li>
        <li>Add or remove passwords, watermarks, and eSignatures</li>
        <li>OCR technology to convert scanned PDFs into editable text</li>
        <li>Batch processing, cloud integration, and easy sharing options</li>
      </ul>

      <h2>Who Can Use Pixel2PDF?</h2>
      <p>
        With a focus on <strong>simplicity, speed, and privacy</strong>, Pixel2PDF is the 
        ideal tool for students, professionals, freelancers, educators, and anyone working 
        with digital documents. Our web-based tools work seamlessly on all devices — 
        desktops, laptops, tablets, and smartphones.
      </p>

      <h2>Get Started Today</h2>
      <p>
        <strong>No registration required. No limits. Just powerful, free PDF tools at your fingertips.</strong> 
        Try Pixel2PDF today and experience the easiest way to manage your PDF documents online.
      </p>
    </div>
  );
};

export default AboutUs;
