import React, { useState, useEffect } from "react"; 
import "./App.css";

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
    // Trigger the animation by adding a CSS class
    const row = document.getElementById(`row-${id}`);
    if (row) {
      row.classList.add("deleting");
      setTimeout(() => {
        fetch(`http://localhost:5002/items/${id}`, { method: "DELETE" })
          .then(() => setItems(items.filter((item) => item._id !== id)));
      }, 500); // Delay to allow animation to complete
    }
  };

  return (
    <div>
      <h1>EXPENSE TRACKER</h1>
      <h2>Item List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr id={`row-${item._id}`} key={item._id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Item</h2>
      <div className="add-new-item-table">
        <div className="input-row">
          <div className="input-cell">
            <input
              placeholder="Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </div>
          <div className="input-cell">
            <input
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            />
          </div>
        </div>
        <div className="input-row">
          <button onClick={addItem}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;
