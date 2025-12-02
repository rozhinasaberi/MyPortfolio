import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "./config";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await axios.get(`${API_BASE}/projects`);
        setProjects(res.data);
      } catch (err) {
        console.error("Project load error:", err);
        setError("Failed to load projects.");
      }
    };

    loadProjects();
  }, []);

  return (
    <div style={{ width: "70%", margin: "auto", marginTop: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Delivered Projects</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {projects.map((project) => (
        <div
          key={project._id}
          style={{
            padding: "20px",
            marginBottom: "25px",
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #ddd",
            boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
          }}
        >
          <h3>{project.title}</h3>

          <p style={{ marginTop: "10px", color: "#555" }}>
            {project.shortDescription}
          </p>

          {project.description && (
            <p style={{ marginTop: "10px", color: "#777" }}>
              {project.description}
            </p>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                color: "#0077ff",
                textDecoration: "underline",
              }}
            >
              View on GitHub
            </a>
          )}

          {project.image && (
            <div style={{ marginTop: "15px" }}>
              <img
                src={project.image}
                alt="project"
                style={{
                  width: "100%",
                  maxHeight: "350px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
