import React, { useEffect, useState } from 'react';
import './App.css';
import Item from './item/item';

const App = () => {
  const [items, setItems] = useState([])

  const fetchItemsData = () => {
    fetch("http://localhost:8080/api/items/")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json()
    })
    .then(data => {
      setItems(data.items)
    })
    .catch(error => console.error("Error fetching items:", error))
  }

  useEffect(() => {
    fetchItemsData()
  }, [])

  return (
    <div className="wrapper">
      <div className="menu-summary">
        <div className="container">
          <div className="row">
            <div className="col-6 menu-summary-left">
              <span>6 items</span>
            </div>
            <div className="col-6 menu-summary-right">
              6x <span className="dietary">ve</span>
              4x <span className="dietary">v</span>
              12x <span className="dietary">n!</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container menu-builder">
        <div className="row">
          <div className="col-4">
            <div className="filters">
              <input className="form-control" placeholder="Name" />
            </div>
            <ul className="item-picker">
              {items.length > 0 && (
                items.map((item) => (
                  <Item key={item.id} item={item} />
                ))
              )}
            </ul>
          </div>
          <div className="col-8">
            <h2>Menu preview</h2>
            <ul className="menu-preview">
              <li className="item">
                <h2>Dummy item</h2>
                <p>
                  <span className="dietary">ve</span>
                  <span className="dietary">v</span>
                  <span className="dietary">n!</span>
                </p>
                <button className="remove-item">x</button>
              </li>
              <li className="item">
                <h2>Dummy item</h2>
                <p>
                  <span className="dietary">ve</span>
                  <span className="dietary">v</span>
                  <span className="dietary">n!</span>
                </p>
                <button className="remove-item">x</button>
              </li>
              <li className="item">
                <h2>Dummy item</h2>
                <p>
                  <span className="dietary">ve</span>
                  <span className="dietary">v</span>
                  <span className="dietary">n!</span>
                </p>
                <button className="remove-item">x</button>
              </li>
              <li className="item">
                <h2>Dummy item</h2>
                <p>
                  <span className="dietary">ve</span>
                  <span className="dietary">v</span>
                  <span className="dietary">n!</span>
                </p>
                <button className="remove-item">x</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};

export default App;