import React from 'react';
import SideBarLink from './SideBarLink';
import { useAuth } from '../context/AuthContext';
import { FaRegUserCircle } from "react-icons/fa";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {

    const { isAuthenticated, logout, user } = useAuth();
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

                    <SideBarLink to="/" onClick={onClose}>
                        Home
                    </SideBarLink>

                    {isAuthenticated ? (
                        <>
                            <SideBarLink to="/settings" onClick={onClose}>
                                Settings
                            </SideBarLink>
                            <SideBarLink to="/login" onClick={logout}>
                                Log Out
                            </SideBarLink>
                        </>
                    ) : (
                        <>
                            <SideBarLink to="/login" onClick={onClose}>
                                Log In
                            </SideBarLink>
                            <SideBarLink to="/signup" onClick={onClose}>
                                Sign Up
                            </SideBarLink>
                        </>
                    )}

                    <SideBarLink to="/help" onClick={onClose}>
                        Help / FAQ
                    </SideBarLink>

                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
