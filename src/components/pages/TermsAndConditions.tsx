import React from "react";
import "./TermsAndConditions.css";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="terms-container">
      <h1>Terms & Conditions</h1>
      <p><strong>Last Updated:</strong> [Insert Date]</p>

      <h2>1. Overview</h2>
      <p>
        Pixel2PDF provides free online PDF tools that help users convert, edit, compress,
        and manage PDF documents. By using our website, you agree to the following terms.
      </p>

      <h2>2. Free Usage Policy</h2>
      <p>
        All tools are completely free. No registration, subscription, or downloads required.
        We may update or remove tools at any time.
      </p>

      <h2>3. File Handling & Privacy</h2>
      <p>
        We do not store your files. All uploads are temporary and automatically deleted.
        We do not collect personal data or use tracking technologies.
        See our <a href="/privacy-policy">Privacy Policy</a>.
      </p>

      <h2>4. User Responsibility</h2>
      <p>
        Users are responsible for the content they upload. Do not use the platform for
        unlawful or harmful activities.
      </p>

      <h2>5. Google AdSense & Third-Party Ads</h2>
      <p>
        Pixel2PDF displays ads using Google AdSense. These ads may use cookies to improve
        relevance. We are not responsible for third-party products or services.
      </p>
      <p>
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about how Google uses data in ads
        </a>
      </p>

      <h2>6. Donations</h2>
      <p>
        Supporters may voluntarily donate to help us maintain the platform. Donations are
        optional and do not unlock additional features.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        All logos, content, and designs on this site are property of Pixel2PDF or respective
        third-party owners. Reuse without permission is prohibited.
      </p>

      <h2>8. Service Availability</h2>
      <p>
        We strive for high uptime, but Pixel2PDF may go offline occasionally for maintenance
        or upgrades.
      </p>

      <h2>9. Changes to Terms</h2>
      <p>
        We may update these terms at any time. Continued use of Pixel2PDF means you accept
        the updated terms.
      </p>

      <h2>10. Contact</h2>
      <p>
        Email us at <a href="mailto:support@pixel2pdf.com">support@pixel2pdf.com</a> with
        questions about these terms.
      </p>
    </div>
  );
};

export default TermsAndConditions;
