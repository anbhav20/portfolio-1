import type { Express } from "express";
import { createServer, type Server } from "http";
import nodemailer from "nodemailer";  
import dotenv from "dotenv";   
dotenv.config();  
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message }: ContactFormData = req.body;
      
      // Simple validation
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      
      // In a real application, you would save this to a database
      // or send an email using a service like SendGrid, Mailgun, etc.
      // ── ✉️  Nodemailer setup & send ────────────────────────────────
      const transporter = nodemailer.createTransport({
        service: 'gmail',                           // ya apni choice ka SMTP
        auth: {
          user: process.env.EMAIL_USER,             // set in .env
          pass: process.env.EMAIL_PASS              // app password
        }
      });
      const mailOptions = {
        from: `"Portfolio Site" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,                // khud ko bhej rahe
        subject: '📩 New Contact Form Submission',
        text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `
      };

      await transporter.sendMail(mailOptions);     // yahi line mail bhej degi
      // ── ✉️  End of email block ───
      
      // Simulate successful processing
      console.log('Contact form submission:', { name, email, message });
      
      // Return success response
      return res.status(200).json({ 
        success: true, 
        message: 'Message received successfully' 
      });
    } catch (error) {
      console.error('Error processing contact form submission:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
