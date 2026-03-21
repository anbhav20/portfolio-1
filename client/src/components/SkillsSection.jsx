import React, { useState } from 'react';

const skills = [
  { name: 'HTML5',        fa: 'fab fa-html5',         color: '#e34f26', category: 'Frontend' },
  { name: 'CSS3',         fa: 'fab fa-css3-alt',       color: '#264de4', category: 'Frontend' },
  { name: 'React.js',     fa: 'fab fa-react',          color: '#61dafb', category: 'Frontend' },
  { name: 'Tailwind CSS', fa: 'fas fa-wind',           color: '#38bdf8', category: 'Frontend' },
  { name: 'Vite',         fa: 'fas fa-bolt',           color: '#646cff', category: 'Frontend' },
  { name: 'Node.js',      fa: 'fab fa-node-js',        color: '#68a063', category: 'Backend'  },
  { name: 'Express.js',   fa: 'fas fa-server',         color: '#999999', category: 'Backend'  },
  { name: 'Flask',        fa: 'fas fa-flask',          color: '#aaaaaa', category: 'Backend'  },
  { name: 'Socket.io',    fa: 'fas fa-plug',           color: '#444444', category: 'Backend'  },
  { name: 'REST APIs',    fa: 'fas fa-code-branch',    color: '#ff6b35', category: 'Backend'  },
  { name: 'MongoDB',      fa: 'fas fa-database',       color: '#47a248', category: 'Database' },
  { name: 'Python',       fa: 'fab fa-python',         color: '#3572A5', category: 'Language' },
  { name: 'C++',          fa: 'fas fa-code',           color: '#00599c', category: 'Language' },
  { name: 'C',            fa: 'fas fa-copyright',      color: '#5c6bc0', category: 'Language' },
  { name: 'JavaScript',   fa: 'fab fa-js',             color: '#f7df1e', category: 'Language' },
  { name: 'DSA',          fa: 'fas fa-sitemap',        color: '#ff9800', category: 'CS'       },
  { name: 'OOP',          fa: 'fas fa-cubes',          color: '#9c27b0', category: 'CS'       },
  { name: 'Git',          fa: 'fab fa-git-alt',        color: '#f34f29', category: 'Tools'    },
  { name: 'GitHub',       fa: 'fab fa-github',         color: '#555555', category: 'Tools'    },
  { name: 'VS Code',      fa: 'fas fa-laptop-code',    color: '#007acc', category: 'Tools'    },
  { name: 'PWA',          fa: 'fas fa-mobile-alt',     color: '#5a0fc8', category: 'Tools'    },
  { name: 'ML Basics',    fa: 'fas fa-brain',          color: '#ff4081', category: 'Tools'    },
  { name: 'Gen AI',       fa: 'fas fa-robot',          color: '#00bcd4', category: 'Tools'    },
];

const chunk = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (_, i) => arr.slice(i * size, i * size + size));
};

const SkillPill = ({ skill }) => (
  <div
    className="group/pill flex items-center gap-3 px-5 py-3 mx-2 rounded-2xl border
               bg-white dark:bg-gray-800/80 border-gray-100 dark:border-gray-700/60
               shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300
               cursor-default select-none shrink-0"
  >
    <i
      className={`${skill.fa} text-lg text-gray-400 dark:text-gray-500 group-hover/pill:scale-125 transition-all duration-300`}
      onMouseEnter={e => { e.currentTarget.style.color = skill.color; }}
      onMouseLeave={e => { e.currentTarget.style.color = ''; }}
    />
    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap"
          style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>
      {skill.name}
    </span>
  </div>
);

const MarqueeRow = ({ items, reverse = false, speed = 30 }) => {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-1.5">
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
        {tripled.map((skill, i) => (
          <SkillPill key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Language', 'CS', 'Tools'];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);
  const filteredRows = chunk(filtered, 3);

  return (
    <section
      id="skills"
      className="bg-gray-50 dark:bg-gray-900 transition-colors relative overflow-hidden"
      style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}
    >
      <style>{`
        @keyframes marquee-forward  { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }
        @keyframes marquee-reverse  { 0%{transform:translateX(-33.333%)} 100%{transform:translateX(0)} }
      `}</style>

      {/* Background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[500px] h-[500px] rounded-full
                      bg-blue-100/30 dark:bg-blue-900/08 blur-3xl pointer-events-none" />

      {/* ── Same section-wrap as every other section ── */}
      <div className="section-wrap relative">

        {/* Header */}
        <div className="mb-12" data-aos="fade-up">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-500 dark:text-blue-400 mb-3"
             style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>
            Tech Stack
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif', letterSpacing: '-0.035em', lineHeight: 1 }}
            >
              My Skills
            </h2>
            <p className="text-gray-400 dark:text-gray-600 text-xs max-w-[200px] leading-relaxed"
               style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>
              {skills.length} technologies across {CATEGORIES.length - 1} categories.
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10" data-aos="fade-up" data-aos-delay="80">
          {CATEGORIES.map(cat => {
            const count = cat === 'All' ? skills.length : skills.filter(s => s.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold
                            border transition-all duration-200
                            ${isActive
                              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                              : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                            }`}
                style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}
              >
                {cat}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold
                                  ${isActive ? 'bg-white/20 dark:bg-black/20' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Marquee — wrapped in section-wrap for consistent padding */}
      <div className="section-wrap" data-aos="fade-up" data-aos-delay="140">
        <div className="space-y-2 overflow-hidden rounded-2xl">
          {(filtered.length < 6 ? [filtered] : filteredRows).map((row, i) => (
            <MarqueeRow
              key={`${activeCategory}-${i}`}
              items={row.length > 0 ? row : skills}
              reverse={i % 2 === 1}
              speed={26 + i * 6}
            />
          ))}
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-600 mt-8" style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>
          {filtered.length} of {skills.length} skills
        </p>
      </div>
    </section>
  );
};

export default SkillsSection;