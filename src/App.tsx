// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';

import ReadingPracticeList from './pages/IELTS/ReadingPracticeListPage';
import ReadingPractice from './pages/IELTS/ReadingPracticePage';

//import ProtectedRoute from './routes/ProtectedRoute';
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
          <Route path="/IELTS/Reading" element={<ReadingPracticeList />} />
          <Route path="/IELTS/Reading/Practice/:examId" element={<ReadingPractice />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />

        {/*
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}> ... </Route>
        </Route>
        */}
      </Routes>
    </>
  );
};

export default App;
