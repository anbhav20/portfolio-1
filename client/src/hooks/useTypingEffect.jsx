import { useState, useEffect } from 'react';

/**
 * A hook that creates a typing animation effect between multiple messages
 * 
 * @param messages Array of strings to cycle through with typing animation
 * @param typingSpeed Speed of typing in milliseconds
 * @param deletingSpeed Speed of deleting in milliseconds
 * @param delayBetweenMessages Delay between messages in milliseconds
 * @returns The current text being displayed
 */
const useTypingEffect = (
  messages,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenMessages = 2000
) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    // If all text is typed and we're not deleting yet
    if (!isDeleting && currentText === messages[currentIndex]) {
      // Wait before starting to delete
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenMessages);
    } 
    // If deleting and all text is deleted
    else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      // Move to next message
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    } 
    // Handle typing or deleting
    else {
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      
      timeout = setTimeout(() => {
        setCurrentText(prevText => {
          if (isDeleting) {
            // Delete a character
            return prevText.substring(0, prevText.length - 1);
          } else {
            // Add a character
            return messages[currentIndex].substring(0, prevText.length + 1);
          }
        });
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, messages, typingSpeed, deletingSpeed, delayBetweenMessages]);

  return currentText;
};

export default useTypingEffect;