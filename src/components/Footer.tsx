import React from 'react';

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-6 border-t border-slate-200 pt-4 text-center text-xs text-slate-400">
            © {year} Exaling
        </footer>
    );
};

export default Footer;
