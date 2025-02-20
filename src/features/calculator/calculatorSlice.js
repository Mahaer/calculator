import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	tabData:[
		{
			name:'Compound Interest',
			type: 'formula',
			formula:'A=P(1+(r/n))^nt',
			defaultVariable: 'A',
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
				r:'DecimalPercentage',
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
			},
			leftSideUtil:{
				title: 'Compound Frequency',
				omittedVariable: 'n',
				values:{
					Biennially: 0.5,
					Annually: 1,
					Biannually: 2,
					Quarterly: 4,
					Monthly: 12,
					Weekly: 52.14,
					Daily: 365,
				},
			},
			definitions:{
				A:'Final amount',
				P:'Principal(initial) amount',
				r:'Annual interest rate(decimal)',
				n:'Annual compounding frequency',
				t:'Time in years'
			},
			moreInfo:{
				features:[
					'You can use the up/down arrows to switch between inputs'
				],
				links:{
					Wikipedia: 'https://en.wikipedia.org/wiki/Compound_interest',
					Graph: 'https://www.desmos.com/calculator/aivdjyspbo'
				}
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
			leftSideUtilValue: 'Custom Value',
			answer: 'Error: missing variable/s',
			conversions:{}
		},
		{
			id:4,
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
			leftSideUtilValue: 'Custom Value',
			answer: 'Error: missing variable/s',
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
		},
		changeLeftSideUtilValue: (state, action) => {
			const {id, value, tD} = action.payload;
			state.tabs.find(obj => obj.id === id).leftSideUtilValue = value
			if(String(tD.leftSideUtil.values[value]) !== 'undefined'){
				state.tabs.find(obj => obj.id === id).variables[tD.leftSideUtil.omittedVariable] = String(tD.leftSideUtil.values[value])
			}
		}
	}
});

		export const { updateInputs, changeSelectedVariable, getAnswer, changeLeftSideUtilValue } = calculatorSlice.actions
		// Exports the action creators formed by createSlice()
		
		export const selectTabData = (state) => state.calculator.tabData;
		export const selectTabs = (state) => state.calculator.tabs;
		// Exports an example selector, which is a specific value

		export default calculatorSlice.reducer;
