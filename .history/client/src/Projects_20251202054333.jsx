// client/src/Projects.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "./api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/projects`);
        setProjects(res.data);
      } catch (err) {
        console.error("Projects load error:", err.response?.data || err);
        setError("Failed to load projects.");
      }
    };
    load();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!projects.length) {
    return <p>Loading projects...</p>;
  }

  return (
    <div className="cards-grid">
      {projects.map((p) => (
        <article key={p._id} className="card">
          {p.image && (
            <div className="card-image-wrapper">
              <img src={p.image} alt={p.title} className="card-image" />
            </div>
          )}
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <div className="card-links">
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
            {p.url && (
              <a href={p.url} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
