import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Auth.css";

/**
 * PUBLIC_INTERFACE
 * Login screen for Physics Learning Hub.
 * @param {object} props
 * @param {(userObj:object) => void} props.onLogin - Callback on successful login
 * @param {boolean} props.isAuthenticated - Already logged in
 */
function Login({ onLogin, isAuthenticated }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Fake login backend
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    // In production, call API instead
    setTimeout(() => {
      setLoading(false);
      if (form.email.startsWith("student") && form.password === "password") {
        onLogin({ email: form.email, name: "Student User", role: "student" });
      } else {
        setErr("Invalid credentials. Try 'student...' and password 'password'.");
      }
    }, 1000);
  }

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <section className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">
        <h2>Sign in</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            autoFocus
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            autoComplete="username"
            placeholder="student@example.com"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            autoComplete="current-password"
            placeholder="Enter password"
          />
        </div>
        {err && <div className="auth-err">{err}</div>}
        <button type="submit" className="btn-main" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
        <div className="auth-form-alt">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
