import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import { ArrowLeft } from "lucide-react";
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const URL = "https://campus-360-server.onrender.com"
// const URL = "http://localhost:8080"


const ReportLostItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    description: '',
    location: '',
    dateLost: '',
    image: null,
    contactDetails: {
      email: '',
      phone: ''
    }
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image') {
      if (files && files[0]) {
        setFormData(prev => ({
            ...prev,
            image: files[0]
        }));
      }
    } else if (name.startsWith('contact.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contactDetails: {
          ...prev.contactDetails,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add basic fields
      formDataToSend.append('itemName', formData.itemName);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('dateLost', formData.dateLost);
      
      // Add contact details as a JSON string
      formDataToSend.append('contactDetails', JSON.stringify({
        email: formData.contactDetails.email,
        phone: formData.contactDetails.phone || ''
      }));
      
      // Add image if exists
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axios.post(`${URL}/api/lost-items`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });

      if (response.data) {
        toast.success('Lost item reported successfully!');
        navigate('/lost-items');
      }
    } catch (error) {
      console.error('Error reporting lost item:', error);
      const errorMessage = error.response?.data?.message || 'Failed to report lost item';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/lost-items')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Lost Items
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Report Lost Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                placeholder="Enter item name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the item in detail"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => handleSelectChange('location', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
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

            <div className="space-y-2">
              <Label htmlFor="dateLost">Date Lost</Label>
              <Input
                id="dateLost"
                name="dateLost"
                type="date"
                value={formData.dateLost}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact.email">Email</Label>
              <Input
                id="contact.email"
                name="contact.email"
                type="email"
                value={formData.contactDetails.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact.phone">Phone (Optional)</Label>
              <Input
                id="contact.phone"
                name="contact.phone"
                type="tel"
                value={formData.contactDetails.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image (Optional)</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="cursor-pointer"
              />
              <p className="text-sm text-gray-500">
                Supported formats: JPG, PNG, GIF
              </p>
              {formData.image && (
                <p className="text-sm text-green-600">
                  Image selected: {formData.image.name}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Report'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportLostItem; 