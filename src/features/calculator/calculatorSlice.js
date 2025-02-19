import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	tabData:[
		{
			name:'Compound Interest',
			type: 'formula',
			formula:'A=P(1+(r/n))^nt',
			variables:{
				A:'A',
				P:'P',
				r:'r',
				n:'n',
				t:'t'
			},
			units:{
				A:'USD',
				P:'USD',
				r:'',
				n:'',
				t:'yrs'
			},
			formatTypes:{
				A:'money',
				P:'money',
				r:'standard',
				n:'standard',
				t:'standard'
			},
			calculationType:{
				A:'exact',
				P:'exact',
				r:'exact',
				n:'approximation',
				t:'exact'
			}
		}
	],
	tabs:[
		{
			id:1,
			mode: 'Custom Arithmetic',
			type: ''
		},
		{
			id:2,
			mode: 'Pythagorean Theorm',
			type: 'formula'
		},
		{
			id:3,
			mode: 'Compound Interest',
			type: 'formula',
			variables:{
				A:'A',
				P:'P',
				r:'r',
				n:'n',
				t:'t'
			},
			selectedVariable:'A',
			answer: 'Error: missing variable/s',
			conversions:{}
		},
		{
			id:4,
			mode: 'Compound Interest',
			type: 'formula',
			variables:{
				A:'1',
				P:'2',
				r:'3',
				n:'4',
				t:'5'
			},
			selectedVariable:'A',
			conversions:{}
		},
	],
	currentMode:'Compound Interest',
	currentTabId: 3,
	currentTabType: 'formula'
};

export const calculatorSlice = createSlice({
	name: 'calculator',
	initialState: initialState,
	reducers: {
		updateInputs: (state, action) => {
			const {id, variable, value} = action.payload;
			state.tabs.find(obj => obj.id === id).variables[variable] = value;
		},
		changeSelectedVariable: (state, action) => {
			const {id, value} = action.payload;
			state.tabs.find(obj => obj.id === id).selectedVariable = value
		},
		getAnswer: (state, action) => {
			const {id, answer, selectedVariable} = action.payload;
			state.tabs.find(obj => obj.id === id).variables[selectedVariable] = String(answer)
			state.tabs.find(obj => obj.id === id).answer = String(answer)
		}
	}
});

		export const { updateInputs, changeSelectedVariable, getAnswer } = calculatorSlice.actions
		// Exports the action creators formed by createSlice()
		
		export const selectTabData = (state) => state.calculator.tabData;
		export const selectTabs = (state) => state.calculator.tabs;
		// Exports an example selector, which is a specific value

		export default calculatorSlice.reducer;
