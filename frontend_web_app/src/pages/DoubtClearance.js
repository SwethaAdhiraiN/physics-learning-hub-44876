import React, { useState } from "react";
import "./DoubtClearance.css";

/**
 * PUBLIC_INTERFACE
 * Doubt Clearance Session page for students to submit, track, and resolve their physics questions.
 */
function DoubtClearance() {
  // Mock list of topics (TODO: centralize if needed)
  const topicList = [
    "Physics Basics",
    "Electromagnetism",
    "Quantum Physics",
    "Optics",
    "Thermodynamics",
    "Nuclear Physics",
    "Astrophysics",
    "Solid State Physics",
    "Classical Mechanics",
  ];

  // Local state for questions/doubts
  const [doubts, setDoubts] = useState([
    {
      id: 1,
      topic: "Electromagnetism",
      text: "Why does current create a magnetic field?",
      resolved: false,
      reply: "",
      time: Date.now() - 200000,
    },
    {
      id: 2,
      topic: "Thermodynamics",
      text: "What does entropy practically mean?",
      resolved: true,
      reply: "Entropy measures the disorder - higher entropy means more randomness.",
      time: Date.now() - 1800000,
    },
  ]);
  const [form, setForm] = useState({ topic: "", text: "" });
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!form.topic || !form.text.trim()) {
      setErr("Please select a topic and describe your doubt.");
      return;
    }
    // Simulate sending
    setSending(true);
    setTimeout(() => {
      setDoubts((prev) => [
        {
          id: prev.length ? Math.max(...prev.map((d) => d.id)) + 1 : 1,
          topic: form.topic,
          text: form.text.trim(),
          resolved: false,
          reply: "",
          time: Date.now(),
        },
        ...prev,
      ]);
      setSending(false);
      setForm({ topic: "", text: "" });
    }, 900);
  }

  // PUBLIC_INTERFACE
  function markResolved(id) {
    setDoubts((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, resolved: true, reply: "Marked as resolved by student." } : d
      )
    );
  }

  // Filter by topic/search if needed
  const filtered = doubts.filter(
    (d) =>
      (!search ||
        (d.text + d.topic)
          .toLowerCase()
          .includes(search.toLowerCase()))
  );

  return (
    <section className="doubt-clearance-page">
      <h2>Doubt Clearance Session</h2>
      <div className="doubt-form-box">
        <form onSubmit={handleSubmit} className="doubt-form">
          <div className="form-row">
            <label>Physics Topic</label>
            <select
              value={form.topic}
              onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
              required
            >
              <option value="">-- Select --</option>
              {topicList.map((t) => (
                <option value={t} key={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>Describe your doubt</label>
            <textarea
              rows={3}
              value={form.text}
              onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
              placeholder="Explain your question or problem..."
              required
            />
          </div>
          {err && <div className="form-err">{err}</div>}
          <button
            type="submit"
            className="btn-main"
            disabled={sending}
            style={{ marginTop: 10 }}
          >
            {sending ? "Submitting..." : "+ Submit Doubt"}
          </button>
        </form>
      </div>

      <div className="doubt-list-section">
        <h3 style={{ marginTop: "2em", fontWeight: 500 }}>
          My Previous Doubts
        </h3>
        <input
          className="doubt-search"
          type="text"
          placeholder="Search your doubts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="doubt-list">
          {filtered.length === 0 && (
            <div className="no-doubts">No doubts found.</div>
          )}
          {filtered.map((d) => (
            <div className={"doubt-card" + (d.resolved ? " resolved" : "")} key={d.id}>
              <div className="doubt-topic">{d.topic}</div>
              <div className="doubt-text">{d.text}</div>
              <div className="doubt-meta">
                <span className="doubt-status">
                  Status:{" "}
                  <span className={d.resolved ? "stat-resolved" : "stat-pending"}>
                    {d.resolved ? "Resolved" : "Pending"}
                  </span>
                </span>
                <span className="doubt-time">
                  {new Date(d.time).toLocaleString()}
                </span>
              </div>
              {d.reply && (
                <div className="doubt-reply">
                  <span style={{ color: "#22a673" }}>Reply:</span> {d.reply}
                </div>
              )}
              {!d.resolved && (
                <button
                  className="btn-small"
                  style={{ marginTop: 10 }}
                  onClick={() => markResolved(d.id)}
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DoubtClearance;
