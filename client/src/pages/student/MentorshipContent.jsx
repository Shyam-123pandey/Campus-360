import { useState, useEffect } from 'react';
import { useTheme } from '../../components/ThemeProvider';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const URL = "https://campus-360-server.onrender.com"
// const URL = "http://localhost:8080"


const MentorshipContent = () => {
  const { theme } = useTheme();
  const [mentorships, setMentorships] = useState([]);
  const [filters, setFilters] = useState({
    program: '',
    branch: ''
  });
  const [loading, setLoading] = useState(true);

  const programs = [
    'B.Sc Nursing',
    'MBBS',
    'BDS',
    'B.Pharm',
    'BPT',
    'B.Tech',
    'M.Tech',
    'M.Sc',
    'PhD'
  ];

  const branches = {
    'B.Sc Nursing': ['Anatomy', 'Physiology', 'Pharmacology', 'Medical-Surgical Nursing'],
    'MBBS': ['Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology', 'Medicine', 'Surgery', 'Pediatrics'],
    'BDS': ['Oral Anatomy', 'Dental Materials', 'Oral Pathology', 'Periodontics'],
    'B.Pharm': ['Pharmaceutical Chemistry', 'Pharmacology', 'Pharmaceutics', 'Pharmacognosy'],
    'BPT': ['Anatomy', 'Physiology', 'Biomechanics', 'Exercise Therapy'],
    'B.Tech': ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Electronics', 'Information Technology'],
    'M.Tech': ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Electronics', 'Information Technology'],
    'M.Sc': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Environmental Science'],
    'PhD': ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Electronics', 'Physics', 'Chemistry', 'Mathematics', 'Biology']
  };

  useEffect(() => {
    fetchMentorships();
  }, [filters]);

  const fetchMentorships = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/api/mentorship`, {
        params: filters,
        withCredentials: true
      });
      setMentorships(response.data.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch mentorship content');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const inputClasses = `mt-1 block w-full rounded-md ${
    theme === 'dark' 
      ? 'bg-gray-700 border-gray-600 text-white focus:border-indigo-400 focus:ring-indigo-400' 
      : 'border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
  } shadow-sm`;

  const labelClasses = `block text-sm font-medium ${
    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
  }`;

  return (
    <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-2xl font-bold mb-6">Mentorship Content</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClasses}>Filter by Program</label>
          <select
            name="program"
            value={filters.program}
            onChange={handleFilterChange}
            className={inputClasses}
          >
            <option value="">All Programs</option>
            {programs.map(program => (
              <option key={program} value={program}>{program}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClasses}>Filter by Branch</label>
          <select
            name="branch"
            value={filters.branch}
            onChange={handleFilterChange}
            className={inputClasses}
            disabled={!filters.program}
          >
            <option value="">All Branches</option>
            {filters.program && branches[filters.program]?.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentorships.map(mentorship => (
            <div
              key={mentorship._id}
              className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">{mentorship.title || `${mentorship.program} - ${mentorship.branch}`}</h3>
              {mentorship.description && (
                <p className="text-sm mb-4">{mentorship.description}</p>
              )}
              {mentorship.type === 'blog' ? (
                <a
                  href={mentorship.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  View Content
                </a>
              ) : (
                <a
                  href={mentorship.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Download File
                </a>
              )}
              <p className="text-xs mt-2 text-gray-500">
                {new Date(mentorship.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorshipContent; 