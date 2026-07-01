import React, { useState, useEffect, useRef, useCallback } from 'react';
import { certifications } from '../data/portfolio';

/**
 * CertsSection — 3D Rotating Carousel of certificate cards
 * Cards fan out in a circular 3D arrangement and auto-rotate.
 * Hovering pauses rotation. Clicking opens certificate URL.
 */
export default function CertsSection({ progress = 0 }) {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  const totalCards = certifications.length;
  const angleStep = 360 / totalCards;

  // Auto-rotate animation
  useEffect(() => {
    if (progress < 0.1) return; // Don't start until section is somewhat visible

    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPaused) {
        setRotation(prev => (prev + delta * 0.015) % 360);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [isPaused, progress]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
    setActiveCard(null);
  }, []);

  const handleCardHover = useCallback((index) => setActiveCard(index), []);

  return (
    <div className="certs-content">
      {/* Header */}
      <div className="section-header">
        <div className="section-comment">// certs.json — Certifications & Achievements</div>
        <div className="section-title gradient-text">Certifications</div>
      </div>

      {/* 3D Carousel */}
      <div
        className="carousel-scene"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="carousel-ring"
          style={{
            transform: `rotateY(${-rotation}deg)`,
          }}
        >
          {certifications.map((cert, i) => {
            const angle = i * angleStep;
            const isActive = activeCard === i;

            return (
              <a
                key={i}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`carousel-card ${isActive ? 'hovered' : ''}`}
                style={{
                  '--card-angle': `${angle}deg`,
                  '--card-color': cert.color,
                  transform: `rotateY(${angle}deg) translateZ(var(--carousel-radius, 400px))`,
                }}
                onMouseEnter={() => handleCardHover(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="carousel-card-inner">
                  {/* Glow border top */}
                  <div
                    className="card-glow-top"
                    style={{ background: `linear-gradient(90deg, transparent, ${cert.color}60, transparent)` }}
                  />

                  {/* Badge */}
                  <div
                    className="carousel-badge"
                    style={{
                      background: `${cert.color}18`,
                      borderColor: `${cert.color}35`,
                      boxShadow: isActive ? `0 0 20px ${cert.color}30` : 'none',
                    }}
                  >
                    🏅
                  </div>

                  {/* Info */}
                  <div className="carousel-card-info">
                    <div className="carousel-card-name">{cert.name}</div>
                    <div className="carousel-card-org">{cert.org}</div>
                    <div className="carousel-card-meta">
                      <span
                        className="carousel-card-category"
                        style={{
                          color: cert.color,
                          background: `${cert.color}12`,
                          borderColor: `${cert.color}25`,
                        }}
                      >
                        {cert.category}
                      </span>
                      <span className="carousel-card-date">{cert.date}</span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Pause indicator */}
      <div className="carousel-hint" style={{ opacity: isPaused ? 1 : 0.4 }}>
        {isPaused ? '⏸ Paused — click a card to view' : '🔄 Auto-rotating — hover to pause'}
      </div>
    </div>
  );
}
