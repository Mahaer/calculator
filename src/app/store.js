import { configureStore } from '@reduxjs/toolkit';
import sectionsReducer from '../features/sections/sectionsSlice';
import tabsReducer from '../features/tabs/tabsSlice';
import tabReducer from '../features/tab/tabSlice';
import calculatorReducer from '../features/calculator/calculatorSlice';

export const store = configureStore({
	reducer: {
		sections: sectionsReducer,
		tabs: tabsReducer,
		tab: tabReducer,
		calculator: calculatorReducer
	},
});
