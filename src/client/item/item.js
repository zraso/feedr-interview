import React from "react";
import './item.css';

const Item = ({ item, onSelect }) => {

   const handleItemClick = () => {
    onSelect(item);
  };
   
    return (
        <li key={item.id} className="item" onClick={handleItemClick}>
        <h2>{item.name}</h2>
          <p>
            {item.dietaries.length > 0 && (
                item.dietaries.map((dietary) => (
                    <span key={dietary} className="dietary">{dietary}</span>
                ))
            )}
          </p>
        </li>
    );
};

export default Item;