// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:5000/api/items');
    setItems(response.data);
  };

  const handleAddItem = async () => {
    const response = await axios.post('http://localhost:5000/api/items', {
      name: newItemName,
    });
    setItems([...items, response.data]);
    setNewItemName('');
  };

  const handleDeleteItem = async (itemId) => {
    await axios.delete(`http://localhost:5000/api/items/${itemId}`);
    setItems(items.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
}

export default App;
