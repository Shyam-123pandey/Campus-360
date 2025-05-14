import { useState } from "react";

const Register = () => {
  const [nationality, setNationality] = useState("India");
   const [location, setLocation] = useState("");
   const [country, setCountry] = useState("");
 
   return (
     <div className="p-8">
       <h2 className="text-2xl font-semibold mb-4">Register</h2>
       <form className="flex flex-col gap-3">
         <input type="text" placeholder="Name" className="p-2 border rounded" />
         <input type="email" placeholder="Email" className="p-2 border rounded" />
         <select onChange={(e) => setNationality(e.target.value)} className="p-2 border rounded">
           <option value="India">India</option>
           <option value="Other">Other (Foreign)</option>
         </select>
 
         {nationality === "India" ? (
           <input
             type="text"
             placeholder="Enter your State"
             className="p-2 border rounded"
             onChange={(e) => setLocation(e.target.value)}
           />
         ) : (
           <input
             type="text"
             placeholder="Enter your Country"
             className="p-2 border rounded"
             onChange={(e) => setCountry(e.target.value)}
           />
         )}
 
         <select className="p-2 border rounded">
           <option>Newcomer</option>
           <option>Helper (Senior/Security/Faculty)</option>
         </select>
         <button type="submit" className="bg-blue-600 text-white py-2 rounded">Submit</button>
       </form>
     </div>
   );
}

export default Register