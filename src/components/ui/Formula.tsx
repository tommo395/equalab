"use client";

import React, { useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface FormulaProps {
  equation: string;
  block?: boolean;
  className?: string;
}

export const Formula: React.FC<FormulaProps> = ({ 
  equation, 
  block = false,
  className = "" 
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(equation, containerRef.current, {
        throwOnError: false,
        displayMode: block,
        output: 'html',
        trust: true
      });
    }
  }, [equation, block]);

  return (
    <div 
      ref={containerRef} 
      className={`font-math ${className}`}
    />
  );
};

export default Formula;