import React, { useRef, useState, useCallback } from 'react';
import './App.css';
import { useScrollSections, SECTIONS } from './hooks/useScrollTimeline';
import GlassWindow from './components/GlassWindow';
import ParticleBackground from './components/ParticleBackground';
import FloatingCodeWindows from './components/FloatingCodeWindows';
import FileExplorer from './components/FileExplorer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import SatyaxSection from './components/SatyaxSection';
import SmartScrapSection from './components/SmartScrapSection';
import CertsSection from './components/CertsSection';
import PublicationsSection from './components/PublicationsSection';
import ContactSection from './components/ContactSection';
import TopNavbar from './components/TopNavbar';

/**
 * App — Root component
 * Manages scroll-driven glass window transitions with a VS Code file explorer sidebar.
 */

// Map section IDs to their content components
const SECTION_COMPONENTS = {
  hero: HeroSection,
  about: AboutSection,
  skills: SkillsSection,
  satyax: SatyaxSection,
  smartscrap: SmartScrapSection,
  certs: CertsSection,
  pubs: PublicationsSection,
  contact: ContactSection,
};

export default function App() {
  const scrollRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { activeIndex, progress, sectionProgress, windowStyles } = useScrollSections(scrollRef);

  // Navigate to a section by scrolling to its position
  const navigateToSection = useCallback((sectionIndex) => {
    const container = scrollRef.current;
    if (!container) return;

    const totalHeight = container.scrollHeight;
    const sectionSize = totalHeight / SECTIONS.length;
    // Scroll to the middle of the target section for best reveal
    const targetScroll = sectionIndex * sectionSize + sectionSize * 0.35;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="app">
      {/* Top Navbar */}
      <TopNavbar activeIndex={activeIndex} onNavigate={navigateToSection} />

      {/* Animated Background */}
      <div className="bg-layer">
        <div className="bg-mesh" />
        <div className="bg-grid" />
      </div>

      {/* Floating Particles */}
      <ParticleBackground count={25} />

      {/* Floating Code Windows — Live Wallpaper (hero only) */}
      <FloatingCodeWindows visible={activeIndex === 0} />

      {/* Scroll Progress Bar */}
      <div className="scroll-progress">
        <div
          className="scroll-progress-bar"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* File Explorer Sidebar */}
      <FileExplorer
        activeIndex={activeIndex}
        onNavigate={navigateToSection}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Glass Windows — one per section */}
      {SECTIONS.map((section, i) => {
        const SectionComponent = SECTION_COMPONENTS[section.id];
        const isActive = i === activeIndex;
        const style = windowStyles[i];

        // Calculate section-local progress for content animations
        let contentProgress = 0;
        if (i === activeIndex) {
          contentProgress = Math.min(1, sectionProgress * 1.4);
        } else if (i === activeIndex + 1 && sectionProgress > 0.7) {
          contentProgress = (sectionProgress - 0.7) / 0.3 * 0.5;
        } else if (i < activeIndex) {
          contentProgress = 1;
        }

        return (
          <GlassWindow
            key={section.id}
            filename={section.filename}
            icon={section.icon}
            title={`Kartikey Singh — ${section.label}`}
            language={section.language}
            isActive={isActive}
            style={style}
            sidebarOpen={sidebarOpen}
          >
            <SectionComponent progress={contentProgress} />
          </GlassWindow>
        );
      })}

      {/* Navigation Dots */}
      <nav className="nav-dots" aria-label="Section navigation">
        {SECTIONS.map((section, i) => (
          <div
            key={section.id}
            className={`nav-dot ${i === activeIndex ? 'active' : ''}`}
            title={section.label}
            onClick={() => navigateToSection(i)}
            style={{ cursor: 'pointer' }}
          >
            <span className="nav-dot-label">{section.label}</span>
          </div>
        ))}
      </nav>

      {/* Scroll Container — creates the scroll distance */}
      <div
        ref={scrollRef}
        className="scroll-spacer"
        style={{ height: `${SECTIONS.length * 100}vh` }}
      />
    </div>
  );
}
