function ExpenseList({ expenses, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th><th>Title</th><th>Category</th><th>Amount</th><th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => (
          <tr key={exp.id}>
            <td>{exp.date}</td>
            <td>{exp.title}</td>
            <td>{exp.category_name || '—'}</td>
            <td>₹{exp.amount}</td>
            <td><button onClick={() => onDelete(exp.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseList;