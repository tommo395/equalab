"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">About EquaLab</h1>

      <div className="card bg-base-100 shadow-lg mb-8">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">Our Mission</h2>
          <p className="mb-4">
            EquaLab is designed to be a comprehensive equation management and
            solver tool for students, educators, and science enthusiasts. We aim
            to make mathematical and scientific equations more accessible and
            interactive.
          </p>
          <p>
            With EquaLab, you can store, organize, search, and solve equations
            across various scientific disciplines without needing to manually
            rearrange formulas.
          </p>
        </div>
      </div>

      <div className="card bg-base-100 shadow-lg mb-8">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">Features</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Store and organize equations by categories and tags</li>
            <li>Beautiful LaTeX rendering of mathematical formulas</li>
            <li>Powerful fuzzy search to quickly find equations</li>
            <li>Solve for any variable without manual rearrangement</li>
            <li>Responsive design for both desktop and mobile</li>
            <li>Smooth animations and intuitive interface</li>
          </ul>
        </div>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">Future Plans</h2>
          <p className="mb-4">
            This version of EquaLab is a prototype that demonstrates the core
            functionality. Future versions will include:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>User accounts and authentication</li>
            <li>Database integration for persistent storage</li>
            <li>Equation sharing and collaboration features</li>
            <li>More advanced equation solving capabilities</li>
            <li>Step-by-step solutions with explanations</li>
            <li>Graphing capabilities for equations</li>
          </ul>

          <div className="mt-6">
            <Link href="/" className="btn btn-primary">
              Explore Equations
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
