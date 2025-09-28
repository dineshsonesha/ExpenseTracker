import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#344F1F", "#F4991A", "#5a823c", "#f5a639", "#80b464"];

export function CategoryPieChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No expense data
      </div>
    );
  }

  return (
    <div className="w-full bg-surface p-4 rounded-xl shadow-md border border-black/10 flex flex-col items-center">
      <h3 className="text-lg font-semibold text-primary">
        Expense Categories
      </h3>

      <ResponsiveContainer width="80%" aspect={1}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius="35%"
            outerRadius="60%"
            paddingAngle={4}
            isAnimationActive
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Category labels */}
      <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-primary w-full">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            <span>{item.category}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
