import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function MonthlyTrendChart({ data }) {
  return (
    <div className="w-full h-80 lg:h-full bg-surface p-4 rounded-xl shadow-md border border-black/10">
      <h3 className="text-lg font-semibold text-primary mb-4">Monthly Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#344F1F" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#344F1F" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F4991A" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#F4991A" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="month" 
            stroke="#78716c" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#78716c" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #ddd',
              borderRadius: '0.5rem',
              fontSize: '12px',
            }}
          />
          <Area 
            type="monotone" 
            dataKey="income" 
            stroke="#344F1F" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#colorIncome)" 
            isAnimationActive={true} 
            animationDuration={1200} 
          />
          <Area 
            type="monotone" 
            dataKey="expense" 
            stroke="#F4991A" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#colorExpense)" 
            isAnimationActive={true} 
            animationDuration={1200} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
