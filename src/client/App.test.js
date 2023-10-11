import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen, userEvent } from '@testing-library/react';
import App from './App';
import TestApp from '../../testing/testApp';

const mockData = [{
  id: 1001,
  name: 'Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens',
  dietaries: ['v', 've', 'df', 'gf', 'n!']
},
{
  id: 1002,
  name: 'Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots',
  dietaries: ['gf', 'df', 'rsf']
}]

let selectedItems = [];

const handleRemoveItem = (itemToRemove) => {
  const finalItems = selectedItems.filter(item => item.id !== itemToRemove.id);
  selectedItems = finalItems;
};

console.error = () => {};

describe('App tests', () => {
  it('renders the App component', () => {
    render(<App />)
    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();
  })

  global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: [] }),
    })
  );

  it('fetches data when search query changes', async () => {
    const { findByPlaceholderText } = render(<App />);
    const input = await findByPlaceholderText('Name');

    fireEvent.change(input, { target: { value: 'example' } });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/items/?name=example');
  });

  it('should add an item to the menu when an item is clicked', async () => {
    render(<TestApp data={mockData} selectedItems={selectedItems} handleRemoveItem={handleRemoveItem}/>);
    const itemToAdd = await screen.findByTestId('item-1001');
  
    await act(async () => {
      userEvent.click(itemToAdd);
    });
  
    const menuItem = screen.getAllByText('Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens');
    expect(menuItem.length).toBe(2);
  });

  it('should remove an item from the menu when "(x)" is clicked', async () => {
    render(<TestApp data={mockData} selectedItems={selectedItems} handleRemoveItem={handleRemoveItem} />);
    // const itemToAdd = screen.getByTestId('item-1001');

    // await act(async () => {
    //   fireEvent.click(itemToAdd);
    // });

    const removeItemButton = screen.getByRole("remove");

    await act(async () => {
      fireEvent.click(removeItemButton);
    });

    // Verify that the item has been removed from the Menu Preview
    const menuItem = screen.getAllByText('Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens');
    expect(menuItem.length).toBe(1);
  });
})