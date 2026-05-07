import { useState } from "react";
import "./Resume.css";
function Resume({ onUpload, result,loading }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleUpload = () => {
    if (!file) {
      alert("Please select a resume PDF first");
      return;
    }
    onUpload(file);
  };
  if (loading) {
  return (
    <div className="loading-page">
      <div className="spinner"></div>
      <h2>🤖 AI is analyzing your resume...</h2>
      <p>Please wait...</p>
    </div>
  );
}

  return (
    <div className="resume-container">
      <div className="resume-card">

        <div className="resume-tag">Resume Analyzer</div>
        <h2 className="resume-title">Analyze Your Resume</h2>
        <p className="resume-subtitle">Upload your PDF to get ATS score, skill insights, and AI-powered feedback.</p>

        <div className="resume-upload-area">
          <input
  type="file"
  accept="application/pdf"
  onChange={(e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name);
  }}
  className="resume-file-input"
  id="resume-file"
/>
          <label htmlFor="resume-file" className="resume-file-label">
            📎 Choose PDF File
          </label>
          {fileName && <p className="resume-file-name">Selected file: {fileName}</p>}
        </div>

        <button className="resume-btn" onClick={handleUpload}>
          Analyze Resume
        </button>

      </div>
    </div>
  );
}

export default Resume;