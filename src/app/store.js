import { configureStore } from '@reduxjs/toolkit';
import sliceNameReducer from '../features/componentA/componentASlice';

export const store = configureStore({
	reducer: {
		sliceName: sliceNameReducer
	},
});
