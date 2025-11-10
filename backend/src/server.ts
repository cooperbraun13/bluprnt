import express, { Request, Response } from "express";

const app = express();

// Middleware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running!");
});

// quick health route for testing connectivity
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

export default app;
