import { configureStore } from '@reduxjs/toolkit';
import sectionsReducer from '../features/sections/sectionsSlice';
import tabsReducer from '../features/tabs/tabsSlice';

export const store = configureStore({
	reducer: {
		sections: sectionsReducer,
		tabs: tabsReducer
	},
});
