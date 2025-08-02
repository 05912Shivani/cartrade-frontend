// src/redux/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';// Import createSlice to define a Redux slice using Redux Toolkit

const savedUser = JSON.parse(localStorage.getItem('userInfo'));// Try to retrieve any saved user info from localStorage (helps persist login state)

// Define the initial authentication state
const initialState = {
  isAuthenticated: !!savedUser,
  user: savedUser || null,
};

// Create a slice named 'auth' to manage authentication-related state and actions
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
       // Handle user login
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
     // Handle user logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
