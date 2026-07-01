import React from 'react';
import { personalInfo } from '../data/portfolio';

/**
 * ContactSection — Terminal-style contact section with social links
 * Rendered inside a glass window as a terminal
 */
export default function ContactSection({ progress = 0 }) {
  const showLines = Math.floor(progress * 12);

  const terminalLines = [
    {
      type: 'command',
      prompt: 'kartikey@portfolio',
      path: '~/contact',
      command: 'cat contact_info.txt',
    },
    { type: 'blank' },
    { type: 'output', text: '╔══════════════════════════════════════╗' },
    { type: 'output', text: '║     Let\'s build something great!     ║' },
    { type: 'output', text: '╚══════════════════════════════════════╝' },
    { type: 'blank' },
    {
      type: 'command',
      prompt: 'kartikey@portfolio',
      path: '~/contact',
      command: 'ls social_links/',
    },
    { type: 'blank' },
  ];

  return (
    <div className="contact-content">
      {/* Terminal output */}
      <div className="contact-terminal">
        {terminalLines.slice(0, showLines).map((line, i) => (
          <div key={i} className="terminal-line" style={{ animation: `fadeInUp 0.3s ease ${i * 0.05}s both` }}>
            {line.type === 'command' && (
              <>
                <span className="terminal-prompt">{line.prompt}</span>
                <span className="terminal-path">:{line.path}</span>
                <span className="terminal-text">$ {line.command}</span>
              </>
            )}
            {line.type === 'output' && (
              <span className="terminal-output">{line.text}</span>
            )}
            {line.type === 'blank' && <span>&nbsp;</span>}
          </div>
        ))}
      </div>

      {/* Contact links */}
      {progress > 0.4 && (
        <div className="contact-links" style={{ animation: 'fadeInUp 0.5s ease both' }}>
          <a
            href={`mailto:${personalInfo.email}`}
            className="contact-link-item"
          >
            <span className="contact-icon">📧</span>
            <span className="contact-label">email</span>
            <span className="contact-value">{personalInfo.email}</span>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-item"
          >
            <span className="contact-icon">⚡</span>
            <span className="contact-label">github</span>
            <span className="contact-value">kartikey-07</span>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-item"
          >
            <span className="contact-icon">🔗</span>
            <span className="contact-label">linkedin</span>
            <span className="contact-value">kartikey-singh</span>
          </a>

          <a
            href={`tel:${personalInfo.phone}`}
            className="contact-link-item"
          >
            <span className="contact-icon">📱</span>
            <span className="contact-label">phone</span>
            <span className="contact-value">{personalInfo.phone}</span>
          </a>

          <div className="contact-link-item" style={{ cursor: 'default', opacity: 0.6 }}>
            <span className="contact-icon">📍</span>
            <span className="contact-label">location</span>
            <span className="contact-value">{personalInfo.location}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      {progress > 0.7 && (
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          animation: 'fadeIn 0.8s ease both',
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 300,
            color: 'var(--text-muted)',
            letterSpacing: '2px',
          }}>
            Thanks for visiting ✨
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            opacity: 0.5,
            marginTop: '6px',
          }}>
            Built with React, GSAP & Glassmorphism
          </p>
        </div>
      )}
    </div>
  );
}
