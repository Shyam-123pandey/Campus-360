import React from 'react';

const CoursePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Course Page</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course content will go here */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800">Course Content</h2>
              <p className="mt-2 text-gray-600">Course details and materials will be displayed here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage; 