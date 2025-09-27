import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ['#344F1F', '#F4991A', '#5a823c', '#f5a639', '#80b464'];

export function CategoryPieChart({ data }) {
  // Limit to 5 categories only
  const topData = data.slice(0, 5);

  if (!topData || topData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No expense data
      </div>
    );
  }

  return (
    <div className="w-full h-80 bg-surface p-4 rounded-xl shadow-md border border-black/10 flex flex-col items-center">
      <h3 className="text-lg font-semibold text-primary mb-4">Expense Categories</h3>
      <ResponsiveContainer width="100%" height="70%">
        <PieChart>
          <Pie
            data={topData}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius="35%"
            outerRadius="60%"
            paddingAngle={4}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-out"
          >
            {topData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${value.toFixed(2)}`}
            contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #ddd" }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Categories labels below chart */}
      <div className="flex justify-between w-full mt-4 text-sm font-medium text-primary">
        {topData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
            <span>{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
