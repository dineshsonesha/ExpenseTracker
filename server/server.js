import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",          
    "https://dineshexpensetracker.vercel.app", 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

const requireAuth = ClerkExpressRequireAuth();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/protected", requireAuth, (req, res) => {
  const userId = req.auth.userId;
  res.send(`Hello User ${userId}, you are authenticated!`);
});

app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
