import "./Result.css";
function Result({ result, setPage }) {
 return (
  <div className="result-container">
      <div className="result-card">

      <div className="result-tag">Your Career Match</div>
        <h1 className="career">
          {result?.career?.[0]}
        </h1>

        <div className="confidence-badge">
          Confidence — {(result?.career?.[1] * 100).toFixed(1)}%
        </div>

        <div className="llm-section">
          <div className="llm-label">AI Analysis & Roadmap</div>
          <div className="llm">


  <h3 className="section-title">Reason</h3>
  <p>{result?.llm_output?.reason}</p>

  <hr className="llm-divider" />


  <h3 className="section-title">Roadmap</h3>

  <div>
    <h4>Month 1</h4>
    <ul>
      {result?.llm_output?.roadmap?.month_1?.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    <h4>Month 2</h4>
    <ul>
      {result?.llm_output?.roadmap?.month_2?.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    <h4>Month 3</h4>
    <ul>
      {result?.llm_output?.roadmap?.month_3?.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>

  <hr className="llm-divider" />

  <h3 className="section-title">Skills Required</h3>
  <ul>
    {result?.llm_output?.skills_required?.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>


  <hr className="llm-divider" /> 

   <h3 className="section-title">Tools / Technologies</h3>
  <ul>
    {result?.llm_output?.tools?.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>


</div>
   </div>

        <button className="result-btn" onClick={() => setPage("home")}>
          ← Back to Home
        </button>

      </div>
    </div>
);
}

export default Result;