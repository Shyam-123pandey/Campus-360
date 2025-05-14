import { useState } from "react";

const URL = "https://campus-360-server.onrender.com"
// const URL = "http://localhost:8080"


export default function Emergency() {
  const [showForm, setShowForm] = useState(false);
  const [showNotification, setShowNotification] = useState(null);

  // Utility function to get location as a promise
  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  const handleSOS = async () => {
    try {
      const position = await getCurrentLocation();
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      };

      alert("🚨 Emergency SOS Triggered!");
      setShowNotification("sos");
      setTimeout(() => setShowNotification(null), 4000);

      const data = {
        name: "Unknown",
        roll: "unknown",
        gender: "Unknown",
        type: "sos",
        category: "pending",
        description: "Unknown",
        timestamp: new Date().toISOString(),
        coords,
      };

      await fetch(`${URL}/api/emergency`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Failed to get location or send SOS:", error);
    }
  };

  const handleComplainSubmit = async (e) => {
    e.preventDefault();

    try {
      const position = await getCurrentLocation();
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      };

      const formData = new FormData(e.target);
      const name = formData.get("name");
      const roll = formData.get("roll");
      const gender = formData.get("gender");
      const description = formData.get("description");

      const data = {
        name,
        roll,
        gender,
        type: "complaint",
        category: "pending",
        description,
        timestamp: new Date().toISOString(),
        coords,
      };

      await fetch(`${URL}/api/emergency`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setShowForm(false);
      setShowNotification("complaint");
      setTimeout(() => setShowNotification(null), 4000);
    } catch (error) {
      console.error("Failed to submit complaint:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-red-50 via-white to-pink-100 relative overflow-hidden">
      {/* Background visual blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="z-10 text-center mb-8 w-full px-6 bg-gradient-to-br from-red-600 to-pink-400 p-6 rounded-b-xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-white drop-shadow mb-3">Emergency Help</h1>
        <p className="text-lg text-white max-w-xl mx-auto">
          If you're in danger or witness an emergency, press the SOS button
          below. For other concerns, submit a complaint form.
        </p>
        <div className="mt-4 flex justify-center gap-6 dark:text-black">
          <a href="#" className="text-white hover:text-yellow-300 text-lg">Help Center</a>
          <a href="#" className="text-white hover:text-yellow-300 text-lg">Contact Us</a>
          <a href="#" className="text-white hover:text-yellow-300 text-lg">FAQs</a>
        </div>
      </header>

      {/* SOS Button */}
      <div className="z-10 flex flex-col items-center mb-12 mt-12">
        <button
          onClick={handleSOS}
          className="bg-red-600 hover:bg-red-700 text-white text-5xl font-bold px-16 py-10 rounded-full shadow-2xl transition duration-300"
        >
          🚨 SOS
        </button>
        <p className="mt-6 text-gray-600">This will immediately alert the authorities.</p>
      </div>

      {/* Complaint Button */}
      <div className="z-10 mb-12">
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-gray-800 text-white text-lg rounded shadow hover:bg-gray-700 transition"
        >
          📝 File a Complaint
        </button>
      </div>

      {/* Footer */}
      <div className="z-10 mt-auto mb-12 max-w-3xl text-center text-gray-500">
        <p>
          Your safety is our priority. All emergency reports are treated with
          the highest urgency. Please use the SOS button only in real emergency
          situations.
        </p>
      </div>

      {/* Complaint Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-20 px-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative transition-all duration-300 transform scale-100">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Submit a Complaint
            </h2>
            <form onSubmit={handleComplainSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-300"
              />
              <input
                type="text"
                name="roll"
                placeholder="Roll Number"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-300"
              />
              <select
                name="gender"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <option value="" disabled selected hidden>Select your Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <textarea
                name="description"
                placeholder="Describe your issue..."
                rows="4"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-300"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Notifications */}
      {showNotification === "complaint" && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-30 transition-opacity duration-300 animate-fade-in">
          ✅ Your complaint has been filed successfully.
        </div>
      )}

      {showNotification === "sos" && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-30 transition-opacity duration-300 animate-fade-in">
          🚨 SOS Alert has been sent successfully!
        </div>
      )}

      {/* Fade-in Animation */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
