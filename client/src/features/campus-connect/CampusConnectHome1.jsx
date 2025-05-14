import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-6 leading-tight">
          Welcome to <span className="text-blue-600">CampusConnect</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-10">
          Your trusted companion for a smooth onboarding experience at NIT Meghalaya.
          Connect, explore, and thrive with CampusConnect.
        </p>

        <div className="text-center">
          <Link
            to="/campus-connect/register"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            Get Started Now
          </Link>
        </div>

        {/* Optional illustration or hero image */}
        <div className="mt-12">
          <img
            src="/camp.jpg"
            alt="CampusConnect Illustration"
            className="mx-auto max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
