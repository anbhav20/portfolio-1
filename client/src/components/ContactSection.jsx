import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateForm } from '@/lib/formValidation';

const ContactSection = () => {
  const [formData, setFormData]       = useState({ name: '', email: '', message: '' });
  const [errors, setErrors]           = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess]         = useState(false);

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

  const inputBase = `w-full bg-transparent border-b py-3 text-sm text-gray-900 dark:text-white
    placeholder-gray-400 dark:placeholder-gray-600
    outline-none focus:outline-none ring-0 focus:ring-0 transition-colors duration-200`;

  return (
    <section
      id="contact"
      className="bg-white dark:bg-gray-950 transition-colors"
      style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}
    >
      <div className="section-wrap">

        {/* ── Header ── */}
        <motion.div className="mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-500 dark:text-blue-400 mb-4"
             style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>Get in touch</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-none"
                style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif', letterSpacing: '-0.04em' }}>
              Let's talk.
            </h2>
            <p className="text-sm text-gray-400 dark:text-gray-600 max-w-xs leading-relaxed"
               style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>
              Always open to new opportunities, collaborations, or just a good conversation.
            </p>
          </div>
        </motion.div>

        {/* ── Two column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mb-8 p-4 rounded-xl border border-green-500/20 bg-green-500/8 text-green-500 text-sm"
                  style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>
                  Message sent — I'll get back to you soon ✓
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Name */}
              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600 mb-2"
                       style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>Your Name</label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Abhishek Singh"
                  className={`${inputBase} ${errors.name
                    ? 'border-red-500 dark:border-red-500'
                    : 'border-gray-200 dark:border-gray-800 focus:border-gray-400 dark:focus:border-gray-700'
                  }`}
                  style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-500" style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600 mb-2"
                       style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>Email Address</label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className={`${inputBase} ${errors.email
                    ? 'border-red-500 dark:border-red-500'
                    : 'border-gray-200 dark:border-gray-800 focus:border-gray-400 dark:focus:border-gray-700'
                  }`}
                  style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-500" style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>{errors.email}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600 mb-2"
                       style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>Message</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={4}
                  className={`${inputBase} resize-none ${errors.message
                    ? 'border-red-500 dark:border-red-500'
                    : 'border-gray-200 dark:border-gray-800 focus:border-gray-400 dark:focus:border-gray-700'
                  }`}
                  style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-500" style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>{errors.message}</p>}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center gap-3"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center
                             bg-gray-900 dark:bg-white
                             text-white dark:text-gray-900
                             group-hover:scale-110 transition-transform duration-200"
                >
                  {isSubmitting
                    ? <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 8"/>
                      </svg>
                    : <span style={{ fontSize: 16 }}>→</span>
                  }
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white"
                      style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>
                  {isSubmitting ? 'Sending…' : 'Send message'}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Right — contact info */}
          <motion.div
            className="flex flex-col justify-center gap-10"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>

            {/* Email */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600 mb-2"
                 style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>Email</p>
              <motion.a href="mailto:spidey.9449@gmail.com"
                className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif', letterSpacing: '-0.02em' }}
                whileHover={{ x: 4 }}>
                spidey.9449@gmail.com ↗
              </motion.a>
            </div>

            {/* Location */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600 mb-2"
                 style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>Location</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white"
                 style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif', letterSpacing: '-0.02em' }}>
                New Delhi, India
              </p>
            </div>

            {/* Socials */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600 mb-4"
                 style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>Socials</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'GitHub',    href: 'https://github.com/anbhav20' },
                  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/abhishek-singh-48b18a246' },
                  { label: 'Instagram', href: 'https://www.instagram.com/anbhav_19' },
                ].map(({ label, href }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-500
                               hover:text-gray-900 dark:hover:text-white transition-colors w-fit"
                    style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}
                    whileHover={{ x: 5 }}>
                    <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* CV */}
            <motion.a
              href="/assets/ABHISHEK.pdf?v=2"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 w-fit group"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
              <span className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800
                               flex items-center justify-center text-gray-500 dark:text-gray-500
                               group-hover:border-gray-900 dark:group-hover:border-white
                               group-hover:text-gray-900 dark:group-hover:text-white
                               transition-all duration-200 text-xs">
                <i className="fas fa-file-alt" />
              </span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-500
                               group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
                    style={{ fontFamily: 'Satoshi, ui-sans-serif, sans-serif' }}>
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