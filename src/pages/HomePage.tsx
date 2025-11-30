// src/pages/HomePage.tsx

import React from 'react';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
    const { user } = useAuth();
    const displayName = user?.firstName || 'User';

    return (
        <div className="space-y-4">
            <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
                <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                    Welcome back, {displayName}
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                </p>
            </section>
        </div>
    );
};

export default HomePage;
