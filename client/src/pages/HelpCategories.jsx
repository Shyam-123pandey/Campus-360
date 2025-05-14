
const HelpCategories = () => {
   const categories = ["Room", "Taxi", "Shopping", "Food", "Document", "SIM/Network", "Health", "Academic"];
   return (
     <div className="p-8">
       <h2 className="text-2xl font-semibold mb-4">Help Categories</h2>
       <ul className="list-disc list-inside">
         {categories.map((cat, i) => <li key={i}>{cat}</li>)}
       </ul>
     </div>
   );
}

export default HelpCategories