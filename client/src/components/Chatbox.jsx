import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const chatbotContext = `
You are an AI chatbot assistant for an LMS portal called "Campus 360".
You should answer based ONLY on the services provided by the platform:
- Bus service
- Learning Management System (LMS)
- SOS system
- Information about college
- Library management
- Hostel management
- Mentorship
- Group discussion
- Campus Connect
- Content Hub
- Lost & Found
- College information
- Student life
- Alumni
- Events
- Clubs
- Sports
- Culture
- Placement
- Job opportunities
- Internships
- Scholarships
- Research
- Competitions

If the user asks anything outside these services, kindly tell them: 
"I'm here to help only with the services offered by Campus 360."
`;

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyBuSucZM1_VwXjwtHuprmeq5kB5qWx-qOM"
  ); // Unsafe to keep on frontend

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setUserMessage("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "chat-bison-001" });

      const prompt = `${chatbotContext}\n\nUser: ${userMessage}\nBot:`;

      console.log("Sending prompt:", prompt); // Debug

      const result = await model.generateContent(prompt);
      console.log("Raw result:", result); // Debug

      const response = await result.response;
      const botReply = await response.text();

      console.log("Bot reply:", botReply); // Debug

      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error("Gemini Error:", err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Error responding. Try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white border rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">
        Campus 360 Chatbot
      </h2>

      <div className="h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } mb-3`}
          >
            <div
              className={`px-4 py-2 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && <p className="text-sm text-gray-500">Typing...</p>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow border rounded-full px-4 py-2"
          placeholder="Ask about Campus 360..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
