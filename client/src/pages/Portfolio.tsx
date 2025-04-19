import { useState, useEffect } from 'react';
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
  
  useEffect(() => {
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
    };
  }, []);

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
      <EntranceAnimation />
      
      <main 
        className={`relative opacity-0 ${animationComplete ? 'animate-fade-in' : ''}`}
        style={{
          animation: animationComplete ? 'mainFadeIn 1s ease forwards' : 'none',
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
