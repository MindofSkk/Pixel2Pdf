import React from "react";
import { Helmet } from "react-helmet-async";
import "./Contact.css";

const Contact: React.FC = () => {
  return (
    <div className="contact-container">
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Contact Pixel2PDF | Free Online PDF Converter & Support</title>
        <meta
          name="description"
          content="Get in touch with Pixel2PDF support. Contact us for help with PDF conversion, merging, compressing, and editing. Fast responses within 24–48 hours."
        />
        <meta
          name="keywords"
          content="Pixel2PDF contact, Pixel to PDF support, PDF tool help, free PDF converter support, merge PDF help, compress PDF support, convert Word to PDF help, Pixel2PDF email, pixels2pdf contact"
        />
          <meta name="robots" content="index, follow" />


        {/* Open Graph (for social media preview) */}
        <meta property="og:title" content="Contact Pixel2PDF | Free PDF Converter Support" />
        <meta
          property="og:description"
          content="Need help with Pixel2PDF? Contact us via email for PDF conversion, merge, compress, and editing support."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pixel2pdf.com/contact" />
        <meta property="og:site_name" content="Pixel2PDF" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Pixel2PDF | Free PDF Tool Support" />
        <meta
          name="twitter:description"
          content="Reach Pixel2PDF support for PDF conversion, merging, and editing help. We respond within 24–48 hours."
        />
      </Helmet>

      <h1>Contact Us</h1>

      <p>
        Have questions, feedback, or need support? We're here to help. Feel free to reach out
        anytime.
      </p>

      <div className="contact-info">
        <p>
          📧 Email us at:{" "}
          <a href="mailto:helpmeskk@gmail.com">helpmeskk@gmail.com</a>
        </p>
      </div>

      <p>
        We typically respond within 24–48 hours. If you're reporting an issue, please
        include details such as the tool used, the file type, and what went wrong — this
        helps us fix things faster.
      </p>

      <p>
        Thank you for using <strong>Pixel2PDF</strong> — your free and secure online PDF tool.
      </p>
    </div>
  );
};

export default Contact;
