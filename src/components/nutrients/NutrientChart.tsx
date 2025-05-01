import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { NutrientLog } from '../../types';

interface NutrientChartProps {
  data: NutrientLog[];
}

const NutrientChart: React.FC<NutrientChartProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Nutrient Intake</h3>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tickFormatter={formatDate} />
          <YAxis />
          <Tooltip
            formatter={(value) => [`${value}`, '']}
            labelFormatter={(label) => formatDate(label)}
          />
          <Legend />
          <Bar dataKey="calories" name="Calories (kcal)" fill="#f97316" />
          <Bar dataKey="protein" name="Protein (g)" fill="#3b82f6" />
          <Bar dataKey="carbs" name="Carbs (g)" fill="#22c55e" />
          <Bar dataKey="fat" name="Fat (g)" fill="#eab308" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NutrientChart;