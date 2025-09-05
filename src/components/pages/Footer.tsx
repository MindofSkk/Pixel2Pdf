const Footer = () => (
  <footer className="bg-dark text-light pt-4 pb-2 mt-5">
    <div className="container">
      <div className="row text-center text-md-left">
        {/* Left Column */}
        <div className="col-md-6 mb-3 mb-md-0">
          <h5 className="text-uppercase">Pixel2PDF</h5>
          <p className="small mb-0">
            &copy; {new Date().getFullYear()} Pixel2PDF. All rights reserved.
          </p>
          <small>Made with ❤️ for productivity.</small>
        </div>

        {/* Right Column - Links */}
        <div className="col-md-6 d-flex justify-content-center justify-content-md-end align-items-center gap-3">
          <a href="/privacy-policy" className="text-light text-decoration-none">Privacy Policy</a>
          <span className="text-light">|</span>
          <a href="/terms-conditions" className="text-light text-decoration-none">Terms & Conditions</a>
          <span className="text-light">|</span>
          <a href="/contact-us" className="text-light text-decoration-none">Contact Us</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
