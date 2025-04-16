import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

interface SearchRadiusProps {
  radius: number;
}

export default function SearchRadius({ radius }: SearchRadiusProps) {
  const isPrimary = radius === 30;
  
  return (
    <section className="max-w-4xl mx-auto mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Search Radius</h3>
              <div className="ml-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium">
                {radius}km {isPrimary ? "(Primary)" : "(Extended)"}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full ${isPrimary ? 'bg-primary' : 'bg-gray-300'} mr-2`}></div>
                <span className="text-sm font-medium">30km (Primary)</span>
              </div>
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full ${!isPrimary ? 'bg-primary' : 'bg-gray-300'} mr-2`}></div>
                <span className="text-sm font-medium">60km (Extended)</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center text-sm text-muted-foreground bg-slate-50 rounded-lg p-3">
            <Info className="h-4 w-4 mr-2 text-primary" />
            <span>
              {isPrimary 
                ? "Currently showing results within 30km of your location for optimal service provider proximity."
                : "Extended search radius of 60km to provide more service options in your area."}
            </span>
          </div>
          
          <div className="mt-4 relative h-40 bg-background rounded-lg border border-gray-200 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Simplified radius visualization */}
              <div className="relative">
                <div className={`absolute rounded-full ${isPrimary ? 'bg-primary/10 border-primary' : 'bg-gray-100 border-gray-200'} w-40 h-40 border`}></div>
                <div className={`absolute rounded-full ${!isPrimary ? 'bg-primary/10 border-primary' : 'bg-gray-100 border-gray-200'} w-80 h-80 border`}></div>
                <div className="absolute w-6 h-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function MapPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
