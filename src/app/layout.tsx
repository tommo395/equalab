import './globals.css';
import type { Metadata } from 'next';
import { EquationProvider } from '@/context/EquationContext';
import Navbar from '@/components/ui/Navbar';

export const metadata: Metadata = {
  title: 'EquaLab - Equation Management',
  description: 'Organize, search and solve equations with ease',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gray-50">
        <EquationProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-gray-200 bg-white py-4">
            <div className="container mx-auto text-center">
              <p className="text-sm text-gray-500">© 2025 EquaLab • An elegant equation management tool</p>
            </div>
          </footer>
        </EquationProvider>
      </body>
    </html>
  );
}