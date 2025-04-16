import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchRequestSchema, insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for legal service providers
  
  // Get all legal service providers
  app.get("/api/providers", async (_req, res) => {
    try {
      const providers = await storage.getLegalServiceProviders();
      res.json(providers);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve providers" });
    }
  });

  // Get a single provider by ID
  app.get("/api/providers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid provider ID" });
      }
      
      const provider = await storage.getLegalServiceProviderById(id);
      if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
      }
      
      res.json(provider);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve provider" });
    }
  });

  // Search for providers
  app.post("/api/search", async (req, res) => {
    try {
      // Validate request body
      const validatedData = searchRequestSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid search parameters", 
          errors: validatedData.error.errors 
        });
      }
      
      const { data } = validatedData;
      
      // Perform search with fallback
      const result = await storage.searchWithFallback(data);
      
      res.json({
        providers: result.providers,
        radius: result.radius,
        count: result.providers.length,
      });
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ message: "Failed to perform search" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactSubmissionSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid contact form data", 
          errors: validatedData.error.errors 
        });
      }
      
      const { data } = validatedData;
      
      // Save contact submission to database
      const submission = await storage.createContactSubmission(data);
      
      res.status(201).json({
        message: "Contact form submitted successfully",
        submission
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
