import { configureStore } from '@reduxjs/toolkit';
import sectionsReducer from '../features/sections/sectionsSlice';

export const store = configureStore({
	reducer: {
		sections: sectionsReducer
	},
});
