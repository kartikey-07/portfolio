import React from 'react';
import { skills } from '../data/portfolio';

/**
 * SkillsSection — JSON-style skill display with animated progress bars
 * Rendered inside a glass window as skills.json
 */
export default function SkillsSection({ progress = 0 }) {
  const categories = Object.entries(skills);
  const revealedCategories = Math.ceil(progress * categories.length);

  return (
    <div className="skills-content">
      {/* JSON header */}
      <div className="code-line" style={{ marginBottom: '4px' }}>
        <span className="line-number">1</span>
        <span className="line-content">
          <span className="syn-comment">{'// skills.json — Technical Proficiencies'}</span>
        </span>
      </div>
      <div className="code-line" style={{ marginBottom: '12px' }}>
        <span className="line-number">2</span>
        <span className="line-content">
          <span className="syn-operator">{'{'}</span>
        </span>
      </div>

      {/* Skill categories */}
      {categories.slice(0, revealedCategories).map(([category, skillList], catIndex) => {
        const catDelay = catIndex * 0.1;
        return (
          <div
            key={category}
            className="skills-category"
            style={{ animation: `fadeInUp 0.4s ease ${catDelay}s both` }}
          >
            <div className="skills-category-header">
              <span className="syn-string">{`"${category}"`}</span>
            </div>

            {skillList.map((skill) => {
              const barWidth = Math.max(
                0,
                skill.level * Math.min(1, progress * 2 - catIndex * 0.25)
              );

              return (
                <div key={skill.name} className="skill-item">
                  <span className="skill-name">
                    <span className="syn-property">{`"${skill.name}"`}</span>
                    <span className="syn-operator">: </span>
                  </span>
                  <div className="skill-bar">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span className="skill-value">
                    <span className="syn-number">{Math.round(barWidth)}</span>
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* JSON closing */}
      {progress > 0.3 && (
        <div className="code-line" style={{ marginTop: '8px' }}>
          <span className="line-number">{35}</span>
          <span className="line-content">
            <span className="syn-operator">{'}'}</span>
            <span className="typing-cursor" />
          </span>
        </div>
      )}
    </div>
  );
}
