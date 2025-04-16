import { useState, FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Loader2 } from "lucide-react";
import { serviceTypes } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useUserLocation } from "@/hooks/useUserLocation";

interface SearchFormProps {
  onSearch: (latitude: number, longitude: number, serviceType: string) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const { toast } = useToast();
  const [location, setLocation] = useState("");
  const [serviceType, setServiceType] = useState("all");
  const [locationDetected, setLocationDetected] = useState(false);
  
  const { 
    getCurrentPosition, 
    isLoading: isLocationLoading, 
    coordinates, 
    error: locationError 
  } = useUserLocation();
  
  const handleLocationDetection = () => {
    getCurrentPosition(
      (position) => {
        setLocationDetected(true);
        // Using reverse geocoding would be ideal here to get human-readable address
        // For now, just showing coords as text
        setLocation(`[${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}]`);
        toast({
          title: "Location detected",
          description: "We've successfully detected your location.",
          variant: "default",
        });
      },
      (error) => {
        toast({
          title: "Location detection failed",
          description: error.message || "Please enter your location manually.",
          variant: "destructive",
        });
      }
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!coordinates && !locationDetected) {
      toast({
        title: "Location required",
        description: "Please detect your location or enter it manually.",
        variant: "destructive",
      });
      return;
    }
    
    if (coordinates) {
      onSearch(coordinates.latitude, coordinates.longitude, serviceType);
    } else {
      toast({
        title: "Location error",
        description: "We couldn't determine your coordinates. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-md p-2 mb-8 max-w-4xl mx-auto">
      <CardContent className="p-4">
        <h3 className="text-xl font-medium mb-6">Search for Legal Services</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="location" className="block text-sm font-medium text-muted-foreground mb-1">
                Your Location
              </Label>
              <div className="flex">
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your address, city, or postal code"
                  className="rounded-r-none"
                  readOnly={locationDetected}
                />
                <Button
                  type="button"
                  onClick={handleLocationDetection}
                  variant="secondary"
                  className="rounded-l-none"
                  disabled={isLocationLoading}
                >
                  {isLocationLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <MapPin className="h-5 w-5" />
                  )}
                </Button>
              </div>
              {locationDetected && (
                <p className="mt-1 text-sm text-green-600">Location detected successfully</p>
              )}
              {locationError && (
                <p className="mt-1 text-sm text-destructive">{locationError}</p>
              )}
            </div>
          
            <div>
              <Label htmlFor="service-type" className="block text-sm font-medium text-muted-foreground mb-1">
                Service Type
              </Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger id="service-type">
                  <SelectValue placeholder="All Legal Services" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-center">
            <Button 
              type="submit" 
              className="px-8 py-6" 
              disabled={isLoading || (!location && !locationDetected)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Find Legal Services"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
