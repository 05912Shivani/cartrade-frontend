// import { createSlice } from '@reduxjs/toolkit';
// import mockCars from '../../data/mockCars';

// const carSlice = createSlice({
//   name: 'car',
//   initialState: {
//     cars: mockCars,
//     trim: {},
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     getCars(state) {
//       state.cars = mockCars;
//     },
//     loadTrim(state, action) {
//       const { make, model } = action.payload;
//       const car = mockCars.find(
//         (c) => c.make.toLowerCase() === make.toLowerCase() && c.model.toLowerCase() === model.toLowerCase()
//       );
//       if (car) {
//         state.trim = car;
//       } else {
//         state.error = 'Car not found';
//       }
//     },
//   },
// });

// export const { getCars, loadTrim } = carSlice.actions;
// export default carSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch cars
export const fetchCars = createAsyncThunk('car/fetchCars', async () => {
  const options = {
    method: 'GET',
    url: 'https://car-data.p.rapidapi.com/cars',
    params: { limit: '10', page: '0' },
    headers: {
      'x-rapidapi-key': 'c98690a536msh6c5d8d0210b22d1p112baejsn1f8b4527433d',
      'x-rapidapi-host': 'car-data.p.rapidapi.com'
    }
  };

  const response = await axios.request(options);
  return response.data;
});

const carSlice = createSlice({
  name: 'car',
  initialState: {
    cars: [],
     trim: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
export const { getCars, loadTrim } = carSlice.actions;

export default carSlice.reducer;
