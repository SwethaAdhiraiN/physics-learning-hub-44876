import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Auth.css";

/**
 * PUBLIC_INTERFACE
 * Registration/signup screen for Physics Learning Hub.
 * @param {object} props
 * @param {(userObj:object) => void} props.onLogin - Callback when registration is successful, logs user in
 */
function Register({ onLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [registered, setRegistered] = useState(false);

  // Simulate registration, in production call API/backend
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    setTimeout(() => {
      setLoading(false);
      if (form.email && form.password && form.name) {
        setRegistered(true);
        onLogin({ email: form.email, name: form.name, role: "student" });
      } else {
        setErr("All fields are required.");
      }
    }, 1200);
  }

  if (registered) return <Navigate to="/dashboard" />;
  return (
    <section className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">
        <h2>Create Account</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            required
            value={form.name}
            autoFocus
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            autoComplete="name"
            placeholder="Full name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            autoComplete="username"
            placeholder="your@email.com"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            autoComplete="new-password"
            placeholder="Strong password"
          />
        </div>
        {err && <div className="auth-err">{err}</div>}
        <button type="submit" className="btn-main" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="auth-form-alt">
          Already registered? <Link to="/login">Sign in</Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
