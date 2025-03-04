import { Equation } from '@/types';
import { solveEquation } from './equation-solver';

// Mock data to be replaced with a database
const mockEquations: Equation[] = [
  {
    id: '1',
    name: 'Einstein\'s Mass-Energy Equivalence',
    latex: 'E = mc^2',
    description: 'Describes the relationship between mass and energy.',
    variables: [
      { name: 'E', description: 'Energy', unit: 'J' },
      { name: 'm', description: 'Mass', unit: 'kg' },
      { name: 'c', description: 'Speed of light', unit: 'm/s', defaultValue: 299792458 }
    ],
    tags: ['physics', 'relativity', 'energy'],
    category: 'Physics',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    id: '2',
    name: 'Newton\'s Second Law',
    latex: 'F = ma',
    description: 'The rate of change of momentum is proportional to the force applied.',
    variables: [
      { name: 'F', description: 'Force', unit: 'N' },
      { name: 'm', description: 'Mass', unit: 'kg' },
      { name: 'a', description: 'Acceleration', unit: 'm/s²' }
    ],
    tags: ['physics', 'mechanics', 'motion'],
    category: 'Physics',
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02')
  },
  {
    id: '3',
    name: 'Pythagorean Theorem',
    latex: 'a^2 + b^2 = c^2',
    description: 'In a right triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides.',
    variables: [
      { name: 'a', description: 'Side a', unit: 'units' },
      { name: 'b', description: 'Side b', unit: 'units' },
      { name: 'c', description: 'Hypotenuse', unit: 'units' }
    ],
    tags: ['mathematics', 'geometry', 'triangle'],
    category: 'Mathematics',
    createdAt: new Date('2023-01-03'),
    updatedAt: new Date('2023-01-03')
  },
  {
    id: '4',
    name: 'Ohm\'s Law',
    latex: 'V = IR',
    description: 'The current through a conductor is directly proportional to the voltage and inversely proportional to the resistance.',
    variables: [
      { name: 'V', description: 'Voltage', unit: 'V' },
      { name: 'I', description: 'Current', unit: 'A' },
      { name: 'R', description: 'Resistance', unit: 'Ω' }
    ],
    tags: ['physics', 'electricity', 'circuits'],
    category: 'Electronics',
    createdAt: new Date('2023-01-04'),
    updatedAt: new Date('2023-01-04')
  },
  {
    id: '5',
    name: 'Gravitational Potential Energy',
    latex: 'U = mgh',
    description: 'The energy possessed by an object due to its position in a gravitational field.',
    variables: [
      { name: 'U', description: 'Potential energy', unit: 'J' },
      { name: 'm', description: 'Mass', unit: 'kg' },
      { name: 'g', description: 'Gravitational acceleration', unit: 'm/s²', defaultValue: 9.8 },
      { name: 'h', description: 'Height', unit: 'm' }
    ],
    tags: ['physics', 'mechanics', 'energy', 'gravity'],
    category: 'Physics',
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-01-05')
  }
];

// In-memory store for the prototype
let equations = [...mockEquations];

export const getAllEquations = (): Equation[] => {
  return [...equations];
};

export const getEquationById = (id: string): Equation | undefined => {
  return equations.find(eq => eq.id === id);
};

export const getEquationsByTag = (tag: string): Equation[] => {
  return equations.filter(eq => eq.tags.includes(tag.toLowerCase()));
};

export const getEquationsByCategory = (category: string): Equation[] => {
  return equations.filter(eq => eq.category?.toLowerCase() === category.toLowerCase());
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  equations.forEach(eq => {
    eq.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
};

export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  equations.forEach(eq => {
    if (eq.category) categories.add(eq.category);
  });
  return Array.from(categories);
};

export const addEquation = (equation: Omit<Equation, 'id' | 'createdAt' | 'updatedAt'>): Equation => {
  const newEquation: Equation = {
    ...equation,
    id: (equations.length + 1).toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  equations.push(newEquation);
  return newEquation;
};

export { solveEquation };