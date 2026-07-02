import React, { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../data/portfolio';

/**
 * HeroSection — Google AI-style intro with pop-in animation
 * The entire hero card pops in with spring scaling + blur reveal.
 * Sub-elements stagger in sequentially. Typing animation auto-starts.
 */
export default function HeroSection({ progress = 0 }) {
  const [typedText, setTypedText] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const [hasPopped, setHasPopped] = useState(false);
  const fullText = personalInfo.title;
  const typingRef = useRef(null);

  // Trigger pop-in after mount
  useEffect(() => {
    const timer = setTimeout(() => setHasPopped(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-start typing after pop-in completes
  useEffect(() => {
    const timer = setTimeout(() => setStartTyping(true), 1200);
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
    <div className={`hero-content ${hasPopped ? 'hero-popped' : 'hero-pre-pop'}`}>
      {/* Shimmer sweep overlay */}
      <div className="hero-shimmer" />

      {/* Greeting comment */}
      <div className="hero-greeting hero-pop-child" style={{ '--pop-delay': '0.35s' }}>
        # Hello, World! 👋
      </div>

      {/* Name */}
      <h1
        className="hero-name gradient-text hero-pop-child"
        style={{ '--pop-delay': '0.5s' }}
      >
        {personalInfo.name}
      </h1>

      {/* Title with typing */}
      <div className="hero-title-line hero-pop-child" style={{ '--pop-delay': '0.65s' }}>
        <span className="prompt">&gt;</span>
        <span>{typedText}</span>
        <span className="typing-cursor" />
      </div>

      {/* Tagline */}
      <p className="hero-tagline hero-pop-child" style={{ '--pop-delay': '0.8s' }}>
        "{personalInfo.tagline}"
      </p>

      {/* Links */}
      <div className="hero-links hero-pop-child" style={{ '--pop-delay': '0.95s' }}>
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
        <div className="hero-scroll-cue hero-pop-child" style={{ '--pop-delay': '1.3s' }}>
          <span>scroll to explore</span>
          <div className="scroll-chevron" />
        </div>
      )}
    </div>
  );
}
