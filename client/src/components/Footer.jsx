import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-bold mb-2">Abhishek<span className="text-blue-400">.dev</span></div>
            <p className="text-gray-400">Web Developer & Programmer</p>
          </div>
          
          <div className="text-center md:text-right">
            <p>&copy; {currentYear} Abhishek Singh. All Rights Reserved.</p>
            <p className="text-gray-400 mt-2">Made with <span className="text-red-500">❤️</span> by Abhishek</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;