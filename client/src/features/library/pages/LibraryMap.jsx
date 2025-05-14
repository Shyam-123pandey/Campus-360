import React, { useState } from 'react';
import { FaSearch, FaBook, FaMapMarkerAlt } from 'react-icons/fa';

const LibraryMap = () => {
  const [selectedSection, setSelectedSection] = useState('cs');
  const [selectedRack, setSelectedRack] = useState(null);

  const sections = {
    cs: {
      name: 'Computer Science',
      racks: [
        {
          id: 1,
          number: 1,
          levels: ['Upper', 'Middle', 'Lower'],
          sides: ['Left', 'Right'],
          books: [
            { title: 'Data Structures', level: 'Middle', side: 'Right' },
            { title: 'Algorithms', level: 'Upper', side: 'Left' },
          ],
        },
        {
          id: 2,
          number: 2,
          levels: ['Upper', 'Middle', 'Lower'],
          sides: ['Left', 'Right'],
          books: [
            { title: 'Database Systems', level: 'Middle', side: 'Left' },
            { title: 'Operating Systems', level: 'Lower', side: 'Right' },
          ],
        },
        // Add more racks as needed
      ],
    },
    // Add more sections as needed
  };

  const handleRackClick = (rack) => {
    setSelectedRack(rack);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Library Map
        </h1>

        {/* Section Selector */}
        <div className="flex justify-center space-x-4 mb-8">
          {Object.entries(sections).map(([id, section]) => (
            <button
              key={id}
              onClick={() => setSelectedSection(id)}
              className={`px-6 py-3 rounded-full ${
                selectedSection === id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>

        {/* Map View */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections[selectedSection].racks.map((rack) => (
              <div
                key={rack.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedRack?.id === rack.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-400'
                }`}
                onClick={() => handleRackClick(rack)}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Rack {rack.number}
                </h3>
                <div className="space-y-4">
                  {rack.levels.map((level) => (
                    <div key={level} className="space-y-2">
                      <h4 className="font-medium text-gray-700">{level} Shelf</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {rack.sides.map((side) => (
                          <div
                            key={side}
                            className="bg-gray-50 rounded p-2 text-sm text-gray-600"
                          >
                            {side} Side
                            {rack.books
                              .filter(
                                (book) =>
                                  book.level === level && book.side === side
                              )
                              .map((book) => (
                                <div
                                  key={book.title}
                                  className="mt-1 text-xs text-gray-500"
                                >
                                  • {book.title}
                                </div>
                              ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Rack Details */}
        {selectedRack && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Rack {selectedRack.number} Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Available Books
                </h3>
                <div className="space-y-2">
                  {selectedRack.books.map((book) => (
                    <div
                      key={book.title}
                      className="flex items-center space-x-2 text-gray-600"
                    >
                      <FaBook className="text-blue-600" />
                      <span>
                        {book.title} ({book.level} Shelf, {book.side} Side)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Location Guide
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <span>Section: {sections[selectedSection].name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <span>Rack Number: {selectedRack.number}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryMap; 