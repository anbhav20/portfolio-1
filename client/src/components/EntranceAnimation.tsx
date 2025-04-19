import React, { useState, useEffect } from 'react';

// Define CSS styles for the animation
const styles = `
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

  @media (max-width: 640px) {
    .cursor {
      height: 0.8em;
    }
  }
`;

const EntranceAnimation: React.FC = () => {
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Start with no typing
  const [showTyping, setShowTyping] = useState(false); // Control when to show the text
  const fullText = "Welcome to my Portfolio";
  const [typingComplete, setTypingComplete] = useState(false);
  const [disappearing, setDisappearing] = useState(false);

  // Door animation timing
  const doorAnimationDuration = 2500; // 2.5 seconds for door animation
  const typingStartDelay = 2600; // Start typing after doors are almost gone
  const typingDuration = 2000; // Approximate time for typing and erasing

  useEffect(() => {
    // First, wait for the door animation to finish
    const showTypingTimeout = setTimeout(() => {
      setShowTyping(true);
      setIsTyping(true);
      
      // Start the typewriter effect after doors complete sliding
      let currentIndex = 0;
      
      // Typing effect
      const typeInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypingText(fullText.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setTypingComplete(true);
          setIsTyping(false);
          
          // Wait before starting to delete
          setTimeout(() => {
            setDisappearing(true);
            let deleteIndex = fullText.length;
            
            // Deleting effect
            const deleteInterval = setInterval(() => {
              if (deleteIndex >= 0) {
                setTypingText(fullText.substring(0, deleteIndex));
                deleteIndex--;
              } else {
                clearInterval(deleteInterval);
                // Hide the typing element completely after erasing
                setShowTyping(false);
              }
            }, 50); // Slightly faster deletion speed
          }, 800); // Longer pause before deletion to ensure text is read
        }
      }, 100);
      
      return () => {
        clearInterval(typeInterval);
      };
    }, typingStartDelay); // Start typing after door animation is almost complete
    
    return () => clearTimeout(showTypingTimeout);
  }, []);

  // Add the CSS to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 overflow-hidden">
      <div 
        className="absolute top-0 left-0 w-1/2 h-full flex justify-center items-center text-4xl md:text-6xl font-bold text-gray-900"
        style={{
          background: 'linear-gradient(135deg, #ffffff, #d0f1f9)',
          animation: `slideLeft ${doorAnimationDuration/1000}s ease forwards`
        }}
      >
        Hello
      </div>
      <div 
        className="absolute top-0 right-0 w-1/2 h-full flex justify-center items-center text-4xl md:text-6xl font-bold text-gray-900"
        style={{
          background: 'linear-gradient(135deg, #ffffff, #d0f1f9)',
          animation: `slideRight ${doorAnimationDuration/1000}s ease forwards`
        }}
      >
        World
      </div>
      
      {showTyping && (
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-5xl font-semibold text-blue-800"
          style={{ zIndex: 1 }}
        >
          {typingText}
          {isTyping && <span className="cursor">|</span>}
        </div>
      )}
    </div>
  );
};

export default EntranceAnimation;
