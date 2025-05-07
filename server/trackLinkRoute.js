import { Router } from "express";
import axios from "axios";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const trackLinkRouter = Router();

trackLinkRouter.get("/", async (req, res) => {
  // Handle proxy IP header safely (in case of multiple IPs)
  const forwardedFor = req.headers["x-forwarded-for"] || "";
  const ip = forwardedFor.split(",")[0].trim() || req.socket.remoteAddress || "Unknown";

  try {
    const geo = await axios.get(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`);
    const data = geo.data;
    const loc = data.loc || '';
    const [lat, lon] = loc.split(',');
    const city = data.city || 'Unknown City';
    const region = data.region || 'Unknown Region';
    const country = data.country || 'Unknown Country';

    const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    
    // Get the referrer if available
    const referrer = req.headers.referer || 'Direct access';
    
    // Get the timestamp
    const timestamp = new Date().toISOString();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '🔗 Tracking Link Accessed',
      text: `
        🔍 Someone accessed your tracking link!
        
        📅 Time: ${timestamp}
        📍 IP Address: ${ip}
        📌 Location: ${city}, ${region}, ${country}
        🗺️ Google Maps: ${googleMapUrl}
        🌐 User Agent: ${req.headers['user-agent']}
        🔄 Referrer: ${referrer}
      `,
    });

    // Redirect to the client-side redirect page
    res.redirect('/track-redirect');
  } catch (error) {
    console.error("Error tracking link access:", error.message);
    // Still redirect even if tracking fails
    res.redirect('/track-redirect');
  }
});