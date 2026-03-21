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
    { value: 'light',  icon: 'fas fa-sun',     label: 'Light',  iconColor: 'text-amber-400'  },
    { value: 'dark',   icon: 'fas fa-moon',    label: 'Dark',   iconColor: 'text-indigo-400' },
    { value: 'system', icon: 'fas fa-desktop', label: 'System', iconColor: 'text-gray-400 dark:text-gray-300' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700
                   bg-white dark:bg-gray-800 flex items-center justify-center
                   hover:border-gray-400 dark:hover:border-gray-500
                   transition-all duration-200 focus:outline-none"
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark'
          ? <i className="fas fa-moon text-indigo-400 text-sm" />
          : <i className="fas fa-sun text-amber-500 text-sm" />
        }
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl shadow-xl
                        bg-white dark:bg-gray-900
                        border border-gray-100 dark:border-gray-800
                        overflow-hidden z-50">
          {options.map(({ value, icon, label, iconColor }) => {
            const isActive = theme === value;
            return (
              <button
                key={value}
                onClick={() => { setTheme(value); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium
                  transition-colors duration-150
                  ${isActive
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                  }`}
                role="menuitem"
              >
                <i className={`${icon} ${iconColor} w-4 text-center`} />
                <span className="flex-1 text-left">{label}</span>
                {isActive && <i className="fas fa-check text-gray-400 dark:text-gray-500 text-xs" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;