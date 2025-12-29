import React from "react";
import { Link } from "react-router-dom";

interface SidebarLinkProps {
    to: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, children, onClick }) => {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="px-3 py-2 rounded-lg hover:bg-slate-200 border-b transition-colors"
        >
            {children}
        </Link>
    );
};

export default SidebarLink;
