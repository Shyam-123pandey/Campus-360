import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const CampusConnectFeedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState({
    helperName: '',
    category: '',
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add feedback submission logic
    console.log('Feedback submitted:', { ...feedback, rating });
    alert('Thank you for your feedback!');
    setRating(0);
    setFeedback({
      helperName: '',
      category: '',
      comment: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Share Your Experience
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Helper Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Helper's Name
              </label>
              <input
                type="text"
                name="helperName"
                required
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter helper's name"
                value={feedback.helperName}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Help Category
              </label>
              <select
                name="category"
                required
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white dark:bg-gray-700"
                value={feedback.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="academic">Academic Support</option>
                <option value="campus">Campus Life</option>
                <option value="room">Room & Accommodation</option>
                <option value="transport">Transportation</option>
                <option value="shopping">Shopping Guide</option>
                <option value="documents">Documentation</option>
                <option value="food">Food & Dining</option>
                <option value="health">Health Services</option>
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <FaStar
                      className={`w-8 h-8 ${
                        star <= (hover || rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Feedback
              </label>
              <textarea
                name="comment"
                rows="4"
                required
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Share your experience with the helper..."
                value={feedback.comment}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampusConnectFeedback; 