import { useState } from "react";
import Quiz from "./components/Quiz";
import Resume from "./components/Resume";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Result from "./components/Result";
import "./App.css";
import ResumeResult from "./components/ResumeResult";
import Footer from "./components/Footer";

function App() {
  const [result, setResult] = useState(null);
  const [resumeResult, setResumeResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("home");
  const API = process.env.REACT_APP_API_URL;

  const uploadResume = async (file) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      

      const response = await fetch(`${API}/analyze_resume`,{
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setResumeResult(data);
      setPage("resume-result");

    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (answers) => {
    try {
      setLoading(true);
      setPage("loading");

      const response = await fetch(`${API}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q1: answers[0],
          q2: answers[1],
          q3: answers[2],
          q4: answers[3],
          q5: answers[4],
          q6: answers[5],
          q7: answers[6],
          q8: answers[7],
          q9: answers[8],
          q10: answers[9],
        }),
      });

      const data = await response.json();
      setResult(data);
      setPage("result");

    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div>

    <Navbar setPage={setPage} />

    {page === "home" && <Home setPage={setPage} />}

    {page === "quiz" && (
      <Quiz onSubmit={handleSubmit} loading={loading} />
    )}

    {page === "loading" && (
      <div className="loading-page">
       <div className="spinner"></div>
        <h2>🤖 Analyzing your interests and generating personalized career insights...</h2>
        <p>Please wait...</p>
      </div>
    )}
    {page === "result" && result && (
     <Result result={result} setPage={setPage} />
    )}
    {page === "resume" && <Resume onUpload={uploadResume} loading = {loading} result = {resumeResult}/>}
    {page === "resume-result" && <ResumeResult result={resumeResult} setPage={setPage} />}
    <Footer />

  </div>
);
}

export default App;