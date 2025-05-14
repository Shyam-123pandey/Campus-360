
const Feedback = () => {
   return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
      <form className="flex flex-col gap-3">
        <input type="text" placeholder="Your Name" className="p-2 border rounded" />
        <textarea placeholder="Your feedback" className="p-2 border rounded"></textarea>
        <button type="submit" className="bg-green-600 text-white py-2 rounded">Submit</button>
      </form>
    </div>
  );
}

export default Feedback