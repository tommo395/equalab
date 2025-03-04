"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Equation, Variable } from '@/types';
import { solveEquation } from '@/lib/equation-service';
import Formula from '@/components/ui/Formula';
import { motion, AnimatePresence } from 'framer-motion';

interface EquationSolverProps {
  equation: Equation;
}

interface FormInputs {
  [key: string]: number;
}

export default function EquationSolver({ equation }: EquationSolverProps) {
  const [solveFor, setSolveFor] = useState<string>(equation.variables[0].name);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({
    defaultValues: equation.variables.reduce((acc, variable) => {
      if (variable.defaultValue) {
        acc[variable.name] = variable.defaultValue;
      }
      return acc;
    }, {} as FormInputs)
  });
  
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setError(null);
    
    // Check if we're providing all required variables except the one we're solving for
    const requiredVars = equation.variables
      .filter(v => v.name !== solveFor)
      .map(v => v.name);
      
    const missingVars = requiredVars.filter(v => !data[v] && data[v] !== 0);
    
    if (missingVars.length > 0) {
      setError(`Please provide values for: ${missingVars.join(', ')}`);
      return;
    }
    
    try {
      const calculatedResult = solveEquation(equation, data, solveFor);
      setResult(calculatedResult);
    } catch (err) {
      setError("Error solving equation. Please check your inputs.");
      console.error(err);
    }
  };
  
  // Reset form and results when the variable to solve for changes
  const handleSolveForChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSolveFor(e.target.value);
    setResult(null);
    setError(null);
  };
  
  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Solve for
        </label>
        <div className="relative">
          <select
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-forest-500 focus:border-forest-500 sm:text-sm"
            value={solveFor}
            onChange={handleSolveForChange}
          >
            {equation.variables.map((variable) => (
              <option key={variable.name} value={variable.name}>
                {variable.name} {variable.description ? `(${variable.description})` : ''}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {equation.variables
          .filter(variable => variable.name !== solveFor)
          .map((variable) => (
            <div key={variable.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-1.5">
                  <Formula equation={variable.name} />
                  {variable.description && ` (${variable.description})`}
                </span>
              </label>
              
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  step="any"
                  placeholder={`Value for ${variable.name}`}
                  className={`block w-full px-3 py-2 border ${errors[variable.name] ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 placeholder-gray-400 text-gray-900 focus:ring-forest-500 focus:border-forest-500'} rounded-md shadow-sm sm:text-sm`}
                  {...register(variable.name, { 
                    required: true,
                    valueAsNumber: true
                  })}
                />
                
                {variable.unit && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">
                      {variable.unit}
                    </span>
                  </div>
                )}
                
                {errors[variable.name] && (
                  <div className="mt-1 text-sm text-red-600">
                    This field is required
                  </div>
                )}
              </div>
            </div>
          ))}
          
        <div className="flex gap-2 pt-2">
          <button 
            type="submit" 
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-forest-600 hover:bg-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-500"
          >
            Calculate
          </button>
          <button 
            type="button" 
            className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-500"
            onClick={() => {
              reset();
              setResult(null);
              setError(null);
            }}
          >
            Reset
          </button>
        </div>
      </form>
      
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-md bg-red-50 p-4 mt-4"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {result !== null && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="mt-6 p-4 rounded-md bg-green-50 border border-green-100"
          >
            <h3 className="text-sm font-medium text-green-800 mb-2">Result</h3>
            <div className="bg-white p-3 rounded border border-green-200 flex items-center justify-center">
              <div className="flex items-center gap-2 text-gray-900">
                <Formula equation={solveFor} />
                <span className="text-xl">=</span>
                <span className="text-xl font-semibold">{result.toLocaleString(undefined, {
                  maximumFractionDigits: 8
                })}</span>
                {equation.variables.find(v => v.name === solveFor)?.unit && (
                  <span className="text-gray-500 text-sm">
                    {equation.variables.find(v => v.name === solveFor)?.unit}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}