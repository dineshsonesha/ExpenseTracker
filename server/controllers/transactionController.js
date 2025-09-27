import Transaction from "../models/Transaction.js";
import { Parser } from "json2csv";

// Get all transactions for the authenticated user
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.auth.userId });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add transaction
export const addTransaction = async (req, res) => {
  const { title, amount, type, category, date } = req.body;
  try {
    const transaction = new Transaction({
      title,
      amount,
      type,
      category,
      date: date || new Date(),
      userId: req.auth.userId,
    });
    const saved = await transaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update transaction
export const updateTransaction = async (req, res) => {
  const { title, amount, type, category, date } = req.body;
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.auth.userId },
      { title, amount, type, category, date },
      { new: true }
    );
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.auth.userId,
    });
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const exportTransactions = async (req, res) => {
  try {
    const userId = req.auth?.userId;
    const transactions = await Transaction.find({ userId }).lean();

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }

    const fields = [ "title", "amount", "type", "category", "date"];  //"_id"
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(transactions);

    res.header("Content-Type", "text/csv");
    res.attachment("transactions.csv");
    return res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to export transactions" });
  }
};
