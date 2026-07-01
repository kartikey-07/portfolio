import React from 'react';
import { projects } from '../data/portfolio';

/**
 * SmartScrapSection — Dedicated window for Smart Scrap project
 */
export default function SmartScrapSection({ progress = 0 }) {
  const project = projects[1]; // Smart Scrap
  if (!project) return null;

  return (
    <div className="projects-content">
      <div className="section-header">
        <div className="section-comment"># smart_scrap.py — {project.subtitle}</div>
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
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
            ⚡ GitHub
          </a>
          {project.paper && (
            <a href={project.paper} target="_blank" rel="noopener noreferrer" className="project-link">
              📄 Research Paper
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
