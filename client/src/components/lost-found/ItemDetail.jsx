import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, User } from "lucide-react";

const ItemDetail = ({ item, onClaim, onContact }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatLocation = (location) => {
    return location.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src={item.images?.[0] || '/placeholder-image.jpg'}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <Badge className={`absolute top-4 right-4 ${
              item.type === 'lost' ? 'bg-red-500' : 'bg-green-500'
            }`}>
              {item.type === 'lost' ? 'Lost' : 'Found'}
            </Badge>
          </div>
          {item.images && item.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {item.images.slice(1).map((image, index) => (
                <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${item.title} - Image ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
            <div className="flex gap-2 mb-4">
              <Badge variant="outline" className="capitalize">
                {item.category}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {item.status}
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Location: {formatLocation(item.location)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>Reported: {formatDate(item.createdAt)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-2" />
                <span>Reported by: {item.reporter?.name || 'Anonymous'}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            {item.status === 'pending' && (
              <Button
                onClick={() => onClaim(item._id)}
                className="flex-1"
              >
                Claim Item
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => onContact(item.reporter)}
              className="flex-1"
            >
              Contact Reporter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail; 