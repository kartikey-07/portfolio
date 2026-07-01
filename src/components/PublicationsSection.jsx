import React from 'react';
import { publications } from '../data/portfolio';

/**
 * PublicationsSection — Research papers with journal info and links
 * Rendered inside a glass window as research.bib
 */
export default function PublicationsSection({ progress = 0 }) {
  return (
    <div className="pubs-content">
      {/* Header */}
      <div className="section-header">
        <div className="section-comment">% research.bib — Published Research</div>
        <div className="section-title gradient-text">Publications</div>
      </div>

      {/* Publication cards */}
      {publications.map((pub, i) => (
        <div
          key={i}
          className="pub-card"
          style={{
            animation: progress > 0.2 ? `fadeInUp 0.5s ease ${i * 0.1}s both` : 'none',
            opacity: progress > 0.2 ? undefined : 0,
          }}
        >
          <div className="pub-title">{pub.title}</div>
          <div className="pub-journal">{pub.journal}</div>
          <div className="pub-details">
            {pub.volume} • {pub.date}
          </div>
          <div className="pub-description">{pub.description}</div>
          <div className="pub-links">
            {pub.url && (
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pub-link"
              >
                📖 View Paper
              </a>
            )}
            {pub.pdf && (
              <a
                href={pub.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="pub-link"
              >
                📄 Download PDF
              </a>
            )}
          </div>
        </div>
      ))}

      {/* BibTeX style entry */}
      {progress > 0.5 && (
        <div style={{ marginTop: '20px', animation: 'fadeInUp 0.5s ease both' }}>
          <div className="code-line" style={{ marginBottom: '4px' }}>
            <span className="line-number">1</span>
            <span className="line-content">
              <span className="syn-keyword">@article</span>
              <span className="syn-operator">{'{'}</span>
              <span className="syn-string">smartscrap2026</span>
              <span className="syn-operator">,</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">2</span>
            <span className="line-content">
              {'  '}
              <span className="syn-property">title</span>
              <span className="syn-operator"> = {'{'}</span>
              <span className="syn-string">{publications[0]?.title || 'Research Paper'}</span>
              <span className="syn-operator">{'}'}</span>
              <span className="syn-operator">,</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">3</span>
            <span className="line-content">
              {'  '}
              <span className="syn-property">journal</span>
              <span className="syn-operator"> = {'{'}</span>
              <span className="syn-string">{publications[0]?.journal || 'Journal'}</span>
              <span className="syn-operator">{'}'}</span>
              <span className="syn-operator">,</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">4</span>
            <span className="line-content">
              {'  '}
              <span className="syn-property">year</span>
              <span className="syn-operator"> = {'{'}</span>
              <span className="syn-number">2026</span>
              <span className="syn-operator">{'}'}</span>
            </span>
          </div>
          <div className="code-line">
            <span className="line-number">5</span>
            <span className="line-content">
              <span className="syn-operator">{'}'}</span>
              <span className="typing-cursor" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
