import { useState } from "react";
const Directory = () => {
   const [regionType, setRegionType] = useState("India");
   const [selectedRegion, setSelectedRegion] = useState("");
 
   const helpers = [
     { name: "Amit", location: "Assam", role: "Senior", category: "Taxi", regionType: "India" },
     { name: "John", location: "USA", role: "Faculty", category: "Room", regionType: "Other" },
   ];
 
   const filteredHelpers = helpers.filter(helper =>
     regionType === "India"
       ? helper.regionType === "India" && helper.location.toLowerCase() === selectedRegion.toLowerCase()
       : helper.regionType === "Other" && helper.location.toLowerCase() === selectedRegion.toLowerCase()
   );
 
   return (
     <div className="p-8">
       <h2 className="text-2xl font-semibold mb-4">Trusted Helper Directory</h2>
 
       <div className="flex gap-3 mb-4">
         <select onChange={(e) => setRegionType(e.target.value)} className="p-2 border rounded">
           <option value="India">India</option>
           <option value="Other">Foreign</option>
         </select>
 
         <input
           type="text"
           placeholder={regionType === "India" ? "Enter State" : "Enter Country"}
           className="p-2 border rounded"
           onChange={(e) => setSelectedRegion(e.target.value)}
         />
       </div>
 
       <div className="grid gap-4">
         {filteredHelpers.map((h, i) => (
           <div key={i} className="border p-4 rounded shadow">
             <p><strong>Name:</strong> {h.name}</p>
             <p><strong>Location:</strong> {h.location}</p>
             <p><strong>Role:</strong> {h.role}</p>
             <p><strong>Helps With:</strong> {h.category}</p>
           </div>
         ))}
         {filteredHelpers.length === 0 && <p>No helpers found for selected region.</p>}
       </div>
     </div>
   );
}

export default Directory