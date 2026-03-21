import React, { useEffect } from 'react';
import useTypingEffect from '@/hooks/useTypingEffect';

const profileData = {
  name: "Abhishek",
  titles: [
    "Hi!",
    "I'm Abhishek.",
    "I'm a Full Stack Developer.",
    "Ohh! Sorry — MERN! 😄",
    "I'm a Programmer.",
  ],
  bio: "From writing my first 'Hello, World!' to building the next big thing — this is just the beginning.",
  profileImage: "/assets/images/profile.jpg",
  cvPath: "/assets/AbhishekCV.pdf?v=2",
  socialLinks: {
    github:   "https://github.com/anbhav20",
    linkedin: "https://www.linkedin.com/in/abhishek-singh-48b18a246",
  },
};

const cursorStyles = `
  .typing-cursor {
    display: inline-block;
    width: 3px;
    height: 0.9em;
    background-color: currentColor;
    margin-left: 3px;
    vertical-align: middle;
    border-radius: 1px;
    animation: blink 1s infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
`;

const HeroSection = () => {
  const typedText = useTypingEffect(
    profileData.titles,
    90,   // typing speed (ms)
    45,   // deleting speed (ms)
    1800  // pause between texts (ms)
  );

  useEffect(() => {
    const el = document.createElement('style');
    el.innerHTML = cursorStyles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden
                 bg-gradient-to-br from-blue-50 via-white to-indigo-50
                 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-colors"
    >
      {/* ── Decorative background blobs ── */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-200/40 dark:bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/15 rounded-full blur-3xl pointer-events-none" />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">

          {/* ── Left: Text ── */}
          <div className="md:w-1/2 text-center md:text-left" data-aos="fade-right">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                             bg-blue-100 dark:bg-blue-900/40
                             text-blue-600 dark:text-blue-400
                             text-xs font-semibold tracking-wide mb-6 border border-blue-200 dark:border-blue-800">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Open to opportunities
            </span>

            {/* Typewriter heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight
                           text-gray-900 dark:text-white mb-5 min-h-[1.2em]">
              {typedText}
              <span className="typing-cursor text-blue-500" />
            </h1>

            {/* Bio */}
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              {profileData.bio}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
              <button
                onClick={() => scrollTo('projects')}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                           text-white text-sm font-semibold rounded-xl
                           shadow-lg shadow-blue-200 dark:shadow-blue-900/40
                           hover:shadow-xl hover:-translate-y-0.5
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <i className="fas fa-rocket mr-2 text-xs" />
                View Projects
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-2.5 border-2 border-blue-500 dark:border-blue-400
                           text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-xl
                           hover:bg-blue-50 dark:hover:bg-blue-900/20
                           hover:-translate-y-0.5
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <i className="fas fa-envelope mr-2 text-xs" />
                Contact Me
              </button>

              {/* CV — no confirm() dialog */}
              <a
                href={profileData.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600
                           text-white text-sm font-semibold rounded-xl
                           shadow-md hover:shadow-lg hover:-translate-y-0.5
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <i className="fas fa-file-alt mr-2 text-xs" />
                Download CV
              </a>
            </div>

            {/* Social quick-links */}
            <div className="flex justify-center md:justify-start gap-3">
              <a
                href={profileData.socialLinks.github}
                target="_blank" rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 flex items-center justify-center rounded-lg
                           border border-gray-200 dark:border-gray-700
                           text-gray-500 dark:text-gray-400
                           hover:text-gray-900 dark:hover:text-white
                           hover:border-gray-400 dark:hover:border-gray-500
                           transition-all duration-200 text-sm"
              >
                <i className="fab fa-github" />
              </a>
              <a
                href={profileData.socialLinks.linkedin}
                target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-lg
                           border border-gray-200 dark:border-gray-700
                           text-gray-500 dark:text-gray-400
                           hover:text-blue-600 dark:hover:text-blue-400
                           hover:border-blue-300 dark:hover:border-blue-600
                           transition-all duration-200 text-sm"
              >
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
          </div>

          {/* ── Right: Profile image ── */}
          <div className="md:w-1/2 flex justify-center" data-aos="fade-left" data-aos-delay="100">
            <div className="relative">

              {/* Outer decorative ring (animated) */}
              <div className="absolute -inset-3 rounded-full border-2 border-blue-200 dark:border-blue-800/60
                              border-dashed animate-[spin_20s_linear_infinite] pointer-events-none" />

              {/* Middle glow ring */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-400
                              opacity-20 dark:opacity-30 blur-sm pointer-events-none" />

              {/* Image container */}
              <div
                className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden
                           border-4 border-white dark:border-gray-800 shadow-2xl"
              >
                <img
                  src={profileData.profileImage}
                  alt={`${profileData.name}'s profile`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentNode;
                    if (parent) {
                      parent.classList.add(
                        'bg-gradient-to-br', 'from-blue-100', 'to-indigo-100',
                        'dark:from-gray-700', 'dark:to-gray-800',
                        'flex', 'items-center', 'justify-center'
                      );
                      const span = document.createElement('span');
                      span.className = 'text-5xl font-black text-blue-400 dark:text-blue-500';
                      span.textContent = profileData.name.charAt(0);
                      parent.appendChild(span);
                    }
                  }}
                />
              </div>

              {/* Floating badge — experience */}
              <div className="absolute -bottom-2 -right-2 md:bottom-2 md:-right-6
                              bg-white dark:bg-gray-800
                              border border-gray-100 dark:border-gray-700
                              rounded-2xl shadow-xl px-4 py-2 flex items-center gap-2">
                <span className="text-2xl">💻</span>
                <div>
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-100 leading-tight">Full Stack</p>
                  <p className="text-[10px] text-gray-400 leading-tight">MERN Developer</p>
                </div>
              </div>

              {/* Floating badge — location */}
              <div className="absolute -top-2 -left-2 md:top-4 md:-left-8
                              bg-white dark:bg-gray-800
                              border border-gray-100 dark:border-gray-700
                              rounded-2xl shadow-xl px-3 py-1.5 flex items-center gap-1.5">
                <i className="fas fa-map-marker-alt text-blue-500 text-xs" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">New Delhi, India</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── Scroll hint ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
                        opacity-40 hover:opacity-70 transition-opacity cursor-pointer"
             onClick={() => scrollTo('skills')}>
          <span className="text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">Scroll</span>
          <i className="fas fa-chevron-down text-gray-400 dark:text-gray-500 text-xs animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;