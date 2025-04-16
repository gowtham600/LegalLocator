import { MapPin, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProviderWithDistance } from "@shared/schema";

interface ResultCardProps {
  provider: ProviderWithDistance;
  rank: number;
}

export default function ResultCard({ provider, rank }: ResultCardProps) {
  const { provider: data, distance } = provider;
  
  // Determine the border color based on rank
  const getBorderColor = (rank: number) => {
    switch (rank) {
      case 1: return "border-l-4 border-primary";
      case 2: return "border-l-4 border-accent";
      case 3: return "border-l-4 border-secondary";
      default: return "";
    }
  };

  // Determine the badge color based on rank
  const getBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-primary";
      case 2: return "bg-accent";
      case 3: return "bg-secondary";
      default: return "bg-gray-500";
    }
  };

  // Generate stars for rating
  const renderStars = (rating: string | null) => {
    if (!rating) return null;
    
    const ratingValue = parseFloat(rating.toString());
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingValue) {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    
    return (
      <div className="flex items-center mr-4">
        {stars}
        <span className="ml-1 text-xs text-muted-foreground">
          {rating} ({data.reviewCount} reviews)
        </span>
      </div>
    );
  };

  return (
    <Card className={`bg-white rounded-lg shadow-md overflow-hidden relative ${getBorderColor(rank)}`}>
      <div className={`absolute top-0 right-0 ${getBadgeColor(rank)} text-white px-3 py-1 text-sm font-medium rounded-bl-lg`}>
        Top {rank}
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="flex-grow">
            <h4 className="text-lg font-medium mb-2">{data.name}</h4>
            <p className="text-muted-foreground mb-4 text-sm">{data.description}</p>
            
            <div className="mb-4">
              <h5 className="text-sm font-medium mb-1">Services Offered:</h5>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  // Parse the services JSON string
                  try {
                    const services = JSON.parse(data.services);
                    return services.map((service: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {service}
                      </span>
                    ));
                  } catch (e) {
                    return (
                      <span className="text-xs text-gray-500">
                        No services listed
                      </span>
                    );
                  }
                })()}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <h5 className="font-medium mb-1">Contact Information:</h5>
                <p><span className="text-muted-foreground">Phone:</span> {data.phone}</p>
                <p><span className="text-muted-foreground">Email:</span> {data.email}</p>
                {data.website && (
                  <p>
                    <span className="text-muted-foreground">Website:</span>{" "}
                    <a href={`https://${data.website}`} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      {data.website}
                    </a>
                  </p>
                )}
              </div>
              <div>
                <h5 className="font-medium mb-1">Location:</h5>
                <p className="text-muted-foreground">
                  {data.address}, {data.city}, {data.state} {data.postalCode}
                </p>
                <p className="mt-2">
                  <span className="inline-flex items-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    <MapPin className="h-3 w-3 mr-1" />
                    {distance.toFixed(1)} km away
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          {renderStars(data.rating?.toString() || null)}
          {data.yearsExperience && (
            <div className="text-xs text-muted-foreground">
              <span className="font-semibold">Experience:</span> {data.yearsExperience} years
            </div>
          )}
        </div>
        <Button size="sm">
          Contact
        </Button>
      </div>
    </Card>
  );
}
