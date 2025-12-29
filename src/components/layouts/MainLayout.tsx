// src/components/layout/MainLayout.tsx

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Sidebar from '../SideBar';

const MainLayout: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="mx-auto flex flex-col min-h-screen  bg-slate-50 text-slate-900 px-4 py-6">
            <Sidebar isOpen={open} onClose={() => setOpen(false)} />
            <div className="md:ml-64 min-h-screen flex flex-col relative">
                {!open &&
                    <button
                        className="md:hidden absolute left-4 top-4 z-50 text-slate-700 mr-14 fixed"
                        onClick={() => setOpen(true)}
                    >
                        ☰
                    </button>
                }
                <div className='flex justify-center items-center mt-4 mb-10 text:md md:text-2xl'>Exaling</div>
                <main className="mt-12 md:mt-0 flex-1">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
