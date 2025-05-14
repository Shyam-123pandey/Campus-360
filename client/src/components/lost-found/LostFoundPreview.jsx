import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, MapPin } from "lucide-react";

const LostFoundPreview = () => {
  const sampleItems = [
    {
      id: 1,
      title: "MacBook Pro 2023",
      description: "Lost my MacBook Pro in Block A. It has a blue case and stickers on it.",
      category: "electronics",
      location: "block-a",
      date: "2024-03-15",
      status: "lost",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 2,
      title: "Engineering Textbook",
      description: "Found a Calculus textbook in the Library. Has notes in the margins.",
      category: "books",
      location: "library",
      date: "2024-03-14",
      status: "found",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGV4dGJvb2t8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 3,
      title: "Wireless AirPods",
      description: "Found white AirPods in the Lecture Hall. Please contact to claim.",
      category: "electronics",
      location: "lecture-hall",
      date: "2024-03-13",
      status: "found",
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9kc3xlbnwwfHwwfHx8MA%3D%3D"
    }
  ];

  const getStatusColor = (status) => {
    return status === 'lost' ? 'bg-red-500' : 'bg-green-500';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Lost & Found</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Help us reunite lost items with their owners. Report lost items or found belongings on campus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-4 right-4 ${getStatusColor(item.status)}`}
                >
                  {item.status === 'lost' ? 'Lost' : 'Found'}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {item.location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    {formatDate(item.date)}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="capitalize">
                    {item.category}
                  </Badge>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/${item.status}-items`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/lost-items" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              View All Items
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LostFoundPreview; 