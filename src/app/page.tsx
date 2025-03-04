"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useEquations } from '@/context/EquationContext';
import EquationCard from '@/components/equations/EquationCard';
import { getAllCategories, getAllTags } from '@/lib/equation-service';
import AddEquationModal from '@/components/equations/AddEquationModal';
import { Equation } from '@/types';

export default function Home() {
  const { 
    filteredEquations,
    selectedCategory,
    selectedTag,
    setSelectedCategory,
    setSelectedTag
  } = useEquations();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const categories = getAllCategories();
  const tags = getAllTags();
  
  const handleAddEquation = (newEquation: Omit<Equation, 'id' | 'createdAt' | 'updatedAt'>) => {
    // In a real app, this would add to the database
    // For the prototype, we'll just show an alert
    alert(`New equation "${newEquation.name}" would be added to the database in the full version.`);
    console.log('New equation:', newEquation);
  };
  
  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-3">
            Welcome to EquaLab
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your personal equation library for exploring science and mathematics
          </p>
        </motion.div>
      </div>
      
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                className="appearance-none bg-white pl-3 pr-10 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="relative">
              <select
                className="appearance-none bg-white pl-3 pr-10 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
                value={selectedTag || ''}
                onChange={(e) => setSelectedTag(e.target.value || null)}
              >
                <option value="">All Tags</option>
                {tags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-forest-600 hover:bg-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-500"
          >
            <svg className="mr-1.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Add Equation
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquations.length > 0 ? (
          filteredEquations.map((equation, idx) => (
            <EquationCard key={equation.id} equation={equation} index={idx} />
          ))
        ) : (
          <div className="col-span-3 flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <svg className="h-12 w-12 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No equations found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
      
      <AddEquationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddEquation}
      />
    </div>
  );
}