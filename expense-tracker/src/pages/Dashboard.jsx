// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownLeft, DollarSign, MoreHorizontal, Download, Plus, Search, Calendar, ChevronDown, X } from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import { CategoryPieChart } from "../components/charts/CategoryPieChart";
import { MonthlyTrendChart } from "../components/charts/MonthlyTrendChart";

const RadioOption = ({ value, label, checked, onChange, type }) => {
  const isIncome = type === "income";
  const colorClass = isIncome ? "text-green-600" : "text-red-500";
  const borderColor = isIncome ? "border-green-600" : "border-red-500";

  return (
    <label className="flex items-center cursor-pointer">
      <div
        className={`w-5 h-5 rounded-full border-2 ${checked ? borderColor : "border-gray-300"
          } flex items-center justify-center transition-colors`}
      >
        {checked && (
          <div
            className={`w-2.5 h-2.5 rounded-full ${isIncome ? "bg-green-600" : "bg-red-500"
              }`}
          />
        )}
      </div>
      <span className={`ml-2 font-medium ${checked ? colorClass : "text-gray-600"}`}>
        {label}
      </span>
      <input
        type="radio"
        name="transactionType"
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
};

const TransactionModal = ({ isOpen, onClose, transaction, onTransactionSaved }) => {
  const [transactionType, setTransactionType] = useState(transaction?.type || "expense");
  const [title, setTitle] = useState(transaction?.title || "");
  const [amount, setAmount] = useState(transaction?.amount || "");
  const [category, setCategory] = useState(transaction?.category || "");
  const [date, setDate] = useState(transaction?.date?.split("T")[0] || new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState(transaction?.description || "");
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  useEffect(() => {
    if (transaction) {
      setTransactionType(transaction.type);
      setTitle(transaction.title);
      setAmount(transaction.amount);
      setCategory(transaction.category);
      setDate(transaction.date?.split("T")[0] || new Date().toISOString().split("T")[0]);
      setDescription(transaction.description || "");
    } else {
      setTransactionType("expense");
      setTitle("");
      setAmount("");
      setCategory("");
      setDate(new Date().toISOString().split("T")[0]);
      setDescription("");
    }
  }, [transaction]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getToken();
      const method = transaction ? "PUT" : "POST";
      const url = transaction
        ? `${import.meta.env.VITE_BACKEND_URL}/api/transactions/${transaction._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/transactions`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: transactionType,
          title,
          amount: parseFloat(amount),
          category,
          date,
          description,
        }),
      });

      const savedTx = await res.json();
      if (!res.ok) throw new Error(savedTx.message || "Failed to save transaction");

      if (onTransactionSaved) onTransactionSaved(savedTx);
      onClose();
    } catch (err) {
      console.error("Error saving transaction:", err);
      alert("Failed to save transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4" >
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative border border-gray-200" >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {transaction ? "Update Transaction" : "Add New Transaction"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type
            </label>
            <div className="flex items-center gap-6">
              <RadioOption
                value="income"
                label="Income"
                checked={transactionType === "income"}
                onChange={() => setTransactionType("income")}
                type="income"
              />
              <RadioOption
                value="expense"
                label="Expense"
                checked={transactionType === "expense"}
                onChange={() => setTransactionType("expense")}
                type="expense"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select category</option>
                <option>Food & Dining</option>
                <option>Transportation</option>
                <option>Salary</option>
                <option>Bills & Utilities</option>
                <option>Shopping</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-2 text-gray-400">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Date
            </label>
            <div className="absolute inset-y-0 left-0 top-7 flex items-center pl-3 text-gray-400 pointer-events-none">
              <Calendar className="w-5 h-5" />
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? (transaction ? "Updating..." : "Adding...") : (transaction ? "Update Transaction" : "Add Transaction")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isModalOpen, setModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (!search) setFilteredTransactions(transactions);
    else
      setFilteredTransactions(
        transactions.filter((t) =>
          t.title?.toLowerCase().includes(search.toLowerCase())
        )
      );
  }, [search, transactions]);

  const handleDelete = async (id) => {
    try {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/transactions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete transaction");
      setTransactions((prev) => prev.filter((t) => t._id !== id));
      setFilteredTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleExport = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/transactions/export`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transactions.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Export error:", err);
    }
  };

  const handleUpdateClick = (transaction) => {
    setTransactionToEdit(transaction);
    setModalOpen(true);
  };

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + (t.amount || 0), 0);
  const balance = totalIncome - totalExpenses;

  const stats = [
    { title: "Total Income", amount: `$${totalIncome.toFixed(2)}`, changeType: "positive", Icon: ArrowUpRight },
    { title: "Total Expenses", amount: `$${totalExpenses.toFixed(2)}`, changeType: "negative", Icon: ArrowDownLeft },
    { title: "Balance", amount: `$${balance.toFixed(2)}`, changeType: balance >= 0 ? "positive" : "negative", Icon: DollarSign },
  ];

  const pieChartData = transactions.filter(t => t.type === "expense").reduce((acc, t) => {
    const existing = acc.find(c => c.category === t.category);
    if (existing) existing.amount += t.amount;
    else acc.push({ category: t.category, amount: t.amount });
    return acc;
  }, []);

  const monthlyChartData = transactions.reduce((acc, t) => {
    if (!t.date) return acc;
    const month = new Date(t.date).toLocaleString("default", { month: "short" });
    let existing = acc.find(m => m.month === month);
    if (!existing) { existing = { month, income: 0, expense: 0 }; acc.push(existing); }
    if (t.type === "income") existing.income += t.amount;
    else existing.expense += t.amount;
    return acc;
  }, []);

  return (
    <div>
      <Navbar variant="dashboard" />
      <div className="relative bg-background text-primary min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                WELCOME, {user ? user.firstName : "Guest"}
              </h1>
              <p className="text-sm text-primary/70 mt-1">An overview of your financial activity.</p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-primary/20 rounded-lg bg-surface hover:bg-opacity-80 transition cursor-pointer"
              >
                <Download className="w-4 h-4" /> Export
              </button>

              <button
                onClick={() => { setTransactionToEdit(null); setModalOpen(true); }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-opacity-90 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Transaction
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map(stat => (
              <div key={stat.title} className="bg-surface p-6 rounded-xl shadow-sm border border-black/5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary/70">{stat.title}</p>
                  <stat.Icon className={`w-5 h-5 ${stat.changeType === "positive" ? "text-green-600" : "text-red-500"}`} />
                </div>
                <p className="text-3xl font-bold text-primary mt-2">{stat.amount}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            <div className="lg:col-span-2 h-96 lg:h-full"><CategoryPieChart data={pieChartData} /></div>
            <div className="lg:col-span-3 h-96 lg:h-full"><MonthlyTrendChart data={monthlyChartData} /></div>
          </div>

          {/* Transaction History */}
          <div className="bg-surface p-6 rounded-xl shadow-sm border border-black/5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h3 className="text-lg font-semibold">Transaction History</h3>
              <div className="relative mt-3 sm:mt-0 w-full sm:w-auto">
                <Search className="w-4 h-4 text-primary/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-3 py-2 w-full text-sm border border-primary/20 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              {filteredTransactions.length === 0 ? (
                <p className="text-sm text-primary/50">No transactions found.</p>
              ) : filteredTransactions.map(item => (
                <div key={item._id} className="flex items-center justify-between p-4 rounded-lg hover:bg-background transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-background text-primary">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">{item.title}</h4>
                      <p className="text-xs text-primary/70">{item.category} · {item.date ? new Date(item.date).toLocaleDateString() : "No Date"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 relative">
                    <p className={`font-semibold ${item.type === "income" ? "text-green-600" : "text-red-500"}`}>
                      {item.type === "income" ? "+" : "-"}${(item.amount || 0).toFixed(2)}
                    </p>
                    <div className="relative">
                      <button className="text-primary/50 hover:text-primary cursor-pointer"
                        onClick={() => setOpenDropdownId(openDropdownId === item._id ? null : item._id)}>
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                      {openDropdownId === item._id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => handleUpdateClick(item)}>Update</button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={() => handleDelete(item._id)}>Delete</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <TransactionModal
            isOpen={isModalOpen}
            onClose={() => { setModalOpen(false); setTransactionToEdit(null); }}
            transaction={transactionToEdit}
            onTransactionSaved={(savedTx) => {
              if (transactionToEdit) {
                setTransactions(prev => prev.map(t => t._id === savedTx._id ? savedTx : t));
              } else {
                setTransactions(prev => [...prev, savedTx]);
              }
              setTransactionToEdit(null);
            }}
          />

        </div>
      </div>
    </div>
  );
}
