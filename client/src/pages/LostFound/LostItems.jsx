import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const URL = "https://campus-360-6.onrender.com"
// const URL = "http://localhost:8080"


const sampleItems = [
  {
    _id: '1',
    itemName: 'Laptop Bag',
    description: 'Black laptop bag with red trim, contains a laptop and some notebooks',
    category: 'electronics',
    location: 'block-a',
    dateLost: '2024-03-15',
    status: 'lost',
    image: '/img/digital.jpg',
    contactDetails: {
      email: 'john.doe@example.com',
      phone: '+1234567890'
    }
  },
  {
    _id: '2',
    itemName: 'Textbook - Data Structures',
    description: 'Introduction to Data Structures and Algorithms textbook, 3rd edition',
    category: 'books',
    location: 'library',
    dateLost: '2024-03-14',
    status: 'lost',
    image: '/img/dsa.jpg',
    contactDetails: {
      email: 'sarah.smith@example.com'
    }
  },
  {
    _id: '3',
    itemName: 'Wireless Headphones',
    description: 'Sony WH-1000XM4 wireless noise-cancelling headphones in black',
    category: 'electronics',
    location: 'lecture-hall',
    dateLost: '2024-03-13',
    status: 'claimed',
    image: '/img/algo.jpg',
    contactDetails: {
      email: 'mike.johnson@example.com',
      phone: '+1987654321'
    }
  }
];

const LostItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(sampleItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');



  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setError(null);
      const response = await axios.get(`${URL}/api/lost-items`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching lost items:', error);
      setError('Failed to fetch lost items. Please try again later.');
      toast.error('Failed to fetch lost items');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleClaim = async (itemId) => {
    try {
      await axios.post(`${URL}/api/lost-items/${itemId}/claim`);
      toast.success('Item claimed successfully');
      fetchItems(); // Refresh the list
    } catch (error) {
      console.error('Error claiming item:', error);
      toast.error('Failed to claim item');
    }
  };

  const renderContactInfo = (item) => {
    // If no contact details exist, show a default message
    if (!item.contactDetails) {
      return (
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Contact Information:</h4>
          <p className="text-sm text-gray-600">
            Email: <span className="text-gray-500">Not provided</span>
          </p>
        </div>
      );
    }

    return (
      <div className="mt-4 pt-4 border-t">
        <h4 className="text-sm font-medium mb-2">Contact Information:</h4>
        <p className="text-sm text-gray-600">
          Email: <a href={`mailto:${item.contactDetails.email || 'contact@example.com'}`} className="text-blue-600 hover:underline">
            {item.contactDetails.email || 'contact@example.com'}
          </a>
        </p>
        {item.contactDetails.phone && (
          <p className="text-sm text-gray-600">
            Phone: <a href={`tel:${item.contactDetails.phone}`} className="text-blue-600 hover:underline">
              {item.contactDetails.phone}
            </a>
          </p>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchItems}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Lost Items</h1>
        <Button onClick={() => navigate('/lost-items/report')}>
          <Plus className="w-4 h-4 mr-2" />
          Report Found Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Input
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:col-span-1"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="md:col-span-1">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="books">Books</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="md:col-span-1">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="block-a">Block A</SelectItem>
            <SelectItem value="block-b">Block B</SelectItem>
            <SelectItem value="block-c">Block C</SelectItem>
            <SelectItem value="block-d">Block D</SelectItem>
            <SelectItem value="library">Library</SelectItem>
            <SelectItem value="administrative-block">Administrative Block</SelectItem>
            <SelectItem value="lecture-hall">Lecture Hall</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No lost items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative bg-gray-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'claimed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status === 'claimed' ? 'Claimed' : 'Not Claimed'}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl line-clamp-1">{item.itemName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium mr-2">Category:</span>
                    <span className="capitalize">{item.category}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium mr-2">Location:</span>
                    <span className="capitalize">{item.location.replace(/-/g, ' ')}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium mr-2">Date Lost:</span>
                    <span>{new Date(item.dateLost).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  
                  {renderContactInfo(item)}

                  <div className="flex justify-end mt-4">
                    {item.status === 'lost' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleClaim(item._id)}
                        className="hover:bg-primary hover:text-white transition-colors"
                      >
                        Claim Item
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LostItems; 