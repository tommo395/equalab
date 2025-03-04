"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEquations } from '@/context/EquationContext';
import Formula from '@/components/ui/Formula';
import EquationSolver from '@/components/equations/EquationSolver';
import Link from 'next/link';

export default function EquationPage() {
  const params = useParams();
  const router = useRouter();
  const { getEquation } = useEquations();
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const equation = getEquation(id);
  
  if (!equation) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
        <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Equation not found</h2>
        <p className="text-gray-600 mb-6">The equation you're looking for doesn't exist.</p>
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-forest-600 hover:bg-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-500"
        >
          Back to Home
        </Link>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <button 
          onClick={() => router.back()} 
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <svg className="mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          Back to Equations
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            layoutId={`equation-card-${equation.id}`}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <motion.h1 
                layoutId={`equation-title-${equation.id}`}
                className="text-2xl font-bold text-gray-900 mb-4"
              >
                {equation.name}
              </motion.h1>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <motion.div 
                  layoutId={`equation-formula-${equation.id}`}
                  className="flex justify-center"
                >
                  <Formula equation={equation.latex} block className="text-2xl" />
                </motion.div>
              </div>
              
              {equation.description && (
                <motion.div 
                  layoutId={`equation-description-${equation.id}`}
                  className="mb-4"
                >
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                  <p className="text-gray-700">
                    {equation.description}
                  </p>
                </motion.div>
              )}
              
              <motion.div 
                layoutId={`equation-tags-${equation.id}`}
                className="flex flex-wrap gap-2"
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
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Variables</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {equation.variables.map((variable, idx) => (
                      <tr key={variable.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Formula equation={variable.name} />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                          {variable.description || '-'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                          {variable.unit || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-4">
            <div className="bg-forest-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Solve Equation</h2>
            </div>
            <div className="p-6">
              <EquationSolver equation={equation} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}