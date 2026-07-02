import React, { useMemo, useState, useEffect } from 'react';

/**
 * FloatingCodeWindows — Decorative blurred code editor windows
 * Creates a "live wallpaper" effect with miniature VS Code-style windows
 * scattered across the viewport, gently floating with CSS animations.
 * Purely decorative — no interaction.
 */

const CODE_SNIPPETS = [
  {
    filename: 'model.py',
    language: 'Python',
    color: '#3572A5',
    lines: [
      { cls: 'kw', text: 'import' },
      { cls: 'fn', text: ' torch' },
      { cls: '', text: '' },
      { cls: 'kw', text: 'class' },
      { cls: 'tp', text: ' NeuralNet' },
      { cls: 'op', text: '(nn.Module):' },
      { cls: '', text: '    ' },
      { cls: 'kw', text: '    def' },
      { cls: 'fn', text: ' forward' },
      { cls: 'op', text: '(self, x):' },
      { cls: 'cm', text: '        # Forward pass' },
      { cls: '', text: '        x = self.relu(x)' },
      { cls: 'kw', text: '        return' },
      { cls: 'fn', text: ' self.fc(x)' },
    ],
  },
  {
    filename: 'api.js',
    language: 'JavaScript',
    color: '#F7DF1E',
    lines: [
      { cls: 'kw', text: 'const' },
      { cls: 'fn', text: ' express' },
      { cls: 'op', text: " = require('express');" },
      { cls: '', text: '' },
      { cls: 'fn', text: 'app' },
      { cls: 'op', text: '.get(' },
      { cls: 'st', text: "'/api/data'" },
      { cls: 'op', text: ', async (req, res) => {' },
      { cls: 'cm', text: '  // Fetch ML predictions' },
      { cls: 'kw', text: '  const' },
      { cls: '', text: ' result = ' },
      { cls: 'kw', text: 'await' },
      { cls: 'fn', text: ' predict(req.body);' },
      { cls: '', text: '  res.json(result);' },
      { cls: 'op', text: '});' },
    ],
  },
  {
    filename: 'config.json',
    language: 'JSON',
    color: '#06B6D4',
    lines: [
      { cls: 'op', text: '{' },
      { cls: 'st', text: '  "model"' },
      { cls: 'op', text: ': {' },
      { cls: 'st', text: '    "name"' },
      { cls: 'op', text: ': ' },
      { cls: 'st', text: '"bert-base"' },
      { cls: 'op', text: ',' },
      { cls: 'st', text: '    "layers"' },
      { cls: 'op', text: ': ' },
      { cls: 'nm', text: '12' },
      { cls: 'op', text: ',' },
      { cls: 'st', text: '    "hidden"' },
      { cls: 'op', text: ': ' },
      { cls: 'nm', text: '768' },
      { cls: 'op', text: '  }' },
      { cls: 'op', text: '}' },
    ],
  },
  {
    filename: 'train.py',
    language: 'Python',
    color: '#8B5CF6',
    lines: [
      { cls: 'cm', text: '# Training loop' },
      { cls: 'kw', text: 'for' },
      { cls: '', text: ' epoch ' },
      { cls: 'kw', text: 'in' },
      { cls: 'fn', text: ' range' },
      { cls: 'op', text: '(epochs):' },
      { cls: '', text: '    loss = ' },
      { cls: 'fn', text: 'criterion' },
      { cls: 'op', text: '(pred, y)' },
      { cls: '', text: '    loss.' },
      { cls: 'fn', text: 'backward' },
      { cls: 'op', text: '()' },
      { cls: '', text: '    optimizer.' },
      { cls: 'fn', text: 'step' },
      { cls: 'op', text: '()' },
    ],
  },
  {
    filename: 'schema.sql',
    language: 'SQL',
    color: '#EC4899',
    lines: [
      { cls: 'kw', text: 'CREATE TABLE' },
      { cls: 'fn', text: ' predictions' },
      { cls: 'op', text: ' (' },
      { cls: '', text: '  id ' },
      { cls: 'tp', text: 'SERIAL' },
      { cls: 'kw', text: ' PRIMARY KEY' },
      { cls: 'op', text: ',' },
      { cls: '', text: '  score ' },
      { cls: 'tp', text: 'FLOAT' },
      { cls: 'kw', text: ' NOT NULL' },
      { cls: 'op', text: ',' },
      { cls: '', text: '  label ' },
      { cls: 'tp', text: 'VARCHAR(100)' },
      { cls: 'op', text: ',' },
      { cls: '', text: '  created_at ' },
      { cls: 'tp', text: 'TIMESTAMP' },
      { cls: 'op', text: ');' },
    ],
  },
  {
    filename: 'deploy.yml',
    language: 'YAML',
    color: '#10B981',
    lines: [
      { cls: 'st', text: 'name' },
      { cls: 'op', text: ': Deploy ML Pipeline' },
      { cls: 'st', text: 'on' },
      { cls: 'op', text: ':' },
      { cls: '', text: '  push:' },
      { cls: '', text: '    branches: [main]' },
      { cls: 'st', text: 'jobs' },
      { cls: 'op', text: ':' },
      { cls: '', text: '  build:' },
      { cls: '', text: '    runs-on: ubuntu' },
      { cls: '', text: '    steps:' },
      { cls: 'op', text: '      - uses: actions/' },
      { cls: 'fn', text: 'checkout@v4' },
    ],
  },
  {
    filename: 'utils.py',
    language: 'Python',
    color: '#F97316',
    lines: [
      { cls: 'kw', text: 'def' },
      { cls: 'fn', text: ' preprocess' },
      { cls: 'op', text: '(text):' },
      { cls: 'cm', text: '    """Clean input text"""' },
      { cls: '', text: '    text = text.' },
      { cls: 'fn', text: 'lower' },
      { cls: 'op', text: '()' },
      { cls: '', text: '    tokens = ' },
      { cls: 'fn', text: 'tokenize' },
      { cls: 'op', text: '(text)' },
      { cls: 'kw', text: '    return' },
      { cls: '', text: ' [t ' },
      { cls: 'kw', text: 'for' },
      { cls: '', text: ' t ' },
      { cls: 'kw', text: 'in' },
      { cls: '', text: ' tokens]' },
    ],
  },
  {
    filename: 'app.tsx',
    language: 'TypeScript',
    color: '#3B82F6',
    lines: [
      { cls: 'kw', text: 'import' },
      { cls: 'fn', text: ' React' },
      { cls: 'kw', text: ' from' },
      { cls: 'st', text: " 'react';" },
      { cls: '', text: '' },
      { cls: 'kw', text: 'const' },
      { cls: 'fn', text: ' App' },
      { cls: 'op', text: ': FC = () => {' },
      { cls: 'kw', text: '  const' },
      { cls: '', text: ' [data, setData] =' },
      { cls: 'fn', text: ' useState' },
      { cls: 'op', text: '([]);' },
      { cls: 'kw', text: '  return' },
      { cls: 'op', text: ' (' },
      { cls: 'tg', text: '    <Dashboard' },
      { cls: 'at', text: ' data' },
      { cls: 'op', text: '={data} />' },
    ],
  },
];

// Pre-defined window positions for a balanced, aesthetic layout
const WINDOW_CONFIGS = [
  { top: '3%', left: '15%', rotate: -8, scale: 0.82, delay: 0, duration: 22, opacity: 0.5, theme: 'mac' },
  { top: '5%', right: '4%', rotate: 6, scale: 0.75, delay: 2, duration: 25, opacity: 0.45, theme: 'powershell' },
  { top: '38%', left: '12%', rotate: -5, scale: 0.7, delay: 4, duration: 20, opacity: 0.4, theme: 'cmd' },
  { top: '60%', right: '1%', rotate: 10, scale: 0.78, delay: 1, duration: 24, opacity: 0.47, theme: 'mac' },
  { top: '72%', left: '18%', rotate: 7, scale: 0.68, delay: 3, duration: 21, opacity: 0.43, theme: 'powershell' },
  { top: '15%', left: '35%', rotate: -3, scale: 0.6, delay: 5, duration: 26, opacity: 0.33, theme: 'cmd' },
  { top: '55%', right: '25%', rotate: 4, scale: 0.62, delay: 6, duration: 23, opacity: 0.35, theme: 'mac' },
  { top: '82%', right: '30%', rotate: -6, scale: 0.65, delay: 2.5, duration: 19, opacity: 0.37, theme: 'powershell' },
];

// Syntax highlighting color map
const SYN_COLORS = {
  kw: '#CBA6F7', // keyword
  st: '#A6E3A1', // string
  nm: '#FAB387', // number
  fn: '#89B4FA', // function
  cm: '#585B70', // comment
  op: '#89DCEB', // operator
  tp: '#F9E2AF', // type
  tg: '#F38BA8', // tag
  at: '#FAB387', // attr
  '': '#A0AEC0', // default
};

function MiniCodeWindow({ snippet, config, index, appeared }) {
  const posStyle = {
    top: config.top,
    left: config.left,
    right: config.right,
    transform: `rotate(${config.rotate}deg) scale(${config.scale})`,
    '--fcw-drift-duration': `${config.duration}s`,
    '--fcw-in-delay': `${config.delay * 0.3}s`,
    opacity: appeared ? config.opacity : 0,
  };

  const theme = config.theme || 'mac';

  return (
    <div
      className={`floating-code-window theme-${theme}`}
      style={posStyle}
      aria-hidden="true"
    >
      {/* Mini title bar */}
      <div className={`fcw-titlebar ${theme !== 'mac' ? theme + '-titlebar' : ''}`}>
        {theme === 'mac' && (
          <>
            <div className="fcw-dots">
              <span className="fcw-dot" style={{ background: '#FF5F57' }} />
              <span className="fcw-dot" style={{ background: '#FEBC2E' }} />
              <span className="fcw-dot" style={{ background: '#28C840' }} />
            </div>
            <span className="fcw-filename">{snippet.filename}</span>
            <span className="fcw-lang" style={{ color: snippet.color }}>{snippet.language}</span>
          </>
        )}
        {theme === 'cmd' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold' }}>C:\_</span>
              <span className="fcw-filename" style={{ color: '#fff', opacity: 0.9, textTransform: 'none' }}>
                Command Prompt - {snippet.filename}
              </span>
            </div>
            <div className="fcw-win-controls" style={{ display: 'flex', gap: '8px', fontSize: '10px' }}>
              <span>─</span><span>□</span><span>✕</span>
            </div>
          </>
        )}
        {theme === 'powershell' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#fff' }}>❯_</span>
              <span className="fcw-filename" style={{ color: '#fff', opacity: 0.9, textTransform: 'none' }}>
                Windows PowerShell - {snippet.filename}
              </span>
            </div>
            <div className="fcw-win-controls" style={{ display: 'flex', gap: '8px', fontSize: '10px' }}>
              <span>─</span><span>□</span><span>✕</span>
            </div>
          </>
        )}
      </div>

      {/* Code lines */}
      <div className="fcw-code">
        {snippet.lines.map((line, li) => (
          <div key={li} className="fcw-line">
            <span className="fcw-line-num">{li + 1}</span>
            <span style={{ color: SYN_COLORS[line.cls] || SYN_COLORS[''] }}>
              {line.text || '\u00A0'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FloatingCodeWindows({ visible = true }) {
  const [appearedWindows, setAppearedWindows] = useState(new Set());

  const windows = useMemo(() => {
    return CODE_SNIPPETS.map((snippet, i) => ({
      snippet,
      config: WINDOW_CONFIGS[i % WINDOW_CONFIGS.length],
    }));
  }, []);

  // Staggered appearance on mount
  useEffect(() => {
    const timers = windows.map((_, i) => {
      const delay = 300 + i * 200; // stagger 200ms apart, start at 300ms
      return setTimeout(() => {
        setAppearedWindows(prev => new Set([...prev, i]));
      }, delay);
    });
    return () => timers.forEach(clearTimeout);
  }, [windows]);

  return (
    <div className={`floating-code-windows ${visible ? 'visible' : 'hidden'}`}>
      {windows.map((w, i) => (
        <MiniCodeWindow
          key={i}
          snippet={w.snippet}
          config={w.config}
          index={i}
          appeared={appearedWindows.has(i)}
        />
      ))}
    </div>
  );
}
