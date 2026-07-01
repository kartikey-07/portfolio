import React from 'react';

/**
 * GlassWindow — A VS Code-style glassmorphism window component
 * Each portfolio section gets wrapped in one of these.
 *
 * Props:
 *   filename  – displayed in the active tab (e.g. "intro.py")
 *   icon      – emoji icon for the tab
 *   title     – window title bar text
 *   language  – language label for status bar
 *   isActive  – whether this window is currently visible
 *   style     – GSAP-driven inline styles (transform, opacity, filter)
 *   children  – section content
 */
export default function GlassWindow({
  filename = 'untitled',
  icon = '📄',
  title = 'Kartikey Singh — Portfolio',
  language = 'Python',
  isActive = false,
  sidebarOpen = false,
  style = {},
  children,
}) {
  return (
    <div
      className={`glass-window-wrapper ${isActive ? 'active' : ''} ${sidebarOpen ? 'sidebar-open' : ''}`}
      style={{
        ...style,
        visibility: style.opacity === 0 ? 'hidden' : 'visible',
      }}
    >
      <div className="glass-window">
        {/* Title Bar */}
        <div className="glass-titlebar">
          <div className="window-controls">
            <span className="window-dot close" />
            <span className="window-dot minimize" />
            <span className="window-dot maximize" />
          </div>
          <span className="titlebar-title">{title}</span>
        </div>

        {/* Tab Bar */}
        <div className="glass-tabs">
          <div className="glass-tab active">
            <span className="tab-icon">{icon}</span>
            <span>{filename}</span>
            <span className="tab-dot" />
          </div>
        </div>

        {/* Content */}
        <div className="glass-content">
          {children}
        </div>

        {/* Status Bar */}
        <div className="glass-statusbar">
          <div className="statusbar-left">
            <span className="statusbar-item">
              <span className="statusbar-dot" />
              <span>Ready</span>
            </span>
            <span className="statusbar-item">⎇ main</span>
          </div>
          <div className="statusbar-right">
            <span className="statusbar-item">{language}</span>
            <span className="statusbar-item">UTF-8</span>
            <span className="statusbar-item">Ln 1, Col 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
