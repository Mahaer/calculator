import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	dropdown:{
		dropdownOptions:{
			hi:'bye'
		}
	},
};

export const tabSlice = createSlice({
	name: 'tab',
	initialState: initialState,
	reducers: {
		jchrsfjyucsgdjhhbg: (state, action) => {
			let {id, variable, value} = action.payload;
			state.tabs.find(obj => obj.id === id).variables[variable] = value;
		}
	}
});

		export const { jchrsfjyucsgdjhhbg } = tabSlice.actions
		// Exports the action creators formed by createSlice()
		
		// Exports an example selector, which is a specific value

		export default tabSlice.reducer;
