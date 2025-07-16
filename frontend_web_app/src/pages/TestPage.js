import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./TestPage.css";

// Small mock DB for sample questions
const QUESTION_DB = {
  phy101: [
    {
      id: "q1",
      question: "What is the SI unit of force?",
      options: ["Newton", "Joule", "Meter", "Watt"],
      answer: 0,
    },
    {
      id: "q2",
      question: "Acceleration due to gravity on Earth is approximately?",
      options: ["22 m/s²", "9.8 m/s²", "3.6 m/s²", "14 m/s²"],
      answer: 1,
    },
  ],
  phy201: [
    {
      id: "q3",
      question: "What happens when a current passes through a wire?",
      options: [
        "It produces a magnetic field",
        "Temperature decreases",
        "Wire becomes blue",
        "It radiates light always",
      ],
      answer: 0,
    },
  ],
  phy301: [
    {
      id: "q4",
      question: "Who developed the uncertainty principle?",
      options: [
        "Einstein",
        "Planck",
        "Heisenberg",
        "Schrödinger"
      ],
      answer: 2
    },
  ],
};

/**
 * PUBLIC_INTERFACE
 * Test-taking page for the selected course.
 */
function TestPage() {
  const { courseId } = useParams();
  const questions = QUESTION_DB[courseId] || [];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(qid, idx) {
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  let score = 0;
  if (submitted) {
    for (let q of questions) {
      if (answers[q.id] === q.answer) score += 1;
    }
  }

  if (!questions.length)
    return (
      <section style={{ margin: "2.5em auto", maxWidth: 600 }}>
        <h2>No test available for this course.</h2>
        <Link to="/courses" className="btn-main" style={{ marginTop: "2em" }}>
          Return to Courses
        </Link>
      </section>
    );

  return (
    <section className="test-page">
      <h2>Practice Test</h2>
      <h4>Course: <span className="course-id">{courseId}</span></h4>
      <form onSubmit={handleSubmit}>
        {questions.map((q, i) => (
          <div key={q.id} className={`test-question ${submitted ? "test-result" : ""}`}>
            <div className="q">{i + 1}. {q.question}</div>
            <div className="opts">
              {q.options.map((opt, idx) => (
                <label key={idx} className={"opt" + ((submitted && idx === q.answer) ? " correct" : "") + ((submitted && answers[q.id] === idx && idx !== q.answer) ? " wrong" : "")}>
                  <input
                    type="radio"
                    name={q.id}
                    value={idx}
                    disabled={submitted}
                    checked={answers[q.id] === idx}
                    onChange={() => handleChange(q.id, idx)}
                  />
                  {opt}
                </label>
              ))}
            </div>
            {submitted &&
              (answers[q.id] === q.answer ? (
                <div className="answer-feedback correct">Correct!</div>
              ) : (
                <div className="answer-feedback wrong">
                  Incorrect. Correct: {q.options[q.answer]}
                </div>
              ))}
          </div>
        ))}
        {!submitted && (
          <button type="submit" className="btn-main" style={{ marginTop: "1.8em" }}>
            Submit Answers
          </button>
        )}
      </form>
      {submitted && (
        <div className="scorebox">
          <p>
            Your Score: <strong>{score}</strong> / {questions.length}
          </p>
          <Link to="/dashboard" className="btn-small main" style={{marginTop:"1em"}}>
            Back to Dashboard
          </Link>
        </div>
      )}
    </section>
  );
}

export default TestPage;
