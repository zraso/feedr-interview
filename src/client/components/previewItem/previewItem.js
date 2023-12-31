import React from "react";
import './previewItem.css';

const PreviewItem = ({selectedItem, handleRemoveItem}) => {

  const handleItemClick = () => {
    handleRemoveItem(selectedItem);
  };
   
  return (
    <li className="item" key={selectedItem.id}>
      <h2>{selectedItem.name}</h2>
        <p>
          {
            selectedItem.dietaries.map((dietary) => (
              <span key={dietary} className="dietary">{dietary}</span>
            ))
          }
        </p>
      <button role="remove" className="remove-item" onClick={handleItemClick}>x</button>
    </li>
  );
};

export default PreviewItem;