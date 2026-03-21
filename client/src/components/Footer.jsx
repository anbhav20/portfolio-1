import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-gray-950 text-white overflow-hidden">
      {/* Decorative top border gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(99,179,237,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="text-2xl font-black tracking-tight mb-1">
              Abhishek
              <span className="text-blue-400 font-light">.dev</span>
            </div>
            <p className="text-gray-500 text-sm tracking-widest uppercase">
              Web Developer &amp; Programmer
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            {[
              { label: 'About', href: '#about' },
              { label: 'Skills', href: '#skills' },
              { label: 'Projects', href: '#projects' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: 'fab fa-github', href: 'https://github.com/anbhav20', label: 'GitHub' },
              { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/abhishek-singh-48b18a246', label: 'LinkedIn' },
              { icon: 'fab fa-instagram', href: 'https://www.instagram.com/anbhav_19', label: 'Instagram' },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-gray-800 flex items-center justify-center text-gray-500 hover:text-blue-400 hover:border-blue-500 transition-all duration-200"
              >
                <i className={`${icon} text-sm`} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <p>© {currentYear} Abhishek Singh. All rights reserved.</p>
          <p>
            Made with <span className="text-red-500">♥</span> by Abhishek
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;