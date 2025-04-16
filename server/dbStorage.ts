import { 
  users, 
  legalServiceProviders,
  type User, 
  type InsertUser, 
  type LegalServiceProvider, 
  type InsertLegalServiceProvider, 
  type SearchRequest, 
  type ProviderWithDistance 
} from "@shared/schema";
import { db } from "./db";
import { eq, and, sql } from "drizzle-orm";
import { IStorage } from "./storage";

// Constants for search radii
const PRIMARY_RADIUS_KM = 30;
const FALLBACK_RADIUS_KM = 60;

// Function to calculate distance between coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI/180);
}

export class DatabaseStorage implements IStorage {
  
  constructor() {
    // Initialize sample data if needed
    this.initializeSampleProviders();
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getLegalServiceProviders(): Promise<LegalServiceProvider[]> {
    return await db.select().from(legalServiceProviders);
  }

  async getLegalServiceProviderById(id: number): Promise<LegalServiceProvider | undefined> {
    const result = await db.select().from(legalServiceProviders).where(eq(legalServiceProviders.id, id));
    return result[0];
  }

  async createLegalServiceProvider(provider: InsertLegalServiceProvider): Promise<LegalServiceProvider> {
    const result = await db.insert(legalServiceProviders).values(provider).returning();
    return result[0];
  }

  async findNearbyProviders(searchRequest: SearchRequest, radius: number): Promise<ProviderWithDistance[]> {
    // Get all providers from database
    const allProviders = await this.getLegalServiceProviders();
    
    // Calculate distance for each provider
    const providersWithDistance: ProviderWithDistance[] = allProviders.map(provider => ({
      provider,
      distance: calculateDistance(
        searchRequest.latitude,
        searchRequest.longitude,
        Number(provider.latitude),
        Number(provider.longitude)
      )
    }));
    
    // Filter by distance
    const nearbyProviders = providersWithDistance.filter(item => item.distance <= radius);
    
    // Filter by service type if specified
    if (searchRequest.serviceType && searchRequest.serviceType !== "" && searchRequest.serviceType !== "all") {
      return nearbyProviders.filter(item => {
        try {
          // Access services directly as an array since we're using jsonb in PostgreSQL
          const services = item.provider.services;
          return Array.isArray(services) && 
            services.some((service: string) => 
              service.toLowerCase().includes(searchRequest.serviceType!.toLowerCase())
            );
        } catch (error) {
          console.error("Error with services data:", error);
          return false;
        }
      });
    }
    
    return nearbyProviders;
  }

  async searchWithFallback(searchRequest: SearchRequest): Promise<{
    providers: ProviderWithDistance[],
    radius: number
  }> {
    // First try with primary radius (30km)
    let providers = await this.findNearbyProviders(searchRequest, PRIMARY_RADIUS_KM);
    let radius = PRIMARY_RADIUS_KM;
    
    // Apply AI ranking
    providers = this.rankProviders(providers, searchRequest.serviceType || "");
    
    // If no results, try fallback radius (60km)
    if (providers.length === 0) {
      providers = await this.findNearbyProviders(searchRequest, FALLBACK_RADIUS_KM);
      radius = FALLBACK_RADIUS_KM;
      
      // Apply AI ranking again
      providers = this.rankProviders(providers, searchRequest.serviceType || "");
    }
    
    // Return top 3 providers only
    return {
      providers: providers.slice(0, 3),
      radius
    };
  }

  // Simple AI ranking algorithm based on distance, reviews, and specialization
  rankProviders(providers: ProviderWithDistance[], serviceType: string): ProviderWithDistance[] {
    return providers.sort((a, b) => {
      // Base score starts with inverse of distance (closer is better)
      let scoreA = 100 - a.distance;
      let scoreB = 100 - b.distance;
      
      // Add rating factor
      if (a.provider.rating) scoreA += Number(a.provider.rating) * 10;
      if (b.provider.rating) scoreB += Number(b.provider.rating) * 10;
      
      // Add review count factor
      if (a.provider.reviewCount) scoreA += Math.min(a.provider.reviewCount, 100) / 5;
      if (b.provider.reviewCount) scoreB += Math.min(b.provider.reviewCount, 100) / 5;
      
      // Add experience factor
      if (a.provider.yearsExperience) scoreA += a.provider.yearsExperience * 2;
      if (b.provider.yearsExperience) scoreB += b.provider.yearsExperience * 2;
      
      // Service type specialization bonus (if service type is specified and not "all")
      if (serviceType && serviceType !== "" && serviceType !== "all") {
        try {
          const servicesA = a.provider.services;
          const servicesB = b.provider.services;
          
          if (Array.isArray(servicesA) && 
              servicesA.some((s: string) => s.toLowerCase().includes(serviceType.toLowerCase()))) {
            scoreA += 30;
          }
          
          if (Array.isArray(servicesB) && 
              servicesB.some((s: string) => s.toLowerCase().includes(serviceType.toLowerCase()))) {
            scoreB += 30;
          }
        } catch (error) {
          console.error("Error in service ranking:", error);
        }
      }
      
      // Return comparison (higher score first)
      return scoreB - scoreA;
    });
  }

  private async initializeSampleProviders() {
    // Check if we already have providers
    const existingProviders = await db.select().from(legalServiceProviders);
    
    if (existingProviders.length > 0) {
      console.log("Sample providers already exist in the database.");
      return;
    }
    
    console.log("Initializing sample providers in the database...");
    
    // Create sample data
    const sampleProviders = [
      {
        name: "Capital Law Associates",
        services: ["Family Law", "Corporate Law", "Real Estate Law"],
        phone: "(0427) 255-6789",
        email: "info@capitallawassociates.com",
        website: "capitallawassociates.com",
        address: "42 Anna Salai",
        city: "Salem",
        state: "Tamil Nadu",
        postalCode: "636007",
        latitude: "11.6528",
        longitude: "78.1585",
        description: "A premier legal firm specializing in corporate and family law with over 20 years of experience serving clients throughout Tamil Nadu.",
        rating: "5.0",
        reviewCount: 38,
        yearsExperience: 22
      },
      {
        name: "Kumar & Associates",
        services: ["Family Law", "Divorce Proceedings", "Child Custody"],
        phone: "(0427) 223-4567",
        email: "contact@kumarassociates.com",
        website: "kumarassociates.com",
        address: "15 Gandhi Road",
        city: "Salem",
        state: "Tamil Nadu",
        postalCode: "636008",
        latitude: "11.6572",
        longitude: "78.1452",
        description: "Boutique law firm focused on divorce cases and family disputes with personalized client service approach.",
        rating: "4.0",
        reviewCount: 24,
        yearsExperience: 15
      },
      {
        name: "Jayakumar Legal Solutions",
        services: ["Family Law", "Divorce Proceedings", "Property Division"],
        phone: "(0427) 298-7654",
        email: "info@jayakumarlegal.com",
        website: "jayakumarlegal.com",
        address: "78 Fairlands Road",
        city: "Salem",
        state: "Tamil Nadu",
        postalCode: "636016",
        latitude: "11.6712",
        longitude: "78.1392",
        description: "Trusted family law practice specialized in handling complex divorce cases and child custody matters with compassion.",
        rating: "3.0",
        reviewCount: 15,
        yearsExperience: 8
      },
      {
        name: "Madras Legal Consultants",
        services: ["Criminal Defense", "Personal Injury", "Immigration Law"],
        phone: "(0427) 321-8765",
        email: "contact@madraslegal.com",
        website: "madraslegal.com",
        address: "25 Mount Road",
        city: "Chennai",
        state: "Tamil Nadu",
        postalCode: "600002",
        latitude: "13.0836",
        longitude: "80.2703",
        description: "Full-service legal firm with expertise in criminal defense and personal injury cases.",
        rating: "4.2",
        reviewCount: 45,
        yearsExperience: 18
      },
      {
        name: "Coimbatore Law Group",
        services: ["Corporate Law", "Tax Law", "Intellectual Property"],
        phone: "(0422) 432-9876",
        email: "info@clgroup.com",
        website: "clgroup.com",
        address: "56 DP Road",
        city: "Coimbatore",
        state: "Tamil Nadu",
        postalCode: "641004",
        latitude: "11.0162",
        longitude: "76.9626",
        description: "Specialized in business law with a focus on tax management and intellectual property protection.",
        rating: "4.7",
        reviewCount: 32,
        yearsExperience: 12
      },
      {
        name: "Tiruchirappalli Legal Advocates",
        services: ["Real Estate Law", "Family Law", "Corporate Law"],
        phone: "(0431) 543-2198",
        email: "contact@tla.com",
        website: "tla.com",
        address: "12 Cantonment Road",
        city: "Tiruchirappalli",
        state: "Tamil Nadu",
        postalCode: "620001",
        latitude: "10.7905",
        longitude: "78.7047",
        description: "Expert real estate legal team specializing in property disputes and land documentation issues.",
        rating: "4.3",
        reviewCount: 28,
        yearsExperience: 16
      }
    ];
    
    // Insert sample providers into database
    try {
      for (const provider of sampleProviders) {
        await this.createLegalServiceProvider({
          ...provider,
          website: provider.website || null,
          rating: provider.rating || null,
          reviewCount: provider.reviewCount || null,
          yearsExperience: provider.yearsExperience || null
        });
      }
      console.log("Sample providers initialized successfully.");
    } catch (error) {
      console.error("Error initializing sample providers:", error);
    }
  }
}