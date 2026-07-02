import React from 'react';
import './TopNavbar.css';

const NAV_LINKS = [
  { label: 'ABOUT', index: 1 },
  { label: 'SKILLS', index: 2 },
  { label: 'PROJECTS', index: 3 }, // Fallback to satyax
  { label: 'CERTS', index: 5 }, // Certifications
  { label: 'CONTACT', index: 7 },
];

export default function TopNavbar({ activeIndex, onNavigate }) {
  return (
    <header className="top-navbar">
      <div className="navbar-logo">
        <span className="logo-box">&gt;_</span>
        <span className="logo-text">
          <span className="logo-highlight">KS.</span>DEV
        </span>
      </div>
      
      <nav className="navbar-links">
        {NAV_LINKS.map((link) => (
          <button 
            key={link.label}
            className={`nav-link ${activeIndex === link.index ? 'active' : ''}`}
            onClick={() => onNavigate(link.index)}
          >
            {link.label}
          </button>
        ))}
      </nav>
      
      <div className="navbar-actions">
        <a href="#" className="resume-btn" onClick={(e) => e.preventDefault()}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          RESUME
        </a>
      </div>
    </header>
  );
}
