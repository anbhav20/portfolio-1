import React, { useState } from 'react';

// ─── Skill definitions ────────────────────────────────────────────────────────
// iconType: 'fab' = Font Awesome brand, 'fas' = FA solid, 'devicon' = devicon class
// color: accent shown on hover
const skills = [
  // Frontend
  { name: 'HTML5',        fa: 'fab fa-html5',         color: '#e34f26', category: 'Frontend' },
  { name: 'CSS3',         fa: 'fab fa-css3-alt',       color: '#264de4', category: 'Frontend' },
  { name: 'React.js',     fa: 'fab fa-react',          color: '#61dafb', category: 'Frontend' },
  { name: 'Tailwind CSS', fa: 'fas fa-wind',           color: '#38bdf8', category: 'Frontend' },
  { name: 'Vite',         fa: 'fas fa-bolt',           color: '#646cff', category: 'Frontend' },

  // Backend
  { name: 'Node.js',      fa: 'fab fa-node-js',        color: '#68a063', category: 'Backend'  },
  { name: 'Express.js',   fa: 'fas fa-server',         color: '#999999', category: 'Backend'  },
  { name: 'Flask',        fa: 'fas fa-flask',          color: '#ffffff', category: 'Backend'  },
  { name: 'Socket.io',    fa: 'fas fa-plug',           color: '#010101', category: 'Backend'  },
  { name: 'REST APIs',    fa: 'fas fa-code-branch',    color: '#ff6b35', category: 'Backend'  },

  // Database
  { name: 'MongoDB',      fa: 'fas fa-database',       color: '#47a248', category: 'Database' },

  // Languages
  { name: 'Python',       fa: 'fab fa-python',         color: '#3572A5', category: 'Language' },
  { name: 'C++',          fa: 'fas fa-code',           color: '#00599c', category: 'Language' },
  { name: 'C',            fa: 'fas fa-copyright',      color: '#5c6bc0', category: 'Language' },
  { name: 'JavaScript',   fa: 'fab fa-js',             color: '#f7df1e', category: 'Language' },
  // CS
  { name: 'DSA',          fa: 'fas fa-sitemap',        color: '#ff9800', category: 'CS'       },
  { name: 'OOP',          fa: 'fas fa-cubes',          color: '#9c27b0', category: 'CS'       },

  // Tools
  { name: 'Git',          fa: 'fab fa-git-alt',        color: '#f34f29', category: 'Tools'    },
  { name: 'GitHub',       fa: 'fab fa-github',         color: '#ffffff', category: 'Tools'    },
  { name: 'VS Code',      fa: 'fas fa-laptop-code',    color: '#007acc', category: 'Tools'    },
  { name: 'PWA',          fa: 'fas fa-mobile-alt',     color: '#5a0fc8', category: 'Tools'    },
  { name: 'ML Basics',    fa: 'fas fa-brain',          color: '#ff4081', category: 'Tools'    },
  { name: 'Gen AI',       fa: 'fas fa-robot',          color: '#00bcd4', category: 'Tools'    },
];

// ─── Split skills into 3 rows for the marquee ────────────────────────────────
const chunk = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (_, i) => arr.slice(i * size, i * size + size));
};
const rows = chunk(skills, 3);

// ─── A single skill pill ─────────────────────────────────────────────────────
const SkillPill = ({ skill }) => (
  <div
    className="
      group/pill flex items-center gap-3
      px-5 py-3 mx-2
      rounded-2xl border
      bg-white dark:bg-gray-800/80
      border-gray-100 dark:border-gray-700/60
      shadow-sm
      hover:shadow-lg hover:scale-105
      hover:border-opacity-80
      transition-all duration-300 cursor-default
      select-none shrink-0
    "
    style={{ '--skill-color': skill.color }}
  >
    <i
      className={`${skill.fa} text-xl text-gray-400 dark:text-gray-500 group-hover/pill:scale-125 transition-all duration-300`}
      style={{ '--tw-text-opacity': 1 }}
      onMouseEnter={e => { e.currentTarget.style.color = skill.color; }}
      onMouseLeave={e => { e.currentTarget.style.color = ''; }}
    />
    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
      {skill.name}
    </span>
  </div>
);

// ─── A single marquee row ─────────────────────────────────────────────────────
const MarqueeRow = ({ items, reverse = false, speed = 30 }) => {
  // Duplicate items for seamless infinite loop
  const doubled = [...items, ...items, ...items];

  return (
    <div className="relative flex overflow-hidden group/row py-2">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none
                      bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none
                      bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent" />

      <div
        className="flex"
        style={{
          animation: `marquee-${reverse ? 'reverse' : 'forward'} ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((skill, i) => (
          <SkillPill key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

// ─── Category filter tabs ─────────────────────────────────────────────────────
const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Language', 'CS', 'Tools'];

// ─── Main section ─────────────────────────────────────────────────────────────
const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const filteredRows = chunk(filtered, 3);

  return (
    <section
      id="skills"
      className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors relative overflow-hidden"
    >
      {/* CSS keyframes injected inline */}
      <style>{`
        @keyframes marquee-forward {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[600px] rounded-full
                      bg-blue-100/40 dark:bg-blue-900/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">

        {/* ── Header ── */}
        <div className="text-center mb-14" data-aos="fade-up">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-blue-500 dark:text-blue-400 mb-3">
            Tech Stack
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            My Skills
          </h2>
          <div className="mx-auto w-14 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full" />
          <p className="mt-5 text-gray-500 dark:text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            A full-stack skill set spanning frontend, backend, systems programming, and modern tooling.
          </p>
        </div>

        {/* ── Category filter ── */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-12"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          {CATEGORIES.map(cat => {
            const count = cat === 'All' ? skills.length : skills.filter(s => s.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold
                  border transition-all duration-200
                  ${isActive
                    ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 shadow-md shadow-blue-200 dark:shadow-blue-900/40'
                    : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }
                `}
              >
                {cat}
                <span className={`
                  text-[10px] px-1.5 py-0.5 rounded-full font-bold
                  ${isActive ? 'bg-white/25 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}
                `}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Marquee rows ── */}
        <div className="space-y-3" data-aos="fade-up" data-aos-delay="150">
          {(filtered.length < 6 ? [filtered] : filteredRows).map((row, i) => (
            <MarqueeRow
              key={`${activeCategory}-row-${i}`}
              items={row.length > 0 ? row : skills}
              reverse={i % 2 === 1}
              speed={28 + i * 6}
            />
          ))}
        </div>

        {/* ── Count ── */}
        <p
          className="text-center mt-10 text-xs text-gray-400 dark:text-gray-600"
          data-aos="fade-up"
        >
          {filtered.length} of {skills.length} skills
        </p>
      </div>
    </section>
  );
};

export default SkillsSection;