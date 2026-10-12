import express, { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "0.0.0.0";
const DIST_DIR = path.resolve(__dirname, "dist");

// Disable Express fingerprint
app.disable("x-powered-by");

// Trust reverse proxies (Google Cloud Run, AWS ALB, Cloudflare, Nginx)
app.set("trust proxy", 1);

// 1. Force HTTPS in production behind reverse proxies
app.use((req: Request, res: Response, next: NextFunction) => {
  const forwardedProto = req.headers["x-forwarded-proto"];
  const isHttps = req.secure || forwardedProto === "https";

  if (!isHttps && process.env.NODE_ENV === "production" && req.headers.host) {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});

// 2. Comprehensive Security Headers
app.use((_req: Request, res: Response, next: NextFunction) => {
  // Enforce HSTS (Strict-Transport-Security) for 1 year including subdomains and preload
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  // Prevent MIME-type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  // Strict cross-origin referrer policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Restrict sensitive browser features
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");

  // Content Security Policy with HTTPS auto-upgrade
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https: ws: wss:",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; ")
  );

  next();
});

// 3. Container & Load Balancer Health Check
app.get(["/health", "/api/health"], (_req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// 4. Serve static assets with appropriate caching strategies
if (fs.existsSync(DIST_DIR)) {
  // Immutable cache for fingerprinted Vite assets (/assets/*)
  app.use(
    "/assets",
    express.static(path.join(DIST_DIR, "assets"), {
      maxAge: "1y",
      immutable: true,
    })
  );

  // Standard static files (favicon, robots, etc.)
  app.use(
    express.static(DIST_DIR, {
      maxAge: "1h",
      index: false,
    })
  );

  // SPA fallback for HTML5 routing: always serve index.html with no-cache
  app.use((_req: Request, res: Response) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.sendFile(path.join(DIST_DIR, "index.html"));
  });
} else {
  // In development before build
  app.get("/", (_req: Request, res: Response) => {
    res.status(200).send("Origin-Hub server is running. Run 'npm run build' to generate static dist assets.");
  });
}

// 5. Start Server
const server = app.listen(PORT, HOST, () => {
  console.log(`[Origin-Hub] Production server running on http://${HOST}:${PORT}`);
});

// 6. Graceful Shutdown Handlers
const shutdown = (signal: string) => {
  console.log(`[Origin-Hub] Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log("[Origin-Hub] HTTP server closed.");
    process.exit(0);
  });
  setTimeout(() => {
    console.error("[Origin-Hub] Forceful termination timeout reached.");
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

export default app;
