import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const HELLOS = [
  { text: 'Hello',       lang: 'English'    },
  { text: 'Hola',        lang: 'Spanish'    },
  { text: 'Bonjour',     lang: 'French'     },
  { text: 'Ciao',        lang: 'Italian'    },
  { text: 'Hallo',       lang: 'German'     },
  { text: 'Olá',         lang: 'Portuguese' },
  { text: 'Привет',      lang: 'Russian'    },
  { text: 'नमस्ते',       lang: 'Hindi'      },
  { text: '你好',         lang: 'Chinese'    },
  { text: 'こんにちは',   lang: 'Japanese'   },
  { text: '안녕하세요',   lang: 'Korean'     },
  { text: 'مرحبا',       lang: 'Arabic'     },
];

const HOLD_MS = 200;

const EntranceAnimation = ({ onComplete }) => {
  const [index, setIndex]       = useState(0);
  const [exiting, setExiting]   = useState(false);
  const [wordWidth, setWordWidth] = useState('auto');
  const measureRef = useRef(null);
  const doneRef    = useRef(false);

  const measureWidth = () => {
    if (measureRef.current) {
      setWordWidth(measureRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    requestAnimationFrame(measureWidth);
  }, []);

  useEffect(() => {
    const timers = [];

    HELLOS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setIndex(i);
        setTimeout(measureWidth, 16);
      }, i * HOLD_MS));
    });

    const exitStart = HELLOS.length * HOLD_MS + 80;
    timers.push(setTimeout(() => setExiting(true), exitStart));
    timers.push(setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onComplete?.();
      }
    }, exitStart + 950));

    return () => timers.forEach(clearTimeout);
  }, []);

  const current = HELLOS[index];

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden pointer-events-none">

      {/* Top panel */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1/2"
        style={{ background: '#0d0d0d' }}
        animate={exiting ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Bottom panel */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/2"
        style={{ background: '#0d0d0d' }}
        animate={exiting ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Center content */}
      {!exiting && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 10, gap: '0.5rem' }}
        >
          {/* Hidden measuring span */}
          <span
            ref={measureRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              visibility: 'hidden',
              whiteSpace: 'nowrap',
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
              pointerEvents: 'none',
            }}
          >
            {current.text}
          </span>

          {/* Width-morphing container — NO opacity changes inside */}
          <motion.div
            style={{ overflow: 'hidden', whiteSpace: 'nowrap', lineHeight: 1.05 }}
            animate={{ width: wordWidth }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Plain element — text swaps instantly, always opacity 1 */}
            <p
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                fontWeight: 700,
                letterSpacing: '-0.035em',
                fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
                color: '#ffffff',
                margin: 0,
                whiteSpace: 'nowrap',
                opacity: 1,
                userSelect: 'none',
              }}
            >
              {current.text}
            </p>
          </motion.div>

          {/* Language label — plain swap, always visible */}
          <span
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: 'clamp(0.6rem, 1.2vw, 0.78rem)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontFamily: 'Satoshi, ui-sans-serif, sans-serif',
              fontWeight: 500,
              userSelect: 'none',
            }}
          >
            {current.lang}
          </span>

          {/* Progress bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 32,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 40,
              height: 1,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'rgba(255,255,255,0.5)',
                originX: 0,
                borderRadius: 1,
              }}
              animate={{ scaleX: (index + 1) / HELLOS.length }}
              transition={{ duration: (HOLD_MS / 1000) * 0.9, ease: 'linear' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EntranceAnimation;