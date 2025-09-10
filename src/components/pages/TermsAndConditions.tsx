import React from "react";
import { Helmet } from "react-helmet-async";
import "./TermsAndConditions.css";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="terms-container">
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Terms & Conditions | Pixel2PDF</title>
        <meta
          name="description"
          content="Read the Terms & Conditions of using Pixel2PDF. Learn about free usage policy, file handling, privacy, ads, donations, and user responsibilities."
        />
      </Helmet>

      <h1>Terms & Conditions</h1>
      <p><em>Last Updated: September 2025</em></p>

      <h2>1. Overview</h2>
      <p>
        <strong>Pixel2PDF</strong> provides free online PDF tools for converting, merging,
        compressing, and managing documents. By using our services, you agree to the following
        terms and conditions.
      </p>

      <h2>2. Free Usage Policy</h2>
      <p>
        Our tools are completely free to use. No registration, subscription, or software
        installation is required. We may add, modify, or remove features without prior notice.
      </p>

      <h2>3. File Handling & Privacy</h2>
      <p>
        Uploaded files are processed temporarily and automatically deleted. We do not store,
        share, or track user files. For more details, please see our{" "}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>

      <h2>4. User Responsibility</h2>
      <p>
        Users are solely responsible for the content they upload. You agree not to use our
        platform for illegal, harmful, or malicious purposes.
      </p>

      <h2>5. Google AdSense & Third-Party Ads</h2>
      <p>
        Pixel2PDF displays ads via <strong>Google AdSense</strong>. These may use cookies
        for personalization. We are not responsible for third-party websites, services, or
        products displayed in ads.
      </p>
      <p>
        Learn more:&nbsp;
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ads Data Policy
        </a>
      </p>

      <h2>6. Donations</h2>
      <p>
        Pixel2PDF is free to use. Donations are optional and do not unlock additional
        features or services.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        All logos, content, and designs on Pixel2PDF are owned by Pixel2PDF or licensed
        third parties. Unauthorized reproduction or redistribution is strictly prohibited.
      </p>

      <h2>8. Service Availability</h2>
      <p>
        We aim for maximum uptime, but services may be unavailable at times due to
        maintenance, upgrades, or unforeseen issues.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        Pixel2PDF is provided “as is.” We are not liable for data loss, file corruption,
        or damages resulting from the use of our tools.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These terms are governed by the applicable laws of your jurisdiction. Any disputes
        shall be resolved under those laws.
      </p>

      <h2>11. Changes to Terms</h2>
      <p>
        We may update these Terms & Conditions at any time. By continuing to use Pixel2PDF,
        you agree to the revised terms.
      </p>

      <h2>12. Contact</h2>
      <p>
        For questions or concerns, please contact us at:&nbsp;
        <a href="mailto:support@pixel2pdf.com">support@pixel2pdf.com</a>
      </p>
    </div>
  );
};

export default TermsAndConditions;
