"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Equation } from '@/types';
import Formula from '@/components/ui/Formula';

interface EquationCardProps {
  equation: Equation;
  index?: number;
}

export default function EquationCard({ equation, index = 0 }: EquationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-soft overflow-hidden border border-gray-200"
      layoutId={`equation-card-${equation.id}`}
    >
      <div className="px-6 pt-6">
        <motion.h2 
          className="text-lg font-semibold text-gray-800 mb-2" 
          layoutId={`equation-title-${equation.id}`}
        >
          {equation.name}
        </motion.h2>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <motion.div layoutId={`equation-formula-${equation.id}`}>
            <Formula equation={equation.latex} block />
          </motion.div>
        </div>
        
        {equation.description && (
          <motion.p 
            className="text-gray-600 text-sm mb-4 line-clamp-2"
            layoutId={`equation-description-${equation.id}`}
          >
            {equation.description}
          </motion.p>
        )}
      </div>
      
      <div className="px-6 pb-4">
        <motion.div 
          className="flex flex-wrap gap-1.5 mb-4"
          layoutId={`equation-tags-${equation.id}`}
        >
          {equation.category && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-forest-100 text-forest-800">
              {equation.category}
            </span>
          )}
          {equation.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
      
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
        <Link 
          href={`/equation/${equation.id}`}
          className="text-forest-600 font-medium text-sm hover:text-forest-700 inline-flex items-center"
        >
          Explore
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}