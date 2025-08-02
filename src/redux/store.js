// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';// Import the configureStore function from Redux Toolkit
// Import individual reducers from their respective slices
import carReducer from './slices/carSlice';
import cartReducer from './cartSlice';
import authReducer from './slices/authSlice'; 

const store = configureStore({
  reducer: {
    car: carReducer,// Accessible via state.car in components
    cart: cartReducer,// Accessible via state.cart
    auth: authReducer, // Accessible via state.auth
  },
});

export default store;
