import "./Resume.css";


function ResumeResult({ result, setPage }) {
  return (
    <div className="resume-container">
      <div className="resume-card">

        <div className="resume-tag">Resume Analysis Complete</div>

        <h2 className="resume-title">Your Resume Report</h2>

        <div className="resume-result">

          <div className="ats-section">
            <div className="ats-label">ATS Score</div>
            <div className="ats-circle-wrap">
              <svg viewBox="0 0 120 120" className="ats-svg">
                <circle cx="60" cy="60" r="50" className="ats-bg-circle" />
                <circle
                  cx="60" cy="60" r="50"
                  className="ats-fill-circle"
                  strokeDasharray={`${(result?.ats_score / 100) * 314} 314`}
                />
              </svg>
              <div className="ats-score-text">
                <span className="ats-number">{result?.ats_score}</span>
                <span className="ats-total">/100</span>
              </div>
            </div>
          </div>

          <div className="skills-section">
            <div className="section-label">🧠 Skills Found</div>
            <div className="skills-badges">
              {result?.skills?.map((skill, i) => (
                <span key={i} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="analysis-section">
            <div className="section-label">🤖 AI Analysis</div>
            <div className="analysis-box">


  <h3 className="section-title">Top Careers</h3>
  <ul>
    {result.analysis?.top_careers?.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>

  <hr className="analysis-divider" />

  <h3 className="section-title">Strengths</h3>
  <ul>
    {result.analysis?.strengths?.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>

  <hr className="analysis-divider" />

  <h3 className="section-title">Weaknesses</h3>
  <ul>
    {result.analysis?.weaknesses?.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>

  <hr className="analysis-divider" />

  <h3 className="section-title">Missing Skills</h3>
  <ul>
    {result.analysis?.missing_skills?.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>

  <hr className="analysis-divider" />

  <h3 className="section-title">Improvements</h3>
  <ul>
    {result.analysis?.improvements?.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>

</div>
          </div>

        </div>

        <button className="resume-btn" style={{ marginTop: "28px", marginBottom: "0" }} onClick={() => setPage("resume")}>
          ← Analyze Another Resume
        </button>

      </div>
    </div>
  );
}

export default ResumeResult;
