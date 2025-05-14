import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SearchFilter from '@/components/lost-found/SearchFilter';
import ItemCard from '@/components/lost-found/ItemCard';
import ItemDetail from '@/components/lost-found/ItemDetail';
import toast from 'react-hot-toast';
import axios from 'axios';

const URL = "https://campus-360-server.onrender.com"
// const URL = "http://localhost:8080"


const FoundItems = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${URL}/api/found-items`);
      setItems(response.data);
      setFilteredItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching found items:', error);
      toast.error('Failed to fetch found items');
      setItems([]);
      setFilteredItems([]);
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!Array.isArray(items)) return;
    
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleFilter = (filters) => {
    if (!Array.isArray(items)) return;
    
    let filtered = [...items];

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(item => item.category === filters.category);
    }
    if (filters.location && filters.location !== 'all') {
      filtered = filtered.filter(item => item.location === filters.location);
    }
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(item => item.status === filters.status);
    }
    if (filters.date && filters.date !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

      filtered = filtered.filter(item => {
        const itemDate = new Date(item.createdAt);
        switch (filters.date) {
          case 'today':
            return itemDate >= today;
          case 'week':
            return itemDate >= weekAgo;
          case 'month':
            return itemDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    setFilteredItems(filtered);
  };

  const handleReset = () => {
    if (!Array.isArray(items)) return;
    setFilteredItems([...items]);
  };

  const handleClaim = async (itemId) => {
    try {
      await axios.post(`${URL}/api/found-items/${itemId}/claim`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Item claimed successfully');
      fetchItems(); // Refresh the list
    } catch (error) {
      console.error('Error claiming item:', error);
      toast.error(error.response?.data?.message || 'Failed to claim item');
    }
  };

  const handleContact = (finder) => {
    // Implement contact functionality (e.g., open chat or email)
    console.log('Contact finder:', finder);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Found Items</h1>
        <Button onClick={() => navigate('/found-items/report')}>
          <Plus className="w-4 h-4 mr-2" />
          Report Found Item
        </Button>
      </div>

      <SearchFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        onReset={handleReset}
      />

      {selectedItem ? (
        <div className="mt-8">
          <Button
            variant="outline"
            onClick={() => setSelectedItem(null)}
            className="mb-4"
          >
            Back to List
          </Button>
          <ItemDetail
            item={selectedItem}
            onClaim={handleClaim}
            onContact={handleContact}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {Array.isArray(filteredItems) && filteredItems.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer"
            >
              <ItemCard item={item} type="found" />
            </div>
          ))}
        </div>
      )}

      {!loading && (!Array.isArray(filteredItems) || filteredItems.length === 0) && (
        <div className="text-center mt-8 text-gray-500">
          No items found matching your criteria
        </div>
      )}
    </div>
  );
};

export default FoundItems; 