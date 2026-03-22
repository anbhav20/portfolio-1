import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const SF = 'Satoshi, ui-sans-serif, system-ui, sans-serif';

const tokens = (isDark) => ({
  bg:         isDark ? '#090909' : '#0a0a0a',
  heading:    isDark ? '#eeebe4' : '#f5f4f0',
  muted:      isDark ? '#444'    : '#555',
  rule:       'rgba(255,255,255,0.07)',
  iconBorder: 'rgba(255,255,255,0.08)',
  iconHover:  'rgba(255,255,255,0.20)',
  copyright:  'rgba(255,255,255,0.18)',
});

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const t = tokens(isDark);

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  useEffect(() => { setCurrentYear(new Date().getFullYear()); }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
  };

  const socials = [
    { label: 'GitHub',    href: 'https://github.com/anbhav20',                          icon: 'fab fa-github'      },
    { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/abhishek-singh-48b18a246', icon: 'fab fa-linkedin-in' },
    { label: 'Instagram', href: 'https://www.instagram.com/axl.sql',                   icon: 'fab fa-instagram'   },
  ];

  return (
    <footer style={{
      background: t.bg,
      paddingTop: 'var(--section-py)',
      paddingBottom: '2.5rem',
      overflow: 'hidden',
      transition: 'background-color 0.3s ease',
    }}>
      <div className="section-wrap">

        {/* Big CTA */}
        <motion.div
          style={{ marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: t.muted,
            marginBottom: 20, fontFamily: SF,
          }}>
            Let's connect
          </p>

          <h2 style={{
            fontFamily: SF, fontWeight: 400,
            fontSize: 'clamp(27px, 3vw, 50px)',
            letterSpacing: '-0.04em', lineHeight: 0.87,
            color: t.heading, marginBottom: '1.5rem',
            transition: 'color 0.3s ease',
          }}>
            GOT A PROJECT?
          </h2>

          <motion.a
            href="mailto:spidey.9449@gmail.com"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onMouseEnter={e => {
              e.currentTarget.querySelector('.mail-text').style.color = t.heading;
              e.currentTarget.querySelector('.mail-arrow').style.color = t.heading;
            }}
            onMouseLeave={e => {
              e.currentTarget.querySelector('.mail-text').style.color = t.muted;
              e.currentTarget.querySelector('.mail-arrow').style.color = t.muted;
            }}
          >
            <span className="mail-text" style={{
              fontSize: 'clamp(14px, 2vw, 22px)', fontWeight: 500,
              color: t.muted, fontFamily: SF, letterSpacing: '-0.02em',
              transition: 'color 0.2s',
            }}>
              spidey.9449@gmail.com
            </span>
            <span className="mail-arrow" style={{ fontSize: 20, color: t.muted, transition: 'color 0.2s' }}>↗</span>
          </motion.a>
        </motion.div>

        {/* Divider */}
        <motion.div
          style={{
            width: '100%', height: 1, background: t.rule,
            marginBottom: '2.5rem', transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Bottom row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: '2rem',
        }}>

          {/* Logo */}
          <div>
            <div style={{
              fontSize: 14, fontWeight: 700, color: t.heading,
              fontFamily: SF, letterSpacing: '-0.03em',
              marginBottom: 4, transition: 'color 0.3s ease',
            }}>
              Abhishek<span style={{ color: t.muted, fontWeight: 300 }}>.dev</span>
            </div>
            <p style={{
              fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: t.copyright, fontFamily: SF,
            }}>
              Full Stack Developer
            </p>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
            {['About', 'Skills', 'Projects', 'Contact'].map(label => (
              <motion.button
                key={label}
                onClick={() => scrollTo(label.toLowerCase())}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  fontSize: 11, fontWeight: 500, color: t.muted,
                  fontFamily: SF, transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = t.heading}
                onMouseLeave={e => e.currentTarget.style.color = t.muted}
                whileHover={{ y: -2 }}
              >
                {label}
              </motion.button>
            ))}
          </nav>

          {/* Socials */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {socials.map(({ label, href, icon }) => (
              <motion.a
                key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: `1px solid ${t.iconBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: t.muted, fontSize: 11, textDecoration: 'none',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = t.heading;
                  e.currentTarget.style.borderColor = t.iconHover;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = t.muted;
                  e.currentTarget.style.borderColor = t.iconBorder;
                }}
                whileHover={{ scale: 1.1, y: -1 }} whileTap={{ scale: 0.95 }}
              >
                <i className={icon} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          marginTop: '2rem',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: 8,
        }}>
          <p style={{ fontSize: 11, color: t.copyright, fontFamily: SF }}>
            © {currentYear} Abhishek Singh. All rights reserved.
          </p>
          <p style={{ fontSize: 11, color: t.copyright, fontFamily: SF }}>
            Made with <span style={{ color: '#ef4444' }}>♥</span> in New Delhi
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;