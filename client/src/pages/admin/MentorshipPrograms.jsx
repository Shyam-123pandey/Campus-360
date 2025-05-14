import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useTheme } from '../../components/ThemeProvider';

const URL = "https://campus-360-6.onrender.com"
// const URL = "http://localhost:8080"


const MentorshipPrograms = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [step, setStep] = useState(1);
  const [showInstructions, setShowInstructions] = useState(false);
  const [formData, setFormData] = useState({
    program: '',
    branch: '',
    contentType: '',
    contentLink: '',
    file: null,
    title: '',
    description: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
      
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid PDF, DOC, or PPT file');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('program', formData.program);
      formDataToSend.append('branch', formData.branch);
      formDataToSend.append('contentType', formData.contentType);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      
      if (formData.contentType === 'link') {
        formDataToSend.append('contentLink', formData.contentLink);
      } else if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      await axios.post(`${URL}/api/mentorship/create`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      toast.success('Content uploaded successfully!');
      navigate('/mentorship-content');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigate('/admin/dashboard');
    } else {
      setStep(1);
    }
  };

  const handleContentHubClick = () => {
    setShowInstructions(true);
  };

  const handleProceedToContentHub = () => {
    setFormData(prev => ({ ...prev, contentType: 'link' }));
    window.open('https://www.blogger.com/blog/posts/613115142332096413', '_blank');
    setShowInstructions(false);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create Mentorship Content</h1>
        <button
          onClick={handleBack}
          className={`px-4 py-2 rounded-md ${
            theme === 'dark' 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {step === 1 ? 'Back to Dashboard' : 'Back'}
        </button>
      </div>
      
      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg max-w-md w-full mx-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className="text-xl font-bold mb-4">ContentHub Instructions</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">1</span>
                <p>Click Proceed to open ContentHub in a new tab</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">2</span>
                <p>Create your content in the editor</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">3</span>
                <p>Publish your content</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">4</span>
                <p>Copy the published content link</p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">5</span>
                <p>Return here and paste the link in the input field</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowInstructions(false)}
                className={`px-4 py-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToContentHub}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>Select Program</label>
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="">Select a program</option>
                {programs.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>

            {formData.program && (
              <div>
                <label className={labelClasses}>Select Branch</label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                >
                  <option value="">Select a branch</option>
                  {branches[formData.program]?.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
            )}

            {formData.program && formData.branch && (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Next
              </button>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleContentHubClick}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Create Content on ContentHub
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, contentType: 'file' }))}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Upload PDF/Docs
              </button>
            </div>

            {formData.contentType === 'link' && (
              <div>
                <label className={labelClasses}>ContentHub Link</label>
                <input
                  type="url"
                  name="contentLink"
                  value={formData.contentLink}
                  onChange={handleChange}
                  placeholder="Paste your ContentHub link here"
                  className={inputClasses}
                  required
                />
              </div>
            )}

            {formData.contentType === 'file' && (
              <div>
                <label className={labelClasses}>Upload File</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  className={`mt-1 block w-full ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                  required
                />
                <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Accepted formats: PDF, DOC, DOCX, PPT, PPTX
                </p>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MentorshipPrograms; 