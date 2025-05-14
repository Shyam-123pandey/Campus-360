import { useState } from 'react';
import { FaBook, FaMapMarkerAlt, FaRobot, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LibraryHome = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to search results page
    window.location.href = `/library/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Library Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find your books with precision and ease
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="relative">
            <input
              
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, subject, or ISBN..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
            >
              <FaSearch className="w-6 h-6" />
            </button>
          </form>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<FaBook className="w-8 h-8" />}
            title="Search & Locate"
            description="Find books with detailed location information"
            link="/library/search"
          />
          <FeatureCard
            icon={<FaMapMarkerAlt className="w-8 h-8" />}
            title="Interactive Map"
            description="Visual guide to book locations"
            link="/library/map"
          />
          <FeatureCard
            icon={<FaRobot className="w-8 h-8" />}
            title="AI Book Locator"
            description="Ask our AI assistant to find your books"
            link="/library/ai-locator"
          />
        </div>

        {/* Popular Sections */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Popular Sections
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularSections.map((section) => (
              <Link
                key={section.id}
                to={`/library/section/${section.id}`}
                className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
              >
                <h3 className="font-semibold text-gray-800">{section.name}</h3>
                <p className="text-sm text-gray-600">{section.count} books</p>
              </Link>
            ))}
          </div>
        </div>
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

const popularSections = [
  { id: 'cs', name: 'Computer Science', count: 1250 },
  { id: 'literature', name: 'Literature', count: 980 },
  { id: 'science', name: 'Science', count: 850 },
  { id: 'history', name: 'History', count: 720 },
  { id: 'mathematics', name: 'Mathematics', count: 650 },
  { id: 'engineering', name: 'Engineering', count: 890 },
  { id: 'arts', name: 'Arts', count: 540 },
  { id: 'business', name: 'Business', count: 780 },
];

export default LibraryHome; 