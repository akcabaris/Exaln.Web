import React, { useState } from 'react';
import SideBarItem from './SideBarItem';
import { useAuth } from '../context/AuthContext';
import { FaRegUserCircle } from "react-icons/fa";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {

    const { isAuthenticated, logout, user } = useAuth();

    const [isIELTSSidebarItemOpen, setIsIELTSSidebarItemOpen] = useState(false);

    const handleIELTSSidebarItemClick = () => {
        setIsIELTSSidebarItemOpen(prev => !prev)
    }


    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                />
            )}

            <aside
                className={`
                fixed left-0 top-0 z-50 h-full w-64 bg-slate-100 text-slate-800 
                transform transition-transform duration-200 
                md:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            >
                <div className="flex items-center justify-between px-4 py-4 border-b border-slate-300">
                    <div className="flex items-center gap-2">
                        <FaRegUserCircle size={32} />
                        {user && <p>{user.firstName + " " + user.lastName}</p>}
                    </div>
                    <button
                        className="md:hidden text-slate-600"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <nav className="mt-4 flex flex-col gap-1 px-4">

                    <SideBarItem to="/" onClick={onClose}>
                        Home
                    </SideBarItem>

                    <div className='flex items-center w-full px-3 py-2 rounded-lg hover:bg-slate-200 border-b transition-colors'
                        onClick={handleIELTSSidebarItemClick}>
                        IELTS {isIELTSSidebarItemOpen ? <LuChevronUp className='ml-auto' /> : <LuChevronDown className='ml-auto' />}
                    </div>
                    {isIELTSSidebarItemOpen &&
                        <div className='flex flex-col items-start text-left text-sm gap-1 px-3 py-2 rounded-lg border-b transition-colors'>
                            <SideBarItem to="/" onClick={onClose}>Full Test</SideBarItem>
                            <SideBarItem to="/" onClick={onClose}>Listening</SideBarItem>
                            <SideBarItem to="/IELTS/Reading" onClick={onClose}>Reading</SideBarItem>
                            <SideBarItem to="/" onClick={onClose}>Writing</SideBarItem>
                            <SideBarItem to="/" onClick={onClose}>Speaking</SideBarItem>
                        </div>
                    }

                    {isAuthenticated ? (
                        <>
                            <SideBarItem to="/settings" onClick={onClose}>
                                Settings
                            </SideBarItem>
                            <SideBarItem to="/login" onClick={logout}>
                                Log Out
                            </SideBarItem>
                        </>
                    ) : (
                        <>
                            <SideBarItem to="/login" onClick={onClose}>
                                Log In
                            </SideBarItem>
                            <SideBarItem to="/signup" onClick={onClose}>
                                Sign Up
                            </SideBarItem>
                        </>
                    )}

                    <SideBarItem to="/help" onClick={onClose}>
                        Help / FAQ
                    </SideBarItem>

                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
