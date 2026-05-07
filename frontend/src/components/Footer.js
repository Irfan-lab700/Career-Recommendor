import "./Footer.css";

function Footer({setPage}) {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <span className="footer-logo">CareerAI</span>
          <p className="footer-tagline">Your AI-powered career companion.</p>
        </div>

        <div className="footer-links">
          <a href="https://github.com/Irfan-lab700" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/irfan-khan-92185031b" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://irfan-lab700.github.io/-Personal-Portfolio" target="_blank" rel="noreferrer">
            Portfolio
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 CareerAI. Built by Irfan Khan.
      </div>
    </footer>
  );
}

export default Footer;