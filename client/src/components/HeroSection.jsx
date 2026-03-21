import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useTypingEffect from '@/hooks/useTypingEffect';

/* ─────────────── DATA ─────────────── */
const profileData = {
  name: 'Abhishek',
  titles: [
    "Hi! I'm Abhishek.",
    "I'm a Full Stack Dev.",
    "I build with MERN.",
    "I'm a Programmer.",
  ],
  bio: "From writing my first 'Hello, World!' to building the next big thing — this is just the beginning.",
  profileImage: '/assets/images/profile.png', // transparent PNG works perfectly here
  cvPath: '/assets/AbhishekCV.pdf?v=2',
  socialLinks: {
    github:   'https://github.com/anbhav20',
    linkedin: 'https://www.linkedin.com/in/abhishek-singh-48b18a246',
  },
};

/* ─────────────── STYLES ─────────────── */
const HERO_CSS = `
  /* Typing cursor */
  .typing-cursor {
    display: inline-block;
    width: 3px;
    height: 0.85em;
    background: #3b82f6;
    margin-left: 3px;
    vertical-align: middle;
    border-radius: 2px;
    animation: cur-blink 1s step-end infinite;
  }
  @keyframes cur-blink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* Hero section container padding — matches your other sections */
  .hero-wrap {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  @media (min-width: 768px) { .hero-wrap { padding: 0 4rem; } }
  @media (min-width: 1280px){ .hero-wrap { padding: 0 6rem; } }

  /* Transparent photo — floats naturally, no frame needed */
  .hero-photo-wrap {
    position: relative;
    width: 100%;
    max-width: 320px;
    /* No fixed height — let the image set its own aspect ratio */
  }
  @media (max-width: 767px) {
    .hero-photo-wrap { max-width: 220px; margin: 0 auto; }
  }

  .hero-photo-wrap img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
    /* Subtle enhancement for B&W photo */
    filter: contrast(1.05) brightness(0.97);
    transition: filter 0.4s;
    /* No border-radius — let the transparent PNG shape itself */
    border-radius: 0;
    background: transparent;
  }

  /* Soft glow behind the transparent photo */
  .hero-photo-glow {
    position: absolute;
    inset: 10% 5%;
    background: radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    filter: blur(32px);
  }
  .dark .hero-photo-glow {
    background: radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, transparent 70%);
  }

  /* Floating badges */
  .hero-badge {
    position: absolute;
    background: white;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06);
    padding: 8px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    z-index: 10;
  }
  .dark .hero-badge {
    background: #1e293b;
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  /* Pulse dot */
  @keyframes pulse-ring {
    0%  { transform: scale(1);   opacity: 0.9; }
    70% { transform: scale(2.2); opacity: 0;   }
    100%{ transform: scale(2.2); opacity: 0;   }
  }
  .pulse-dot-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #22c55e;
    animation: pulse-ring 1.8s ease-out infinite;
  }

  /* Scroll hint bounce */
  @keyframes bounce-down { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
  .scroll-bounce { animation: bounce-down 1.6s ease-in-out infinite; }

  /* Stack chip */
  .stack-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    background: rgba(59,130,246,0.08);
    color: #2563eb;
    border: 1px solid rgba(59,130,246,0.2);
  }
  .dark .stack-chip {
    background: rgba(59,130,246,0.15);
    color: #93c5fd;
    border-color: rgba(59,130,246,0.3);
  }
`;

/* ─────────────── CURSOR BLOB ─────────────── */
const CursorBlob = () => {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const x  = useSpring(mx, { stiffness: 55, damping: 18 });
  const y  = useSpring(my, { stiffness: 55, damping: 18 });
  useEffect(() => {
    const h = e => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return (
    <motion.div style={{
      x, y, position: 'fixed', top: 0, left: 0,
      width: 500, height: 500, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
      translateX: '-50%', translateY: '-50%',
      pointerEvents: 'none', zIndex: 0,
    }} />
  );
};

/* ─────────────── WORD MASK REVEAL ─────────────── */
const MaskReveal = ({ children, delay = 0 }) => (
  <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
    <motion.span
      style={{ display: 'inline-block' }}
      initial={{ y: '110%' }}
      animate={{ y: '0%' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.span>
  </span>
);

/* ─────────────── PROFILE PHOTO ─────────────── */
const ProfilePhoto = () => {
  const [failed, setFailed] = React.useState(false);

  return (
    <div className="hero-photo-wrap">
      {/* Glow layer behind image */}
      <div className="hero-photo-glow" />

      {/* Actual image — sits above glow */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {failed ? (
          /* Fallback: initials circle */
          <div style={{
            width: '100%', aspectRatio: '3/4',
            background: 'linear-gradient(135deg, #dbeafe, #e0e7ff)',
            borderRadius: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 80, fontWeight: 900, color: '#3b82f6' }}>
              {profileData.name.charAt(0)}
            </span>
          </div>
        ) : (
          <img
            src={profileData.profileImage}
            alt={`${profileData.name}'s profile`}
            onError={() => setFailed(true)}
          />
        )}
      </div>

      {/* ── Badge: Full Stack MERN ── */}
      <motion.div
        className="hero-badge"
        style={{ bottom: '8%', right: '-5%' }}
        initial={{ opacity: 0, scale: 0.7, y: 10 }}
        animate={{ opacity: 1, scale: 1,   y: 0  }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 260, damping: 22 }}
      >
        <span style={{ fontSize: 20 }}>💻</span>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', margin: 0, lineHeight: 1.3 }}
             className="dark:text-gray-100">Full Stack</p>
          <p style={{ fontSize: 10, color: '#94a3b8', margin: 0, lineHeight: 1.3 }}>MERN Developer</p>
        </div>
      </motion.div>

      {/* ── Badge: Location ── */}
      <motion.div
        className="hero-badge"
        style={{ top: '6%', left: '-8%' }}
        initial={{ opacity: 0, scale: 0.7, y: -10 }}
        animate={{ opacity: 1, scale: 1,   y: 0   }}
        transition={{ delay: 1.0, type: 'spring', stiffness: 260, damping: 22 }}
      >
        <i className="fas fa-map-marker-alt" style={{ color: '#3b82f6', fontSize: 12 }} />
        <span style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}
              className="dark:text-gray-300">New Delhi, India</span>
      </motion.div>
    </div>
  );
};

/* ─────────────── MAIN COMPONENT ─────────────── */
const HeroSection = () => {
  /* Faster typing: 55ms type, 28ms delete, 1600ms pause */
  const typedText = useTypingEffect(profileData.titles, 55, 28, 1600);

  useEffect(() => {
    const el = document.createElement('style');
    el.innerHTML = HERO_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const scrollTo = id => {
    const s = document.getElementById(id);
    if (s) window.scrollTo({ top: s.offsetTop - 70, behavior: 'smooth' });
  };

  const bio = profileData.bio.split(' ');
  const STACK = ['MongoDB', 'Express', 'React', 'Node.js'];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center
                 bg-white dark:bg-gray-950
                 overflow-hidden transition-colors"
      style={{ paddingTop: '5rem', paddingBottom: '3rem' }}
    >
      {/* Cursor blob — desktop only */}
      <div className="hidden md:block">
        <CursorBlob />
      </div>

      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-100/40 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* ════════════ CONTENT ════════════ */}
      <div className="hero-wrap relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8 lg:gap-16">

          {/* ── LEFT: Text content ── */}
          <div className="w-full md:w-[55%] text-center md:text-left">

            {/* Open to opportunities badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6
                         bg-blue-50 dark:bg-blue-900/25
                         border border-blue-200 dark:border-blue-800/60
                         text-blue-600 dark:text-blue-400
                         text-xs font-semibold tracking-wide"
            >
              {/* Pulsing availability dot */}
              <span className="relative flex h-2 w-2">
                <span className="pulse-dot-ring" />
                <span className="relative w-2 h-2 rounded-full bg-green-400 block" />
              </span>
              Open to opportunities
            </motion.div>

            {/* Typewriter heading */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-tight
                         text-gray-900 dark:text-white mb-5"
              style={{ letterSpacing: '-0.03em', minHeight: '1.25em' }}
            >
              {typedText}<span className="typing-cursor" />
            </motion.h1>

            {/* MERN stack chips */}
            <motion.div
              className="flex flex-wrap gap-2 justify-center md:justify-start mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {STACK.map((s, i) => (
                <motion.span
                  key={s}
                  className="stack-chip"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1   }}
                  transition={{ delay: 0.32 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#3b82f6', display: 'inline-block', flexShrink: 0 }} />
                  {s}
                </motion.span>
              ))}
            </motion.div>

            {/* Bio — word stagger */}
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-8
                          max-w-md mx-auto md:mx-0 leading-relaxed">
              {bio.map((word, i) => (
                <MaskReveal key={i} delay={0.38 + i * 0.03}>
                  <span style={{ marginRight: '0.27em' }}>{word}</span>
                </MaskReveal>
              ))}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-7">
              {[
                { label: 'View Projects', icon: 'fa-rocket',  action: () => scrollTo('projects'), primary: true  },
                { label: 'Contact Me',   icon: 'fa-envelope', action: () => scrollTo('contact'),  primary: false },
              ].map(({ label, icon, action, primary }, i) => (
                <motion.button
                  key={label}
                  onClick={action}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0   }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 + i * 0.07 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all
                    ${primary
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/40'
                      : 'border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                >
                  <i className={`fas ${icon} text-xs`} />
                  {label}
                </motion.button>
              ))}

              {/* Download CV */}
              <motion.a
                href={profileData.cvPath}
                target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0   }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl
                           bg-gray-900 dark:bg-white/10 dark:border dark:border-white/10
                           text-white hover:bg-gray-800 dark:hover:bg-white/15
                           shadow-md transition-all"
              >
                <i className="fas fa-download text-xs" />
                Download CV
              </motion.a>
            </div>

            {/* Social icons */}
            <motion.div
              className="flex justify-center md:justify-start gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { href: profileData.socialLinks.github,   icon: 'fab fa-github',      label: 'GitHub'   },
                { href: profileData.socialLinks.linkedin, icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
              ].map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 flex items-center justify-center rounded-xl
                             border border-gray-200 dark:border-gray-700
                             text-gray-500 dark:text-gray-400 text-sm
                             hover:text-gray-900 dark:hover:text-white
                             hover:border-gray-400 dark:hover:border-gray-500
                             hover:bg-gray-50 dark:hover:bg-gray-800
                             transition-all duration-200"
                >
                  <i className={icon} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Photo ── */}
          <motion.div
            className="w-full md:w-[42%] flex justify-center"
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0,  scale: 1    }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <ProfilePhoto />
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-1 cursor-pointer select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 1.2 }}
        whileHover={{ opacity: 0.8 }}
        onClick={() => scrollTo('skills')}
      >
        <span className="text-[9px] text-gray-400 tracking-[0.28em] uppercase">Scroll</span>
        <i className="fas fa-chevron-down text-gray-400 text-xs scroll-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;