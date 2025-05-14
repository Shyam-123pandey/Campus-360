
const Chat = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Live Chat (Simulated)</h2>
      <div className="border rounded p-4 h-64 overflow-y-scroll bg-gray-100">Chat window here</div>
      <input className="w-full p-2 mt-4 border rounded" placeholder="Type a message..." />
    </div>
  );
}

export default Chat