import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useTypingEffect from '@/hooks/useTypingEffect';

const profileData = {
  name: 'Abhishek',
  titles: [
    "Hi!",
    "I'm Abhishek.",
    "I'm a Full Stack Developer.",
    "Ohh! Sorry — MERN! 😄",
    "I'm a Programmer.",
  ],
  bio: "From writing my first 'Hello, World!' to building the next big thing — this is just the beginning.",
  profileImage: '/assets/images/profile.jpg',
  cvPath: '/assets/AbhishekCV.pdf?v=2',
  socialLinks: {
    github:   'https://github.com/anbhav20',
    linkedin: 'https://www.linkedin.com/in/abhishek-singh-48b18a246',
  },
};

// Word-mask reveal
const MaskReveal = ({ children, delay = 0 }) => (
  <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
    <motion.span
      style={{ display: 'inline-block' }}
      initial={{ y: '105%' }}
      animate={{ y: '0%' }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.span>
  </span>
);

// Magnetic cursor blob
const CursorBlob = () => {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const x = useSpring(mx, { stiffness: 55, damping: 18 });
  const y = useSpring(my, { stiffness: 55, damping: 18 });
  useEffect(() => {
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <motion.div
      style={{
        x, y,
        position: 'fixed', top: 0, left: 0,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)',
        translateX: '-50%', translateY: '-50%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
};

const ProfileImage = () => {
  const [failed, setFailed] = React.useState(false);
  return (
    <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
      {failed ? (
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
          <span className="text-6xl font-black text-blue-400">{profileData.name.charAt(0)}</span>
        </div>
      ) : (
        <img
          src={profileData.profileImage}
          alt={`${profileData.name}'s profile`}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
};

const CURSOR_CSS = `
  .typing-cursor {
    display: inline-block; width: 2px; height: 0.82em;
    background: #3b82f6; margin-left: 4px; vertical-align: middle;
    border-radius: 1px; animation: cur-blink 1s infinite;
  }
  @keyframes cur-blink { 0%,100%{opacity:1} 50%{opacity:0} }
`;

const HeroSection = () => {
  const typedText = useTypingEffect(profileData.titles, 80, 40, 1800);

  useEffect(() => {
    const el = document.createElement('style');
    el.innerHTML = CURSOR_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const scrollTo = (id) => {
    const s = document.getElementById(id);
    if (s) window.scrollTo({ top: s.offsetTop - 70, behavior: 'smooth' });
  };

  const bio = profileData.bio.split(' ');

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center bg-white dark:bg-gray-950 overflow-hidden transition-colors"
      style={{ paddingTop: '5rem' }}
    >
      <div className="hidden md:block"><CursorBlob /></div>

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.022] dark:opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-100/30 dark:bg-indigo-900/08 rounded-full blur-3xl pointer-events-none" />

      {/* ── Same padding as all other sections ── */}
      <div className="hero-wrap w-full relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">

          {/* Left — takes ~58% like Snellenberg */}
          <div className="w-full md:w-[58%] text-center md:text-left">

            {/* "Open to opportunities" badge */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5
                         bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400
                         text-xs font-semibold tracking-wide border border-blue-200 dark:border-blue-800"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Open to opportunities
            </motion.span>

            {/* Typewriter heading */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-tight
                         text-gray-900 dark:text-white mb-5 min-h-[1.3em]"
              style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif', letterSpacing: '-0.03em' }}
            >
              {typedText}<span className="typing-cursor" />
            </motion.h1>

            {/* Bio — word stagger */}
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed"
               style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>
              {bio.map((word, i) => (
                <MaskReveal key={i} delay={0.45 + i * 0.035}>
                  <span style={{ marginRight: '0.28em' }}>{word}</span>
                </MaskReveal>
              ))}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-7">
              {[
                { label: 'View Projects', icon: 'fa-rocket',     action: () => scrollTo('projects'), primary: true },
                { label: 'Contact Me',    icon: 'fa-envelope',   action: () => scrollTo('contact'),  primary: false },
              ].map(({ label, icon, action, primary }, i) => (
                <motion.button
                  key={label}
                  onClick={action}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.7 + i * 0.07 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl
                    ${primary
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30'
                      : 'border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}
                >
                  <i className={`fas ${icon} text-xs`} />{label}
                </motion.button>
              ))}
              <motion.a
                href={profileData.cvPath}
                target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.84 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl
                           bg-gray-900 dark:bg-gray-700 text-white shadow-md"
                style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}
              >
                <i className="fas fa-file-alt text-xs" />Download CV
              </motion.a>
            </div>

            {/* Socials */}
            <motion.div
              className="flex justify-center md:justify-start gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              {[
                { href: profileData.socialLinks.github,   icon: 'fab fa-github',      label: 'GitHub' },
                { href: profileData.socialLinks.linkedin, icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
              ].map(({ href, icon, label }) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2, scale: 1.1 }} whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 flex items-center justify-center rounded-lg
                             border border-gray-200 dark:border-gray-700
                             text-gray-500 dark:text-gray-400
                             hover:text-gray-900 dark:hover:text-white
                             hover:border-gray-400 dark:hover:border-gray-500
                             transition-colors text-sm"
                >
                  <i className={icon} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — profile image */}
          <motion.div
            className="w-full md:w-[38%] flex justify-center"
            initial={{ opacity: 0, scale: 0.9, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            <div className="relative">
              {/* Spinning ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-dashed border-blue-200 dark:border-blue-800/40 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-blue-400/15 to-indigo-400/15 blur-md pointer-events-none" />

              <ProfileImage />

              {/* Badge — role */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 250, damping: 20 }}
                className="absolute -bottom-2 -right-2 md:bottom-3 md:-right-8
                           bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700
                           rounded-2xl shadow-xl px-3 py-1.5 flex items-center gap-2"
              >
                <span className="text-lg">💻</span>
                <div>
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-100 leading-tight" style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>Full Stack</p>
                  <p className="text-[10px] text-gray-400 leading-tight" style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>MERN Developer</p>
                </div>
              </motion.div>

              {/* Badge — location */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, type: 'spring', stiffness: 250, damping: 20 }}
                className="absolute -top-2 -left-2 md:top-3 md:-left-10
                           bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700
                           rounded-2xl shadow-xl px-3 py-1.5 flex items-center gap-1.5"
              >
                <i className="fas fa-map-marker-alt text-blue-500 text-xs" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>New Delhi, India</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.3 }}
          whileHover={{ opacity: 0.75 }}
          onClick={() => scrollTo('skills')}
        >
          <span className="text-[9px] text-gray-400 tracking-[0.25em] uppercase" style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>Scroll</span>
          <motion.i
            className="fas fa-chevron-down text-gray-400 text-xs"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;