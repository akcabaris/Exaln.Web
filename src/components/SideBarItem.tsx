import React from "react";
import { Link } from "react-router-dom";

interface SideBarItemProps {
    to: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const SideBarItem: React.FC<SideBarItemProps> = ({ to, children, onClick }) => {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="flex w-full px-3 py-2 rounded-lg hover:bg-slate-200 border-b transition-colors"
        >
            {children}
        </Link>
    );
};

export default SideBarItem;
