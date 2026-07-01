import React from 'react';
import { personalInfo, education } from '../data/portfolio';

/**
 * AboutSection — Markdown-style bio with education and contact info
 * Rendered inside a glass window as about.md
 */
export default function AboutSection({ progress = 0 }) {
  const revealCount = Math.floor(progress * 16);

  const lines = [
    { type: 'comment', content: '# About Me' },
    { type: 'blank' },
    { type: 'text', content: 'Computer Science Engineering graduate specializing in' },
    { type: 'highlight', content: 'Python, AI/ML, and back-end development.' },
    { type: 'blank' },
    { type: 'text', content: "I've built and deployed production-grade NLP systems" },
    { type: 'text', content: 'using BERT, GPT-2, and Google Gemini API.' },
    { type: 'blank' },
    { type: 'text', content: 'Experienced with Flask-based web applications,' },
    { type: 'text', content: 'REST APIs, and database-driven architectures.' },
    { type: 'blank' },
    { type: 'text', content: 'I believe in building technology that fights misinformation,' },
    { type: 'text', content: 'promotes sustainability, and pushes the boundaries of AI.' },
    { type: 'blank' },
    { type: 'comment', content: '---' },
    { type: 'blank' },
  ];

  return (
    <div className="about-content">
      {/* Markdown-style lines */}
      {lines.slice(0, revealCount).map((line, i) => (
        <div
          key={i}
          className="code-line"
          style={{ animation: `fadeInUp 0.3s ease ${i * 0.02}s both` }}
        >
          <span className="line-number">{i + 1}</span>
          <span className={`line-content ${getLineClass(line.type)}`}>
            {line.type === 'blank' ? '\u00A0' : line.content}
          </span>
        </div>
      ))}

      {/* Info cards */}
      {progress > 0.5 && (
        <div
          className="about-info-grid"
          style={{ animation: 'fadeInUp 0.5s ease both', marginTop: '16px' }}
        >
          <div className="about-info-item">
            <span className="info-icon">🎓</span>
            <div>
              <div className="info-label">Education</div>
              <div className="info-value">{education.degree}</div>
            </div>
          </div>
          <div className="about-info-item">
            <span className="info-icon">🏫</span>
            <div>
              <div className="info-label">University</div>
              <div className="info-value">AKTU, Lucknow</div>
            </div>
          </div>
          <div className="about-info-item">
            <span className="info-icon">📅</span>
            <div>
              <div className="info-label">Period</div>
              <div className="info-value">{education.period}</div>
            </div>
          </div>
          <div className="about-info-item">
            <span className="info-icon">📊</span>
            <div>
              <div className="info-label">CGPA</div>
              <div className="info-value">{education.cgpa}</div>
            </div>
          </div>
          <div className="about-info-item">
            <span className="info-icon">📍</span>
            <div>
              <div className="info-label">Location</div>
              <div className="info-value">{personalInfo.location}</div>
            </div>
          </div>
          <div className="about-info-item">
            <span className="info-icon">📧</span>
            <div>
              <div className="info-label">Email</div>
              <div className="info-value">{personalInfo.email}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getLineClass(type) {
  switch (type) {
    case 'comment': return 'syn-keyword';
    case 'highlight': return 'syn-function';
    case 'string': return 'syn-string';
    default: return '';
  }
}
