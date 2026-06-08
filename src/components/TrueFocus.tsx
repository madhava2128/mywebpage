import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import './TrueFocus.css';

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  borderColor = '#00e5ff',
  glowColor = 'rgba(0, 229, 255, 0.35)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.2,
}) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [focusRect, setFocusRect] = useState<FocusRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  /** Measure active word position after the browser has painted */
  const measure = useCallback((idx: number) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = wordRefs.current[idx];
      const container = containerRef.current;
      if (!el || !container) return;
      const pRect = container.getBoundingClientRect();
      const wRect = el.getBoundingClientRect();
      setFocusRect({
        x: wRect.left - pRect.left,
        y: wRect.top - pRect.top,
        width: wRect.width,
        height: wRect.height,
      });
    });
  }, []);

  /* Measure whenever the active word changes */
  useEffect(() => {
    measure(currentIndex);
  }, [currentIndex, measure]);

  /* Re-measure on resize */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => measure(currentIndex));
    ro.observe(document.body);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [currentIndex, measure]);

  /* Auto-cycle */
  useEffect(() => {
    if (manualMode) return;
    const ms = (animationDuration + pauseBetweenAnimations) * 1000;
    const id = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % words.length);
    }, ms);
    return () => clearInterval(id);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  return (
    <div className="focus-container" ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <React.Fragment key={index}>
            <span
              ref={el => { wordRefs.current[index] = el; }}
              className="focus-word"
              style={{
                opacity: isActive ? 1 : 0.25,
                filter: isActive ? 'blur(0px)' : 'blur(3px)',
                transition: `opacity ${animationDuration}s ease, filter ${animationDuration}s ease`,
              }}
              onMouseEnter={() => { if (manualMode) setCurrentIndex(index); }}
            >
              {word}
            </span>
            {index < words.length - 1 && (
              <span className="focus-separator">·</span>
            )}
          </React.Fragment>
        );
      })}

      {focusRect && (
        <motion.div
          className="focus-frame"
          initial={false}
          animate={{
            x: focusRect.x,
            y: focusRect.y,
            width: focusRect.width,
            height: focusRect.height,
          }}
          transition={{ duration: animationDuration, ease: 'easeInOut' }}
          style={{
            // @ts-expect-error custom CSS vars
            '--border-color': borderColor,
            '--glow-color': glowColor,
          }}
        >
          <span className="corner top-left" />
          <span className="corner top-right" />
          <span className="corner bottom-left" />
          <span className="corner bottom-right" />
        </motion.div>
      )}
    </div>
  );
};

export default TrueFocus;
