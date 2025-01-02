import React, { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });

  useEffect(() => {
    fetch("http://localhost:5002/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const addItem = () => {
    fetch("http://localhost:5002/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((data) => setItems([...items, data]));
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:5002/items/${id}`, { method: "DELETE" })
      .then(() => setItems(items.filter((item) => item._id !== id)));
  };

  return (
    <div>
      <h1>Item List</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name}: ${item.price}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add New Item</h2>
      <input
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        placeholder="Price"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
      />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

export default App;