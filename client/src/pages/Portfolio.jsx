import React, { useState, useEffect } from 'react';
import EntranceAnimation from "@/components/EntranceAnimation";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// Define CSS for portfolio page
const portfolioStyles = `
  @keyframes mainFadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    main {
      overflow-x: hidden;
    }
  }
`;

const Portfolio = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);
  
  // Function to skip animation
  const handleSkip = () => {
    setSkipAnimation(true);
    setAnimationComplete(true);
  };
  
  useEffect(() => {
    // Allow users to press Escape key to skip animation
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // If not skipped, set timer for automatic completion
    if (!skipAnimation) {
      // Calculate total animation time:
      // 2.5s door animation + 2.6s delay before typing starts + ~2s for typing/erasing
      const doorAnimation = 2500;
      const typingStartDelay = 2600;
      const typingDuration = 2000;
      const safetyBuffer = 500;
      
      // Total time before showing main content (with a buffer for safety)
      const totalAnimationTime = doorAnimation + typingStartDelay + typingDuration + safetyBuffer;
      
      // Set a timeout to match the full animation sequence
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, totalAnimationTime); 
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skipAnimation]);

  // Add the CSS to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = portfolioStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <>
      {!skipAnimation && !animationComplete && (
        <>
          <EntranceAnimation />
          <button 
            onClick={handleSkip}
            className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-md shadow-md z-[100] hover:bg-white/90 transition-colors"
          >
            Skip Animation
          </button>
        </>
      )}
      
      <main 
        className={`relative ${!animationComplete ? 'opacity-0' : 'opacity-100'}`}
        style={{
          animation: animationComplete ? 'mainFadeIn 1s ease forwards' : 'none',
          pointerEvents: animationComplete ? 'auto' : 'none', // Enable interaction only when animation is complete
        }}
      >
        <Header />
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
};

export default Portfolio;