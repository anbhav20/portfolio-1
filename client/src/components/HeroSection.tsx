import React, { useEffect } from 'react';
import useTypingEffect from '@/hooks/useTypingEffect';

// Define profile data - easy to customize
const profileData = {
  name: "Abhishek",
  titles: ["Hi!", "I'm Abhishek.", "I'm a Web Developer.", "I'm a Programmer."],
  bio: "From writing my first 'Hello, World!' to building the next big thing—this is just the beginning.",
  // Update this path to your profile image in client/public/assets/images/
  profileImage: "/assets/images/profile.jpg",
  // Update this path to your CV in client/public/assets/
  cvPath: "/assets/Abhishek_Resume.pdf"
};

// Cursor style
const cursorStyles = `
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
`;

const HeroSection: React.FC = () => {
  const typedText = useTypingEffect(
    profileData.titles, 
    100, // typing speed
    50,  // deleting speed
    2000 // delay between texts
  );

  // Add the cursor styles to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = cursorStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

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
              "{profileData.bio}"
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => scrollToSection('projects')}
              >
                View Projects
              </button>
              <button
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </button>
              <a
                href={profileData.cvPath}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors shadow-md text-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // This prevents the default behavior if the CV isn't yet available
                  // Once you add your actual CV file, remove this event handler
                  if (!window.confirm('This will download your CV once you add it to the assets folder. Proceed?')) {
                    e.preventDefault();
                  }
                }}
              >
                Download CV
              </a>
            </div>
          </div>
          
          {/* Right: Profile Picture */}
          <div className="md:w-1/2 flex justify-center" data-aos="fade-left">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-20 animate-pulse"></div>
              {/* Profile image with fallback */}
              <div className="w-64 h-64 rounded-full relative border-4 border-white overflow-hidden shadow-xl">
                {/* If profile image exists, display it - otherwise show placeholder */}
                <img 
                  src={profileData.profileImage} 
                  alt={`${profileData.name}'s profile`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // If image fails to load, show placeholder with initial
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentNode;
                    if (parent) {
                      (parent as HTMLElement).classList.add('bg-gray-300', 'flex', 'items-center', 'justify-center');
                      const initial = document.createElement('span');
                      initial.className = 'text-2xl font-bold text-gray-600';
                      initial.textContent = profileData.name.charAt(0);
                      parent.appendChild(initial);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
