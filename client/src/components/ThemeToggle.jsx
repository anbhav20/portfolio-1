import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    { value: 'light', icon: 'fas fa-sun', label: 'Light', iconColor: 'text-amber-400' },
    { value: 'dark', icon: 'fas fa-moon', label: 'Dark', iconColor: 'text-indigo-400' },
    { value: 'system', icon: 'fas fa-desktop', label: 'System', iconColor: 'text-gray-400 dark:text-gray-300' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-9 h-9 rounded-lg
          border border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-800
          flex items-center justify-center
          hover:border-blue-400 dark:hover:border-blue-500
          hover:shadow-md hover:shadow-blue-100 dark:hover:shadow-blue-900/30
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
        "
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        {resolvedTheme === 'dark' ? (
          <i className="fas fa-moon text-indigo-400 text-sm" />
        ) : (
          <i className="fas fa-sun text-amber-500 text-sm" />
        )}
      </button>

      {isOpen && (
        <div className="
          absolute right-0 mt-2 w-44
          rounded-xl shadow-xl
          bg-white dark:bg-gray-900
          border border-gray-100 dark:border-gray-700/60
          overflow-hidden z-50
          animate-[fadeIn_0.15s_ease]
        ">
          {options.map(({ value, icon, label, iconColor }) => {
            const isActive = theme === value;
            return (
              <button
                key={value}
                onClick={() => { setTheme(value); setIsOpen(false); }}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 text-sm
                  transition-colors duration-150
                  ${isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                `}
                role="menuitem"
              >
                <i className={`${icon} ${iconColor} w-4 text-center`} />
                <span className="flex-1 text-left">{label}</span>
                {isActive && (
                  <i className="fas fa-check text-blue-500 dark:text-blue-400 text-xs" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;