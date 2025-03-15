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
					  'Modulus (Remainder)',
					  'Factorial',
					  'Custom Arithmetic'
					],
					'Exponents and Roots': [
					  'Square',
					  'Cube',
					  'Nth Power',
					  'Square Root',
					  'Cube Root',
					  'Nth Root'
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
					  	'Algebraic Division',
						'Algebraic Proportions'
					],
					'Polynomial Equations': [
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
					]
				},
				{
					'Functions': [
						'Absolute Value Function'
					],
					'Sequences and Series': [
					  	'Arithmetic Sequence (Explicit Formula)',
					  	'Arithmetic Recursive Sequence',
					  	'Arithmetic General Sum Formula',
						'Arithmetic Alternate Sum Formula',
					  	'Geometric Sequence (Explicit Formula)',
					  	'Geometric Recursive Sequence',
					  	'Geometric Finite Sum',
						'Geometric Infinite Sum For |r| < 1'
					],
					'Complex Numbers': [
					  	'Algebraic Addition of Complex Numbers',
					  	'Algebraic Subtraction of Complex Numbers',
					  	'Algebraic Multiplication of Complex Numbers',
					  	'Algebraic Division of Complex Numbers',
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
					'Perimeter': [
						'Rectangle Perimeter',
						'Square Perimeter',
						'Triangle Perimeter',
						'Right Triangle Perimeter',
						'Circle Circumference',
						'Ellipse Perimeter',
						'Parallelogram Perimeter',
						'Trapezoid Perimeter',
						'Rhombus Perimeter',
						'Regular Polygon (n-sided)',
						'Pythagorean Theorm'
					],
					'Surface Area': [
						'Cube Surface Area',
						'Rectangular Prism Surface Area',
						'Sphere Surface Area',
						'Hemisphere Surface Area',
						'Ellipsoid Surface Area',
						'Torus (Donut) Surface Area',
						'Cylinder Surface Area',
						'Cone Surface Area',
						'Pyramid Surface Area',
						'Regular Tetrahedron Surface Area',
						'Regular Octahedron Surface Area',
						'Regular Dodecahedron Surface Area',
						'Regular Icosahedron Surface Area',
						'Frustum of a Cone (Surface Area)',
						'Frustum of a Pyramid (Surface Area)'
					]
				},
				{
					'Area': [
						'Triangle Area',
						'Equilateral Triangle Area',
						'Rectangle Area',
						'Square Area',
						'Circle Area',
						'Trapezoid Area',
						'Parallelogram Area',
						'Ellipse Area',
						'Rhombus Area',
						'Circle Sector Area',
						'Pentagon Area',
						'Hexagon Area',
						'Octagon Area',
						'Regular Polygon Area (n-sided)'
					],
					'Volume': [
						'Cube Volume',
						'Rectangular Prism Volume',
						'Polyhedral Prism Volume (n-sided)',
						'Sphere Volume',
						'Hemisphere Volume',
						'Ellipsoid Volume',
						'Torus (Donut) Volume',
						'Cylinder Volume',
						'Cone Volume',
						'Pyramid Volume',
						'Regular Tetrahedron Volume',
						'Regular Octahedron Volume',
						'Regular Dodecahedron Volume',
						'Regular Icosahedron Volume',
						'Frustum of a Cone (Volume)',
						'Frustum of a Pyramid (Volume)'
					]
				},
				{
					'2D Shape Diagrams': [
						'Triangle',
						'Right Triangle',
						'Isosceles Triangle',
						'Quadrilateral',
						'Trapezoid',
						'Parallelogram',
						'Rhombus',
						'Rectangle',
						'Square Diagram',
						'Circle',
						'Ellipse',
						'Regular Pentagon',
						'Regular Hexagon',
						'Regular Octagon'
					],
					'3D Shape Diagrams': [
						'Cube Diagram',
						'Rectangular Prism',
						'Pentagonal Prism',
						'Hexagonal Prism',
						'Sphere',
						'Hemisphere',
						'Ellipsoid',
						'Cone',
						'Pyramid'
					]
				},
				{
					'Trigonometry': [
						'Sine (sin)',
						'Cosine (cos)',
						'Tangent (tan)',
						'Cosecant (csc)',
						'Secant (sec)',
						'Cotangent (cot)',
						'Arcsine (arcsin)',
						'Arccosine (arccos)',
						'Arctangent (arctan)',
						'Arccosecant (arccsc)',
						'Arcsecant (arcsec)',
						'Arccotangent (arccot)',
						'Law of Sines',
						'Law of Cosines',
						'Law of Tangents',
						'Area of a Triangle',
					],
					'Trigonometric Identities': [
						'Angle Sum and Difference (sin)',
						'Angle Sum and Difference (cos)',
						'Angle Sum and Tangent (tan)',
						'Double Angle For Angle 2𝜃 (sin)',
						'Double Angle For Angle 2𝜃 (cos)',
						'Double Angle For Angle 2𝜃 (tan)',
						'Half Angle For Angle 𝜃/2 (sin)',
						'Half Angle For Angle 𝜃/2 (cos)',
						'Half Angle For Angle 𝜃/2 (tan)',
						'Sum-to-Product',
						'Product-to-Sum'
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
	reducers: {}
});
		
export const selectSections = (state) => state.sections.sections;
export default sectionsSlice.reducer;
