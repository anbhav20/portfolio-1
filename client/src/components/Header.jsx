import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { id: 'about',    label: 'Home'     },
  { id: 'skills',   label: 'Skills'   },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact'  },
];

const socials = [
  { label: 'GitHub',    href: 'https://github.com/anbhav20' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/abhishek-singh-48b18a246' },
  { label: 'Instagram', href: 'https://www.instagram.com/anbhav_19' },
];

const Header = () => {
  const [open, setOpen]                   = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [vh, setVh]                       = useState(0);

  // measure viewport height so we can compute exact pixel radius = half of vh
  useEffect(() => {
    const measure = () => setVh(window.innerHeight);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const offset = window.scrollY + 120;
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (el && offset >= el.offsetTop && offset < el.offsetTop + el.offsetHeight)
          setActiveSection(id);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
    }, 650);
  };

  // Radius = exactly half the viewport height → perfect half-circle from corner to corner
  const radius = vh / 2;

  return (
    <>
      {/* Logo */}
      <motion.a
        href="#"
        onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="fixed top-5 left-0 z-50 flex items-center gap-0.5 select-none"
        style={{ paddingLeft: 'var(--hero-px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        whileHover={{ opacity: 0.55 }}
      >
        <span className="text-sm font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif', letterSpacing: '-0.03em' }}>
          Abhishek
        </span>
        <span className="text-sm font-light text-gray-400 dark:text-gray-500"
              style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>
          .dev
        </span>
      </motion.a>

      {/* Hamburger circle — top right */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <ThemeToggle />
        </motion.div>

        <motion.button
          onClick={() => setOpen(o => !o)}
          className="w-11 h-11 rounded-full flex items-center justify-center
                     bg-gray-900 dark:bg-white shadow-lg
                     hover:scale-105 active:scale-95 transition-transform"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 280, damping: 22 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.svg key="x" width="13" height="13" viewBox="0 0 13 13" fill="none"
                initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                <line x1="1" y1="1" x2="12" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="12" y1="1" x2="1" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </motion.svg>
            ) : (
              <motion.svg key="bars" width="15" height="9" viewBox="0 0 15 9" fill="none"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                <line x1="0" y1="1" x2="15" y2="1" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                <line x1="0" y1="8" x2="15" y2="8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="bd"
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[3px] cursor-pointer"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />

            {/* 
              The panel:
              - Hugs the RIGHT edge of screen (right: 0)
              - top-left and bottom-left border-radius = vh/2 (exact half circle from top-right corner to bottom-right corner)
              - top-right and bottom-right = 0 (flush with screen edge)
              - Width is wide enough so content clears the curve
            */}
            <motion.div
              key="panel"
              className="fixed top-0 right-0 z-40 h-full bg-gray-950"
              style={{
                width: Math.min(Math.round(vh * 0.72), 520),  // width proportional to height
                maxWidth: '90vw',
                overflow: 'hidden',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: radius,
                borderBottomLeftRadius: radius,
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {/*
                Inner content container:
                - paddingLeft pushes content away from the curved left wall
                - The safe zone starts at roughly (width - radius) from left
                - We use 44% paddingLeft as a reliable offset
              */}
              <div
                className="flex flex-col h-full"
                style={{ paddingLeft: '42%', paddingRight: '1.75rem' }}
              >
                {/* Top label */}
                <div className="pt-10 pb-5 border-b border-white/[0.07]">
                  <span className="text-[8px] font-bold tracking-[0.28em] uppercase text-gray-600"
                        style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>
                    Navigation
                  </span>
                </div>

                {/* Nav links — vertically centred, pushed down slightly */}
                <nav className="flex-1 flex flex-col justify-center gap-0.5 pt-4">
                  {navItems.map(({ id, label }, i) => (
                    <motion.button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className="flex items-center gap-2.5 py-2.5 w-full text-left"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: i * 0.055 }}
                      whileHover={{ x: 5 }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          background: activeSection === id ? '#3b82f6' : 'transparent',
                          border: activeSection === id ? 'none' : '1px solid rgba(255,255,255,0.22)',
                          transition: 'all 0.25s',
                        }}
                      />
                      <span style={{
                        fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.25,
                        color: activeSection === id ? '#ffffff' : 'rgba(255,255,255,0.38)',
                        transition: 'color 0.2s',
                      }}>
                        {label}
                      </span>
                    </motion.button>
                  ))}

                  {/* CV */}
                  <motion.a
                    href="/assets/ABHISHEK.pdf?v=2"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 py-2 mt-3"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => setOpen(false)}
                    whileHover={{ x: 5 }}
                    style={{
                      fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.22)',
                      letterSpacing: '0.03em',
                    }}
                  >
                    <span className="w-1.5 h-1.5 flex-shrink-0" />
                    CV ↗
                  </motion.a>
                </nav>

                {/* Socials */}
                <motion.div
                  className="pb-8 pt-5 border-t border-white/[0.07]"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ delay: 0.34 }}
                >
                  <p className="text-[8px] font-bold tracking-[0.28em] uppercase text-gray-600 mb-3"
                     style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>
                    Socials
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {socials.map(({ label, href }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                         className="text-xs font-medium text-gray-500 hover:text-white transition-colors"
                         style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}
                         onClick={() => setOpen(false)}>
                        {label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;