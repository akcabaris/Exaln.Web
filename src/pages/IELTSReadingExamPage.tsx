// src/pages/HomePage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div className="space-y-4">
            <section className="rounded-lg bg-white p-4 ring-1 ring-slate-200 sm:p-6">
                <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                    My Results
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                </p>
                <div className="p-4 bg-white">
                    <p className="text-gray-700">
                        You haven't completed any sadkgnb.
                    </p>

                    <Link
                        to="/IELTS/Exam"
                        className="inline-block mt-3 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
                    >
                        Start here
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
