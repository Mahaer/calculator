import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	tabData:[
		{
			name:'Compound Interest',
			type: 'formula',
			formula:'A=P(1+(r/n))^nt',
			defaultVariable: 'A',
			defaultLeftSideUtilValue: 'Custom Value',
			variables:['A', 'P', 'r', 'n', 't'],
			units:{
				A:'USD',
				P:'USD',
				r:'DecimalPercentage',
				t:'yrs'
			},
			formatTypes:{
				A:'money',
				P:'money'
			},
			calculationType:{
				n:'approximation',
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
				links:{
					Wikipedia: 'https://en.wikipedia.org/wiki/Compound_interest',
					Graph: 'https://www.desmos.com/calculator/aivdjyspbo'
				}
			}
		},{
			name: 'Slope Intercept Form',
			type: 'formula',
			formula:'y = mx+b',
			defaultVariable: 'y',
			defaultLeftSideUtilValue: '',
			variables:['y', 'm', 'x', 'b'],
			units:{
				m:'DecimalFraction'
			},
			formatTypes:{},
			calculationType:{},
			leftSideUtil:{},
			definitions:{
				y:'Y value (output)',
				m:'Slope (rate of change)',
				x:'X value (input)',
				b:'Y intercept'
			},
			moreInfo:{}
		},{
			name: 'Slope',
			type: 'formula',
			formula: 'm = (Y_2 - Y_1) / (X_2 - X_1)',
			defaultVariable: 'm',
			defaultLeftSideUtilValue: '',
			variables:['m','Y_2', 'Y_1', 'X_2', 'X_1'],
			units:{
				m:'DecimalFraction'
			},
			formatTypes:{},
			calculationType:{},
			leftSideUtil:{},
			definitions:{
				m:'Slope',
				Y_2:'Y value of second coordinate',
				Y_1:'Y value of first coordinate',
				X_2:'X value of second coordinate',
				X_1:'X value of first coordinate',
			},
			moreInfo:{
				features:[
					'Coordinate 1 is equal to (X_1, Y_1)',
					'Coordinate 2 is equal to (X_2, Y_2)'
				]
			}
		},{
			name: 'General Form of a Quadratic',
			type: 'formula',
			formula: 'ax^2 + bx + c = 0',
			defaultVariable: 'x',
			defaultLeftSideUtilValue: '',
			variables: ['x', 'a', 'b', 'c'],
			units:{},
			formatTypes:{},
			calculationType:{},
			leftSideUtil:{},
			definitions:{
				x: 'Variable',
				a: 'Quadratic coefficient',
				b: 'Linear coefficient',
				c: 'Constant term'
			},
			moreInfo:{
				features:[
					'Complex numbers are not supported, use the quadratic formula calculator'
				]
			}
		},{
			name: 'Quadratic Formula',
			type: 'formula',
			formula: 'x = (-b ± √(b^2 - 4ac)) / 2a',
			defaultVariable: 'x',
			defaultLeftSideUtilValue: '',
			variables: ['x', 'a', 'b', 'c'],
			units:{},
			formatTypes:{},
			calculationType:{},
			leftSideUtil:{},
			definitions:{
				x: 'Variable',
				a: 'Quadratic coefficient',
				b: 'Linear coefficient',
				c: 'Constant term'
			},
			moreInfo:{}
		},{
			name: 'Vertex Form of a Quadratic',
			type: 'formula',
			formula: 'y = a(x-h)^2 + k',
			defaultVariable: 'y',
			defaultLeftSideUtilValue: '',
			variables: ['y', 'a', 'x', 'h', 'k'],
			units:{},
			formatTypes:{},
			calculationType:{},
			leftSideUtil:{},
			definitions:{
				y: 'Y value',
				a: 'Stretch and direction of parabola',
				x: 'X value',
				h: 'X coordinate of vertex of parabola',
				k: 'Y coordinate of vertex of parabola'
			},
			moreInfo:{
				features:[
					'Use the axis of symmertry calculator to find h',
					'(h, k) is the vertex of the parabola',
					'The axis of symmetry is x = h',
					'If a > 0, then the maximum value of y is k',
					'If a < 0, then the minimum value of y is k'
				]
			}
		},{
			name: 'Axis of Symmetry',
			type: 'formula',
			formula: 'h = -b/2a',
			defaultVariable: 'h',
			defaultLeftSideUtilValue: '',
			variables: ['h', 'a', 'b'],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			definitions: {
				h: 'Y coordinate of the vertex',
				a: 'Quadratic coefficient',
				b: 'Linear coefficient'
			},
			moreInfo: {
				features:[
					'Use general form of a quadratic calculator to find k(subsitute x with h)',
					'(h, k) is the vertex of the parabola',
					'The axis of symmetry is x = h',
					'If a > 0, then the maximum value of y is k',
					'If a < 0, then the minimum value of y is k'
				]
			}
		},{
			name: 'Arithmetic Sequence (Explicit Formula)',
			type: 'formula',
			formula: 'a_n = a_1 + (n-1)d',
			defaultVariable: 'a_n',
			defaultLeftSideUtilValue: '',
			variables: ['a_n', 'a_1', 'n', 'd'],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			definitions:{
				a_n: 'Nth term of the sequence',
				a_1: 'First term of the sequence',
				n: 'Position of the term in the sequence',
				d: 'Difference between two consecutive terms'
			},
			moreInfo: {}
		},{
			name: 'Arithmetic Recursive Sequence',
			type: 'formula',
			formula: 'a_n = a_n-1 + d',
			defaultVariable: 'a_n',
			defaultLeftSideUtilValue: {},
			variables:[
				'a_n', 'a_n-1', 'a_1', 'n', 'd'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			definitions: {
				a_n: 'Nth term of the sequence',
				'a_n-1': 'Term before the nth term',
				a_1: 'First term of the sequence',
				n: 'Position of the term in the sequence',
				d: 'Difference between two consecutive terms'
			},
			moreInfo:{
				features:[
					'The first term isn\'t in the formula but still necessary for finding n'
				]
			}
		},{
			name: 'Arithmetic General Sum Formula',
			type: 'formula',
			formula: 'S_n = (n - 2) * (2a_1 + (n-1)d)',
			defaultVariable: 'S_n',
			defaultLeftSideUtilValue: '',
			variables: [
				'S_n', 'a_1', 'n', 'd'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			definitions: {
				S_n: 'Sum of the first n terms',
				a_1: 'First term of the sequence',
				n: 'Number of terms',
				d: 'Difference between two consecutive terms'
			},
			moreInfo: {
				features: [
					'If d is unknown but a_n is given, use the arithmetic alternate sum formula calculator'
				]
			}
		}
	],
	tabs:[
		{
			id:1,
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
	currentTabId: 1,
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
		},
		switchTabs: (state, action) => {
			state.currentTabId = action.payload
		},
		addTab: (state, action) => {
			const {name} = action.payload
			const currentTabData = state.tabData.find(obj => obj.name === name)
			if(currentTabData){
				if(currentTabData.type === 'formula'){
					state.tabs.push({
						id:state.tabs.at(-1)?.id + 1,
						mode: currentTabData.name,
						type: currentTabData.type,
						variables: currentTabData.variables.reduce((acc, curr) => ({ ...acc, [curr]: curr }), {}),
						selectedVariable: currentTabData.defaultVariable,
						leftSideUtilValue: currentTabData.defaultLeftSideUtilValue,
						answer: 'Error: missing variable/s',
						conversions: {}
					})
				}
				state.currentTabId = state.tabs[state.tabs.length - 1].id
			}
		},
		removeTab: (state, action) => {
			const idToRemove = action.payload
			state.tabs = state.tabs.filter(tab => tab.id !== idToRemove);

			state.tabs = state.tabs.map((tab, index) => ({
				...tab,
				id: index + 1  // Set the new id based on the index (1-based id)
			}));

			if (state.currentTabId > idToRemove) {
				// If currentTabId is greater than the removed tab id, decrease it
				state.currentTabId -= 1;
			  } else if (state.currentTabId === idToRemove) {
				// If currentTabId is the same as the removed tab id, adjust it
				if (state.currentTabId === state.tabs.length + 1) {
				  // If it’s the last tab, decrement currentTabId
				  state.currentTabId -= 1;
				}
			  }
		}
	}
});

		export const { 
			updateInputs, 
			changeSelectedVariable, 
			getAnswer, 
			changeLeftSideUtilValue,
			switchTabs,
			addTab,
			removeTab
		} = calculatorSlice.actions
		// Exports the action creators formed by createSlice()
		
		export const selectTabData = (state) => state.calculator.tabData;
		export const selectTabs = (state) => state.calculator.tabs;
		export const selectCurrentTabId = (state) => state.calculator.currentTabId;
		// Exports an example selector, which is a specific value

		export default calculatorSlice.reducer;
