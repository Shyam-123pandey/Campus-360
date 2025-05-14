import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const CampusConnectSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for registering with CampusConnect. Our team will review your application and get back to you soon.
          </p>
          <div className="space-y-4">
            <Link
              to="/campus-connect"
              className="inline-block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
            <Link
              to="/campus-connect/search"
              className="inline-block w-full bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Browse Helpers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusConnectSuccess; 