// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', date: '', type: '', amount: 0 });
  const [maxMonthlyExpense, setMaxMonthlyExpense] = useState(10000);
  const [dashboardData, setDashboardData] = useState({ totalExpense: 0, isCloseToLimit: false });

  useEffect(() => {
    fetchExpenses();
    fetchMaxMonthlyExpense();
    fetchDashboardData();
  }, []);

  const fetchExpenses = async () => {
    const response = await axios.get('http://localhost:5001/api/expenses');
    setExpenses(response.data);
  };

  const fetchMaxMonthlyExpense = async () => {
    const response = await axios.get('http://localhost:5001/api/maxMonthlyExpense');
    setMaxMonthlyExpense(response.data.maxMonthlyExpense);
  };

  const fetchDashboardData = async () => {
    const response = await axios.get('http://localhost:5001/api/dashboard');
    setDashboardData(response.data);
  };

  const handleAddExpense = async () => {
    const response = await axios.post('http://localhost:5001/api/expenses', newExpense);
    setExpenses([...expenses, response.data]);
    setNewExpense({ description: '', date: '', type: '', amount: 0 });
  };

  const handleUpdateExpense = async (expenseId, updatedExpense) => {
    await axios.put(`http://localhost:5001/api/expenses/${expenseId}`, updatedExpense);
    setExpenses(expenses.map((expense) => (expense.id === expenseId ? { ...expense, ...updatedExpense } : expense)));
  };

  const handleDeleteExpense = async (expenseId) => {
    await axios.delete(`http://localhost:5001/api/expenses/${expenseId}`);
    setExpenses(expenses.filter((expense) => expense.id !== expenseId));
  };

  const handleMaxExpenseChange = async () => {
    await axios.put('http://localhost:5001/api/maxMonthlyExpense', { maxExpense: maxMonthlyExpense });
  };

  return (
    <div>
      <h1>Personal Expense Tracking Web App</h1>
      <h2>Dashboard</h2>
      <p>Total Monthly Expense: {dashboardData.totalExpense} LKR</p>
      {dashboardData.isCloseToLimit && <p>Your expenses are close to the monthly limit!</p>}
      <h2>Set Max Monthly Expense Limit</h2>
      <div>
        <input
          type="number"
          value={maxMonthlyExpense}
          onChange={(e) => setMaxMonthlyExpense(parseInt(e.target.value))}
        />
        <button onClick={handleMaxExpenseChange}>Set Limit</button>
      </div>
      <h2>Add Expense</h2>
      <div>
        <input
          type="text"
          placeholder="Description"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
        />
        <input
          type="date"
          value={newExpense.date}
          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type"
          value={newExpense.type}
          onChange={(e) => setNewExpense({ ...newExpense, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: parseInt(e.target.value) })}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <p>Description: {expense.description}</p>
            <p>Date: {expense.date}</p>
            <p>Type: {expense.type}</p>
            <p>Amount: {expense.amount} LKR</p>
            <button onClick={() => handleUpdateExpense(expense.id, { description: 'Updated Description' })}>
              Update
            </button>
            <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
