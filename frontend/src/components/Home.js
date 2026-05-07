import "./Home.css";
function Home({ setPage }) {
  return (
    <div className="home-root">

      <section className="home-hero">
        <div className="home-badge">AI-Powered Career Intelligence</div>
        <h1 className="home-hero-title">
          Find Your <span className="home-accent">Ideal Career</span> with AI Guidance
        </h1>
        <p className="home-hero-subtitle">
          Discover your perfect career through ML-powered quiz analysis, get AI-generated roadmaps, and analyze your resume for ATS score and skill gaps.
        </p>
        <div className="home-buttons">
          <button className="home-career-btn" onClick={() => setPage("quiz")}>
            Take Career Quiz
          </button>
          <button className="home-resume-btn" onClick={() => setPage("resume")}>
            Analyze Resume
          </button>
        </div>
      </section>

      <section className="home-img-section">
        <p className="home-section-label">Explore Features</p>
        <div className="home-images-row">
          <div className="home-img-card" onClick={() => setPage("quiz")}>
            <img src="/images/img1.png" alt="Career Quiz" />
            <div className="home-img-label">Career Prediction</div>
            <div className="home-img-sublabel">ML-powered quiz to find your path</div>
          </div>
          <div className="home-img-card" onClick={() => setPage("resume")}>
            <img src="/images/img2.png" alt="Resume Analyzer" />
            <div className="home-img-label">Resume Analyzer</div>
            <div className="home-img-sublabel">AI insights and skill gap analysis</div>
          </div>
          <div className="home-img-card" onClick={() => setPage("resume")}>
            <img src="/images/img3.png" alt="Job Matcher" />
            <div className="home-img-label">ATS Score</div>
            <div className="home-img-sublabel">Score your resume, Find Insights</div>
          </div>
        </div>
      </section>

      <section className="home-cards-section">
        <div className="home-cards-grid">
          <div className="home-card" onClick={() => setPage("quiz")}>
            <div className="home-card-title">Career Prediction</div>
            <div className="home-card-desc">
              Discover the best career based on your skills and interests using our ML models.
            </div>
            <div className="home-card-link">Start Quiz →</div>
          </div>
          <div className="home-card" onClick={() => setPage("resume")}>
            <div className="home-card-title">Resume Analyzer</div>
            <div className="home-card-desc">
              Get AI-powered insights on your resume's strengths, weaknesses, and skill gaps.
            </div>
            <div className="home-card-link">Analyze Now →</div>
          </div>
          <div className="home-card" onClick={() => setPage("resume")}>
            <div className="home-card-title">ATS and Job Matcher</div>
            <div className="home-card-desc">
              Check ATS compatibility score and discover job roles that match your profile.
            </div>
            <div className="home-card-link">Find Jobs →</div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;