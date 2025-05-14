import React, { useState } from 'react';
import { FaPaperPlane, FaUser } from 'react-icons/fa';

const CampusConnectChat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'helper',
      message: 'Hello! How can I help you today?',
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString()
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const newMessage = {
      id: chatHistory.length + 1,
      sender: 'user',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory([...chatHistory, newMessage]);
    setMessage('');

    // Simulate helper response
    setTimeout(() => {
      const helperResponse = {
        id: chatHistory.length + 2,
        sender: 'helper',
        message: 'Thank you for your message. I will get back to you shortly.',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatHistory(prev => [...prev, helperResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-blue-600 dark:bg-blue-700 px-6 py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-200 flex items-center justify-center">
                <FaUser className="text-blue-600 dark:text-blue-700" />
              </div>
              <div className="ml-4">
                <h2 className="text-white text-lg font-semibold">CampusConnect Support</h2>
                <p className="text-blue-100 dark:text-blue-200 text-sm">Online</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="border-t dark:border-gray-700 p-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FaPaperPlane />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampusConnectChat; 