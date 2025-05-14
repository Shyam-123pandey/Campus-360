import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaSearch, FaComments, FaStar } from 'react-icons/fa';

const CampusConnectHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Welcome to CampusConnect
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted platform for connecting with seniors, faculty, and staff at NIT Meghalaya
          </p>
        </div>

        {/* Features Grid */}
        {/* <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"> */}
        <div className="flex justify-center gap-8 mb-16">
          <FeatureCard
            icon={<FaUserFriends className="w-8 h-8" />}
            title="Find Trusted Helpers"
            description="Connect with verified seniors and faculty members"
            link="/campus-connect/search"
          />
          <FeatureCard
            icon={<FaSearch className="w-8 h-8" />}
            title="Search by Location"
            description="Find helpers from your state or country"
            link="/campus-connect/search"
          />
          <FeatureCard
            icon={<FaStar className="w-8 h-8" />}
            title="Rate & Review"
            description="Share your experience and help others"
            link="/campus-connect/feedback"
          />
        </div>

        {/* Help Categories */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            How Can We Help You?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {helpCategories.map((category) => (
              <Link
                key={category.id}
                to={`/campus-connect/search?category=${category.id}`}
                className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
              >
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, link }) => (
  <Link
    to={link}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Link>
);

const helpCategories = [
  { id: 'room', name: 'Room & Accommodation' },
  { id: 'transport', name: 'Transportation' },
  { id: 'shopping', name: 'Shopping Guide' },
  { id: 'documents', name: 'Documentation' },
  { id: 'food', name: 'Food & Dining' },
  { id: 'health', name: 'Health Services' },
  { id: 'academic', name: 'Academic Support' },
  { id: 'campus', name: 'Campus Life' },
];

export default CampusConnectHome; 