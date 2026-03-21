import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HELLOS = [
  { text: 'Hello',      lang: 'English'    },
  { text: 'Hola',       lang: 'Spanish'    },
  { text: 'Bonjour',    lang: 'French'     },
  { text: 'Ciao',       lang: 'Italian'    },
  { text: 'Hallo',      lang: 'German'     },
  { text: 'Olá',        lang: 'Portuguese' },
  { text: 'Привет',     lang: 'Russian'    },
  { text: 'नमस्ते',      lang: 'Hindi'      },
  { text: '你好',        lang: 'Chinese'    },
  { text: 'こんにちは',  lang: 'Japanese'   },
  { text: '안녕하세요',  lang: 'Korean'     },
  { text: 'مرحبا',      lang: 'Arabic'     },
];

const HOLD_MS  = 160; // faster cycling
const COLS     = 5;   // number of vertical panel strips

const EntranceAnimation = ({ onComplete }) => {
  const [index, setIndex]     = useState(0);
  const [phase, setPhase]     = useState('show'); // 'show' | 'exit'
  const [wordWidth, setWordWidth] = useState('auto');
  const measureRef = useRef(null);
  const doneRef    = useRef(false);

  const measure = () => {
    if (measureRef.current) setWordWidth(measureRef.current.offsetWidth);
  };

  useEffect(() => { requestAnimationFrame(measure); }, []);

  useEffect(() => {
    const timers = [];
    HELLOS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setIndex(i);
        setTimeout(measure, 10);
      }, i * HOLD_MS));
    });

    const exitAt = HELLOS.length * HOLD_MS + 120;
    timers.push(setTimeout(() => setPhase('exit'), exitAt));
    // panels take ~900ms to slide; fire onComplete after last panel done
    timers.push(setTimeout(() => {
      if (!doneRef.current) { doneRef.current = true; onComplete?.(); }
    }, exitAt + 980));

    return () => timers.forEach(clearTimeout);
  }, []);

  const current = HELLOS[index];
  const isExit  = phase === 'exit';

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        pointerEvents: isExit ? 'none' : 'all',
        overflow: 'hidden',
      }}
    >
      {/* ── Vertical strip panels (staggered slide-up on exit) ── */}
      {Array.from({ length: COLS }).map((_, col) => (
        <motion.div
          key={col}
          style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left:  `${(col / COLS) * 100}%`,
            width: `${100 / COLS}%`,
            background: col % 2 === 0 ? '#0a0a0a' : '#111111',
            originY: 1,
          }}
          initial={{ scaleY: 1 }}
          animate={isExit ? { scaleY: 0 } : { scaleY: 1 }}
          transition={{
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1],
            delay: isExit ? col * 0.055 : 0,
          }}
        />
      ))}

      {/* ── Centre text — only while showing ── */}
      {!isExit && (
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 10, pointerEvents: 'none',
          }}
        >
          {/* Hidden measurer */}
          <span
            ref={measureRef}
            aria-hidden
            style={{
              position: 'absolute', visibility: 'hidden', whiteSpace: 'nowrap',
              fontSize: 'clamp(2.8rem, 9vw, 6.5rem)',
              fontWeight: 800, letterSpacing: '-0.04em',
              fontFamily: 'Syne, ui-sans-serif, sans-serif',
            }}
          >
            {current.text}
          </span>

          {/* Morphing width container */}
          <motion.div
            style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            animate={{ width: wordWidth }}
            transition={{ duration: 0.13, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(2.8rem, 9vw, 6.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                fontFamily: 'Syne, ui-sans-serif, sans-serif',
                color: '#ffffff',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {current.text}
            </p>
          </motion.div>

          {/* Language label */}
          <span
            style={{
              color: 'rgba(255,255,255,0.28)',
              fontSize: 'clamp(0.55rem, 1.1vw, 0.72rem)',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontFamily: 'DM Sans, ui-sans-serif, sans-serif',
              fontWeight: 500,
              userSelect: 'none',
            }}
          >
            {current.lang}
          </span>

          {/* Progress line */}
          <div
            style={{
              position: 'absolute', bottom: 36, left: '50%',
              transform: 'translateX(-50%)',
              width: 48, height: 1,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 1, overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                height: '100%', background: 'rgba(255,255,255,0.45)',
                originX: 0, borderRadius: 1,
              }}
              animate={{ scaleX: (index + 1) / HELLOS.length }}
              transition={{ duration: (HOLD_MS / 1000) * 0.85, ease: 'linear' }}
            />
          </div>

          {/* Small dot grid decoration */}
          <div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              pointerEvents: 'none',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EntranceAnimation;