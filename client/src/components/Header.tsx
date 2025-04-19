import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
      
      // Update active section
      setActiveSection(sectionId);
      
      // Close mobile menu after clicking
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
  };

  // Add scroll event listener to update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      navItems.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Call once to set initial active section
    handleScroll();
    
    // Clean up event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-40 shadow-md transition-colors">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a 
          href="#" 
          className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          data-aos="fade-down"
        >
          Abhishek<span className="text-gray-700 dark:text-gray-400">.dev</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" data-aos="fade-down" data-aos-delay="300">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                activeSection === item.id ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/assets/Abhishek_Resume.pdf"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV
          </a>
          
          {/* Theme Toggle */}
          <ThemeToggle />
        </nav>
        
        {/* Mobile Navigation and Theme Controls */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Theme Toggle for Mobile */}
          <ThemeToggle />
          
          {/* Mobile Navigation Toggle */}
          <button 
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={toggleMobileMenu}
            data-aos="fade-down"
            aria-label="Toggle navigation menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-gray-900 shadow-md transition-colors`}>
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 ${
                activeSection === item.id ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/assets/Abhishek_Resume.pdf"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
