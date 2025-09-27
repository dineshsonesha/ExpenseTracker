import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from './Index';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  );
}