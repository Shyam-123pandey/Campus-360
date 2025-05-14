import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";

const ItemCard = ({ item, type }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatLocation = (location) => {
    return location.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={item.images?.[0] || '/placeholder-image.jpg'}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <Badge className={`absolute top-4 right-4 ${
          type === 'lost' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          {type === 'lost' ? 'Lost' : 'Found'}
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
            {formatLocation(item.location)}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            {formatDate(item.createdAt)}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="capitalize">
            {item.category}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {item.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard; 