import express, { Request, Response } from "express";
import cors from "cors";
import "./config/database";
import userRoutes from "./routes/users.route";
import productRoutes from "./routes/products.route";
import vendorRoutes from "./routes/vendors.route";

const app = express();

// middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/vendors", vendorRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running!");
});

// quick health route for testing connectivity
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

export default app;
