import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	sections:[
		{
			name:'Basic Operations',
			categories:[
				{
					'Arithmetic': [
					  'Addition',
					  'Subtraction',
					  'Multiplication',
					  'Division',
					  'Modulus',
					  'Custom Arithmetic'
					],
					'Exponents and Roots': [
					  'Square',
					  'Cube',
					  'Nth power',
					  'Square root',
					  'Cube root',
					  'Nth root'
					]
				},
				{
					'Fractions': [
						'Adding Fractions',
						'Subtracting Fractions',
						'Multiplying Fractions',
						'Dividing Fractions'
					],
					'Complex Numbers': [
						'Adding Complex Numbers',
						'Subtracting Complex Numbers',
						'Multiplying Complex Numbers',
						'Dividing Complex Numbers'
					]
				} 
			]
		},
		{
			name:'Algebra',
			categories:[
				{
					'Arithmetic Operations': [
					  	'Algebraic Addition',
					  	'Algebraic Subtraction',
					  	'Algebraic Multiplication',
					  	'Algebraic Division'
					],
					'Polynomial Equations and Functions': [
					  	'Slope Intercept Form',
					  	'Slope',
					  	'General Form of a Quadratic',
					  	'Quadratic Formula',
						'Axis of Symmetry',
					  	'Vertex Form of a Quadratic',
					  	'Polynomial Equations',
					  	'Add Polynomials',
					  	'Subtract Polynomials',
					  	'Multiply Polynomials',
					  	'Divide Polynomials',
					  	'Absolute Value Function'
					]
				},
				{
					'Systems of Equations': [
					  	'Two Variable Systems',
					  	'Three Variable Systems',
					  	'Systems with more than three Variables'
					],
					'Sequences and Series': [
					  	'Arithmetic Sequence (Explicit Formula)',
					  	'Arithmetic Recursive Sequence',
					  	'Arithmetic General Sum Formula',
						'Arithmetic Alternate Sum Formula',
					  	'Geometric Sequence (Explicit Formula)',
					  	'Geometric Recursive Sequence',
					  	'Sum of Finite Geometric Sequence',
						'Sum of Infinite Geometric Sequence (|r| < 1)'
					],
					'Complex Numbers': [
					  	'Algebraic Addition of Complex Numbers',
					  	'Algebraic Subtraction of Complex Numbers',
					  	'Algebraic Multiplication of Complex Numbers',
					  	'Algebraic Division of Compelx Numbers',
					  	'Polar form',
					  	'Euler\'s formula',
					  	'Complex conjugate'
					]
				}
			]
		},
		{
			name:'Geometry',
			categories:[
				{
					'Mock Heading': [
						'Pythagorean Theorm'
					]
				}
			]
		},
		{
			name:'Calculus',
			categories:[
				{
					'Mock Heading': [
						'Mock category'
					]
				}
			]
		},
		{
			name:'Physics',
			categories:[
				{
					'Mock Heading': [
						'Mock category'
					]
				}
			]
		},
		{
			name:'Statistics',
			categories:[
				{
					'Aspects of a Dataset': [
						'Mean',
						'Median',
						'Mode',
						'Range',
						'All in One'
					]
				}
			]
		},
		{
			name:'Finance and Economics',
			categories:[
				{
					'Mock Heading': [
						'Compound Interest'
					]
				}
			]
		},
		{
			name:'Conversions',
			categories:[
				{
					'Mock Heading': [
						'Mock category'
					]
				}
			]
		}
	]
};

export const sectionsSlice = createSlice({
	name: 'sections',
	initialState: initialState,
	reducers: {
		exampleIncrementer: (state, action) => {
			state.sections += action.payload
				}
			},
	});

		export const { exampleIncrementer } = sectionsSlice.actions
		// Exports the action creators formed by createSlice()
		
		export const selectSections = (state) => state.sections.sections;
		// Exports an example selector, which is a specific value


		export default sectionsSlice.reducer;
