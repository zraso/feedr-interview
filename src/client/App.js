import React, { useEffect, useState } from 'react';
import './App.css';
import Item from './item/item';

const App = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [dietaryCounts, setDietaryCounts] = useState({});

  const fetchItemsData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/items/?name=${searchQuery}`)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      const data = await response.json();
      setItems(data.items)
    } catch(error) {
        console.error("Error fetching items:", error);
      }
  }

  useEffect(() => {
    fetchItemsData()
  }, [searchQuery])

  const updateDietaryCounts = (itemsToUpdate) => {
    const newDietaryCounts = {};
    itemsToUpdate.forEach(item => {
      item.dietaries.forEach(dietary => {
        newDietaryCounts[dietary] = (newDietaryCounts[dietary] || 0) + 1;
      });
    });
    setDietaryCounts(newDietaryCounts);
  };

  const handleItemSelect = (item) => {
    setSelectedItems([...selectedItems, item]);
    updateDietaryCounts(selectedItems);
  };

  const handleRemoveItem = (itemToRemove) => {
    const updatedSelectedItems = selectedItems.filter(item => item.id !== itemToRemove.id);
    setSelectedItems(updatedSelectedItems);
    updateDietaryCounts(updatedSelectedItems);
  };

  const totalSelectedItems = selectedItems.length;

  return (
    <div className="wrapper">
      <div className="menu-summary">
        <div className="container">
          <div className="row">
            <div className="col-6 menu-summary-left">
              <span>{`${totalSelectedItems} items`}</span>
            </div>
            <div className="col-6 menu-summary-right">
            {Object.entries(dietaryCounts).map(([dietary, count]) => (
              <span>
                {`${count}x`} <span key={dietary} className="dietary">{dietary}</span>
              </span>
            ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container menu-builder">
        <div className="row">
          <div className="col-4">
            <div className="filters">
              <input className="form-control" placeholder="Name" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
            <ul className="item-picker">
              {items.length > 0 && (
                items.map((item) => (
                  <Item key={item.id} item={item} onSelect={() => handleItemSelect(item)} />
                ))
              )}
            </ul>
          </div>
          <div className="col-8">
            <h2>Menu preview</h2>
            <ul className="menu-preview">
              {
                selectedItems.map(selectedItem => (
                  <li className="item" key={selectedItem.id}>
                    <h2>{selectedItem.name}</h2>
                    <p>
                      {
                        selectedItem.dietaries.map((dietary) => (
                          <span key={dietary} className="dietary">{dietary}</span>
                        ))
                      }
                    </p>
                    <button className="remove-item" onClick={() => handleRemoveItem(selectedItem)}>x</button>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};

export default App;