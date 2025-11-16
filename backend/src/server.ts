import express, { Request, Response } from "express";
import "./config/database";
import userRoutes from "./routes/users.route";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running!");
});

// quick health route for testing connectivity
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

export default app;
