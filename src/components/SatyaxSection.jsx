import React from 'react';
import { projects } from '../data/portfolio';

/**
 * SatyaxSection — Dedicated window for SatyaX project
 */
export default function SatyaxSection({ progress = 0 }) {
  const project = projects[0]; // SatyaX
  if (!project) return null;

  return (
    <div className="projects-content">
      <div className="section-header">
        <div className="section-comment"># satyax.py — {project.subtitle}</div>
      </div>

      <div
        className="project-card"
        style={{
          animation: progress > 0.1 ? 'slideUp 0.5s ease both' : 'none',
          opacity: progress > 0.1 ? undefined : 0,
          borderLeftColor: project.color,
          borderLeftWidth: '3px',
        }}
      >
        <div className="project-header">
          <div>
            <div className="project-title" style={{ color: project.color }}>
              {project.title}
            </div>
            <div className="project-subtitle">{project.subtitle}</div>
          </div>
          <div className="project-date">{project.date}</div>
        </div>

        <div className="project-description">{project.description}</div>

        {project.highlights && (
          <ul className="project-highlights">
            {project.highlights.map((h, j) => (
              <li
                key={j}
                style={{
                  animation: progress > 0.3 ? `fadeInUp 0.3s ease ${j * 0.05 + 0.2}s both` : 'none',
                  opacity: progress > 0.3 ? undefined : 0,
                }}
              >
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="project-tech">
          {project.tech.map((t, j) => (
            <span
              key={j}
              className="tech-tag"
              style={{
                borderColor: `${project.color}30`,
                color: project.color,
                background: `${project.color}10`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="project-links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
              ↗ Live Demo
            </a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
            ⚡ GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
