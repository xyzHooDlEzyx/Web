import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer">
        <div className="footer-link" href="#">
          <a className="copy" href="#">
            <span className="copy">Copyright &copy; 2024</span>
          </a>
          <a className="logo-container" href="#">
            <img
              className="logo-img"
              src="/parrot-svgrepo-com.svg"
              alt="logo"
            />
            <p className="logo-text">zoo merch</p>
          </a>
          <div className="social-container">
            <a className="social-link" href="https://www.facebook.com">
              <img className="social-logo" src="/facebook.svg" alt="facebook" />
            </a>

            <a className="social-link" href="https://x.com">
              <img className="social-logo" src="/twitterx.svg" alt="twitter" />
            </a>

            <a className="social-link" href="https://www.instagram.com">
              <img
                className="social-logo"
                src="/instagram.svg"
                alt="instagram"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
