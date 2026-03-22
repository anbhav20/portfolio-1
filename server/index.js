import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { registerRoutes } from "./routes.js";
import { setupVite, serveStatic, log } from "./vite.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ 🔥 FIX: Serve built frontend + assets correctly
app.use(
  express.static(path.join(__dirname, "../dist/public/"))
);

// Request logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Global error handler
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });

    if (status >= 500) {
      console.error("[server error]", err);
    }
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // production me fallback to index.html (IMPORTANT)
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../dist/public/index.html"));
    });
  }

  const port = parseInt(process.env.PORT || "5000", 10);

  server.listen({ port, host: "0.0.0.0" }, () => {
    log(`serving on port ${port}`);
    log(`environment: ${app.get("env")}`);
  });
})();