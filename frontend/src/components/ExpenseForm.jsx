import { useState, useEffect } from 'react';
import { getCategories } from '../api';

function ExpenseForm({ onAdd }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ title: '', amount: '', date: '', category: '', notes: '' });

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.date) return;
    onAdd(form);
    setForm({ title: '', amount: '', date: '', category: '', notes: '' });
  };

  return (
    <div className="panel">
      <h3>Add expense</h3>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="amount" type="number" step="0.01" placeholder="Amount" value={form.amount} onChange={handleChange} />
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">-- Category --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input name="notes" placeholder="Notes (optional)" value={form.notes} onChange={handleChange} />
        <button type="submit">Add expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;