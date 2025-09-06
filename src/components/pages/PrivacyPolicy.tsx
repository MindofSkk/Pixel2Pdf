import React from "react";
import "./PrivacyPolicy.css"; // Ensure this file is imported

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>

      <p>
        <strong>Pixel2PDF</strong> is committed to protecting your privacy. Our online PDF tools are
        completely free, and designed with your safety and anonymity in mind.
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
        Pixel2PDF does not collect, store, or share any personal user data. We do not use
        analytics or tracking tools that identify individual users.
      </p>

      <h2>4. Ads by Google AdSense</h2>
      <p>
        We use <strong>Google AdSense</strong> to support our free service. Google may use
        cookies to display personalized ads. You can manage your ad preferences through your
        Google account.
      </p>
      <p>
        Learn more here:&nbsp;
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://policies.google.com/technologies/ads
        </a>
      </p>

      <h2>5. Optional Donations</h2>
      <p>
        Pixel2PDF is free to use. If you’d like to support us, you may donate voluntarily.
        Donations are appreciated but not required to access any features.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Pixel2PDF uses cookies only for ad functionality via Google AdSense. We do not use
        cookies for tracking, analytics, or profiling.
      </p>

      <h2>7. Children's Privacy</h2>
      <p>
        We do not knowingly collect or store information from children under 13 years of age.
        Our services are safe to use but not targeted at minors.
      </p>

      <h2>8. Policy Updates</h2>
      <p>
        We may update this Privacy Policy to reflect changes in our services or legal
        requirements. Please check this page periodically.
      </p>

      <h2>9. Contact</h2>
      <p>
        For any questions or concerns about this Privacy Policy, please contact us at:&nbsp;
        <a href="mailto:support@pixel2pdf.com">support@pixel2pdf.com</a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
