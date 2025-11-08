import express, { Request, Response } from "express";
import cors from "cors";
import { testConnection } from "./db";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running!");
});

// Health check route with database connectivity test
app.get("/health", async (req: Request, res: Response) => {
  try {
    const dbConnected = await testConnection();
    res.status(200).json({ 
      status: "ok", 
      database: dbConnected ? "connected" : "disconnected",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: "error", 
      database: "disconnected",
      timestamp: new Date().toISOString()
    });
  }
});

// ping route as requested
app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "pong" });
});

export default app;
