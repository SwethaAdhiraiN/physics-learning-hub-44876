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
  phy205: {
    title: "Optics",
    description: "Geometric and wave optics—explore light, lenses, mirrors, and diffraction.",
    materials: [
      { id: "mat8", title: "Reflection and Refraction", url: "#" },
      { id: "mat9", title: "Lens and Mirror Equations", url: "#" },
      { id: "mat10", title: "Interference of Light", url: "#" },
    ],
  },
  phy310: {
    title: "Thermodynamics",
    description: "The study of heat, temperature, and the laws that govern them.",
    materials: [
      { id: "mat11", title: "Zeroth, First and Second Laws", url: "#" },
      { id: "mat12", title: "Heat Engines and Refrigerators", url: "#" },
    ],
  },
  phy320: {
    title: "Nuclear Physics",
    description: "Radioactivity, nuclear reactions, and energy generation.",
    materials: [
      { id: "mat13", title: "Types of Radioactive Decay", url: "#" },
      { id: "mat14", title: "Fission and Fusion", url: "#" },
    ],
  },
  phy401: {
    title: "Astrophysics",
    description: "A tour of the cosmos, from stars to black holes.",
    materials: [
      { id: "mat15", title: "Stellar Formation and Evolution", url: "#" },
      { id: "mat16", title: "Cosmological Principles", url: "#" },
    ],
  },
  phy430: {
    title: "Solid State Physics",
    description: "Explore how crystals, metals, and semiconductors work.",
    materials: [
      { id: "mat17", title: "Crystal Lattices", url: "#" },
      { id: "mat18", title: "Electronic Properties", url: "#" },
    ],
  },
  phy450: {
    title: "Classical Mechanics",
    description: "Advanced mechanics and mathematical formulations.",
    materials: [
      { id: "mat19", title: "Lagrangian Mechanics", url: "#" },
      { id: "mat20", title: "Hamiltonian Formulation", url: "#" },
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
