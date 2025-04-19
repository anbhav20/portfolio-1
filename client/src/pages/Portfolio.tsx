import { useState, useEffect } from 'react';
import EntranceAnimation from "@/components/EntranceAnimation";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Portfolio = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    // Set a timeout to match the animation duration (4.5s) from the CSS
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 4500); // Match the animation-delay in the CSS
    
    return () => {
      clearTimeout(timer);
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

      <style jsx="true">{`
        @keyframes mainFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Portfolio;
