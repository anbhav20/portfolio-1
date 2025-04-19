import React from 'react';
import useTypingEffect from '@/hooks/useTypingEffect';

const HeroSection: React.FC = () => {
  const typedText = useTypingEffect([
    "Hi!", 
    "I'm Abhishek.", 
    "I'm a Web Developer.", 
    "I'm a Programmer."
  ], 100, 50, 2000);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="about" className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left: Text Content */}
          <div className="md:w-1/2 mb-12 md:mb-0" data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              {typedText}<span className="cursor">|</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              "From writing my first 'Hello, World!' to building the next big thing—this is just the beginning."
            </p>
            <div className="flex space-x-4">
              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                onClick={() => scrollToSection('projects')}
              >
                View Projects
              </button>
              <button
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </button>
            </div>
          </div>
          
          {/* Right: Profile Picture */}
          <div className="md:w-1/2 flex justify-center" data-aos="fade-left">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-20 animate-pulse"></div>
              {/* Replace with real image of Abhishek */}
              <div className="w-64 h-64 rounded-full bg-gray-300 relative border-4 border-white flex items-center justify-center overflow-hidden shadow-xl">
                <span className="text-2xl font-bold text-gray-600">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background-color: currentColor;
          margin-left: 2px;
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
