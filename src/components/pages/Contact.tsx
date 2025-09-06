import React from "react";
import "./Contact.css"; // Optional CSS styling

const Contact: React.FC = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <p>
        Have questions, feedback, or need support? We're here to help. Feel free to reach out
        anytime.
      </p>

      <div className="contact-info">
        <p>
          📧 Email us at:{' '}
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
