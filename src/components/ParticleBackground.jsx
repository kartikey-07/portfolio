import React, { useMemo } from 'react';

/**
 * ParticleBackground — lightweight CSS-based floating particles
 * No Three.js needed. Uses CSS animations for ambient motion.
 */
export default function ParticleBackground({ count = 30 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 20,
      duration: Math.random() * 15 + 20,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, [count]);

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
