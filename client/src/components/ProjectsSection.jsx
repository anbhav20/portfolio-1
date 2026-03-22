import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

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

/* ════════════════════════════════════════════════
   THEME TOKENS — mirrors SkillsSection exactly
════════════════════════════════════════════════ */
const tokens = (isDark) => ({
  sectionBg:       isDark ? '#090909' : '#f5f4f0',
  heading:         isDark ? '#eeebe4' : '#0a0a0a',
  muted:           isDark ? '#444'    : '#aaa',
  rule:            isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
  rowHoverBg:      isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
  indexColor:      isDark ? '#333'    : '#ccc',
  subtitleColor:   isDark ? '#444'    : '#bbb',
  visitColor:      isDark ? '#555'    : '#bbb',
  visitHover:      isDark ? '#eeebe4' : '#0a0a0a',
  btnBg:           isDark ? '#eeebe4' : '#0a0a0a',
  btnText:         isDark ? '#090909' : '#f5f4f0',
  btnBorder:       isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
  btnBorderHover:  isDark ? 'rgba(255,255,255,0.30)' : 'rgba(0,0,0,0.30)',
  drawerBg:        isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)',
});

/* ── Deck layer ── */
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

/* ── Project row ── */
const ProjectRow = ({ project, index, isLast, onHover, onLeave, t }) => {
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
      {/* top divider */}
      <motion.div
        style={{ width: '100%', height: 1, background: t.rule, transformOrigin: 'left', transition: 'background 0.3s ease' }}
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      />

      <motion.div
        onMouseEnter={() => onHover(project)}
        onMouseLeave={onLeave}
        onClick={() => setOpen(o => !o)}
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '2.5rem 1fr',
          alignItems: 'center',
          gap: '0 1rem',
          padding: '1.35rem 0.5rem',
          cursor: 'default',
          userSelect: 'none',
          borderRadius: 8,
          transition: 'background 0.2s ease',
        }}
        onMouseOver={e => e.currentTarget.style.background = t.rowHoverBg}
        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
      >
        {/* index */}
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
          color: t.indexColor, fontVariantNumeric: 'tabular-nums',
          fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
          transition: 'color 0.3s ease',
        }}>
          {project.index}
        </span>

        {/* title */}
        <h3 style={{
          fontSize: 'clamp(1rem, 2.2vw, 1.55rem)',
          fontWeight: 600, lineHeight: 1.25,
          letterSpacing: '-0.02em',
          color: t.heading,
          fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
          transition: 'color 0.3s ease',
          margin: 0,
        }}>
          {project.title}
        </h3>
      </motion.div>

      {/* expanded desktop row — subtitle + visit + toggle */}
      <div style={{
        display: 'none',
        position: 'relative', marginTop: -52, paddingRight: '0.5rem',
        justifyContent: 'flex-end', alignItems: 'center', gap: '1.5rem',
        pointerEvents: 'none',
      }}
        className="proj-desktop-row"
      />

      {/* simpler: keep original grid on desktop via inline media */}
      <style>{`
        @media (min-width: 640px) {
          .proj-row-${project.id} {
            grid-template-columns: 2.5rem 1fr auto auto auto !important;
            gap: 0 1.5rem !important;
          }
        }
      `}</style>

      {/* drawer */}
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
              style={{
                paddingBottom: '2rem', paddingLeft: '3.5rem', paddingTop: '0.75rem',
                background: t.drawerBg, borderRadius: '0 0 8px 8px',
              }}
              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              exit={{ y: 6, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.07 }}
            >
              <p style={{
                color: t.muted, fontSize: 13, lineHeight: 1.9,
                marginBottom: '1rem', maxWidth: 480,
                fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
                transition: 'color 0.3s ease',
              }}>
                {project.description}
              </p>

              {/* tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.25rem' }}>
                {project.tags.map((tag, i) => (
                  <motion.span key={tag}
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.03 }}
                    style={{
                      fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
                      background: `${project.color}14`, color: project.color,
                      border: `1px solid ${project.color}30`,
                      fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* buttons */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <motion.a
                  href={project.link} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '7px 18px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                    background: project.color, color: '#fff', textDecoration: 'none',
                    fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
                  }}
                  whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                >
                  <i className="fas fa-external-link-alt" style={{ fontSize: 10 }} /> View Live
                </motion.a>
                {project.sourceCodeLink && (
                  <motion.a
                    href={project.sourceCodeLink} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '7px 18px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                      background: t.btnBg, color: t.btnText, textDecoration: 'none',
                      fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
                      transition: 'background 0.3s, color 0.3s',
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

      {/* last row bottom divider */}
      {isLast && (
        <motion.div
          style={{ width: '100%', height: 1, background: t.rule, transformOrigin: 'left', transition: 'background 0.3s ease' }}
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 + 0.1 }}
        />
      )}
    </motion.div>
  );
};

/* ════════════ MAIN ════════════ */
const ProjectsSection = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const t = tokens(isDark);

  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <section
      id="projects"
      className="relative overflow-hidden"
      style={{
        background: t.sectionBg,
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <style>{`
        #projects { background-color: ${t.sectionBg} !important; transition: background-color 0.3s ease !important; }
      `}</style>

      {/* ambient dot */}
      <div style={{
        position: 'absolute', top: '30%', left: '60%',
        transform: 'translate(-50%,-50%)',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.055) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
        opacity: isDark ? 0.12 : 0.18,
      }} />

      <CursorDeck project={hoveredProject} visible={!!hoveredProject} />

      <div className="section-wrap" style={{ position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <motion.div
          style={{ marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#3b82f6', marginBottom: 12,
            fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
          }}>
            Selected work
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: 28 }}>
            <h2 style={{
              fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(27px, 3vw, 50px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.87,
              color: t.heading,
              margin: 0,
              transition: 'color 0.3s ease',
            }}>
              PROJECTS
            </h2>
            <p style={{
              fontSize: 11, color: t.muted, maxWidth: 200, lineHeight: 1.7,
              fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
              transition: 'color 0.3s ease',
            }}>
              Hover a row to preview.<br />Click to expand.
            </p>
          </div>

          {/* divider */}
          <div style={{ width: '100%', height: 1, background: t.rule, transition: 'background 0.3s ease' }} />
        </motion.div>

        {/* Project list */}
        <div>
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id} project={project} index={i}
              isLast={i === projects.length - 1}
              onHover={setHoveredProject}
              onLeave={() => setHoveredProject(null)}
              t={t}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          style={{ marginTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
        >
          <span style={{
            fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: t.muted, fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
            transition: 'color 0.3s ease',
          }}>
            {projects.length} projects
          </span>
          <motion.a
            href="https://github.com/anbhav20" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 11, fontWeight: 600, color: t.muted,
              textDecoration: 'none',
              fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = t.heading}
            onMouseLeave={e => e.currentTarget.style.color = t.muted}
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