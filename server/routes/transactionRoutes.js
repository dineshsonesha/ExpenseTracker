import express from "express";
import { getTransactions, addTransaction, deleteTransaction, updateTransaction, exportTransactions } from "../controllers/transactionController.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();
const requireAuth = ClerkExpressRequireAuth();

router.get("/", requireAuth, getTransactions);
router.post("/", requireAuth, addTransaction);
router.put("/:id", requireAuth, updateTransaction);
router.delete("/:id", requireAuth, deleteTransaction);
router.get("/export", requireAuth, exportTransactions);

export default router;
