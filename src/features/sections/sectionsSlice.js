import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {};

export const asyncActionName = createAsyncThunk(
	'sliceName/fetchData',
	async (param) => {
		const response = await fetch('endpoint');
		
		if (!response.ok) {
			throw new Error('Network error');
		}
	
		const data = await response.json();
		return data; //payload for fulfilled action
	}
);

export const sliceNameSlice = createSlice({
	name: 'sliceName',
	initialState: initialState,
reducers: {
		exampleIncrementer: (state, action) => {
			state.value += action.payload
				}
			},
			extraReducers: (builder) => {
				builder 
				.addCase(asyncActionName.pending, (state) => {
					state.status = 'pending';
				})
				.addCase(asyncActionName.fulfilled, (state, action) => {
					state.status = 'fulfilled';
					state.value += action.payload;
				});
			}
		});

		export const { exampleIncrementer } = sliceNameSlice.actions
		// Exports the action creators formed by createSlice()
		
		export const selectExampleValue = (state) => state.sliceName.value;
		// Exports an example selector, which is a specific value

		export const incrementIfOdd = (amount) => (dispatch, getState) => {
			const currentValue = selectExampleValue(getState());
			if (currentValue % 2 === 1) {
				dispatch(exampleIncrementer(amount));
			}
		};
		// Example of a dispatch function

		export default sliceNameSlice.reducer;
