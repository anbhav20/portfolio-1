import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicking outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        {resolvedTheme === 'dark' ? (
          <i className="fas fa-moon text-yellow-400"></i>
        ) : (
          <i className="fas fa-sun text-yellow-500"></i>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => { setTheme('light'); setIsOpen(false); }}
              className={`${
                theme === 'light' ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : ''
              } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-colors`}
              role="menuitem"
            >
              <i className="fas fa-sun mr-2 text-yellow-500"></i>
              Light
              {theme === 'light' && <i className="fas fa-check ml-auto"></i>}
            </button>
            
            <button
              onClick={() => { setTheme('dark'); setIsOpen(false); }}
              className={`${
                theme === 'dark' ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : ''
              } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-colors`}
              role="menuitem"
            >
              <i className="fas fa-moon mr-2 text-blue-400"></i>
              Dark
              {theme === 'dark' && <i className="fas fa-check ml-auto"></i>}
            </button>
            
            <button
              onClick={() => { setTheme('system'); setIsOpen(false); }}
              className={`${
                theme === 'system' ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : ''
              } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-colors`}
              role="menuitem"
            >
              <i className="fas fa-desktop mr-2 text-gray-500 dark:text-gray-400"></i>
              System
              {theme === 'system' && <i className="fas fa-check ml-auto"></i>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;