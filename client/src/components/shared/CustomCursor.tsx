import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on mobile/touch
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, [role="button"]');
      const card = target.closest('[data-cursor-text]');

      if (card) {
        const text = card.getAttribute('data-cursor-text');
        if (text) {
          setCursorText(text);
          setIsHovered(true);
          return;
        }
      }

      if (interactive) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#8B0D1A] rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 5,
          y: position.y - 5,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50, mass: 0.1 }}
      />

      {/* Expanding Ring / Badge Cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center border border-[#8B0D1A]/60 bg-[#8B0D1A]/10 backdrop-blur-xs font-mono text-[10px] font-bold text-[#8B0D1A] uppercase tracking-wider shadow-[0_0_15px_rgba(139,13,26,0.35)]"
        animate={{
          x: position.x - (cursorText ? 32 : 18),
          y: position.y - (cursorText ? 32 : 18),
          width: cursorText ? 64 : 36,
          height: cursorText ? 64 : 36,
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {cursorText}
      </motion.div>
    </>
  );
};
