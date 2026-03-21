import React, { useState, useEffect } from 'react';
import EntranceAnimation from "@/components/EntranceAnimation";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { motion, AnimatePresence } from 'framer-motion';

const Portfolio = () => {
  const [ready, setReady] = useState(false);
  const [skipAnim, setSkipAnim] = useState(false);

  // Escape key skips
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setSkipAnim(true); setReady(true); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* Entrance animation — hides itself when done via onComplete */}
      {!skipAnim && (
        <EntranceAnimation onComplete={() => setReady(true)} />
      )}

      {/* Skip button */}
      {!ready && !skipAnim && (
        <button
          onClick={() => { setSkipAnim(true); setReady(true); }}
          className="fixed bottom-4 right-4 z-[300]
                     bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
                     text-gray-600 dark:text-gray-400
                     text-xs font-medium px-4 py-2 rounded-full
                     border border-gray-200 dark:border-gray-700
                     shadow-md hover:shadow-lg transition-all"
        >
          Skip ↓
        </button>
      )}

      {/* Main content fades in once entrance is done */}
      <AnimatePresence>
        {ready && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative"
          >
            <Header />
            <HeroSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
            <Footer />
            <ScrollToTop />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;