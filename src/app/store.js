import { configureStore } from '@reduxjs/toolkit';
import sectionsReducer from '../features/sections/sectionsSlice';
import tabReducer from '../features/tab/tabSlice';
import calculatorReducer from '../features/calculator/calculatorSlice';

export const store = configureStore({
	reducer: {
		sections: sectionsReducer,
		tab: tabReducer,
		calculator: calculatorReducer
	},
});
