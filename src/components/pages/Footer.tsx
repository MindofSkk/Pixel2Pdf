const Footer = () => (
  <footer className="bg-dark text-light py-3 mt-5">
    <div className="container text-center">
      <p className="mb-1">
        &copy; {new Date().getFullYear()} Pixel2PDF. All rights reserved.
      </p>
      <p className="mb-1">
        <a href="/privacy-policy" className="text-light mx-2">Privacy Policy</a> |
        <a href="/terms-conditions" className="text-light mx-2">Terms & Conditions</a> |
        <a href="/contact-us" className="text-light mx-2">Contact Us</a>

      </p>
      <small>Made with ❤️ for productivity.</small>
    </div>
  </footer>
);

export default Footer;
