import type { Express } from "express";
import express, { type Request, type Response, type NextFunction } from "express";
import { createServer, type Server } from "http";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { trackIpRouter } from "./trackIpRoute";
import { trackLinkRouter } from "./trackLinkRoute";

dotenv.config();

// Validate required environment variables
["EMAIL_USER", "EMAIL_PASS", "IPINFO_TOKEN", "FRONTEND_URL"].forEach(key => {
  if (!process.env[key]) {
    console.error(`Missing environment variable: ${key}`);
    process.exit(1);
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Trust only first proxy hop for accurate IP detection
  app.set("trust proxy", 1);

  // Enable CORS for the frontend origin
  app.use(cors({ 
    origin: [process.env.FRONTEND_URL, 'http://localhost:5000'],
    credentials: true
  }));

  // Rate limit the /api/track-ip endpoint to once per minute per IP
  // This allows tracking more frequently while still preventing abuse
  const trackLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1,
    message: { error: "Too many requests from this IP" }
  });
  app.use("/api/track-ip", trackLimiter, trackIpRouter);
  
  // Special tracking link route - no rate limiting to track every visit
  app.use("/track", trackLinkRouter);

  // Contact form submission endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const { name, email, message } = req.body as {
        name: string;
        email: string;
        message: string;
      };

      // Validation
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      // Send email via Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      await transporter.sendMail({
        from: `"Portfolio Site" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: '📩 New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      });

      console.log('Contact form submission:', { name, email, message });
      return res.status(200).json({ success: true, message: 'Message received successfully' });
    } catch (error: any) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
  });

  // Create and return HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
