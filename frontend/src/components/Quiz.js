import "./Quiz.css";
import { useState } from "react";
const questions = [
  "I enjoy solving algorithmic problems and competitive programming.",
  "I am comfortable with Math — statistics, probability, and linear algebra.",
  "I find topics like robotics, automation, and space tech exciting.",
  "I like working with circuits, hardware, and electrical systems.",
  "I enjoy building and deploying full-stack web applications.",
  "I am passionate about training ML models and AI research.",
  "I love analyzing data, finding patterns, and making visualizations.",
  "I enjoy designing user interfaces, color schemes, and user experience.",
  "I am interested in network security, ethical hacking, and protecting systems.",
  "I enjoy game design, graphics programming, and building interactive experiences."
];

function Quiz({ onSubmit }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [current, setCurrent] = useState(0);
  const progress = ((current + 1) / questions.length) * 100;

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
  if (answers[current] === null) {
    alert("Please select an option");
    return;
  }

  if (current < questions.length - 1) {
    setCurrent(current + 1);
  } else {
    onSubmit(answers);
  }
};
  const handlePrev = () => {
  if (current > 0) setCurrent(current - 1);
};

  return (
  <div className="quiz-container">
      <div className="quiz-card">

        <div className="quiz-progress-label">
          Question {current + 1} / {questions.length}
        </div>

        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <p className="question">{questions[current]}</p>

        <div className="scale">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className={answers[current] === num ? "active" : ""}
              onClick={() => handleChange(current, num)}
            >
              {num}
            </button>
          ))}
        </div>

        <div className="nav-btns">
          <button onClick={handlePrev} disabled={current === 0}>
            Prev
          </button>
          <button onClick={handleSubmit}>
            {current === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>

      </div>
    </div>
);
}

export default Quiz;