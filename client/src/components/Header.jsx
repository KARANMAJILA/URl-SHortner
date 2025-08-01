// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Link as LinkIcon, BarChart3, Home } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-blue-600 text-xl font-bold hover:text-blue-700">
          <LinkIcon size={24} />
          <span>URL Shortener</span>
        </Link>

        <nav className="flex gap-4">
          <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm font-medium">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm font-medium">
            <BarChart3 size={18} />
            <span>Dashboard</span>
          </Link>
        </nav>

       
      </div>
    </header>
  );
};

export default Header;
