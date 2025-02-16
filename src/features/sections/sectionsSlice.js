import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	sections:[
		{
			name:'Basic Operations',
			categories:[
				[
					{
						categoryName: 'Arithmetic',
						subCategories:[
							'Addition',
							'Subtraction',
							'Multiplication',
							'Division',
							'Modulus',
							'Custom Arithmetic'
						]
					},
					{
						categoryName: 'Exponents and Roots',
						subCategories:[
							'Square',
							'Cube',
							'Higher power',
							'Square root',
							'Cube root',
							'Nth root'
						]
					}
				]
			]
		},
		{
			name:'Algebra',
			categories:[
				[
					{
						categoryName: 'Arithmetic Operations',
						subCategories:[
							'Addition',
							'Subtraction',
							'Multiplication',
							'Division'
						]
					},
					{
						categoryName: 'Polynomial Equations and Functions',
						subCategories:[
							'Slope intercept form',
							'Slope',
							'General Form of a Quadratic',
							'Quadratic Formula',
							'Vertex Form of a Quadratic',
							'Cubic Formula',
							'Polynomial Equations',
							'Add Polynomials',
							'Subtract Polynomials',
							'Multiply Polynomials',
							'Divide Polynomials',
							'Absolute Value Function'
						]
					}
				],
				[
					{
						categoryName: 'Systems of Equations',
						subCategories:[
							'Two variable systems',
							'Three variable systems',
							'Systems with more than three variables',
						]
					},
					{
						categoryName: 'Sequences and Series',
						subCategories:[
							'Arithmetic sequence',
							'Arthmetic recursive sequence',
							'Sum of first N terms in arithmetic sequence',
							'Geometric sequence',
							'Geometric recursive sequence',
							'Sum of first N terms in geometric sequence',
						]
					},
					{
						categoryName: 'Complex Numbers',
						subCategories:[
							'Addition',
							'Subtraction',
							'Multiplication',
							'Division',
							'Polar form',
							'Euler\'s formula',
							'Complex conjugate'
						]
					}
				]
			]
		},
		{
			name:'Geometry',
			categories:[
				[
					{
						categoryName: 'Mock Heading',
						subCategories:[
							'Mock category'
						]
					}
				]
			]
		},
		{
			name:'Calculus',
			categories:[
				[
					{
						categoryName: 'Mock Heading',
						subCategories:[
							'Mock category'
						]
					}
				]
			]
		},
		{
			name:'Physics',
			categories:[
				[
					{
						categoryName: 'Mock Heading',
						subCategories:[
							'Mock category'
						]
					}
				]
			]
		},
		{
			name:'Statistics',
			categories:[
				[
					{
						categoryName: 'Mock Heading',
						subCategories:[
							'Mock category'
						]
					}
				]
			]
		},
		{
			name:'Finance and Economics',
			categories:[
				[
					{
						categoryName: 'Mock Heading',
						subCategories:[
							'Mock category'
						]
					}
				]
			]
		},
		{
			name:'Conversions',
			categories:[
				[
					{
						categoryName: 'Mock Heading',
						subCategories:[
							'Mock category'
						]
					}
				]
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
