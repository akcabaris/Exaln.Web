import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const displayName = user?.firstName || '';

    return (
        <header className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 shadow-sm ring-1 ring-slate-200 sm:px-6">
            <Link
                to="/"
                className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base"
            >
                Exaling
            </Link>

            <div className="flex items-center gap-3">
                <span className="hidden text-xs text-slate-600 sm:inline">
                    {displayName}
                </span>
                <button
                    onClick={logout}
                    className="inline-flex items-center justify-center rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;
