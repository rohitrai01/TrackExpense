import { useEffect, useState } from 'react';
import { getSummary } from '../api';

function Stats({ refreshKey }) {
  const [summary, setSummary] = useState({ total: 0, month_total: 0, by_category: [] });

  useEffect(() => {
    getSummary().then((res) => setSummary(res.data));
  }, [refreshKey]);

  const topCategory = summary.by_category.length > 0
    ? [...summary.by_category].sort((a, b) => b.total - a.total)[0].category__name
    : '—';

  return (
    <div className="stats-row">
      <div>
        <p className="stat-label">Total spent</p>
        <p className="stat-value">₹{summary.total}</p>
      </div>
      <div>
        <p className="stat-label">This month</p>
        <p className="stat-value">₹{summary.month_total}</p>
      </div>
      <div>
        <p className="stat-label">Top category</p>
        <p className="stat-value">{topCategory}</p>
      </div>
    </div>
  );
}

export default Stats;