import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useTypingEffect from '@/hooks/useTypingEffect';

/* ════════════ DATA ════════════ */
const profileData = {
  titles:       ['Full Stack Dev.', 'MERN Stack.', 'React & Node.', 'Builder.'],
  bio:          "From writing my first 'Hello, World!' to building the next big thing — this is just the beginning.",
  profileImage: '/assets/images/profile.png',
  cvPath:       '/assets/AbhishekCV.pdf?v=2',
  socialLinks: {
    github:   'https://github.com/anbhav20',
    linkedin: 'https://www.linkedin.com/in/abhishek-singh-48b18a246',
  },
};

/* ════════════ CSS ════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

.hw *, .hw *::before, .hw *::after { box-sizing: border-box; margin: 0; padding: 0; }
.hw {
  font-family: 'DM Sans', sans-serif;
  background: #f5f4f0;
  color: #0a0a0a;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}
.dark .hw { background: #090909; color: #eeebe4; }

/* grain */
.hw::after {
  content: ''; position: fixed; inset: 0; z-index: 200;
  pointer-events: none; opacity: .025;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
}
.dark .hw::after { opacity: .06; }

/* ── cursor — shape only, color handled by JS ── */
.hw-cursor {
  position: fixed;
  top: 0; left: 0;
  z-index: 9999;
  pointer-events: none;
  width: 15px; height: 15px;
  border-radius: 50%;
  transition: transform .18s ease;
}
.hw-cursor.big { transform: scale(4); }

/* top bar */
.hw-top {
  display: flex; align-items: center; justify-content: space-between;
  padding: 26px 52px;
  flex-shrink: 0; position: relative; z-index: 10;
}
.hw-logo {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: 13px; letter-spacing: .12em; text-transform: uppercase;
}
.hw-avail {
  display: flex; align-items: center; gap: 8px;
  font-size: 11px; font-weight: 500; letter-spacing: .1em;
  text-transform: uppercase; color: #888;
}
.dark .hw-avail { color: #555; }
@keyframes hw-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(1.7)} }
.hw-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; animation: hw-pulse 2s ease-in-out infinite; }

/* name area */
.hw-name-area {
  padding: 0 52px;
  flex-shrink: 0; position: relative; z-index: 5;
  overflow: hidden;
}
.hw-name-row { overflow: hidden; line-height: .87; }

.hw-name {
  font-family: 'Syne', sans-serif; font-weight: 800;
  display: block;
  font-size: clamp(40px, 17vw, 130px);
  line-height: .87; letter-spacing: -.04em;
  text-transform: uppercase;
  white-space: nowrap;
  color: #0a0a0a;
}
.dark .hw-name { color: #eeebe4; }

.hw-name-ghost {
  font-family: 'Syne', sans-serif; font-weight: 700;
  display: block;
  font-size: clamp(11px, 2.2vw, 22px);
  line-height: 1.2; letter-spacing: .06em;
  white-space: nowrap;
  -webkit-text-stroke: 1px #0a0a0a;
  color: transparent;
  opacity: 0.28;
}
.dark .hw-name-ghost { -webkit-text-stroke-color: rgba(238,235,228,.35); opacity: 0.2; }
.hw-blue-dot { -webkit-text-stroke: 0; -webkit-text-fill-color: #3b82f6; color: #3b82f6; opacity: 1; }

/* mid row */
.hw-mid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0 36px;
  padding: 20px 52px 0;
  position: relative; z-index: 5;
  min-height: 0;
}

/* left col */
.hw-left { display: flex; flex-direction: column; gap: 20px; }
.hw-label { font-size: 10px; font-weight: 500; letter-spacing: .25em; text-transform: uppercase; color: #aaa; }
.dark .hw-label { color: #444; }
.hw-role {
  font-family: 'Syne', sans-serif; font-weight: 700;
  font-size: clamp(13px, 1.4vw, 17px);
  color: #0a0a0a; min-height: 1.4em; line-height: 1.3; margin-top: 6px;
}
.dark .hw-role { color: #eeebe4; }
.hw-cursor-blink {
  display: inline-block; width: 2px; height: .88em;
  background: #3b82f6; margin-left: 2px; vertical-align: text-bottom;
  animation: hw-blink 1s step-end infinite;
}
@keyframes hw-blink { 0%,100%{opacity:1} 50%{opacity:0} }
.hw-loc { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #aaa; }
.dark .hw-loc { color: #555; }
.hw-idx { font-family: 'Syne', sans-serif; font-size: 10px; letter-spacing: .2em; color: #ccc; text-transform: uppercase; }
.dark .hw-idx { color: #252525; }

/* photo col */
.hw-photo-col { display: flex; justify-content: center; align-items: flex-end; }
.hw-photo-wrap { position: relative; width: clamp(100px, 13vw, 185px); padding-bottom: 24px; }

@keyframes hw-float {
  0%   { transform: translateY(0px);   }
  50%  { transform: translateY(-20px); }
  100% { transform: translateY(0px);   }
}
.hw-float-inner { animation: hw-float 5s ease-in-out infinite; will-change: transform; }

@keyframes hw-shadow {
  0%,100% { transform: translateX(-50%) scaleX(1);   opacity: .16; }
  50%      { transform: translateX(-50%) scaleX(.72); opacity: .07; }
}
.hw-shadow {
  position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%);
  width: 55%; height: 14px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(0,0,0,.4) 0%, transparent 70%);
  animation: hw-shadow 5s ease-in-out infinite;
  will-change: transform, opacity; pointer-events: none;
}
.dark .hw-shadow { background: radial-gradient(ellipse, rgba(0,0,0,.7) 0%, transparent 70%); }
.hw-photo-wrap img { width: 100%; height: auto; display: block; filter: contrast(1.04) brightness(.95); }

@keyframes hw-orbit { to { transform: rotate(360deg); } }
.hw-orbit {
  position: absolute; inset: -12px 0 36px;
  border-radius: 50%; border: 1px dashed rgba(59,130,246,.2);
  animation: hw-orbit 28s linear infinite; pointer-events: none;
}
.hw-orbit::before {
  content: ''; position: absolute; top: -3px; left: 50%;
  transform: translateX(-50%);
  width: 6px; height: 6px; border-radius: 50%; background: #3b82f6;
}

/* right col */
.hw-right { display: flex; flex-direction: column; align-items: flex-end; gap: 16px; }
.hw-stack-row { display: flex; flex-wrap: wrap; gap: 5px; justify-content: flex-end; }
.hw-stack-tag {
  font-size: 10px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase;
  padding: 3px 9px; border-radius: 4px;
  background: rgba(59,130,246,.07); color: #2563eb; border: 1px solid rgba(59,130,246,.15);
}
.dark .hw-stack-tag { background: rgba(59,130,246,.1); border-color: rgba(59,130,246,.2); color: #60a5fa; }
.hw-bio { font-size: 13px; line-height: 1.9; color: #888; font-weight: 300; max-width: 240px; text-align: right; }
.dark .hw-bio { color: #444; }

/* buttons */
.hw-btn-row { display: flex; gap: 9px; flex-wrap: wrap; justify-content: flex-end; }
.hw-btn-fill {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 22px; border-radius: 100px;
  background: #0a0a0a; color: #f5f4f0;
  font-size: 13px; font-weight: 500; font-family: 'DM Sans', sans-serif;
  border: none; cursor: pointer; letter-spacing: .02em; white-space: nowrap;
  transition: background .2s, transform .15s, box-shadow .2s; text-decoration: none;
}
.hw-btn-fill:hover { background: #1e293b; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.15); }
.dark .hw-btn-fill { background: #eeebe4; color: #090909; }
.dark .hw-btn-fill:hover { background: #fff; }
.hw-btn-line {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 20px; border-radius: 100px;
  background: transparent; color: #666;
  font-size: 13px; font-weight: 500; font-family: 'DM Sans', sans-serif;
  border: 1px solid rgba(0,0,0,.13); cursor: pointer; letter-spacing: .02em; white-space: nowrap;
  transition: color .2s, border-color .2s, transform .15s; text-decoration: none;
}
.hw-btn-line:hover { color: #0a0a0a; border-color: rgba(0,0,0,.35); transform: translateY(-2px); }
.dark .hw-btn-line { color: #555; border-color: rgba(255,255,255,.1); }
.dark .hw-btn-line:hover { color: #eeebe4; border-color: rgba(255,255,255,.3); }

/* divider */
.hw-rule { width: 100%; height: 1px; background: rgba(0,0,0,.07); border: none; flex-shrink: 0; }
.dark .hw-rule { background: rgba(255,255,255,.05); }

/* bottom bar */
.hw-bot {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 52px 26px;
  flex-shrink: 0; position: relative; z-index: 10; flex-wrap: wrap; gap: 12px;
}
.hw-soc-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.hw-soc-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 14px; border-radius: 100px;
  border: 1px solid rgba(0,0,0,.09); color: #666;
  font-size: 12px; font-weight: 500; font-family: 'DM Sans', sans-serif;
  text-decoration: none; letter-spacing: .04em; white-space: nowrap;
  transition: color .2s, border-color .2s, background .15s, transform .15s;
  cursor: pointer; background: transparent;
}
.hw-soc-btn:hover { color: #0a0a0a; border-color: rgba(0,0,0,.28); background: rgba(0,0,0,.03); transform: translateY(-1px); }
.dark .hw-soc-btn { color: #555; border-color: rgba(255,255,255,.07); }
.dark .hw-soc-btn:hover { color: #eeebe4; border-color: rgba(255,255,255,.22); background: rgba(255,255,255,.04); }
.hw-scroll { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.hw-scroll-text { font-size: 10px; font-weight: 500; letter-spacing: .22em; text-transform: uppercase; color: #bbb; }
.dark .hw-scroll-text { color: #2a2a2a; }
@keyframes hw-fall { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
.hw-scroll-circle {
  width: 30px; height: 30px; border-radius: 50%;
  border: 1px solid rgba(0,0,0,.1);
  display: flex; align-items: center; justify-content: center;
  color: #aaa; font-size: 10px;
  animation: hw-fall 1.9s ease-in-out infinite;
}
.dark .hw-scroll-circle { border-color: rgba(255,255,255,.08); }

/* watermark */
.hw-wm {
  position: absolute; right: 52px; top: 50%; writing-mode: vertical-rl;
  transform: translateY(-50%);
  font-family: 'Syne', sans-serif; font-size: 9px; letter-spacing: .3em;
  color: rgba(0,0,0,.07); text-transform: uppercase;
  pointer-events: none; user-select: none; z-index: 1; white-space: nowrap;
}
.dark .hw-wm { color: rgba(255,255,255,.04); }

/* ═══════════════════════════════════
   RESPONSIVE
═══════════════════════════════════ */

/* Tablet 768–900 */
@media (max-width: 900px) {
  .hw-top       { padding: 22px 32px; }
  .hw-name-area { padding: 0 32px; }
  .hw-mid       { grid-template-columns: 140px 1fr 140px; gap: 0 16px; padding: 16px 32px 0; }
  .hw-bot       { padding: 14px 32px 22px; }
  .hw-wm        { display: none; }
  .hw-bio       { max-width: 160px; font-size: 12px; }
  .hw-photo-wrap { width: clamp(90px, 14vw, 140px); }
}

/* Mobile < 768px */
@media (max-width: 767px) {
  .hw-top       { padding: 16px 20px; }
  .hw-name-area { padding: 0 20px; overflow: hidden; }
  .hw-bot       { padding: 12px 20px 20px; }
  .hw-wm        { display: none; }

  .hw-name      { font-size: clamp(28px, 11.5vw, 56px); white-space: nowrap; }
  .hw-name-ghost { font-size: clamp(9px, 2.8vw, 14px); opacity: 0.22; letter-spacing: .08em; }
  .dark .hw-name-ghost { opacity: 0.16; }

  .hw-mid {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    padding: 16px 20px 0;
    gap: 20px;
    align-items: center;
  }
  .hw-photo-col { order: 0; justify-content: center; }
  .hw-photo-wrap { width: clamp(90px, 35vw, 160px); }
  .hw-left  { order: 1; align-items: center; text-align: center; gap: 12px; }
  .hw-loc   { justify-content: center; }
  .hw-right { order: 2; align-items: center; text-align: center; gap: 12px; }
  .hw-stack-row { justify-content: center; }
  .hw-bio       { text-align: center; max-width: 300px; font-size: 12px; }
  .hw-btn-row   { justify-content: center; }
  .hw-soc-row   { gap: 5px; justify-content: center; }
  .hw-soc-btn   { padding: 6px 11px; font-size: 11px; }
}

/* Very small < 400px */
@media (max-width: 400px) {
  .hw-name       { font-size: clamp(24px, 10vw, 40px); }
  .hw-name-ghost { font-size: clamp(8px, 2.5vw, 12px); }
  .hw-avail      { font-size: 10px; }
  .hw-soc-btn    { padding: 5px 9px; font-size: 10px; }
  .hw-photo-wrap { width: clamp(80px, 32vw, 130px); }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hw-float-inner, .hw-shadow, .hw-orbit { animation: none; }
}
`;

/* ════════════ CURSOR DOT ════════════
   - Light mode: pure dark dot, no blend — always visible on light bg
   - Dark mode:  white dot with difference blend — inverts on dark bg
   Watches the <html> class for 'dark' changes in real time.
════════════════════════════════════ */
const CursorDot = () => {
  const [big,    setBig]    = useState(false);
  const [isDark, setIsDark] = useState(false);
  const mx = useMotionValue(-50), my = useMotionValue(-50);
  const x  = useSpring(mx, { stiffness: 220, damping: 22 });
  const y  = useSpring(my, { stiffness: 220, damping: 22 });

  /* Watch <html class="dark"> changes */
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true, attributeFilter: ['class'],
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const move = e => { mx.set(e.clientX); my.set(e.clientY); };
    const over  = e => { if (e.target.closest('a,button,[data-h]')) setBig(true); };
    const out   = () => setBig(false);
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout',  out);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout',  out);
    };
  }, []);

  return (
    <motion.div
      className={`hw-cursor ${big ? 'big' : ''}`}
      style={{
        x, y,
        translateX: '-50%',
        translateY: '-50%',
        /* light: solid dark dot — always visible */
        /* dark:  white dot + difference blend — inverts over text */
        background:    isDark ? '#ffffff' : '#111111',
        mixBlendMode:  isDark ? 'difference' : 'normal',
      }}
    />
  );
};

/* ════════════ AMBIENT BLOB ════════════ */
const AmbientBlob = () => {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const x  = useSpring(mx, { stiffness: 38, damping: 14 });
  const y  = useSpring(my, { stiffness: 38, damping: 14 });
  useEffect(() => {
    const h = e => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return (
    <motion.div style={{
      position: 'fixed', top: 0, left: 0, width: 560, height: 560,
      borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
      translateX: '-50%', translateY: '-50%', x, y,
    }} />
  );
};

/* ════════════ WORD MASK ════════════ */
const Mask = ({ children, delay = 0 }) => (
  <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
    <motion.span
      style={{ display: 'inline-block' }}
      initial={{ y: '110%' }}
      animate={{ y: '0%' }}
      transition={{ duration: .8, ease: [0.22, 1, 0.36, 1], delay }}
    >{children}</motion.span>
  </span>
);

/* ════════════ PHOTO ════════════ */
const Photo = () => {
  const [failed, setFailed] = useState(false);
  return (
    <div className="hw-photo-wrap">
      <div className="hw-orbit" />
      <div className="hw-float-inner">
        {failed
          ? <div style={{ width: '100%', aspectRatio: '2/3', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
              <span style={{ fontSize: 52, fontWeight: 900, color: '#3b82f6' }}>A</span>
            </div>
          : <img src={profileData.profileImage} alt="Abhishek" onError={() => setFailed(true)} />
        }
      </div>
      <div className="hw-shadow" />
    </div>
  );
};

/* ════════════ HERO ════════════ */
const HeroSection = () => {
  const typedText = useTypingEffect(profileData.titles, 52, 26, 1700);

  useEffect(() => {
    const el = document.createElement('style');
    el.innerHTML = CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const scrollTo = id => {
    const s = document.getElementById(id);
    if (s) window.scrollTo({ top: s.offsetTop - 70, behavior: 'smooth' });
  };

  const reveal = (delay, y = 16) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: .85, ease: [0.22, 1, 0.36, 1], delay },
  });

  const bio = profileData.bio.split(' ');

  return (
    <section id="about" className="hw pt-10">
      <div className="hidden md:block"><CursorDot /><AmbientBlob /></div>

      {/* TOP BAR */}
      <motion.div className="hw-top  " {...reveal(0.05, 0)}>
        <span className="hw-logo">Abhishek.dev</span>
        <div className="hw-avail">
          <span className="hw-dot" />
          Open to work
        </div>
      </motion.div>

      {/* NAME */}
      <div className="hw-name-area">
        <div className="hw-name-row">
          <motion.span
            className="hw-name"
            initial={{ y: '102%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            ABHISHEK
          </motion.span>
        </div>
        <div className="hw-name-row">
          <motion.span
            className="hw-name-ghost"
            initial={{ y: '102%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.17 }}
          >
            aka anbhav<span className="hw-blue-dot">.</span>
          </motion.span>
        </div>
      </div>

      {/* MID ROW */}
      <div className="hw-mid">

        {/* Left */}
        <motion.div className="hw-left" {...reveal(0.38)}>
          <div>
            <span className="hw-label">Role</span>
            <div className="hw-role">
              {typedText}<span className="hw-cursor-blink" />
            </div>
          </div>
          <div className="hw-loc">
            <i className="fas fa-map-marker-alt" style={{ fontSize: 11, color: '#3b82f6' }} />
            New Delhi, India
          </div>
          <span className="hw-idx">01 / Portfolio 2026</span>
        </motion.div>

        {/* Photo */}
        <motion.div
          className="hw-photo-col"
          initial={{ opacity: 0, y: 28, scale: .96 }}
          animate={{ opacity: 1, y: 0,  scale: 1   }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        >
          <Photo />
        </motion.div>

        {/* Right */}
        <motion.div className="hw-right" {...reveal(0.43)}>
          <p className="hw-bio">
            {bio.map((word, i) => (
              <Mask key={i} delay={0.47 + i * 0.022}>
                <span style={{ marginRight: '0.3em' }}>{word}</span>
              </Mask>
            ))}
          </p>
          <div className="hw-btn-row">
            <motion.button className="hw-btn-fill" onClick={() => scrollTo('projects')} whileHover={{ y: -2 }} whileTap={{ scale: .96 }} data-h>
              <i className="fas fa-rocket" style={{ fontSize: 12 }} /> Projects
            </motion.button>
            <motion.a className="hw-btn-line" href={profileData.cvPath} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: .96 }} data-h>
              <i className="fas fa-download" style={{ fontSize: 11 }} /> Resume
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="hw-wm">Portfolio 2026 — Full Stack Developer</div>

      {/* DIVIDER */}
      <motion.hr className="hw-rule" style={{ marginTop: 'auto' }} {...reveal(0.65, 0)} />

      {/* BOTTOM BAR */}
      <motion.div className="hw-bot" {...reveal(0.7, 0)}>
        <div className="hw-soc-row">
          <a href={profileData.socialLinks.github}   target="_blank" rel="noopener noreferrer" className="hw-soc-btn" data-h>
            <i className="fab fa-github"      style={{ fontSize: 13 }} /> GitHub
          </a>
          <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hw-soc-btn" data-h>
            <i className="fab fa-linkedin-in" style={{ fontSize: 13 }} /> LinkedIn
          </a>
          <button className="hw-soc-btn" onClick={() => scrollTo('contact')} data-h>
            <i className="fas fa-envelope"    style={{ fontSize: 12 }} /> Contact
          </button>
        </div>
        <div className="hw-scroll" onClick={() => scrollTo('skills')} data-h>
          <span className="hw-scroll-text">Scroll</span>
          <div className="hw-scroll-circle"><i className="fas fa-arrow-down" /></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;