import { useState } from 'react';
import { FaComments, FaLinkedin, FaSearch, FaStar } from 'react-icons/fa';

const CampusConnectSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Mock data for helpers
  const helpers = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      role: 'Faculty Member',
      department: 'Computer Science',
      location: 'Delhi',
      rating: 4.8,
      category: 'academic',
      linkedin: 'https://linkedin.com/in/rajesh-kumar',
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Senior Student',
      department: 'Electrical Engineering',
      location: 'Maharashtra',
      rating: 4.9,
      category: 'campus',
      linkedin: 'https://linkedin.com/in/priya-sharma',
      image: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    // Add more mock data as needed
  ];

  const filteredHelpers = helpers.filter(helper => {
    const matchesSearch = helper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         helper.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || helper.category === selectedCategory;
    const matchesLocation = !selectedLocation || helper.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Find Trusted Helpers
        </h1>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Search by name or department"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white dark:bg-gray-700"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="academic">Academic Support</option>
              <option value="campus">Campus Life</option>
              <option value="room">Room & Accommodation</option>
              <option value="transport">Transportation</option>
              <option value="shopping">Shopping Guide</option>
              <option value="documents">Documentation</option>
              <option value="food">Food & Dining</option>
              <option value="health">Health Services</option>
            </select>

            {/* Location Filter */}
            <input
              type="text"
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Filter by location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Helpers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHelpers.map(helper => (
            <div key={helper.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={helper.image}
                    alt={helper.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{helper.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{helper.role}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{helper.department}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{helper.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">•</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">{helper.location}</span>
                </div>

                <div className="flex space-x-4">
                  <a
                    href={helper.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <FaLinkedin className="mr-2" />
                    LinkedIn
                  </a>
                  <button className="flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                    <FaComments className="mr-2" />
                    Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHelpers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No helpers found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusConnectSearch; 