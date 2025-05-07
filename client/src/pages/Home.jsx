import React, { useEffect, useState } from "react";
import DoorAnimation from "@/components/DoorAnimation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Import AOS for scroll animations
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
    
    // Show main content after door animation completes
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <DoorAnimation />
      
      <div className={`${showContent ? "main-content" : "opacity-0"}`}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Home;