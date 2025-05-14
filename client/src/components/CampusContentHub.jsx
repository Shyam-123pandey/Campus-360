import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTheme } from './ThemeProvider';

const CampusContentHub = () => {
  const { theme } = useTheme();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [showContent, setShowContent] = useState(false);

  // Programs and their branches
  const programs = {
    'PhD': ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Mathematics', 'Physics', 'Chemistry'],
    'M.Tech': ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Information Technology'],
    'B.Tech': ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Information Technology'],
    'M.Sc': ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
    'B.Sc': ['Mathematics', 'Physics', 'Chemistry', 'Computer Science']
  };

  // Sample content for testing
  const sampleContent = [
    {
      id: 1,
      title: 'Data Structures Notes',
      description: 'Comprehensive notes on data structures and algorithms',
      program: 'B.Tech',
      branch: 'Computer Science',
      fileUrl: '#',
      uploadDate: '2024-03-15',
      uploader: 'John Doe'
    },
    {
      id: 2,
      title: 'Digital Electronics Lab Manual',
      description: 'Complete lab manual for digital electronics course',
      program: 'M.Tech',
      branch: 'Electronics',
      fileUrl: '#',
      uploadDate: '2024-03-14',
      uploader: 'Jane Smith'
    }
  ];

  useEffect(() => {
    // Simulate content loading
    const fetchContent = async () => {
      try {
        setLoading(true);
        // Uncomment when backend is ready
        // const response = await axios.get('/api/content');
        // setContent(response.data);
        
        setContent(sampleContent);
        setError(null);
      } catch (err) {
        setError('Failed to fetch content. Please try again later.');
        toast.error('Failed to fetch content');
        setContent(sampleContent);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleProgramSelect = (program) => {
    setSelectedProgram(program);
    setSelectedBranch('');
    setShowContent(false);
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setShowContent(true);
  };

  const handleDownload = async (item) => {
    try {
      // For now, we'll simulate a download
      // When backend is ready, uncomment this:
      // const response = await axios.get(`/api/content/download/${item.id}`, {
      //   responseType: 'blob'
      // });
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = item.fileUrl;
      link.download = item.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Download started!');
    } catch (error) {
      toast.error('Failed to download file');
      console.error('Download error:', error);
    }
  };

  const handleUpload = async (e) => {
    if (!selectedProgram || !selectedBranch) {
      toast.error('Please select both program and branch before uploading');
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];

    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid file (PDF, DOC, DOCX, PPT, PPTX)');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('program', selectedProgram);
    formData.append('branch', selectedBranch);
    formData.append('title', file.name);
    formData.append('description', 'Newly uploaded content');

    try {
      // Uncomment when backend is ready
      // const response = await axios.post('/api/content/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      
      // Create a temporary URL for the file
      const fileUrl = URL.createObjectURL(file);
      
      // Simulate successful upload
      const newContent = {
        id: Date.now(),
        title: file.name,
        description: 'Newly uploaded content',
        program: selectedProgram,
        branch: selectedBranch,
        fileUrl: fileUrl,
        uploadDate: new Date().toISOString().split('T')[0],
        uploader: 'Current User',
        fileType: file.type
      };
      
      setContent(prev => [...prev, newContent]);
      toast.success('Content uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload content');
    } finally {
      setUploading(false);
    }
  };

  const filteredContent = Array.isArray(content) ? content.filter(item => {
    const matchesProgram = selectedProgram === '' || item.program === selectedProgram;
    const matchesBranch = selectedBranch === '' || item.branch === selectedBranch;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProgram && matchesBranch && matchesSearch;
  }) : [];

  if (error) {
    return (
      <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={`mt-4 px-4 py-2 rounded ${
              theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Campus Content Hub</h1>

        {/* Program and Branch Selection */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 mb-4">
            {Object.keys(programs).map((program) => (
              <button
                key={program}
                onClick={() => handleProgramSelect(program)}
                className={`px-4 py-2 rounded-lg ${
                  selectedProgram === program
                    ? theme === 'dark'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } transition-colors duration-200`}
              >
                {program}
              </button>
            ))}
          </div>

          {selectedProgram && (
            <div className="flex flex-wrap gap-4">
              {programs[selectedProgram].map((branch) => (
                <button
                  key={branch}
                  onClick={() => handleBranchSelect(branch)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedBranch === branch
                      ? theme === 'dark'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-500 text-white'
                      : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } transition-colors duration-200`}
                >
                  {branch}
                </button>
              ))}
            </div>
          )}
        </div>

        {showContent && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`px-4 py-2 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <label
                  className={`px-4 py-2 rounded-lg cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-colors duration-200`}
                >
                  {uploading ? 'Uploading...' : 'Upload Content'}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleUpload}
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                  />
                </label>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4">Loading content...</p>
              </div>
            ) : filteredContent.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg">No content found. Try a different search or upload new content.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-lg overflow-hidden shadow-lg ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className={`mb-4 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {item.program} - {item.branch}
                          </span>
                          <p className={`text-xs ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            Uploaded by {item.uploader} on {item.uploadDate}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDownload(item)}
                          className={`px-3 py-1 rounded flex items-center gap-2 ${
                            theme === 'dark'
                              ? 'bg-blue-600 hover:bg-blue-700'
                              : 'bg-blue-500 hover:bg-blue-600'
                          } text-white transition-colors duration-200`}
                        >
                          <Download size={16} />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CampusContentHub; 