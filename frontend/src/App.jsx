import { useEffect, useState } from 'react';
import { getExpenses, createExpense, deleteExpense } from './api';
import Login from './components/Login';
import Register from './components/Register';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import Stats from './components/Stats';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isAuthed, setIsAuthed] = useState(!!localStorage.getItem('access'));
  const [showRegister, setShowRegister] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (isAuthed) fetchExpenses();
  }, [isAuthed]);

  const fetchExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
  };

   const handleAdd = async (expense) => {
    await createExpense(expense);
    fetchExpenses();
    setRefreshKey((k) => k + 1);
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
    setRefreshKey((k) => k + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthed(false);
  };

  if (!isAuthed) {
    return showRegister ? (
      <div className="auth-container">
        <Register onRegistered={() => setShowRegister(false)} />
        <button className="auth-toggle" onClick={() => setShowRegister(false)}>Back to login</button>
      </div>
    ) : (
      <div className="auth-container">
        <Login onLogin={() => setIsAuthed(true)} />
        <button className="auth-toggle" onClick={() => setShowRegister(true)}>Need an account?</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header-row">
        <h1>Expense Tracker</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Stats refreshKey={refreshKey} />
      <div className="grid-2">
        <ExpenseForm onAdd={handleAdd} />
        <Summary refreshKey={refreshKey} />
      </div>
      <ExpenseList expenses={expenses} onDelete={handleDelete} />
    </div>
  );
}

export default App;