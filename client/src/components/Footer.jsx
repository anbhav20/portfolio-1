import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  useEffect(() => { setCurrentYear(new Date().getFullYear()); }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
  };

  const socials = [
    { label: 'GitHub',    href: 'https://github.com/anbhav20',                          icon: 'fab fa-github'      },
    { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/abhishek-singh-48b18a246', icon: 'fab fa-linkedin-in' },
    { label: 'Instagram', href: 'https://www.instagram.com/anbhav_19',                  icon: 'fab fa-instagram'   },
  ];

  return (
    <footer className="bg-gray-950 text-white overflow-hidden"
            style={{ paddingTop: 'var(--section-py)', paddingBottom: '2.5rem' }}>
      <div className="section-wrap">

        {/* Big CTA */}
        <motion.div className="mb-16"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-600 mb-5"
             style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>Let's connect</p>
          <h2
            style={{
              fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              color: '#fff',
              marginBottom: '1rem',
            }}
          >
            Got a project in mind?
          </h2>
          <motion.a href="mailto:spidey.9449@gmail.com"
            className="inline-flex items-center gap-3 group"
            whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}>
            <span className="text-lg md:text-2xl font-medium text-gray-400 group-hover:text-white transition-colors"
                  style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif', letterSpacing: '-0.02em' }}>
              spidey.9449@gmail.com
            </span>
            <span className="text-gray-600 group-hover:text-white transition-colors text-xl">↗</span>
          </motion.a>
        </motion.div>

        {/* Divider */}
        <motion.div className="h-px bg-gray-800 mb-10"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <div className="text-base font-bold text-white mb-1"
                 style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif', letterSpacing: '-0.03em' }}>
              Abhishek<span className="text-gray-600 font-light">.dev</span>
            </div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-700"
               style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>Full Stack Developer</p>
          </div>

          <nav className="flex flex-wrap gap-5">
            {['About', 'Skills', 'Projects', 'Contact'].map(label => (
              <motion.button key={label} onClick={() => scrollTo(label.toLowerCase())}
                className="text-xs font-medium text-gray-600 hover:text-white transition-colors"
                style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }} whileHover={{ y: -2 }}>
                {label}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map(({ label, href, icon }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center
                           text-gray-600 hover:text-white hover:border-gray-600 transition-all"
                whileHover={{ scale: 1.1, y: -1 }} whileTap={{ scale: 0.95 }}>
                <i className={`${icon} text-xs`} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[11px] text-gray-700" style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>
            © {currentYear} Abhishek Singh. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-700" style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>
            Made with <span className="text-red-600">♥</span> in New Delhi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;