import React from "react";
import { Helmet } from "react-helmet-async";
import "./PrivacyPolicy.css";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-container">
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Privacy Policy | Pixel2PDF</title>
        <meta
          name="description"
          content="Pixel2PDF Privacy Policy - Learn how we protect your privacy, keep your files secure, and ensure safe online PDF conversions."
        />
      </Helmet>

      <h1>Privacy Policy</h1>
      <p><em>Last Updated: September 2025</em></p>

      <p>
        <strong>Pixel2PDF</strong> is committed to protecting your privacy. Our online PDF tools are
        free, safe, and designed with your security and anonymity in mind.
      </p>

      <h2>1. No Login or Signup Required</h2>
      <p>
        You can use all our tools without creating an account. We never ask for personal
        information or email addresses.
      </p>

      <h2>2. No File Storage</h2>
      <p>
        We do not store or save your uploaded files. All processing happens temporarily and
        securely. Files are deleted automatically after conversion.
      </p>

      <h2>3. No Data Collection</h2>
      <p>
        Pixel2PDF does not collect, store, or share any personal data. We do not use analytics
        or tracking tools that identify individual users.
      </p>

      <h2>4. Ads by Google AdSense</h2>
      <p>
        We use <strong>Google AdSense</strong> to support our free service. Google may use
        cookies to display personalized ads. You can manage your ad preferences through your
        Google account.
      </p>
      <p>
        Learn more:&nbsp;
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Ads Privacy Policy"
        >
          Google Ads Policy
        </a>
      </p>

      <h2>5. Optional Donations</h2>
      <p>
        Pixel2PDF is free to use. Donations are voluntary and not required to access any feature.
      </p>

      <h2>6. Cookies</h2>
      <p>
        We only use cookies for ad functionality via Google AdSense. No tracking or profiling cookies are used.
      </p>

      <h2>7. Children's Privacy</h2>
      <p>
        We do not knowingly collect or store information from children under 13 years of age.
      </p>

      <h2>8. Policy Updates</h2>
      <p>
        This Privacy Policy may be updated as needed to comply with legal or service changes.
        Please check back periodically.
      </p>

      <h2>9. Contact</h2>
      <p>
        For any privacy-related concerns, please contact us at:&nbsp;
        <a href="mailto:support@pixel2pdf.com">support@pixel2pdf.com</a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
