import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Section definitions — each section gets a glass window
export const SECTIONS = [
  { id: 'hero',       label: 'Intro',           filename: 'intro.py',        icon: '🐍', language: 'Python' },
  { id: 'about',      label: 'About',           filename: 'about.md',        icon: '📝', language: 'Markdown' },
  { id: 'skills',     label: 'Skills',          filename: 'skills.json',     icon: '📊', language: 'JSON' },
  { id: 'satyax',     label: 'SatyaX',          filename: 'satyax.py',       icon: '🐍', language: 'Python' },
  { id: 'smartscrap', label: 'Smart Scrap',     filename: 'smart_scrap.py',  icon: '🐍', language: 'Python' },
  { id: 'certs',      label: 'Certifications',  filename: 'certs.json',      icon: '🏅', language: 'JSON' },
  { id: 'pubs',       label: 'Publications',    filename: 'research.bib',    icon: '📄', language: 'BibTeX' },
  { id: 'contact',    label: 'Contact',         filename: 'connect',         icon: '💻', language: 'Bash' },
];

/**
 * useScrollSections — Tracks scroll progress and determines the active section.
 * Each section occupies an equal fraction of the total scroll height.
 *
 * Returns:
 *   activeIndex  – index of the currently active section (0-based)
 *   progress     – global scroll progress (0 to 1)
 *   sectionProgress – local progress within the active section (0 to 1)
 *   windowStyles – an array of inline style objects for each window (GSAP-driven)
 */
export function useScrollSections(scrollContainerRef) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [windowStyles, setWindowStyles] = useState(
    SECTIONS.map((_, i) => ({
      opacity: i === 0 ? 1 : 0,
      transform: i === 0 ? 'scale(1) translateY(0px)' : 'scale(1.08) translateY(40px)',
      filter: i === 0 ? 'blur(0px)' : 'blur(10px)',
    }))
  );

  const progressRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    const numSections = SECTIONS.length;

    const tick = () => {
      const p = progressRef.current;
      const sectionSize = 1 / numSections;

      // Determine active section
      const rawIndex = p / sectionSize;
      const currentIndex = Math.min(Math.floor(rawIndex), numSections - 1);
      const localP = (p - currentIndex * sectionSize) / sectionSize;

      setActiveIndex(currentIndex);
      setProgress(p);
      setSectionProgress(Math.max(0, Math.min(1, localP)));

      // Calculate styles for each window
      const styles = SECTIONS.map((_, i) => {
        if (i === currentIndex) {
          // Active window — fully visible, but starts to exit near the end of its section
          if (i < numSections - 1 && localP > 0.7) {
            // Exiting: scale down, fade, blur
            const exitP = (localP - 0.7) / 0.3; // 0 to 1 over last 30%
            const eased = easeInOutCubic(exitP);
            return {
              opacity: 1 - eased * 0.9,
              transform: `scale(${1 - eased * 0.12}) translateY(${-eased * 50}px)`,
              filter: `blur(${eased * 8}px)`,
            };
          }
          // Fully visible
          return {
            opacity: 1,
            transform: 'scale(1) translateY(0px)',
            filter: 'blur(0px)',
          };
        } else if (i === currentIndex + 1) {
          // Next window — starts entering in the last 30% of current section
          if (localP > 0.7) {
            const enterP = (localP - 0.7) / 0.3;
            const eased = easeInOutCubic(enterP);
            return {
              opacity: eased,
              transform: `scale(${1.08 - eased * 0.08}) translateY(${40 - eased * 40}px)`,
              filter: `blur(${10 - eased * 10}px)`,
            };
          }
          // Hidden
          return {
            opacity: 0,
            transform: 'scale(1.08) translateY(40px)',
            filter: 'blur(10px)',
          };
        } else if (i < currentIndex) {
          // Previous windows — fully exited
          return {
            opacity: 0,
            transform: 'scale(0.88) translateY(-50px)',
            filter: 'blur(8px)',
          };
        } else {
          // Future windows — hidden below
          return {
            opacity: 0,
            transform: 'scale(1.08) translateY(40px)',
            filter: 'blur(10px)',
          };
        }
      });

      setWindowStyles(styles);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      trigger.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollContainerRef]);

  return { activeIndex, progress, sectionProgress, windowStyles };
}

function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default useScrollSections;
