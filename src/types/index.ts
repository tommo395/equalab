export interface Variable {
    name: string;
    description?: string;
    unit?: string;
    defaultValue?: number;
  }
  
  export interface Equation {
    id: string;
    name: string;
    latex: string;
    description?: string;
    variables: Variable[];
    tags: string[];
    category?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface EquationSolution {
    equation: Equation;
    inputs: Record<string, number>;
    result: number | null;
    error?: string;
  }