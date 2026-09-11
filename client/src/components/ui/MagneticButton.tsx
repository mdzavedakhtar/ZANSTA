import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from './Button';

export interface MagneticButtonProps extends ButtonProps {
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  strength = 22,
  children,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = (e.clientX - centerX) / (width / 2);
    const distanceY = (e.clientY - centerY) / (height / 2);

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.5 }}
      >
        <Button className={className} {...props}>
          {children}
        </Button>
      </motion.div>
    </div>
  );
};
