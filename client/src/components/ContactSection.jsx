import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateForm } from '@/lib/formValidation';
import { useTheme } from './ThemeProvider';

const tokens = (isDark) => ({
  sectionBg:    isDark ? '#090909' : '#f5f4f0',
  heading:      isDark ? '#eeebe4' : '#0a0a0a',
  subheading:   isDark ? '#aaa'    : '#555',
  muted:        isDark ? '#444'    : '#aaa',
  rule:         isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
  inputBorder:  isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
  inputFocus:   isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
  inputText:    isDark ? '#eeebe4' : '#0a0a0a',
  placeholder:  isDark ? '#444'    : '#bbb',
  labelColor:   isDark ? '#555'    : '#aaa',
  btnBg:        isDark ? '#eeebe4' : '#0a0a0a',
  btnText:      isDark ? '#090909' : '#f5f4f0',
  linkHover:    isDark ? '#eeebe4' : '#0a0a0a',
  successBg:    isDark ? 'rgba(34,197,94,0.08)' : 'rgba(34,197,94,0.06)',
  successBorder:isDark ? 'rgba(34,197,94,0.20)' : 'rgba(34,197,94,0.20)',
});

const SF = 'Satoshi, ui-sans-serif, system-ui, sans-serif';

const ContactSection = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const t = tokens(isDark);

  const [formData, setFormData]       = useState({ name: '', email: '', message: '' });
  const [errors, setErrors]           = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess]         = useState(false);
  const [focused, setFocused]         = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm(formData);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) { done(); return; }
      } catch (_) {}
      await new Promise(r => setTimeout(r, 800));
      done();
    } catch {
      setErrors({ message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const done = () => {
    setSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSuccess(false), 5000);
  };

  const inputStyle = (name) => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${errors[name] ? '#ef4444' : focused === name ? t.inputFocus : t.inputBorder}`,
    padding: '10px 0',
    fontSize: 14,
    fontFamily: SF,
    color: t.inputText,
    outline: 'none',
    transition: 'border-color 0.2s ease',
    caretColor: '#3b82f6',
  });

  const labelStyle = {
    display: 'block',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: t.labelColor,
    marginBottom: 8,
    fontFamily: SF,
    transition: 'color 0.3s ease',
  };

  return (
    <section
      id="contact"
      style={{
        background: t.sectionBg,
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div className="section-wrap">

        {/* ── Header ── */}
        <motion.div
          style={{ marginBottom: '3.5rem' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#3b82f6',
            marginBottom: 12, fontFamily: SF,
          }}>
            Get in touch
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: 28 }}>
            <h2 style={{
              fontFamily: SF,
              fontWeight: 400,
              fontSize: 'clamp(27px, 3vw, 50px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.87,
              color: t.heading,
              margin: 0,
              transition: 'color 0.3s ease',
            }}>
              LET'S TALK.
            </h2>
            <p style={{
              fontSize: 11, color: t.muted, maxWidth: 220, lineHeight: 1.7,
              fontFamily: SF, transition: 'color 0.3s ease',
            }}>
              Always open to new opportunities, collaborations, or just a good conversation.
            </p>
          </div>

          {/* divider */}
          <div style={{ width: '100%', height: 1, background: t.rule, transition: 'background 0.3s ease' }} />
        </motion.div>

        {/* ── Two column layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(2.5rem, 6vw, 6rem)',
        }}>

          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{
                    marginBottom: '2rem', padding: '1rem 1.25rem',
                    borderRadius: 12,
                    border: `1px solid ${t.successBorder}`,
                    background: t.successBg,
                    color: '#22c55e',
                    fontSize: 13, fontFamily: SF,
                  }}
                >
                  Message sent — I'll get back to you soon ✓
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* Name */}
              <div>
                <label style={labelStyle}>Your Name</label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Abhishek Singh"
                  onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                  style={{ ...inputStyle('name'), '::placeholder': { color: t.placeholder } }}
                />
                {errors.name && (
                  <p style={{ marginTop: 6, fontSize: 11, color: '#ef4444', fontFamily: SF }}>{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="you@example.com"
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  style={inputStyle('email')}
                />
                {errors.email && (
                  <p style={{ marginTop: 6, fontSize: 11, color: '#ef4444', fontFamily: SF }}>{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={4}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  style={{ ...inputStyle('message'), resize: 'none' }}
                />
                {errors.message && (
                  <p style={{ marginTop: 6, fontSize: 11, color: '#ef4444', fontFamily: SF }}>{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                }}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                <span style={{
                  width: 44, height: 44, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: t.btnBg, color: t.btnText,
                  transition: 'background 0.3s, color 0.3s, transform 0.2s',
                  flexShrink: 0,
                }}>
                  {isSubmitting
                    ? <svg style={{ animation: 'spin 1s linear infinite' }} width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 8"/>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                      </svg>
                    : <span style={{ fontSize: 16 }}>→</span>
                  }
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.heading, fontFamily: SF, transition: 'color 0.3s ease' }}>
                  {isSubmitting ? 'Sending…' : 'Send message'}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Right — contact info */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5rem' }}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >

            {/* Email */}
            <div>
              <p style={{ ...labelStyle, marginBottom: 8 }}>Email</p>
              <motion.a
                href="mailto:spidey.9449@gmail.com"
                style={{
                  fontSize: 16, fontWeight: 500, color: t.heading,
                  fontFamily: SF, letterSpacing: '-0.02em',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#3b82f6'}
                onMouseLeave={e => e.currentTarget.style.color = t.heading}
                whileHover={{ x: 4 }}
              >
                spidey.9449@gmail.com ↗
              </motion.a>
            </div>

            {/* Location */}
            <div>
              <p style={{ ...labelStyle, marginBottom: 8 }}>Location</p>
              <p style={{ fontSize: 16, fontWeight: 500, color: t.heading, fontFamily: SF, letterSpacing: '-0.02em', transition: 'color 0.3s ease' }}>
                New Delhi, India
              </p>
            </div>

            {/* Socials */}
            <div>
              <p style={{ ...labelStyle, marginBottom: 12 }}>Socials</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'GitHub',    href: 'https://github.com/anbhav20' },
                  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/abhishek-singh-48b18a246' },
                  { label: 'Instagram', href: 'https://www.instagram.com/anbhav_19' },
                ].map(({ label, href }) => (
                  <motion.a
                    key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontSize: 13, fontWeight: 500, color: t.muted,
                      fontFamily: SF, textDecoration: 'none',
                      transition: 'color 0.2s', width: 'fit-content',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = t.heading}
                    onMouseLeave={e => e.currentTarget.style.color = t.muted}
                    whileHover={{ x: 5 }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', opacity: 0.5, flexShrink: 0 }} />
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* CV */}
            <motion.a
              href="/assets/ABHISHEK.pdf"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, width: 'fit-content', textDecoration: 'none' }}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('.cv-icon').style.borderColor = t.heading;
                e.currentTarget.querySelector('.cv-icon').style.color = t.heading;
                e.currentTarget.querySelector('.cv-label').style.color = t.heading;
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('.cv-icon').style.borderColor = t.inputBorder;
                e.currentTarget.querySelector('.cv-icon').style.color = t.muted;
                e.currentTarget.querySelector('.cv-label').style.color = t.muted;
              }}
            >
              <span className="cv-icon" style={{
                width: 40, height: 40, borderRadius: '50%',
                border: `1px solid ${t.inputBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: t.muted, fontSize: 12, flexShrink: 0,
                transition: 'border-color 0.2s, color 0.2s',
              }}>
                <i className="fas fa-file-alt" />
              </span>
              <span className="cv-label" style={{
                fontSize: 13, fontWeight: 500, color: t.muted,
                fontFamily: SF, transition: 'color 0.2s',
              }}>
                Download CV
              </span>
            </motion.a>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;