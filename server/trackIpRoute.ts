import { Router, type Request, type Response } from "express";
import axios from "axios";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const trackIpRouter = Router();

trackIpRouter.get("/", async (req: Request, res: Response) => {
  // Handle proxy IP header safely (in case of multiple IPs)
  const forwardedFor = (req.headers["x-forwarded-for"] as string) || "";
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

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Get the timestamp
    const timestamp = new Date().toISOString();
    const formattedTime = new Date().toLocaleString();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '🌐 New Portfolio Visitor',
      text: `
        📍 New Visit on Portfolio!
        
        Time: ${formattedTime}
        IP Address: ${ip}
        Location: ${city}, ${region}, ${country}
        Open in Google Maps: ${googleMapUrl}
        
        Browser Info:
        User Agent: ${req.headers['user-agent']}
        Referrer: ${req.headers.referer || 'Direct visit'}
        
        This visitor accessed your portfolio at: https://portfolio-1-a01n.onrender.com
      `,
    });

    res.json({ success: true });
  } catch (error: any) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Failed to track IP or send email" });
  }
});
