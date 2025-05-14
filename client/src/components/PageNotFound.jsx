import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
      <div className="text-center bg-white shadow-2xl rounded-3xl p-10 max-w-lg">
        <h1 className="text-8xl font-bold text-blue-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="mt-2 text-gray-600">
          Sorry, the page you&apos;re looking for doesn&lsquo;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
// Each page component is implemented below
// pages/Home1.jsx

export function Home1() {
    return (
        <div className="p-8 text-center">
            <h1 className="text-3xl font-bold">Welcome to CampusConnect</h1>
            <p className="mt-2">Your support system at NIT Meghalaya</p>
        </div>
    );
}
