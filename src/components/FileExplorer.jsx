import React, { useState } from 'react';
import { SECTIONS } from '../hooks/useScrollTimeline';

/**
 * FileExplorer — VS Code-style sidebar file tree
 * Real section files are clickable and navigate to their section.
 * Fake files (.env, .git, venv, .gitignore) are decorative.
 */

// Map filenames to their section index for navigation
const FILE_TO_SECTION = {};
SECTIONS.forEach((s, i) => {
  FILE_TO_SECTION[s.filename] = i;
});

// File tree data structure
const FILE_TREE = [
  {
    name: 'portfolio/',
    type: 'folder',
    open: true,
    children: [
      {
        name: 'src/',
        type: 'folder',
        open: true,
        children: [
          { name: 'intro.py',       type: 'file', icon: '🐍', section: 'intro.py' },
          { name: 'about.md',       type: 'file', icon: '📝', section: 'about.md' },
          { name: 'skills.json',    type: 'file', icon: '📊', section: 'skills.json' },
          {
            name: 'projects/',
            type: 'folder',
            open: true,
            children: [
              { name: 'satyax.py',      type: 'file', icon: '🐍', section: 'satyax.py' },
              { name: 'smart_scrap.py', type: 'file', icon: '🐍', section: 'smart_scrap.py' },
            ],
          },
          { name: 'certs.json',     type: 'file', icon: '🏅', section: 'certs.json' },
          { name: 'research.bib',   type: 'file', icon: '📄', section: 'research.bib' },
          { name: 'connect',       type: 'file', icon: '💻', section: 'connect' },
        ],
      },
      {
        name: 'venv/',
        type: 'folder',
        open: false,
        children: [
          { name: 'lib/',    type: 'folder', open: false, children: [] },
          { name: 'bin/',    type: 'folder', open: false, children: [] },
          { name: 'pyvenv.cfg', type: 'file', icon: '⚙️' },
        ],
      },
      {
        name: '.git/',
        type: 'folder',
        open: false,
        children: [
          { name: 'HEAD',    type: 'file', icon: '📌' },
          { name: 'config',  type: 'file', icon: '⚙️' },
          { name: 'refs/',   type: 'folder', open: false, children: [] },
        ],
      },
      { name: '.env',            type: 'file', icon: '🔒' },
      { name: '.gitignore',      type: 'file', icon: '🚫' },
      { name: 'requirements.txt',type: 'file', icon: '📋' },
      { name: 'README.md',       type: 'file', icon: '📖' },
      { name: 'setup.py',        type: 'file', icon: '🐍' },
    ],
  },
];

export default function FileExplorer({ activeIndex, onNavigate, isOpen, onToggle }) {
  return (
    <div className={`file-explorer ${isOpen ? 'open' : 'collapsed'}`}>
      {/* Explorer Header */}
      <div className="explorer-header">
        <span className="explorer-title">EXPLORER</span>
        <div className="explorer-actions">
          <button className="explorer-action" onClick={onToggle} title="Toggle sidebar">
            {isOpen ? '◀' : '▶'}
          </button>
        </div>
      </div>

      {/* File Tree */}
      {isOpen && (
        <div className="explorer-tree">
          {FILE_TREE.map((node, i) => (
            <TreeNode
              key={i}
              node={node}
              depth={0}
              activeIndex={activeIndex}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}

      {/* Activity bar icons when collapsed */}
      {!isOpen && (
        <div className="explorer-collapsed-icons">
          <button className="collapsed-icon" onClick={onToggle} title="Explorer">📁</button>
          <button className="collapsed-icon" title="Search">🔍</button>
          <button className="collapsed-icon" title="Git">⎇</button>
        </div>
      )}
    </div>
  );
}

function TreeNode({ node, depth, activeIndex, onNavigate }) {
  const [isOpen, setIsOpen] = useState(node.open ?? false);
  const isFolder = node.type === 'folder';
  const isNavigable = node.section && FILE_TO_SECTION[node.section] !== undefined;
  const sectionIndex = isNavigable ? FILE_TO_SECTION[node.section] : -1;
  const isActive = isNavigable && sectionIndex === activeIndex;

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else if (isNavigable) {
      onNavigate(sectionIndex);
    }
  };

  return (
    <>
      <div
        className={`tree-item ${isActive ? 'active' : ''} ${isNavigable ? 'navigable' : ''} ${isFolder ? 'folder' : 'file'}`}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        onClick={handleClick}
        title={isNavigable ? `Go to ${node.name}` : node.name}
      >
        {/* Folder chevron or file indent */}
        {isFolder ? (
          <span className="tree-chevron">{isOpen ? '▾' : '▸'}</span>
        ) : (
          <span className="tree-spacer" />
        )}

        {/* Icon */}
        {isFolder ? (
          <span className="tree-folder-icon">{isOpen ? '📂' : '📁'}</span>
        ) : (
          <span className="tree-file-icon">{node.icon || '📄'}</span>
        )}

        {/* Name */}
        <span className="tree-name">{node.name}</span>

        {/* Active indicator */}
        {isActive && <span className="tree-active-dot" />}
      </div>

      {/* Children */}
      {isFolder && isOpen && node.children && (
        <div className="tree-children">
          {node.children.map((child, i) => (
            <TreeNode
              key={i}
              node={child}
              depth={depth + 1}
              activeIndex={activeIndex}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </>
  );
}
