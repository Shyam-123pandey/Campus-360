import { MessageCircle } from "lucide-react";  
import { useState } from "react";
import Chatbox from "./Chatbox";
import { Link } from "react-router-dom";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Icon Floating */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
        title="Chat with Campus 360"
      >
        <Link to="https://cdn.botpress.cloud/webchat/v2.4/shareable.html?configUrl=https://files.bpcontent.cloud/2025/05/13/06/20250513065343-T9BNRK03.json" target="_blank">
        <MessageCircle size={24} />
        </Link>
      </button>

      {/* Chat Drawer */}
      {/* {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-85 max-h-[90vh] bg-white shadow-lg border rounded-xl overflow-hidden">
          <div className="flex justify-between items-center p-2 bg-blue-600 text-white">
            <h3 className="font-bold">C Chat</h3>
            <button onClick={toggleChatbot} className="text-white font-bold">×</button>
          </div>
          <div className="p-2 overflow-y-auto max-h-[calc(80vh-48px)]">
            <Chatbox/>
          </div>
        </div>
      )} */}
    </>
  );
};

export default ChatbotWidget;
