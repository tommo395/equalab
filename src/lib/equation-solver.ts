import * as math from 'mathjs';
import { Equation } from '@/types';

// Helper function to convert LaTeX to a format mathjs can understand
const latexToMathJs = (latex: string): string => {
  // This is a simplified conversion - production would need more robust parsing
  return latex
    .replace(/\\frac{([^}]*)}{([^}]*)}/, '($1)/($2)')
    .replace(/\\cdot/g, '*')
    .replace(/\\times/g, '*')
    .replace(/^([^=]*)=([^=]*)$/, '$1-($2)')
    .replace(/(\w+)\^(\d+)/g, 'pow($1,$2)')
    .replace(/\\sqrt{([^}]*)}/g, 'sqrt($1)')
    .replace(/\\left\(/g, '(')
    .replace(/\\right\)/g, ')')
    .replace(/\\pi/g, 'pi');
};

export const solveEquation = (
  equation: Equation,
  inputs: Record<string, number>,
  solveFor: string
): number | null => {
  try {
    // Handle common equations directly 
    if (equation.latex === 'E = mc^2') {
      if (solveFor === 'E') return inputs['m'] * Math.pow(inputs['c'], 2);
      if (solveFor === 'm') return inputs['E'] / Math.pow(inputs['c'], 2);
      if (solveFor === 'c') return Math.sqrt(inputs['E'] / inputs['m']);
    }
    
    if (equation.latex === 'F = ma') {
      if (solveFor === 'F') return inputs['m'] * inputs['a'];
      if (solveFor === 'm') return inputs['F'] / inputs['a'];
      if (solveFor === 'a') return inputs['F'] / inputs['m'];
    }
    
    if (equation.latex === 'a^2 + b^2 = c^2') {
      if (solveFor === 'c') return Math.sqrt(Math.pow(inputs['a'], 2) + Math.pow(inputs['b'], 2));
      if (solveFor === 'a') return Math.sqrt(Math.pow(inputs['c'], 2) - Math.pow(inputs['b'], 2));
      if (solveFor === 'b') return Math.sqrt(Math.pow(inputs['c'], 2) - Math.pow(inputs['a'], 2));
    }
    
    // Try a more general approach for other equations
    const expression = latexToMathJs(equation.latex);
    
    // Create a scope with all the variable values
    const scope = { ...inputs };
    
    try {
      // Evaluate the expression with the variable to solve set to 0
      // and then find the value that makes the equation equal to 0
      const expr = math.parse(expression);
      const compiled = expr.compile();
      
      // Simple numerical approach to finding roots - not ideal for all equations
      // but works for simple cases
      let low = -1000;
      let high = 1000;
      let mid = 0;
      
      for (let i = 0; i < 20; i++) { // 20 iterations should be enough for most cases
        mid = (low + high) / 2;
        scope[solveFor] = mid;
        const value = compiled.evaluate(scope);
        
        if (Math.abs(value) < 0.000001) {
          return mid;
        }
        
        if (value > 0) {
          high = mid;
        } else {
          low = mid;
        }
      }
      
      return mid; // Return the best approximation
    } catch (error) {
      console.error('Error solving equation:', error);
      return null;
    }
  } catch (error) {
    console.error('Error solving equation:', error);
    return null;
  }
};