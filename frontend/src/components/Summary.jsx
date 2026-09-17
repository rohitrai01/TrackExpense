import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getSummary } from '../api';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

function Summary({refreshKey }) {
  const [summary, setSummary] = useState({ total: 0, by_category: [] });

  useEffect(() => {
    getSummary().then((res) => setSummary(res.data));
  }, [refreshKey ]);

  return (
    <div className="panel">
      <h3>Spend by category</h3>
      <ResponsiveContainer width="100%" height={265}>
        <PieChart>
          <Pie
            data={summary.by_category}
            dataKey="total"
            nameKey="category__name"
            outerRadius={90}
            label
          >
            {summary.by_category.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Summary;