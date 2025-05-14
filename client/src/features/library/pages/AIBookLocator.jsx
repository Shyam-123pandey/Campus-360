/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { FaMicrophone, FaPaperPlane, FaRobot, FaSpinner, FaUser } from 'react-icons/fa';

const AIBookLocator = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I can help you find any book in the library. Just ask me where to find a book, and I\'ll tell you its exact location.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input on component mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    setMessages((prev) => [
      ...prev,
      { type: 'user', content: userMessage },
    ]);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = generateResponse(userMessage);
      
      setMessages((prev) => [...prev, { type: 'bot', content: response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponse = (query) => {
    const queryLower = query.toLowerCase();
    
    // Book database (mock data - replace with actual database)
    const bookDatabase = [
      {
        title: 'Data Structures and Algorithms',
        author: 'Yashwant Kanetkar',
        section: 'Computer Science',
        rackNumber: 3,
        rackLevel: 'Middle',
        rackSide: 'Right',
        status: 'available',
        keywords: ['data structure', 'algorithm', 'kanetkar', 'dsa', 'programming']
      },
      {
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        section: 'Computer Science',
        rackNumber: 3,
        rackLevel: 'Upper',
        rackSide: 'Left',
        status: 'issued',
        dueDate: '2024-04-15',
        keywords: ['algorithm', 'cormen', 'clrs', 'computer science']
      },
      {
        title: 'Database System Concepts',
        author: 'Abraham Silberschatz',
        section: 'Computer Science',
        rackNumber: 2,
        rackLevel: 'Middle',
        rackSide: 'Left',
        status: 'available',
        keywords: ['database', 'dbms', 'sql', 'silberschatz']
      },
      {
        title: 'Operating System Concepts',
        author: 'Abraham Silberschatz',
        section: 'Computer Science',
        rackNumber: 2,
        rackLevel: 'Lower',
        rackSide: 'Right',
        status: 'available',
        keywords: ['operating system', 'os', 'silberschatz']
      }
    ];

    // Check for greetings
    if (queryLower.includes('hello') || queryLower.includes('hi')) {
      return 'Hello! How can I help you find a book today?';
    }

    // Check for thanks
    if (queryLower.includes('thank')) {
      return 'You\'re welcome! Is there anything else you\'d like to know about our library?';
    }

    // Check for help
    if (queryLower.includes('help')) {
      return 'I can help you find books by title, author, or subject. Just ask me something like "Where can I find Data Structures by Kanetkar?" or "Do you have any books about algorithms?"';
    }

    // Search for books
    const foundBooks = bookDatabase.filter(book => {
      return book.keywords.some(keyword => queryLower.includes(keyword)) ||
             queryLower.includes(book.title.toLowerCase()) ||
             queryLower.includes(book.author.toLowerCase());
    });

    if (foundBooks.length > 0) {
      const book = foundBooks[0];
      let response = `${book.title} by ${book.author} is in the ${book.section} Section, Rack ${book.rackNumber}, ${book.rackLevel} Shelf, ${book.rackSide} Side. `;
      
      if (book.status === 'available') {
        response += 'It is currently available.';
      } else {
        response += `It is currently issued and due on ${book.dueDate}.`;
      }

      // Add suggestions for similar books
      const similarBooks = bookDatabase.filter(b => 
        b.section === book.section && 
        b.title !== book.title
      ).slice(0, 2);

      if (similarBooks.length > 0) {
        response += '\n\nSimilar books in this section:';
        similarBooks.forEach(b => {
          response += `\n• ${b.title} by ${b.author}`;
        });
      }

      return response;
    }

    // If no exact match, check for section-related queries
    const sections = {
      'computer science': ['cs', 'computer', 'programming', 'software', 'algorithm', 'data structure'],
      'literature': ['literature', 'novel', 'fiction', 'poetry', 'drama'],
      'science': ['science', 'physics', 'chemistry', 'biology'],
      'mathematics': ['math', 'mathematics', 'calculus', 'algebra', 'statistics']
    };

    for (const [section, keywords] of Object.entries(sections)) {
      if (keywords.some(keyword => queryLower.includes(keyword))) {
        return `I found some books in the ${section} section. Could you please be more specific about which book you're looking for? For example, you can ask about a specific title or author.`;
      }
    }

    // Default response with suggestions
    return "I'm sorry, I couldn't find that exact book in our library. Here are some tips to help you find what you're looking for:\n\n" +
           "1. Try searching by the book's title\n" +
           "2. Search by the author's name\n" +
           "3. Ask about a specific subject (e.g., 'Do you have any books about algorithms?')\n" +
           "4. Check if the book is in a specific section (e.g., 'What books do you have in Computer Science?')";
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Add speech recognition logic here
    if (!isListening) {
      // Start listening
      console.log('Started listening...');
    } else {
      // Stop listening
      console.log('Stopped listening...');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-blue-600 px-6 py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <FaRobot className="text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-white text-lg font-semibold">AI Book Locator</h2>
                <p className="text-blue-100 text-sm">Ask me to find any book</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    {msg.type === 'bot' ? (
                      <FaRobot className="mr-2" />
                    ) : (
                      <FaUser className="mr-2" />
                    )}
                    <span className="font-semibold">
                      {msg.type === 'bot' ? 'AI Assistant' : 'You'}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <FaSpinner className="animate-spin text-blue-600" />
                    <span className="text-gray-600">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={toggleListening}
                className={`p-3 rounded-full ${
                  isListening
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                <FaMicrophone />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me to find a book..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`p-3 rounded-full ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
                disabled={isLoading}
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

AIBookLocator.propTypes = {
  // Add any props if needed
};

export default AIBookLocator; 