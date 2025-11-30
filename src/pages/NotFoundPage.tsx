import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-7xl md:text-9xl font-extrabold text-indigo-600">404</h1>
            <p className="text-xl md:text-3xl font-medium text-gray-700 mt-4 mb-8 text-center">
                Sorry, the page you are looking for could not be found.
            </p>
            <Link
                to="/"
                className="text-lg text-white bg-indigo-600 hover:bg-indigo-700 py-3 px-8 rounded-lg transition duration-300 shadow-lg transform hover:scale-105"
            >
                Back to HomePage
            </Link>
        </div>
    );
};

export default NotFoundPage;