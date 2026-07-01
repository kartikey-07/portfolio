import React, { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../data/portfolio';

/**
 * HeroSection — Intro window with name, title, tagline, and links
 * Content animates in automatically with staggered delays (no scroll gating).
 * Typing animation auto-starts after mount.
 */
export default function HeroSection({ progress = 0 }) {
  const [typedText, setTypedText] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const fullText = personalInfo.title;
  const typingRef = useRef(null);

  // Auto-start typing after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setStartTyping(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation
  useEffect(() => {
    if (!startTyping) return;
    if (typedText.length >= fullText.length) return;

    typingRef.current = setTimeout(() => {
      setTypedText(fullText.slice(0, typedText.length + 1));
    }, 50);

    return () => clearTimeout(typingRef.current);
  }, [startTyping, typedText, fullText]);

  return (
    <div className="hero-content">
      {/* Greeting comment */}
      <div className="hero-greeting" style={{ animation: 'fadeInUp 0.6s ease 0.1s both' }}>
        # Hello, World! 👋
      </div>

      {/* Name */}
      <h1
        className="hero-name gradient-text"
        style={{ animation: 'fadeInUp 0.6s ease 0.25s both' }}
      >
        {personalInfo.name}
      </h1>

      {/* Title with typing */}
      <div className="hero-title-line" style={{ animation: 'fadeInUp 0.6s ease 0.4s both' }}>
        <span className="prompt">&gt;</span>
        <span>{typedText}</span>
        <span className="typing-cursor" />
      </div>

      {/* Tagline */}
      <p className="hero-tagline" style={{ animation: 'fadeInUp 0.6s ease 0.55s both' }}>
        "{personalInfo.tagline}"
      </p>

      {/* Links */}
      <div className="hero-links" style={{ animation: 'fadeInUp 0.6s ease 0.7s both' }}>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-link"
        >
          <span className="link-icon">⚡</span>
          GitHub
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-link"
        >
          <span className="link-icon">🔗</span>
          LinkedIn
        </a>
        <a href={`mailto:${personalInfo.email}`} className="hero-link">
          <span className="link-icon">📧</span>
          Email
        </a>
        <a
          href={personalInfo.resumeFile}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-link"
          style={{ borderColor: 'rgba(6, 182, 212, 0.2)', color: 'var(--neon-cyan)' }}
        >
          <span className="link-icon">📄</span>
          Resume
        </a>
      </div>

      {/* Scroll cue */}
      {progress < 0.6 && (
        <div className="hero-scroll-cue" style={{ animation: 'fadeIn 1s ease 1.2s both' }}>
          <span>scroll to explore</span>
          <div className="scroll-chevron" />
        </div>
      )}
    </div>
  );
}
