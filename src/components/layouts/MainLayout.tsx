// src/components/layout/MainLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6">
                <Navbar />
                <main className="mt-4 flex-1">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
