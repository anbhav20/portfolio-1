import React from 'react';

const EntranceAnimation: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 overflow-hidden">
      <div 
        className="absolute top-0 left-0 w-1/2 h-full flex justify-center items-center text-4xl md:text-6xl font-bold text-gray-900"
        style={{
          background: 'linear-gradient(135deg, #ffffff, #d0f1f9)',
          animation: 'slideLeft 2.5s ease forwards'
        }}
      >
        Hello
      </div>
      <div 
        className="absolute top-0 right-0 w-1/2 h-full flex justify-center items-center text-4xl md:text-6xl font-bold text-gray-900"
        style={{
          background: 'linear-gradient(135deg, #ffffff, #d0f1f9)',
          animation: 'slideRight 2.5s ease forwards'
        }}
      >
        World
      </div>
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-5xl font-semibold text-blue-800 opacity-0"
        style={{
          animation: 'fadeIn 1.5s ease forwards',
          animationDelay: '2.5s',
          zIndex: 1
        }}
      >
        Welcome to my Portfolio
      </div>

      <style jsx="true">{`
        @keyframes slideLeft {
          0%   { transform: translateX(0); }
          30%  { transform: translateX(-10%); }
          50%  { transform: translateX(-10%); }
          100% { transform: translateX(-100%); }
        }

        @keyframes slideRight {
          0%   { transform: translateX(0); }
          30%  { transform: translateX(10%); }
          50%  { transform: translateX(10%); }
          100% { transform: translateX(100%); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default EntranceAnimation;
