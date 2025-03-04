"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { Equation } from "@/types";
import {
  getAllEquations,
  getEquationById,
  getEquationsByTag,
  getEquationsByCategory,
  addEquation,
} from "@/lib/equation-service";
import Fuse from "fuse.js";

interface EquationContextType {
  equations: Equation[];
  filteredEquations: Equation[];
  searchTerm: string;
  selectedCategory: string | null;
  selectedTag: string | null;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedTag: (tag: string | null) => void;
  getEquation: (id: string) => Equation | undefined;
  addNewEquation: (
    equation: Omit<Equation, "id" | "createdAt" | "updatedAt">
  ) => Equation;
}

const EquationContext = createContext<EquationContextType | undefined>(
  undefined
);

export const EquationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [equations, setEquations] = useState<Equation[]>(getAllEquations());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Configure Fuse.js for fuzzy search
  const fuse = new Fuse(equations, {
    keys: ["name", "latex", "description", "tags"],
    threshold: 0.4,
    includeScore: true,
  });

  // Apply filters and search
  const filteredEquations = React.useMemo(() => {
    let result = equations;

    // Filter by category
    if (selectedCategory) {
      result = result.filter(
        (eq) => eq.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by tag
    if (selectedTag) {
      result = result.filter((eq) =>
        eq.tags.includes(selectedTag.toLowerCase())
      );
    }

    // Apply search
    if (searchTerm.trim()) {
      const searchResults = fuse.search(searchTerm);
      result = searchResults.map((res) => res.item);
    }

    return result;
  }, [equations, searchTerm, selectedCategory, selectedTag]);

  const getEquation = (id: string) => getEquationById(id);

  const addNewEquation = (
    newEquation: Omit<Equation, "id" | "createdAt" | "updatedAt">
  ) => {
    const equation = addEquation(newEquation);
    setEquations(getAllEquations()); // Refresh the equations list
    return equation;
  };

  return (
    <EquationContext.Provider
      value={{
        equations,
        filteredEquations,
        searchTerm,
        selectedCategory,
        selectedTag,
        setSearchTerm,
        setSelectedCategory,
        setSelectedTag,
        getEquation,
        addNewEquation,
      }}
    >
      {children}
    </EquationContext.Provider>
  );
};

export const useEquations = () => {
  const context = useContext(EquationContext);
  if (context === undefined) {
    throw new Error("useEquations must be used within an EquationProvider");
  }
  return context;
};
