import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

/**
 * PUBLIC_INTERFACE
 * Student dashboard to show profile and summary of course/test activity.
 * @param {object} props
 * @param {object} props.user - Authenticated user object
 */
function Dashboard({ user }) {
  return (
    <section className="dashboard">
      <h2>Welcome, {user?.name || user?.email}!</h2>
      <div className="dashboard-card-wrap">
        <div className="dashboard-card">
          <h4>My Courses</h4>
          <p>
            <Link to="/courses">View or register new courses →</Link>
          </p>
        </div>
        <div className="dashboard-card">
          <h4>Recent Progress</h4>
          <ul>
            <li>
              Physics Basics: <strong>Completed 2/5 tests</strong>
            </li>
            <li>
              Electromagnetism: <strong>New material available</strong>
            </li>
            <li>
              Your overall score: <span className="score">82%</span>
            </li>
          </ul>
        </div>
      </div>
      <div style={{marginTop:"2.5em", color:"#888"}}>
        Ready to continue? <Link to="/courses">Pick a course!</Link>
      </div>
    </section>
  );
}

export default Dashboard;
