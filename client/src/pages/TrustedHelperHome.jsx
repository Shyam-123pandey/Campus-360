// pages/Home.jsx

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="text-center space-y-6 max-w-3xl px-4 md:px-8">
        <h1 className="text-5xl font-extrabold leading-tight">Welcome to CampusConnect</h1>
        <p className="text-xl md:text-2xl font-light">
          Your trusted support network at NIT Meghalaya, connecting newcomers with helpful seniors, faculty, and staff.
        </p>
        
        <div className="flex justify-center space-x-4 mt-6">
          <Link to="/home-service" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-xl transition duration-300 ease-in-out">
            Get Started
          </Link>
          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-800 px-6 py-3 rounded-lg text-xl transition duration-300 ease-in-out">
            Learn More
          </button>
        </div>
        
        <div className="mt-8">
          <h2 className="text-3xl font-bold">Explore Our Features</h2>
          <p className="text-lg mt-2">Connect with trusted helpers, get instant assistance, and make your stay at NIT Meghalaya stress-free!</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4">Trusted Helper Directory</h3>
            <p>Connect with seniors, faculty, and security based on your region. Get help with transportation, accommodation, shopping, and more!</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4">Live Chat Support</h3>
            <p>Need help right now? Our live chat system is here to answer your questions and connect you with a helper instantly.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4">Help Categories</h3>
            <p>From room-related issues to shopping and transportation, find categorized help for everything you need.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
