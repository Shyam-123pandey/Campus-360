import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaUser,
  FaBook,
  FaGraduationCap,
  FaBuilding,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const LibrarySearch = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filter, setFilter] = useState("all"); // all, available, issued
  const [selectedRack, setSelectedRack] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [books, setBooks] = useState([]);

  // Define branches and programs
  const branches = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
    "Electrical",
    "Information Technology",
    "Chemical",
    "Aerospace",
    "Biotechnology",
    "Architecture",
  ];

  const programs = [
    "B.Tech",
    "M.Tech",
    "MCA",
    "MBA",
    "BBA",
    "B.Arch",
    "M.Arch",
    "Ph.D",
    "B.Sc",
    "M.Sc",
  ];

  useEffect(() => {
    // Mock data with books across different racks, branches, and programs
    const mockBooks = [
      {
        id: 1,
        title: "Data Structures and Algorithms",
        author: "Yashwant Kanetkar",
        isbn: "978-1234567890",
        section: "Computer Science",
        branch: "Computer Science",
        program: "B.Tech",
        rackNumber: 1,
        rackLevel: "Upper",
        rackSide: "Right",
        status: "available",
        dueDate: null,
        borrower: null,
        coverImage: `/img/dsa.jpg`,
      },
      {
        id: 2,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        isbn: "978-0262033848",
        section: "Computer Science",
        branch: "Computer Science",
        program: "M.Tech",
        rackNumber: 1,
        rackLevel: "Middle",
        rackSide: "Left",
        status: "issued",
        dueDate: "2024-04-15",
        borrower: "John Doe",
        coverImage: "/img/algo.jpg",
      },
      {
        id: 3,
        title: "Digital Electronics",
        author: "Morris Mano",
        isbn: "978-0132774208",
        section: "Electronics",
        branch: "Electronics",
        program: "B.Tech",
        rackNumber: 2,
        rackLevel: "Upper",
        rackSide: "Right",
        status: "available",
        dueDate: null,
        borrower: null,
        coverImage: "/img/digital.jpg",
      },
      {
        id: 4,
        title: "Thermodynamics",
        author: "Yunus A. Cengel",
        isbn: "978-0073398174",
        section: "Mechanical",
        branch: "Mechanical",
        program: "B.Tech",
        rackNumber: 3,
        rackLevel: "Lower",
        rackSide: "Left",
        status: "issued",
        dueDate: "2024-04-20",
        borrower: "Jane Smith",
        coverImage: "/img/not-found.jpg",
      },
      {
        id: 5,
        title: "Structural Analysis",
        author: "R.C. Hibbeler",
        isbn: "978-0134610672",
        section: "Civil",
        branch: "Civil",
        program: "B.Tech",
        rackNumber: 4,
        rackLevel: "Upper",
        rackSide: "Right",
        status: "available",
        dueDate: null,
        borrower: null,
        coverImage: "/img/stru.jpg",
      },
      {
        id: 6,
        title: "Power Systems",
        author: "John J. Grainger",
        isbn: "978-0070612938",
        section: "Electrical",
        branch: "Electrical",
        program: "M.Tech",
        rackNumber: 5,
        rackLevel: "Middle",
        rackSide: "Left",
        status: "available",
        dueDate: null,
        borrower: null,
        coverImage: "/img/not-found.jpg",
      },
      {
        id: 7,
        title: "Database Management Systems",
        author: "Raghu Ramakrishnan",
        isbn: "978-0072465631",
        section: "Information Technology",
        branch: "Information Technology",
        program: "MCA",
        rackNumber: 6,
        rackLevel: "Upper",
        rackSide: "Right",
        status: "issued",
        dueDate: "2024-04-25",
        borrower: "Mike Johnson",
        coverImage: "/img/not-found.jpg",
      },
      {
        id: 8,
        title: "Chemical Process Principles",
        author: "Felder and Rousseau",
        isbn: "978-0471687573",
        section: "Chemical",
        branch: "Chemical",
        program: "B.Tech",
        rackNumber: 7,
        rackLevel: "Lower",
        rackSide: "Left",
        status: "available",
        dueDate: null,
        borrower: null,
        coverImage: "/img/not-found.jpg",
      },
      {
        id: 9,
        title: "Aerospace Engineering",
        author: "John D. Anderson",
        isbn: "978-0073398105",
        section: "Aerospace",
        branch: "Aerospace",
        program: "M.Tech",
        rackNumber: 8,
        rackLevel: "Middle",
        rackSide: "Right",
        status: "available",
        dueDate: null,
        borrower: null,
        coverImage: "/img/not-found.jpg",
      },
      {
        id: 10,
        title: "Biotechnology Fundamentals",
        author: "Firdos Alam Khan",
        isbn: "978-1439840094",
        section: "Biotechnology",
        branch: "Biotechnology",
        program: "B.Tech",
        rackNumber: 9,
        rackLevel: "Upper",
        rackSide: "Left",
        status: "issued",
        dueDate: "2024-04-18",
        borrower: "Sarah Wilson",
        coverImage: "/img/not-found.jpg",
      },
    ];

    setBooks(mockBooks);
  }, [searchQuery]);

  const filteredBooks = books.filter((book) => {
    const matchesFilter = filter === "all" || book.status === filter;
    const matchesRack =
      selectedRack === "all" || book.rackNumber === parseInt(selectedRack);
    const matchesBranch =
      selectedBranch === "all" || book.branch === selectedBranch;
    const matchesProgram =
      selectedProgram === "all" || book.program === selectedProgram;
    return matchesFilter && matchesRack && matchesBranch && matchesProgram;
  });

  const serachBooks = filteredBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();

    toast.success("Search successful");
  };

  const rackNumbers = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Library Catalog
          </h1>
          <p className="text-gray-800">
            Search and browse our extensive collection of books
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, subject, or ISBN..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 shadow-sm text-gray-900 placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              <FaSearch className="w-6 h-6" />
            </button>
          </form>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              All Books
            </button>
            <button
              onClick={() => setFilter("available")}
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                filter === "available"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setFilter("issued")}
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                filter === "issued"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              Issued
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={selectedRack}
              onChange={(e) => setSelectedRack(e.target.value)}
              className="px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-white text-gray-900 font-medium"
            >
              <option value="all" className="text-gray-900">
                All Racks
              </option>
              {rackNumbers.map((rack) => (
                <option key={rack} value={rack} className="text-gray-900">
                  Rack {rack}
                </option>
              ))}
            </select>

            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-white text-gray-900 font-medium"
            >
              <option value="all" className="text-gray-900">
                All Branches
              </option>
              {branches.map((branch) => (
                <option key={branch} value={branch} className="text-gray-900">
                  {branch}
                </option>
              ))}
            </select>

            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-white text-gray-900 font-medium"
            >
              <option value="all" className="text-gray-900">
                All Programs
              </option>
              {programs.map((program) => (
                <option key={program} value={program} className="text-gray-900">
                  {program}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-gray-800 mb-2">by {book.author}</p>
                      <p className="text-sm text-gray-700 mb-4">
                        ISBN: {book.isbn}
                      </p>
                    </div>
                    <div className="shrink-1">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          book.status === "available"
                            ? "bg-green-100 text-green-900"
                            : "bg-yellow-100 text-yellow-900"
                        }`}
                      >
                        {book.status === "available" ? "Available" : "Issued"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex-1 relative">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-48 h-64 object-cover rounded-lg shadow-md"
                      />
                      <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 text-xs rounded-bl-lg">
                        Rack {book.rackNumber}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="flex items-center text-gray-800">
                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                        <span className="text-sm text-gray-900">
                          {book.section}, {book.rackLevel} Shelf,{" "}
                          {book.rackSide} Side
                        </span>
                      </div>

                      <div className="flex items-center text-gray-800">
                        <FaBuilding className="mr-2 text-blue-500" />
                        <span className="text-sm text-gray-900">
                          Branch: {book.branch}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-800">
                        <FaGraduationCap className="mr-2 text-blue-500" />
                        <span className="text-sm text-gray-900">
                          Program: {book.program}
                        </span>
                      </div>

                      {book.status === "issued" && (
                        <>
                          <div className="flex items-center text-gray-800">
                            <FaCalendarAlt className="mr-2 text-blue-500" />
                            <span className="text-sm text-gray-900">
                              Due: {book.dueDate}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {serachBooks.length === 0 && (
          <div className="text-center py-12">
            <FaBook className="mx-auto text-gray-500 text-5xl mb-4" />
            <p className="text-gray-800 text-lg">
              No books found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibrarySearch;

// Avalaible

{
  /* <div className="flex items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            book.status === 'available'
                              ? 'bg-green-100 text-green-900'
                              : 'bg-yellow-100 text-yellow-900'
                          }`}
                        >
                          {book.status === 'available' ? 'Available' : 'Issued'}
                        </span>
                      </div> */
}

//

{
  /* <div className="space-y-2">
                      <div className="flex items-center text-gray-800">
                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                        <span className="text-sm text-gray-900">
                          {book.section}, {book.rackLevel} Shelf, {book.rackSide} Side
                        </span>
                      </div>

                      <div className="flex items-center text-gray-800">
                        <FaBuilding className="mr-2 text-blue-500" />
                        <span className="text-sm text-gray-900">
                          Branch: {book.branch}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-800">
                        <FaGraduationCap className="mr-2 text-blue-500" />
                        <span className="text-sm text-gray-900">
                          Program: {book.program}
                        </span>
                      </div>

                      {book.status === 'issued' && (
                        <>
                          <div className="flex items-center text-gray-800">
                            <FaCalendarAlt className="mr-2 text-blue-500" />
                            <span className="text-sm text-gray-900">Due: {book.dueDate}</span>
                          </div>
                          
                        </>
                      )}
                    </div> */
}
//

{
  /* <div className="relative">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-24 h-32 object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 text-xs rounded-bl-lg">
                      Rack {book.rackNumber}
                    </div>
                  </div> */
}

//

{
  /* <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-800 mb-2">by {book.author}</p>
                    <p className="text-sm text-gray-700 mb-4">ISBN: {book.isbn}</p>

                    
                  </div> */
}
