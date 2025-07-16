import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Courses.css";

// Simulate backend with some mock courses
const COURSE_DATA = [
  {
    id: "phy101",
    title: "Physics Basics",
    desc: "Fundamental concepts for absolute beginners.",
    registered: true,
  },
  {
    id: "phy201",
    title: "Electromagnetism",
    desc: "Explore electric and magnetic phenomena and their interaction.",
    registered: false,
  },
  {
    id: "phy301",
    title: "Quantum Physics",
    desc: "Entering the world of uncertainty and probabilities.",
    registered: false,
  },
];

/**
 * PUBLIC_INTERFACE
 * Course registration and course browsing page.
 */
function Courses() {
  const [courses, setCourses] = useState([...COURSE_DATA]);
  const [regLoading, setRegLoading] = useState("");

  function handleRegister(id) {
    setRegLoading(id);
    setTimeout(() => {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, registered: !c.registered } : c
        )
      );
      setRegLoading("");
    }, 800);
  }

  return (
    <section className="courses-page">
      <h2>Available Courses</h2>
      <div className="course-list">
        {courses.map((c) => (
          <div key={c.id} className="course-card">
            <h4>{c.title}</h4>
            <p className="desc">{c.desc}</p>
            <div className="actions">
              <Link className="btn-small" to={`/courses/${c.id}`}>
                {c.registered ? "View" : "Preview"}
              </Link>
              <button
                className="btn-small main"
                style={{
                  background: c.registered
                    ? "#e0e0e0"
                    : "var(--primary, #b11654)",
                  color: c.registered ? "#777" : "#fff",
                  marginLeft: "0.85em",
                }}
                disabled={!!regLoading}
                onClick={() => handleRegister(c.id)}
              >
                {regLoading === c.id
                  ? "..."
                  : c.registered
                  ? "Unregister"
                  : "Register"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Courses;
