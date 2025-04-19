import { useState } from 'react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      
      // Close mobile menu after clicking
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-40 shadow-md">
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
          Abhishek<span className="text-gray-700">.dev</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8" data-aos="fade-down" data-aos-delay="300">
          <a
            href="#about"
            className="text-gray-700 hover:text-blue-600 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}
          >
            About
          </a>
          <a
            href="#skills"
            className="text-gray-700 hover:text-blue-600 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('skills');
            }}
          >
            Skills
          </a>
          <a
            href="#projects"
            className="text-gray-700 hover:text-blue-600 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-blue-600 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            Contact
          </a>
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
          onClick={toggleMobileMenu}
          data-aos="fade-down"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-md`}>
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
          <a
            href="#about"
            className="text-gray-700 hover:text-blue-600 transition-colors py-2"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}
          >
            About
          </a>
          <a
            href="#skills"
            className="text-gray-700 hover:text-blue-600 transition-colors py-2"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('skills');
            }}
          >
            Skills
          </a>
          <a
            href="#projects"
            className="text-gray-700 hover:text-blue-600 transition-colors py-2"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-blue-600 transition-colors py-2"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
