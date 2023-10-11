import React from 'react';
import Item from '../src/client/components/item/item';
import PreviewItem from '../src/client/components/previewItem/previewItem';

const TestApp = ({data, selectedItems, handleRemoveItem}) => {
  return (
    <div data-testid="app" className="wrapper">
      <div className="menu-summary">
        <div className="container">
          <div className="row">
            <div className="col-6 menu-summary-left">
              {/* <span>{`${totalSelectedItems} items`}</span> */}
            </div>
            <div className="col-6 menu-summary-right">
            {/* {Object.entries(dietaryCounts).map(([dietary, count]) => (
              <span>{`${count}x`} 
                <span 
                  key={dietary} 
                  className="dietary">{dietary}
                </span>
              </span>
            ))} */}
            </div>
          </div>
        </div>
      </div>
      <div className="container menu-builder">
        <div className="row">
          <div className="col-4">
            <div className="filters">
              <input 
                className="form-control" 
                placeholder="Name" 
                type="text" 
                // value={searchQuery} 
                // onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ul role="item-picker" className="item-picker">
              {data.length > 0 && (
                data.map((item) => (
                  <div key={item.id} data-testid={`item-${item.id}`}>
                    <Item 
                      key={item.id} 
                      item={item} 
                      onSelect={() => handleItemSelect(item)} 
                    />
                  </div>
                ))
              )}
            </ul>
          </div>
          <div className="col-8">
            <h2>Menu preview</h2>
            <ul className="menu-preview">
              {
                selectedItems.map((selectedItem) => (
                  <PreviewItem 
                    key={selectedItem.id} 
                    selectedItem={selectedItem} 
                    handleRemoveItem={() => handleRemoveItem(selectedItem)}
                  />
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestApp;