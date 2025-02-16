import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	tabs:[
		'Custom Arithmetic',
		'Pythagorean Theorm',
		'Compound Interest'
	],
	currentTab: 'Custom Arithmetic'
};

export const tabsSlice = createSlice({
	name: 'tabs',
	initialState: initialState,
	reducers: {
		changeTabs: (state, action) => {
			state.currentTab = action.payload
		}
	},
});

export const { changeTabs } = tabsSlice.actions
// Exports the action creators formed by createSlice()
		
export const selectTabs = (state) => state.tabs;
// Exports an example selector, which is a specific value

export default tabsSlice.reducer;
