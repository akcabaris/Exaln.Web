// src/App.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';
import IELTSReadingPage from './pages/IELTSReadingExamPage'

import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './components/layouts/MainLayout';

import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <>
      <Toaster richColors position="top-right" />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />


        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path='/Reading' element={<IELTSReadingPage />}></Route>
        </Route>
        <Route>

        </Route>

        {/*
                <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route>
        
        */}
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
