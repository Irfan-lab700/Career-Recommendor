function Navbar({ setPage }) {
  return (
      <nav className="home-nav">
        <div className="home-logo">
          Career<span>AI</span>
        </div>
        <ul className="home-nav-links">
          <li onClick={() => setPage("home")}>Home</li>
          <li onClick={() => setPage("quiz")}>Quiz</li>
          <li onClick={() => setPage("resume")}>Resume</li>
        </ul>
      </nav>
  );
}

export default Navbar;