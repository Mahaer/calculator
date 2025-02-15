import { configureStore } from '@reduxjs/toolkit';
// import sliceNameReducer from '../features/navbar/navbarSlice';

export const store = configureStore({
	reducer: {
		// sliceName: sliceNameReducer
	},
});
