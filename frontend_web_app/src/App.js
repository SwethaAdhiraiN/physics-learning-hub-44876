import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import TestPage from "./pages/TestPage";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * Main App component for Physics Learning Hub.
 * Handles routing, theme, and authentication layout.
 */
function App() {
  const [theme, setTheme] = useState("light");
  const [authUser, setAuthUser] = useState(null);

  // Load user session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("physics_user");
    if (stored) setAuthUser(JSON.parse(stored));
  }, []);

  // Apply theme to HTML root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle between dark/light themes
  // PUBLIC_INTERFACE
  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  // PUBLIC_INTERFACE
  function handleLogin(userObj) {
    localStorage.setItem("physics_user", JSON.stringify(userObj));
    setAuthUser(userObj);
  }

  // PUBLIC_INTERFACE
  function handleLogout() {
    localStorage.removeItem("physics_user");
    setAuthUser(null);
  }

  // Route Guards
  function PrivateRoute({ children }) {
    return authUser ? children : <Navigate to="/login" replace />;
  }

  // Lazy load for doubts feature
  const DoubtClearance = React.lazy(() => import("./pages/DoubtClearance"));

  return (
    <Router>
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        authUser={authUser}
        onLogout={handleLogout}
      />
      <main style={{ paddingTop: 64 }}>
        <Routes>
          <Route
            path="/"
            element={
              authUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={
              <Login onLogin={handleLogin} isAuthenticated={!!authUser} />
            }
          />
          <Route
            path="/register"
            element={<Register onLogin={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard user={authUser} />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <PrivateRoute>
                <Courses />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/:courseId"
            element={
              <PrivateRoute>
                <CourseDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/test/:courseId"
            element={
              <PrivateRoute>
                <TestPage />
              </PrivateRoute>
            }
          />
          {/* Doubt Clearance Session Route */}
          <Route
            path="/doubts"
            element={
              <PrivateRoute>
                <Suspense fallback={<div>Loading...</div>}>
                  <DoubtClearance />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h2 style={{textAlign:'center',margin:'2rem'}}>404: Page Not Found</h2>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
