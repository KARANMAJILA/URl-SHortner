
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UrlShortener from './components/UrlShortener';
import UrlStats from './components/UrlStats';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="main-content px-4 py-8">
          <Routes>
            <Route path="/" element={<UrlShortener />} />
            <Route path="/stats/:code" element={<UrlStats />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover theme={theme === 'dark' ? 'dark' : 'light'} />
      </div>
    </Router>
  );
};

export default App;
