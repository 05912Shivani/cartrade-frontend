import { createSlice } from '@reduxjs/toolkit';// Importing createSlice from Redux Toolkit to create a slice of the Redux store

const initialState = {// Initial state for the cart slice
  items: [], // array of car objects
};
// Creating the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {  // Action to add a car to the cart
      const exists = state.items.find(item => item.id === action.payload.id);// Check if the car already exists in the cart based on its id
      if (!exists) state.items.push(action.payload);// Only add if it doesn't already exist
    },
    removeFromCart: (state, action) => {    // Action to remove a car from the cart using its id
      state.items = state.items.filter(item => item.id !== action.payload); // Filter out the car whose id matches the payload
    },
    clearCart: (state) => {     // Action to clear the entire cart
      state.items = [];    // Reset items array to empty
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;  // Exporting the actions for dispatching in components
export default cartSlice.reducer;  // Exporting the reducer to be used in the Redux store
