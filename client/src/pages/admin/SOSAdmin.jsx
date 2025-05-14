import { useEffect, useState } from "react";

const URL = "https://campus-360-6.onrender.com"
// const URL = "http://localhost:8080"


export default function Admin() {
 

  const [complaints, setComplaints] = useState([
    {
      id: 1,
      name: "John Doe",
      roll: "CS2023001",
      gender: "Male",
      type: "sos",
      category: "pending",
      description: "Medical emergency in Block A",
      timestamp: "2024-03-15T10:30:00",
      coords: {
        latitude: 28.6139,
        longitude: 77.209,
        accuracy: 10,
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      roll: "CS2023002",
      gender: "Female",
      type: "complaint",
      category: "in_progress",
      description: "Water leakage in hostel room",
      timestamp: "2024-03-15T09:15:00",
      coords: {
        latitude: 28.614,
        longitude: 77.2091,
        accuracy: 15,
      },
    },
    {
      id: 3,
      name: "Mike Johnson",
      roll: "CS2023003",
      gender: "Male",
      type: "sos",
      category: "resolved",
      description: "Fire alarm triggered in Library",
      timestamp: "2024-03-14T15:45:00",
      coords: {
        latitude: 28.6138,
        longitude: 77.2089,
        accuracy: 8,
      },
    },
    {
      id: 4,
      name: "Sarah Wilson",
      roll: "CS2023004",
      gender: "Female",
      type: "complaint",
      category: "pending",
      description: "Power outage in Computer Lab",
      timestamp: "2024-03-15T11:20:00",
      coords: {
        latitude: 28.6141,
        longitude: 77.2092,
        accuracy: 12,
      },
    },
  ]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${URL}/api/emergency`)
      .then((res) => res.json())
      .then((data) => {
        data=data.data;
        console.log("1");
        console.log(data);
        
        data.forEach(d=>{
          d.coords.latitude = parseFloat(d.coords.latitude);
          d.coords.longitude = parseFloat(d.coords.longitude);
          d.coords.accuracy = parseFloat(d.coords.accuracy);
        });

        console.log("2");

      setComplaints(data);
      }).catch(err=>{
        console.log("Bhai tere se na hopyega!!!");
        console.log(err);
      });
  }, []);

  /* 
  async function () {
      const res = await fetch("http://localhost:8080/api/emergency");
      const {data} = await res.json();

      data.coords.latitude = parseFloat(data.coords.latitude);
      data.coords.longitude = parseFloat(data.coords.longitude);
      data.coords.accuracy = parseFloat(data.coords.accuracy);

      setComplaints(data);
    }
  */

  const handleCategoryAdvance = (id) => {
    setComplaints((prev) =>
      prev.map((comp) => {
        if (comp.id !== id) return comp;

        let nextCategory =
          comp.category === "pending"
            ? "in_progress"
            : comp.category === "in_progress"
            ? "resolved"
            : "resolved";

        return { ...comp, category: nextCategory };
      })
    );
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case "pending":
        return (
          <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
            Pending
          </span>
        );
      case "in_progress":
        return (
          <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
            In Progress
          </span>
        );
      case "resolved":
        return (
          <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const filteredComplaints = complaints.filter((comp) => {
    const categoryMatch =
      categoryFilter === "all" || comp.category === categoryFilter;
    const typeMatch = typeFilter === "all" || comp.type === typeFilter;
    const searchMatch =
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && typeMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-center text-red-600 mb-2">
            Emergency & Complaint Management
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Monitor and manage emergency SOS alerts and student complaints
          </p>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search by name, roll number, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Categories</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Types</option>
              <option value="sos">Emergency (SOS)</option>
              <option value="complaint">Normal Complaint</option>
            </select>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <h3 className="text-lg font-semibold text-red-600">
                Total Cases
              </h3>
              <p className="text-2xl font-bold dark:text-black">{complaints.length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <h3 className="text-lg font-semibold text-yellow-600">Pending</h3>
              <p className="text-2xl font-bold dark:text-black">
                {complaints.filter((c) => c.category === "pending").length}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-600 ">
                In Progress
              </h3>
              <p className="text-2xl font-bold dark:text-black">
                {complaints.filter((c) => c.category === "in_progress").length}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="text-lg font-semibold text-green-600">Resolved</h3>
              <p className="text-2xl font-bold dark:text-black">
                {complaints.filter((c) => c.category === "resolved").length}
              </p>
            </div>
          </div>

          {/* Loading Spinner */}
          {filteredComplaints.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No matching cases found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComplaints.map((c) => (
                <div
                  key={c.id}
                  className={`relative p-6 rounded-xl shadow-lg border-l-4 transition-all duration-300 hover:shadow-xl ${
                    c.type === "sos"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {/* Emergency Tag */}
                  <div className="absolute top-4 right-4">
                    {c.type === "sos" ? (
                      <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                        EMERGENCY
                      </span>
                    ) : (
                      <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                        Complaint
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {c.name}
                    </h2>
                    <p className="text-sm text-gray-600">🎓 Roll: {c.roll}</p>
                    <p className="text-sm text-gray-600">
                      👤 Gender: {c.gender}
                    </p>
                    <p className="text-sm text-gray-600">📝 {c.description}</p>
                    <p className="text-sm text-gray-500">
                      🕒 {formatTimestamp(c.timestamp)}
                    </p>
                    <p className="text-sm text-gray-600">
                      📍 Location: {c.coords.latitude.toFixed(4)},{" "}
                      {c.coords.longitude.toFixed(4)}
                    </p>
                    <p className="text-sm text-gray-600">
                      📡 Accuracy: {c.coords.accuracy}m
                    </p>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                      {getCategoryBadge(c.category)}
                      {c.category !== "resolved" && (
                        <button
                          onClick={() => handleCategoryAdvance(c.id)}
                          className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                        >
                          Advance to{" "}
                          {c.category === "pending"
                            ? "In Progress"
                            : "Resolved"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
