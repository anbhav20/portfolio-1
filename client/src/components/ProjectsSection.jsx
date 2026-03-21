import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1, index: '01',
    title: 'Movie Recommendation',
    subtitle: 'ML · Flask · TMDB API',
    description: 'Search for movies, get ML-powered recommendations, view trailers and check OTT availability in real-time.',
    imageUrl: '/assets/images/projects/movie-recommendation.jpg',
    link: 'https://movie-recommendation-ml-4ixm.onrender.com',
    sourceCodeLink: 'https://github.com/anbhav20/Movie-Recommendation-ML-2',
    tags: ['Flask', 'Python', 'JavaScript', 'Tailwind CSS', 'TMDB API', 'Machine Learning'],
    color: '#3b82f6', emoji: '🎬',
  },
  {
    id: 2, index: '02',
    title: 'Notes App',
    subtitle: 'MERN · Full Stack',
    description: 'A full-stack CRUD notes application — create, edit, organize and manage notes with a clean UI.',
    imageUrl: '/assets/images/projects/notes.png',
    link: 'https://notes-crud-fullstack.onrender.com/',
    sourceCodeLink: 'https://github.com/anbhav20/notes-crud-fullstack',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
    color: '#10b981', emoji: '📝',
  },
  {
    id: 3, index: '03',
    title: 'CityFriend',
    subtitle: 'Real-time · Socket.io · Social',
    description: 'A social platform to connect with people in your city, share posts and chat in real-time.',
    imageUrl: '/assets/images/projects/cityfriend.png',
    link: 'https://city-friend.vercel.app',
    sourceCodeLink: 'https://github.com/anbhav20/cityfriend',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io'],
    color: '#8b5cf6', emoji: '🌆',
  },
];

const DECK_SIZE = 5;
const OFFSET_X  = 80;
const OFFSET_Y  = -60;

const makeSpring = (i) => ({
  stiffness: 220 - i * 25,
  damping:   22  + i * 4,
  mass:      0.8 + i * 0.3,
});

const SCOPED_CSS = `
  .proj-section,
  .proj-section h1, .proj-section h2, .proj-section h3,
  .proj-section p,  .proj-section span, .proj-section a, .proj-section button {
    font-family: 'Satoshi', ui-sans-serif, system-ui, sans-serif !important;
    letter-spacing: -0.015em;
  }
  .proj-title {
    font-size: clamp(1rem, 2.2vw, 1.55rem);
    font-weight: 600;
    line-height: 1.25;
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: unset !important;
    word-break: break-word;
  }
  .proj-heading {
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1;
  }
  .proj-row-inner {
    display: grid;
    grid-template-columns: 2.5rem 1fr;
    align-items: center;
    gap: 0 1rem;
    padding: 1.35rem 0;
    cursor: default;
    user-select: none;
  }
  @media (min-width: 640px) {
    .proj-row-inner {
      grid-template-columns: 2.5rem 1fr auto auto auto;
      gap: 0 1.5rem;
    }
  }
  .proj-row-inner:hover .proj-title { opacity: 0.5; }
  .proj-subtitle, .proj-visit { display: none; }
  @media (min-width: 640px) {
    .proj-subtitle { display: block; }
    .proj-visit    { display: flex;  }
  }
`;

const DeckLayer = ({ cursorX, cursorY, index, project, imgFailed, onImgError, visible }) => {
  const targetX = useMotionValue(-999);
  const targetY = useMotionValue(-999);

  useEffect(() => {
    const unsubX = cursorX.on('change', v => targetX.set(v + OFFSET_X));
    const unsubY = cursorY.on('change', v => targetY.set(v + OFFSET_Y));
    return () => { unsubX(); unsubY(); };
  }, [cursorX, cursorY, targetX, targetY]);

  const x = useSpring(targetX, makeSpring(index));
  const y = useSpring(targetY, makeSpring(index));

  return (
    <motion.div
      style={{
        x, y,
        position: 'fixed', top: 0, left: 0,
        width: 280, height: 190,
        borderRadius: 12, overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 8990 - index,
        scale: 1 - index * 0.045,
        rotate: index % 2 === 0 ? index * 2 : -index * 2,
        boxShadow: '0 16px 48px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.06)',
        willChange: 'transform',
      }}
      animate={{ opacity: visible ? Math.max(0, 1 - index * 0.18) : 0 }}
      transition={{ opacity: { duration: 0.2 } }}
    >
      {imgFailed ? (
        <div style={{
          width: '100%', height: '100%', background: `${project.color}18`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 38 }}>{project.emoji}</span>
          <span style={{ fontSize: 11, color: project.color, fontWeight: 600 }}>{project.title}</span>
        </div>
      ) : (
        <img src={project.imageUrl} alt={project.title} onError={onImgError}
             style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      )}
      {index === 0 && (
        <>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: project.color }} />
          <div style={{
            position: 'absolute', top: 10, left: 12,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
            color: '#fff', fontSize: 10, fontWeight: 600,
            padding: '3px 8px', borderRadius: 6, letterSpacing: '0.05em',
          }}>
            {project.subtitle}
          </div>
        </>
      )}
    </motion.div>
  );
};

const CursorDeck = ({ project, visible }) => {
  const cursorX = useMotionValue(-999);
  const cursorY = useMotionValue(-999);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => { setImgFailed(false); }, [project?.id]);
  useEffect(() => {
    const onMove = e => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [cursorX, cursorY]);

  if (!project) return null;
  return (
    <>
      {Array.from({ length: DECK_SIZE }, (_, i) => DECK_SIZE - 1 - i).map(i => (
        <DeckLayer key={i} index={i} cursorX={cursorX} cursorY={cursorY}
                   project={project} imgFailed={imgFailed}
                   onImgError={() => setImgFailed(true)} visible={visible} />
      ))}
    </>
  );
};

const ProjectRow = ({ project, index, isLast, onHover, onLeave }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      <motion.div
        className="h-px bg-gray-200 dark:bg-gray-800"
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
        style={{ transformOrigin: 'left' }}
      />

      <motion.div
        className="proj-row-inner group"
        onMouseEnter={() => onHover(project)}
        onMouseLeave={onLeave}
        onClick={() => setOpen(o => !o)}
        whileHover={{ x: 5 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      >
        <span className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-600 tabular-nums">
          {project.index}
        </span>
        <h3 className="proj-title text-gray-900 dark:text-white transition-opacity duration-200">
          {project.title}
        </h3>
        <span className="proj-subtitle text-xs text-gray-400 dark:text-gray-600 font-medium tracking-wide whitespace-nowrap">
          {project.subtitle}
        </span>
        <a
          href={project.link} target="_blank" rel="noopener noreferrer"
          className="proj-visit items-center gap-1 text-xs font-semibold
                     text-gray-400 dark:text-gray-600
                     hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap"
          onClick={e => e.stopPropagation()}
        >
          Visit ↗
        </a>
        <motion.button
          className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700
                     flex items-center justify-center shrink-0
                     text-gray-500 dark:text-gray-400
                     hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <motion.div
              style={{ paddingBottom: '2rem', paddingLeft: '3.5rem' }}
              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              exit={{ y: 6, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.07 }}
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 max-w-xl">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag, i) => (
                  <motion.span key={tag}
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.03 }}
                    style={{
                      fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
                      background: `${project.color}14`, color: project.color,
                      border: `1px solid ${project.color}28`,
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <motion.a
                  href={project.link} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '7px 18px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                    background: project.color, color: '#fff', textDecoration: 'none',
                  }}
                  whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                >
                  <i className="fas fa-external-link-alt" style={{ fontSize: 10 }} /> View Live
                </motion.a>
                {project.sourceCodeLink && (
                  <motion.a
                    href={project.sourceCodeLink} target="_blank" rel="noopener noreferrer"
                    className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '7px 18px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                      textDecoration: 'none',
                    }}
                    whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                  >
                    <i className="fab fa-github" style={{ fontSize: 12 }} /> Source Code
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLast && (
        <motion.div
          className="h-px bg-gray-200 dark:bg-gray-800"
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 + 0.1 }}
          style={{ transformOrigin: 'left' }}
        />
      )}
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const el = document.createElement('style');
    el.id = 'proj-scoped-css';
    el.textContent = SCOPED_CSS;
    if (!document.getElementById('proj-scoped-css')) document.head.appendChild(el);
    return () => document.getElementById('proj-scoped-css')?.remove();
  }, []);

  return (
    <section
      id="projects"
      className="proj-section bg-white dark:bg-gray-950 transition-colors relative overflow-hidden"
      style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.022] dark:opacity-[0.04]"
           style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <CursorDeck project={hoveredProject} visible={!!hoveredProject} />

      {/* ── Same section-wrap as every other section ── */}
      <div className="section-wrap relative">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 14 }}>
            Selected work
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <h2 className="proj-heading text-gray-900 dark:text-white">Projects</h2>
            <p style={{ fontSize: 11, color: '#9ca3af', maxWidth: 200, lineHeight: 1.7 }}>
              Hover a row to preview. Click + to expand.
            </p>
          </div>
        </motion.div>

        {/* List */}
        <div>
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id} project={project} index={i}
              isLast={i === projects.length - 1}
              onHover={setHoveredProject}
              onLeave={() => setHoveredProject(null)}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
        >
          <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>
            {projects.length} projects
          </span>
          <motion.a
            href="https://github.com/anbhav20" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: '#9ca3af', textDecoration: 'none' }}
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
            whileHover={{ x: 2 }}
          >
            More on GitHub <i className="fab fa-github" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;