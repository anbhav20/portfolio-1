import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';

const skills = [
  { name: 'HTML5',        fa: 'fab fa-html5',         color: '#e34f26', category: 'Frontend' },
  { name: 'CSS3',         fa: 'fab fa-css3-alt',       color: '#264de4', category: 'Frontend' },
  { name: 'React.js',     fa: 'fab fa-react',          color: '#61dafb', category: 'Frontend' },
  { name: 'Tailwind CSS', fa: 'fas fa-wind',           color: '#38bdf8', category: 'Frontend' },
  { name: 'Vite',         fa: 'fas fa-bolt',           color: '#646cff', category: 'Frontend' },
  { name: 'Node.js',      fa: 'fab fa-node-js',        color: '#68a063', category: 'Backend'  },
  { name: 'Express.js',   fa: 'fas fa-server',         color: '#888888', category: 'Backend'  },
  { name: 'Flask',        fa: 'fas fa-flask',          color: '#aaaaaa', category: 'Backend'  },
  { name: 'Socket.io',    fa: 'fas fa-plug',           color: '#888888', category: 'Backend'  },
  { name: 'REST APIs',    fa: 'fas fa-code-branch',    color: '#ff6b35', category: 'Backend'  },
  { name: 'MongoDB',      fa: 'fas fa-database',       color: '#47a248', category: 'Database' },
  { name: 'Python',       fa: 'fab fa-python',         color: '#3572A5', category: 'Language' },
  { name: 'C++',          fa: 'fas fa-code',           color: '#00599c', category: 'Language' },
  { name: 'C',            fa: 'fas fa-copyright',      color: '#5c6bc0', category: 'Language' },
  { name: 'JavaScript',   fa: 'fab fa-js',             color: '#f7df1e', category: 'Language' },
  { name: 'DSA',          fa: 'fas fa-sitemap',        color: '#ff9800', category: 'CS'       },
  { name: 'OOP',          fa: 'fas fa-cubes',          color: '#9c27b0', category: 'CS'       },
  { name: 'Git',          fa: 'fab fa-git-alt',        color: '#f34f29', category: 'Tools'    },
  { name: 'GitHub',       fa: 'fab fa-github',         color: '#aaaaaa', category: 'Tools'    },
  { name: 'VS Code',      fa: 'fas fa-laptop-code',    color: '#007acc', category: 'Tools'    },
  { name: 'PWA',          fa: 'fas fa-mobile-alt',     color: '#5a0fc8', category: 'Tools'    },
  { name: 'ML Basics',    fa: 'fas fa-brain',          color: '#ff4081', category: 'Tools'    },
  { name: 'Gen AI',       fa: 'fas fa-robot',          color: '#00bcd4', category: 'Tools'    },
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Language', 'CS', 'Tools'];

const chunk = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (_, i) => arr.slice(i * size, i * size + size));
};

/* ════════════════════════════════════════════════
   THEME-AWARE TOKENS
   These match EXACTLY:
   Light → hero's #f5f4f0 / #0a0a0a
   Dark  → hero's #090909 / #eeebe4
   We read resolvedTheme from useTheme() so we're
   always in sync with your ThemeProvider.
════════════════════════════════════════════════ */
const tokens = (isDark) => ({
  /* ── section background ── */
  sectionBg:       isDark ? '#090909' : '#f5f4f0',

  /* ── pills ──
     dark  → light/white pill on near-black bg  ✓
     light → white pill on warm-off-white bg    ✓
  */
  pillBg:          isDark ? '#f0ede8' : '#ffffff',
  pillBorder:      isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.07)',
  pillShadow:      isDark ? '0 2px 8px rgba(0,0,0,0.5)' : '0 1px 3px rgba(0,0,0,0.06)',
  pillHoverShadow: isDark ? '0 8px 28px rgba(0,0,0,0.8)' : '0 6px 18px rgba(0,0,0,0.10)',

  pillName:        isDark ? '#1a1a1a' : '#555',
  pillNameHover:   isDark ? '#000000' : '#111',
  pillIcon:        isDark ? '#555'    : '#bbb',

  /* fade edges — must EXACTLY match sectionBg */
  fadeL: isDark
    ? 'linear-gradient(to right, #090909, transparent)'
    : 'linear-gradient(to right, #f5f4f0, transparent)',
  fadeR: isDark
    ? 'linear-gradient(to left, #090909, transparent)'
    : 'linear-gradient(to left, #f5f4f0, transparent)',

  /* ── filter chips ── */
  chipBg:          isDark ? '#1a1a1a'                : '#ffffff',
  chipBorder:      isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
  chipText:        isDark ? '#777'                   : '#666',
  chipHoverBorder: isDark ? 'rgba(255,255,255,0.30)' : 'rgba(0,0,0,0.30)',
  chipHoverText:   isDark ? '#eeebe4'                : '#111',

  chipActiveBg:     isDark ? '#eeebe4' : '#0a0a0a',
  chipActiveBorder: isDark ? '#eeebe4' : '#0a0a0a',
  chipActiveText:   isDark ? '#090909' : '#f5f4f0',

  /* divider */
  rule:    isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',

  /* text */
  muted:   isDark ? '#444'    : '#aaa',
  heading: isDark ? '#eeebe4' : '#0a0a0a',
});

/* ────── Pill ────── */
const Pill = ({ skill, t }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '10px 18px', margin: '0 6px',
        borderRadius: 14, cursor: 'default', userSelect: 'none', flexShrink: 0,
        background: t.pillBg,
        border: `1px solid ${t.pillBorder}`,
        boxShadow: hovered ? t.pillHoverShadow : t.pillShadow,
        transform: hovered ? 'translateY(-3px) scale(1.04)' : 'none',
        transition: 'transform .25s ease, box-shadow .25s ease',
      }}
    >
      <i
        className={skill.fa}
        style={{
          fontSize: 16,
          color: hovered ? skill.color : t.pillIcon,
          transition: 'color .25s, transform .25s',
          transform: hovered ? 'scale(1.2)' : 'scale(1)',
        }}
      />
      <span style={{
        fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap',
        color: hovered ? t.pillNameHover : t.pillName,
        fontFamily: 'DM Sans, Satoshi, ui-sans-serif, sans-serif',
        transition: 'color .2s',
      }}>
        {skill.name}
      </span>
    </div>
  );
};

/* ────── Marquee row ────── */
const Row = ({ items, reverse = false, speed = 30, t }) => {
  const tripled = [...items, ...items, ...items];
  return (
    <div style={{ position: 'relative', display: 'flex', overflow: 'hidden', padding: '6px 0' }}>
      {/* fade left */}
      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: 80, zIndex: 10, pointerEvents: 'none', background: t.fadeL }} />
      {/* fade right */}
      <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: 80, zIndex: 10, pointerEvents: 'none', background: t.fadeR }} />
      <div style={{
        display: 'flex',
        animation: `sk-${reverse ? 'reverse' : 'forward'} ${speed}s linear infinite`,
        willChange: 'transform',
      }}>
        {tripled.map((skill, i) => <Pill key={`${skill.name}-${i}`} skill={skill} t={t} />)}
      </div>
    </div>
  );
};

/* ────── Chip ────── */
const Chip = ({ label, count, active, onClick, t }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '5px 14px', borderRadius: 999,
        fontSize: 11, fontWeight: 600, letterSpacing: '.04em',
        fontFamily: 'DM Sans, Satoshi, ui-sans-serif, sans-serif',
        cursor: 'pointer',
        background:   active ? t.chipActiveBg  : t.chipBg,
        color:        active ? t.chipActiveText : (hovered ? t.chipHoverText : t.chipText),
        border:       `1px solid ${active ? t.chipActiveBorder : (hovered ? t.chipHoverBorder : t.chipBorder)}`,
        transform:    (!active && hovered) ? 'translateY(-1px)' : 'none',
        transition:   'background .15s, color .15s, border-color .15s, transform .15s',
      }}
    >
      {label}
      <span style={{
        fontSize: 9, fontWeight: 700,
        padding: '1px 5px', borderRadius: 999,
        background: active
          ? (t.chipActiveText === '#090909' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.18)')
          : 'rgba(128,128,128,0.12)',
        color: 'inherit',
      }}>
        {count}
      </span>
    </button>
  );
};

/* ════════════ MAIN ════════════ */
const SkillsSection = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const t = tokens(isDark);

  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? skills : skills.filter(s => s.category === active);
  const rows     = filtered.length < 6 ? [filtered] : chunk(filtered, 3);

  return (
    <section
      id="skills"
      className="relative overflow-hidden transition-colors"
      style={{
        background: t.sectionBg,
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        /* smooth bg transition when theme changes */
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* keyframes + force bg override */}
      <style>{`
        @keyframes sk-forward { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }
        @keyframes sk-reverse { 0%{transform:translateX(-33.333%)} 100%{transform:translateX(0)} }
        #skills { background-color: ${t.sectionBg} !important; transition: background-color 0.3s ease !important; }
      `}</style>

      {/* very faint ambient dot */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 380, height: 380, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.055) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
        opacity: isDark ? 0.12 : 0.18,
      }} />

      {/* ── Header + filters ── */}
      <div className="section-wrap" style={{ position: 'relative', zIndex: 10 }}>

        {/* section label */}
        <p
          data-aos="fade-up"
          style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.3em',
            textTransform: 'uppercase', marginBottom: 12,
            color: '#3b82f6',
            fontFamily: 'Syne, DM Sans, sans-serif',
          }}
        >
          Tech Stack
        </p>

        {/* heading + count */}
        <div
          data-aos="fade-up"
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}
        >
          <h2 style={{
            fontFamily: 'Syne, Satoshi, ui-sans-serif, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(27px, 3vw, 50px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.87,
            color: t.heading,
            transition: 'color 0.3s ease',
          }}>
            MY SKILLS
          </h2>
          <p style={{ fontSize: 11, color: t.muted, fontFamily: 'DM Sans, Satoshi, sans-serif', maxWidth: 180, lineHeight: 1.7, transition: 'color 0.3s ease' }}>
            {skills.length} technologies<br />across {CATEGORIES.length - 1} categories.
          </p>
        </div>

        {/* divider — hero style */}
        <hr style={{ width: '100%', height: 1, background: t.rule, border: 'none', marginBottom: 28, transition: 'background 0.3s ease' }} />

        {/* filter chips */}
        <div
          data-aos="fade-up"
          data-aos-delay="80"
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}
        >
          {CATEGORIES.map(cat => {
            const count = cat === 'All' ? skills.length : skills.filter(s => s.category === cat).length;
            return (
              <Chip
                key={cat}
                label={cat}
                count={count}
                active={active === cat}
                onClick={() => setActive(cat)}
                t={t}
              />
            );
          })}
        </div>
      </div>

      {/* ── Marquee ── */}
      <div
        className="section-wrap"
        data-aos="fade-up"
        data-aos-delay="140"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <div style={{ overflow: 'hidden', borderRadius: 12 }}>
          {rows.map((row, i) => (
            <Row
              key={`${active}-${i}`}
              items={row.length > 0 ? row : skills}
              reverse={i % 2 === 1}
              speed={26 + i * 6}
              t={t}
            />
          ))}
        </div>

        {/* bottom rule + count */}
        <hr style={{ width: '100%', height: 1, background: t.rule, border: 'none', margin: '28px 0 14px', transition: 'background 0.3s ease' }} />
        <p style={{
          fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: t.muted, fontFamily: 'Syne, sans-serif',
          transition: 'color 0.3s ease',
        }}>
          {filtered.length} / {skills.length} skills
        </p>
      </div>
    </section>
  );
};

export default SkillsSection;