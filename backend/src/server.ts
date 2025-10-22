import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running!");
});

// quick health route for testing connectivity
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// ping route as requested
app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "pong" });
});

// vendors endpoint - returns all vendors from the database
app.get("/vendors", async (req: Request, res: Response) => {
  try {
    const vendors = await prisma.vendor.findMany();
    res.json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default app;
