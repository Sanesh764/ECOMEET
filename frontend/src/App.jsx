import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import { AnimatePresence, motion } from 'framer-motion';

function AppContent() {
  const { route } = useApp();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={route}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full h-full"
      >
        {route === 'landing' && <LandingPage />}
        {route === 'login' && <Login />}
        {route === 'register' && <Register />}
        {route === 'forgot-password' && <ForgotPassword />}
        {route === 'dashboard' && <DashboardLayout />}
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
