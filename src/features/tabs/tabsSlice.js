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
		},
		//Remember to add ids to each tabs name when you do removeTabs. This'll make sure the only tab that closes is the one that was clicked on, not the FIRST or ALL instances of the same name
	},
});

export const { changeTabs } = tabsSlice.actions
// Exports the action creators formed by createSlice()
		
export const selectTabs = (state) => state.tabs;
// Exports an example selector, which is a specific value

export default tabsSlice.reducer;
