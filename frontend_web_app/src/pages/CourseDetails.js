import React from "react";
import { useParams, Link } from "react-router-dom";
import "./CourseDetails.css";

const COURSE_MATERIALS = {
  phy101: {
    title: "Physics Basics",
    description: "A foundation course for absolute beginners.",
    materials: [
      { id: "mat1", title: "Introduction to Physics", url: "#" },
      { id: "mat2", title: "Units and Measurements", url: "#" },
      { id: "mat3", title: "Motion and Forces", url: "#" },
    ],
  },
  phy201: {
    title: "Electromagnetism",
    description: "Explore electricity, magnetism, and their interaction.",
    materials: [
      { id: "mat4", title: "Electric Charge and Field", url: "#" },
      { id: "mat5", title: "Magnetic Effects of Current", url: "#" },
    ],
  },
  phy301: {
    title: "Quantum Physics",
    description: "Understand the basics of quantum science.",
    materials: [
      { id: "mat6", title: "Wave-Particle Duality", url: "#" },
      { id: "mat7", title: "Schrödinger Equation Basics", url: "#" },
    ],
  },
};

/**
 * PUBLIC_INTERFACE
 * Course details page: view course info, study materials, and start test.
 */
function CourseDetails() {
  const { courseId } = useParams();
  const course = COURSE_MATERIALS[courseId];
  if (!course) return <div style={{margin:"2em"}}>Course not found.</div>;

  return (
    <section className="course-details">
      <h2>{course.title}</h2>
      <div className="desc">{course.description}</div>
      <h4>Materials:</h4>
      <div className="material-list">
        {course.materials.map((mat) => (
          <div className="material-card" key={mat.id}>
            <span>{mat.title}</span>
            <a href={mat.url} className="material-link" download>
              Get PDF
            </a>
          </div>
        ))}
      </div>
      <div style={{marginTop:'1.6em'}}>
        <Link className="btn-main" to={`/test/${courseId}`}>
          Take a Practice Test →
        </Link>
      </div>
    </section>
  );
}

export default CourseDetails;
