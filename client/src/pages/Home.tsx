import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchForm from "@/components/SearchForm";
import SearchRadius from "@/components/SearchRadius";
import ResultsList from "@/components/ResultsList";
import ServiceMap from "@/components/ServiceMap";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type ProviderWithDistance } from "@shared/schema";
import { CircleAlert, AlertCircle, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type SearchState = {
  latitude: number | null;
  longitude: number | null;
  serviceType: string;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};

type SearchResults = {
  providers: ProviderWithDistance[];
  radius: number;
  count: number;
};

export default function Home() {
  const { toast } = useToast();
  const [searchState, setSearchState] = useState<SearchState>({
    latitude: null,
    longitude: null,
    serviceType: "",
    status: "idle",
    error: null,
  });
  
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);

  const searchMutation = useMutation({
    mutationFn: async (searchData: { latitude: number, longitude: number, serviceType: string }) => {
      const response = await apiRequest("POST", "/api/search", searchData);
      return response.json();
    },
    onSuccess: (data: SearchResults) => {
      setSearchResults(data);
      setSearchState(prev => ({ ...prev, status: "success" }));
      
      if (data.providers.length === 0) {
        toast({
          title: "No results found",
          description: "We couldn't find any providers matching your criteria.",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      setSearchState(prev => ({ 
        ...prev, 
        status: "error", 
        error: error.message || "Failed to perform search" 
      }));
      
      toast({
        title: "Search Error",
        description: error.message || "Failed to perform search",
        variant: "destructive",
      });
    }
  });

  const handleSearch = (latitude: number, longitude: number, serviceType: string) => {
    setSearchState({
      latitude,
      longitude,
      serviceType,
      status: "loading",
      error: null,
    });
    
    searchMutation.mutate({ latitude, longitude, serviceType });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Find the Legal Help You Need, Nearby
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            LegalLocator connects you with qualified legal service providers in your area, 
            personalized to match your specific needs.
          </p>
        </section>
        
        <SearchForm onSearch={handleSearch} isLoading={searchState.status === "loading"} />
        
        {searchState.status === "loading" && (
          <div className="max-w-4xl mx-auto text-center p-12">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-medium mb-2">Searching for legal service providers</h3>
            <p className="text-muted-foreground">Finding the best legal help nearby...</p>
          </div>
        )}
        
        {searchState.status === "error" && (
          <div className="max-w-4xl mx-auto bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-8">
            <div className="flex items-center text-destructive mb-2">
              <AlertCircle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-medium">Error occurred</h3>
            </div>
            <p className="text-gray-700 mb-4">
              {searchState.error || "We couldn't complete your search. Please try again later."}
            </p>
            <button 
              className="text-primary hover:text-primary-foreground font-medium focus:outline-none"
              onClick={() => setSearchState(prev => ({ ...prev, status: "idle", error: null }))}
            >
              Try again
            </button>
          </div>
        )}
        
        {searchResults && searchState.status === "success" && (
          <>
            <SearchRadius radius={searchResults.radius} />
            
            {searchResults.providers.length > 0 ? (
              <>
                <div className="max-w-4xl mx-auto mb-8">
                  <div className="flex items-center text-primary mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <h3 className="text-lg font-medium">Service Providers Map</h3>
                  </div>
                  <ServiceMap 
                    providers={searchResults.providers}
                    radius={searchResults.radius}
                    userLocation={{
                      latitude: searchState.latitude || 0,
                      longitude: searchState.longitude || 0
                    }}
                  />
                </div>
                
                <ResultsList 
                  providers={searchResults.providers} 
                  count={searchResults.count} 
                  radius={searchResults.radius} 
                />
              </>
            ) : (
              <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <div className="flex items-center text-yellow-800 mb-2">
                  <AlertCircle className="h-6 w-6 mr-2" />
                  <h3 className="text-lg font-medium">No legal providers found</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  We couldn't find any legal service providers matching your criteria within 60km of your location. 
                  Try broadening your search criteria or changing your location.
                </p>
                <button 
                  className="text-primary hover:text-primary-foreground font-medium focus:outline-none"
                  onClick={() => setSearchState(prev => ({ ...prev, status: "idle" }))}
                >
                  Search again
                </button>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
