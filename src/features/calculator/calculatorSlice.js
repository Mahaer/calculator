import { createSlice } from '@reduxjs/toolkit';
import { isUndefined } from 'mathjs';

const initialState = {
	tabData:[
		{
			name: 'Addition',
			type: 'array_expression',
			defaultVariable: 'S',
			defaultLeftSideUtilValue: '2',
			startCharacter: '(',
			endCharacter: ')',
			wrapCharacters: true,
			splitCharacter: '+',
			lessThanZeroParen:true,
			variables:[
				'S', [
					'a',
					'b'
				]
			]
		},{
			name: 'Subtraction',
			type: 'array_expression',
			defaultVariable: 'D',
			defaultLeftSideUtilValue: '2',
			startCharacter: '(',
			endCharacter: ')',
			wrapCharacters: true,
			splitCharacter: '-',
			lessThanZeroParen:true,
			variables:[
				'D', [
					'a',
					'b'
				]
			]
		},{
			name: 'Multiplication',
			type: 'array_expression',
			defaultVariable: 'P',
			defaultLeftSideUtilValue: '2',
			startCharacter: '(',
			endCharacter: ')',
			wrapCharacters: true,
			splitCharacter: '×',
			lessThanZeroParen:true,
			variables:[
				'P', [
					'a',
					'b'
				]
			]
		},{
			name: 'Division',
			type: 'array_expression',
			defaultVariable: 'Q',
			defaultLeftSideUtilValue: '2',
			startCharacter: '(',
			endCharacter: ')',
			wrapCharacters: true,
			splitCharacter: '÷',
			lessThanZeroParen:true,
			variables:[
				'Q', [
					'a',
					'b'
				]
			]
		},{
			name: 'Modulus (Remainder)',
			type: 'formula_expression',
			formula: 'r = a % b',
			defaultVariable: 'r',
			variables: [
				'r', 'a', 'b'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Factorial',
			type: 'formula_expression',
			formula: 'x = n!',
			defaultVariable: 'x',
			variables: [
				'x', 'n'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Square',
			type: 'formula_expression',
			formula: 'y = x^2',
			defaultVariable: 'y',
			variables: [
				'y', 'x'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Cube',
			type: 'formula_expression',
			formula: 'y = x^3',
			defaultVariable: 'y',
			variables: [
				'y', 'x'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Nth Power',
			type: 'formula_expression',
			formula: 'y = x^n',
			defaultVariable: 'y',
			variables: [
				'y', 'x', 'n'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Square Root',
			type: 'formula_expression',
			formula: 'y = sqrt(x)',
			defaultVariable: 'y',
			variables: [
				'y', 'x'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Cube Root',
			type: 'formula_expression',
			formula: 'y = cbrt(x)',
			defaultVariable: 'y',
			variables: [
				'y', 'x'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Nth Root',
			type: 'formula_expression',
			formula: 'y = n root of x',
			defaultVariable: 'y',
			variables: [
				'y', 'x', 'n'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Adding Fractions',
			type: 'formula_expression',
			formula: 'S = a/b + c/d',
			fraction: true,
			defaultVariable: 'S',
			variables: [
				'S', 'a', 'b', 'c', 'd'
			],
			units: {
				S: 'Fraction'
			},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Subtracting Fractions',
			type: 'formula_expression',
			formula: 'D = a/b - c/d',
			fraction: true,
			defaultVariable: 'D',
			variables: [
				'D', 'a', 'b', 'c', 'd'
			],
			units: {
				D: 'Fraction'
			},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Multiplying Fractions',
			type: 'formula_expression',
			formula: 'P = a/b * c/d',
			defaultVariable: 'P',
			variables: [
				'P', 'a', 'b', 'c', 'd'
			],
			units: {
				P: 'Fraction'
			},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Dividing Fractions',
			type: 'formula_expression',
			formula: 'Q = a/b ÷ c/d',
			defaultVariable: 'Q',
			variables: [
				'Q', 'a', 'b', 'c', 'd'
			],
			units: {
				Q: 'Fraction'
			},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Adding Complex Numbers',
			type: 'formula_expression',
			formula: 'S = (a/b + (c/d)i) + (e/f + (g/h)i)',
			fraction: true,
			defaultVariable: 'S',
			variables: [
				'S', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Subtracting Complex Numbers',
			type: 'formula_expression',
			formula: 'D = (a/b + (c/d)i) - (e/f + (g/h)i)',
			fraction: true,
			defaultVariable: 'D',
			variables: [
				'D', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Multiplying Complex Numbers',
			type: 'formula_expression',
			formula: 'P = (a/b + (c/d)i) * (e/f + (g/h)i)',
			fraction: true,
			defaultVariable: 'P',
			variables: [
				'P', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Dividing Complex Numbers',
			type: 'formula_expression',
			formula: 'Q = (a/b + (c/d)i) * (e/f + (g/h)i)',
			fraction: true,
			defaultVariable: 'Q',
			variables: [
				'Q', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Algebraic Complex Addition',
			type: 'formula',
			formula: '(p/q + (r/s)i) = (a/b + (c/d)i) + (e/f + (g/h)i)',
			fraction:true,
			defaultVariable: 'p',
			defaultLeftSideUtilValue: '',
			variables: [
				'p', 'q', 'r', 's', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'
			],
			fadedVariables: {
				a: ['b', 'e', 'f', 'p', 'q'],
				b: ['a', 'e', 'f', 'p', 'q'],
				e: ['b', 'a', 'f', 'p', 'q'],
				f: ['b', 'e', 'a', 'p', 'q'],
				p: ['b', 'e', 'f', 'a', 'q'],
				q: ['b', 'e', 'f', 'p', 'a'],
				c: ['d', 'g', 'h', 'r', 's'],
				d: ['c', 'g', 'h', 'r', 's'],
				g: ['d', 'c', 'h', 'r', 's'],
				h: ['d', 'g', 'c', 'r', 's'],
				r: ['d', 'g', 'h', 'c', 's'],
				s: ['d', 'g', 'h', 'r', 'c'],
			},
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			definitions: {
				'p,a,e': 'Real Number Numerators',
				'q,b,f': 'Real Number Denominators',
				'r,c,g': 'Complex Number Numerators',
				's,d,h': 'Complex Number Denominators',
			},
			moreInfo:{
				features: [
					'the real and imaginary parts are<br> calculated separately, which is why<br> certain inputs are hidden'
				]
			}
		},{
			name: 'Algebraic Complex Subtraction',
			type: 'formula',
			formula: '(p/q + (r/s)i) = (a/b + (c/d)i) - (e/f + (g/h)i)',
			fraction:true,
			defaultVariable: 'p',
			defaultLeftSideUtilValue: '',
			variables: [
				'p', 'q', 'r', 's', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'
			],
			fadedVariables: {
				a: ['b', 'e', 'f', 'p', 'q'],
				b: ['a', 'e', 'f', 'p', 'q'],
				e: ['b', 'a', 'f', 'p', 'q'],
				f: ['b', 'e', 'a', 'p', 'q'],
				p: ['b', 'e', 'f', 'a', 'q'],
				q: ['b', 'e', 'f', 'p', 'a'],
				c: ['d', 'g', 'h', 'r', 's'],
				d: ['c', 'g', 'h', 'r', 's'],
				g: ['d', 'c', 'h', 'r', 's'],
				h: ['d', 'g', 'c', 'r', 's'],
				r: ['d', 'g', 'h', 'c', 's'],
				s: ['d', 'g', 'h', 'r', 'c'],
			},
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			definitions: {
				'p,a,e': 'Real Number Numerators',
				'q,b,f': 'Real Number Denominators',
				'r,c,g': 'Complex Number Numerators',
				's,d,h': 'Complex Number Denominators',
			},
			moreInfo:{
				features: [
					'the real and imaginary parts are<br> calculated separately, which is why<br> certain inputs are hidden'
				]
			}
		},{
			name: 'Factors of an Integer',
			type: 'formula_expression',
			formula: 'the factors are n',
			defaultVariable: 'Factors',
			inputWrapMarginLeft: '100px',
			variables: [
				'Factors', 'n'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Greatest Common Factor (GCF)',
			type: 'formula_expression',
			formula: 'The Greatest Common Factor of n_1 and n_2 is GCF',
			defaultVariable: 'GCF',
			variables: [
				'GCF', 'n_1', 'n_2'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Least Common Multiple (LCM)',
			type: 'formula_expression',
			formula: 'The Least Common Multiple of n_1 and n_2 is LCM',
			defaultVariable: 'LCM',
			variables: [
				'LCM', 'n_1', 'n_2'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Algebraic Addition',
			type: 'array',
			defaultVariable: 'S',
			defaultLeftSideUtilValue: '2',
			startCharacter: '(',
			endCharacter: ')',
			wrapCharacters: true,
			splitCharacter: '+',
			variables:[
				'S', [
					'a',
					'b'
				]
			],
			lessThanZeroParen:true,
			definitions: [
				'Sum',
				'Addends'
			],
			moreInfo: {}
		},{
			name: 'Algebraic Subtraction',
			type: 'array',
			defaultVariable: 'D',
			defaultLeftSideUtilValue: '2',
			startCharacter: '(',
			endCharacter: ')',
			wrapCharacters: true,
			splitCharacter: '-',
			variables:[
				'D', [
					'a',
					'b'
				]
			],
			lessThanZeroParen:true,
			definitions: [
				'Difference',
				'Minuend/Subtrahend'
			],
			moreInfo: {}
		},{
			name: 'Algebraic Multiplication',
			type: 'array',
			defaultVariable: 'P',
			defaultLeftSideUtilValue: '2',
			startCharacter: '(',
			endCharacter: ')',
			wrapCharacters: true,
			splitCharacter: '×',
			variables:[
				'P', [
					'a',
					'b'
				]
			],
			lessThanZeroParen:true,
			definitions: [
				'Product',
				'Factors'
			],
			moreInfo: {}
		},{
			name: 'Algebraic Division',
			type: 'array',
			defaultVariable: 'Q',
			defaultLeftSideUtilValue: '2',
			startCharacter: '(',
			endCharacter: ')',
			wrapCharacters: true,
			splitCharacter: '÷',
			variables:[
				'Q', [
					'a',
					'b'
				]
			],
			lessThanZeroParen:true,
			definitions: [
				'Quotient',
				'Dividend/Divisor'
			],
			moreInfo: {}
		},{
			name: 'Algebraic Proportions',
			type: 'formula',
			formula: '(a/b) = (c/d)',
			defaultVariable: 'a',
			variables: [
				'a', 'b', 'c', 'd'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			definitions: {
				a: 'First term/First numerator',
				b: 'Second term/First denominator',
				c: 'Third term/Second numerator',
				d: 'Fourth term/Second denominator'
			},
			moreInfo: {
				features: [
					'To perform dimensional analysis or use units, <br>go to Conversions > Dimensional Analysis'
				]
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
					'Complex numbers are not supported, <br>go to Algebra > Quadratic Formula to use them'
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
					'Go to Algebra > Axis of symmetry to find h<br>(subsitute h with x)',
					'(h, k) is the vertex of the parabola',
					'The axis of symmetry is x = h',
					'If a > 0, then the maximum value of y is k',
					'If a < 0, then the minimum value of y is k'
				]
			}
		},{
			name: 'Axis of Symmetry',
			type: 'formula',
			formula: 'x = -b/2a',
			defaultVariable: 'x',
			defaultLeftSideUtilValue: '',
			variables: ['x', 'a', 'b'],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			definitions: {
				x: 'Y coordinate of the vertex',
				a: 'Quadratic coefficient',
				b: 'Linear coefficient'
			},
			moreInfo: {
				features:[
					'Go to Algebra > Vertex Form of a Quadratic <br>to find k',
					'(x, k) is the vertex of the parabola',
					'If a > 0, then the maximum value of y is k',
					'If a < 0, then the minimum value of y is k'
				]
			}
		},{
			name: 'Cubic Solver',
			type: 'formula',
			formula: 'Y = ax^3 + bx^2 + cx + d',
			defaultVariable: 'x',
			defaultLeftSideUtilValue: '',
			variables: ['Y', 'x', 'a', 'b', 'c', 'd'],
			units:{},
			formatTypes:{},
			calculationType:{},
			leftSideUtil:{},
			definitions:{
				Y: 'Y value',
				x: 'X value',
				a: 'Cubic coefficient',
				b: 'Quadratic coefficient',
				c: 'Linear coefficient',
				d: 'Constant term'
			},
			moreInfo:{}
		},{
			name: 'Adding Polynomial Expressions',
			type: 'polynomial_expression',
			formula: 'formula will vary',
			defaultVariable: 'S',
			defaultLeftSideUtilValue: '4|4',
			maxTerms: 10,
			variables: [
				'S', 'a', 'b', 'c', 'd', '--', 'k', 'l', 'm', 'n'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Subtracting Polynomial Expressions',
			type: 'polynomial_expression',
			formula: 'formula will vary',
			defaultVariable: 'D',
			defaultLeftSideUtilValue: '4|4',
			maxTerms: 10,
			variables: [
				'D', 'a', 'b', 'c', 'd', '--', 'k', 'l', 'm', 'n'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Multiplying Polynomial Expressions',
			type: 'polynomial_expression',
			formula: 'formula will vary',
			defaultVariable: 'P',
			defaultLeftSideUtilValue: '4|4',
			maxTerms: 5,
			variables: [
				'P', 'a', 'b', 'c', 'd', '--', 'k', 'l', 'm', 'n'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Dividing Polynomial Expressions',
			type: 'polynomial_expression',
			formula: 'formula will vary',
			defaultVariable: 'Q',
			defaultLeftSideUtilValue: '4|4',
			maxTerms: 8,
			variables: [
				'Q', 'a', 'b', 'c', 'd', '--', 'k', 'l', 'm', 'n'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
		},{
			name: 'Absolute Value Equation',
			type: 'formula',
			formula: 'y = a|x-h| + k',
			defaultVariable: 'y',
			defaultLeftSideUtilValue: '',
			variables: [
				'y', 'a', 'x', 'h', 'k'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			definitions: {
				y: 'Y-value',
				x: 'X-value',
				a: 'Reflection and vertical stretch factor',
				h: 'Horizontal shift',
				k: 'Vertical Shift'
			},
			moreInfo: {}
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
			fadedVariables: {
				a_1: ['n'],
				'a_n-1': ['a_n', 'a_1', 'd']
			},
			omittedSolveFor:['a_1'],
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
					'a_1 isn\'t in the formula but still <br>necessary for finding n'
				]
			}
		},{
			name: 'Arithmetic General Sum Formula',
			type: 'formula',
			formula: 'S_n = (n/2) * (2a_1 + (n-1)d)',
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
					'If d is unknown but a_n is given, use the <br>Algebra > Arithmetic Alternate Sum Formula'
				]
			}
		},{
			name: 'Arithmetic Alternate Sum Formula',
			type: 'formula',
			formula: 'S_n = (n/2) * (a_1 + a_n)',
			defaultVariable: 'S_n',
			defaultLeftSideUtilValue: '',
			variables: [
				'S_n', 'a_1', 'a_n', 'n'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			definitions: {
				S_n: 'Sum of the first n terms',
				a_1: 'First term of the sequence',
				a_n: 'Nth term of the sequence',
				n: 'Number of terms'
			},
			moreInfo:{}
		},{
			name: 'Geometric Sequence (Explicit Formula)',
			type: 'formula',
			formula: 'a_n = a_1 * r^(n-1)',
			defaultVariable: 'a_n',
			defaultLeftSideUtilValue: '',
			variables: [
				'a_n', 'a_1', 'r', 'n'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			definitions: {
				a_n: 'Nth term of the sequence',
				a_1: 'First term of the sequence',
				n: 'Number of terms',
				r: 'Common ratio'
			},
			moreInfo:{}
		},{
			name: 'Geometric Recursive Sequence',
			type: 'formula',
			formula: 'a_n = r * a_n-1',
			defaultVariable: 'a_n',
			defaultLeftSideUtilValue: '',
			variables: [
				'a_n', 'a_n-1', 'a_1', 'n', 'r'
			],
			fadedVariables:{
				a_1: ['n'],
				'a_n-1': ['a_n', 'a_1', 'r']
			},
			omittedSolveFor:['a_1'],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			definitions: {
				a_n: 'Nth term of the sequence',
				'a_n-1': 'Term before the nth term',
				a_1: 'First term of the sequence',
				n: 'Number of terms',
				r: 'Common ratio'
			},
			moreInfo:{
				features:[
					'a_1 isn\'t in the formula but still <br>necessary for finding n'
				]
			}
		},{
			name: 'Geometric Finite Sum',
			type: 'formula',
			formula: 'S_n = a_1((1-r^n)/(a-r))',
			defaultVariable: 'S_n',
			variables: [
				'S_n', 'a_1', 'n', 'r'
			],
			units: {},
			formatTypes: {},
			calculationType: {
				r: 'approximation'
			},
			leftSideUtil: {},
			definitions: {
				S_n: 'Sum of the first n terms',
				a_1: 'First term of the sequence',
				n: 'Number of terms',
				r: 'Common ratio'
			},
			moreInfo:{}
		},{
			name: 'Geometric Infinite Sum For |r| < 1',
			type: 'formula',
			formula: 'S = a_1 / (1-r)',
			defaultVariable: 'S',
			variables: [
				'S', 'a_1', 'r'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			definitions: {
				S: 'Sum of the infinite sequence',
				n: 'Number of terms',
				r: 'Common ratio'
			},
			moreInfo: {
				features: [
					'the absolute value of r has to be <br>less than 1 (|r| < 1)'
				]
			}
		},{
			name: 'Standard form to Polar form',
			type: 'formula_expression',
			formula: 'a/b + (c/d)i = r(cos(𝜃) + i sin(𝜃))',
			defaultVariable: 'ANS',
			fraction:true,
			otherAnswers: ['r', '𝜃'],
			variables: [
				'r', 'a', 'b', 'c', 'd', '𝜃', 'ANS'
			],
			units: {},
			formatTypes: {},
			calculationType: {𝜃:'approximation', r:'approximation'},
			leftSideUtil: {},
			includeDefinitions:true,
			definitions: {
				a: 'Numerator of real part of complex number',
				b: 'Denominator of real part of complex number',
				c: 'Numerator of complex part of complex number',
				d: 'Denominator of complex part of complex number',
				r: 'Magnitude (modulus) of complex number',
				𝜃: 'Argument (angle in radians) of the complex number'
			}
		},{
			name: 'Standard form to Euler\'s form',
			type: 'formula_expression',
			formula: 'a/b + (c/d)i = re^i𝜃',
			defaultVariable: 'ANS',
			fraction:true,
			otherAnswers: ['r', '𝜃'],
			variables: [
				'r', 'a', 'b', 'c', 'd', '𝜃', 'ANS'
			],
			units: {},
			formatTypes: {},
			calculationType: {𝜃:'approximation', r: 'approximation'},
			leftSideUtil: {},
			includeDefinitions:true,
			definitions: {
				a: 'Numerator of real part of complex number',
				b: 'Denominator of real part of complex number',
				c: 'Numerator of complex part of complex number',
				d: 'Denominator of complex part of complex number',
				r: 'Magnitude (modulus) of complex number',
				𝜃: 'Argument (angle in radians) of the complex number'
			}
		},{
			name: 'Standard form to Conjugate',
			type: 'formula_expression',
			formula: 'a/b + (c/d)i -> a/b - (c/d)i',
			defaultVariable: 'ANS',
			fraction:true,
			otherAnswers: [],
			variables: [
				'ANS', 'a', 'b', 'c', 'd', 
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			includeDefinitions:true,
			definitions: {
				a: 'Numerator of real part of complex number',
				b: 'Denominator of real part of complex number',
				c: 'Numerator of complex part of complex number',
				d: 'Denominator of complex part of complex number',
			}
		},{
			name: 'Polar form to Standard form',
			type: 'formula_expression',
			formula: 'r(cos(𝜃) + i sin(𝜃)) = a/b + (c/d)i',
			defaultVariable: 'ANS',
			otherAnswers: ['a', 'b', 'c', 'd'],
			variables: [
				'a', 'b', 'c', 'd', 'r', '𝜃', 'ANS'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			includeDefinitions:true,
			definitions: {
				r: 'Magnitude (modulus) of complex number',
				𝜃: 'Argument (angle in radians) of the complex number',
				a: 'Numerator of real part of complex number',
				b: 'Denominator of real part of complex number',
				c: 'Numerator of complex part of complex number',
				d: 'Denominator of complex part of complex number'
			}
		},{
			name: 'Polar form to Euler\'s form',
			type: 'formula_expression',
			formula: 'r(cos(𝜃) + i sin(𝜃)) = re^i𝜃',
			defaultVariable: 'ANS',
			otherAnswers: [],
			variables: [
				'ANS', 'r', '𝜃', 
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			includeDefinitions:true,
			definitions: {
				r: 'Magnitude (modulus) of complex number',
				𝜃: 'Argument (angle in radians) of the complex number'
			}
		},{
			name: 'Polar form to Conjugate',
			type: 'formula_expression',
			formula: 'r(cos(𝜃) + i sin(𝜃)) -> r(cos(-𝜃) + i sin(-𝜃))',
			defaultVariable: 'ANS',
			otherAnswers: [],
			variables: [
				'ANS', 'r', '𝜃', 
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			includeDefinitions:true,
			definitions: {
				r: 'Magnitude (modulus) of complex number',
				𝜃: 'Argument (angle in radians) of the complex number'
			}
		},{
			name: 'Euler\'s form to Standard form',
			type: 'formula_expression',
			formula: 're^i𝜃 = a/b + (c/d)i',
			defaultVariable: 'ANS',
			otherAnswers: ['a', 'b', 'c', 'd'],
			variables: [
				'a', 'b', 'c', 'd', 'r', '𝜃', 'ANS'
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			includeDefinitions:true,
			definitions: {
				a: 'Numerator of real part of complex number',
				b: 'Denominator of real part of complex number',
				c: 'Numerator of complex part of complex number',
				d: 'Denominator of complex part of complex number',
				r: 'Magnitude (modulus) of complex number',
				𝜃: 'Argument (angle in radians) of the complex number'
			}
		},{
			name: 'Euler\'s form to Polar form',
			type: 'formula_expression',
			formula: 're^i𝜃 = r(cos(𝜃) + i sin(𝜃))',
			defaultVariable: 'ANS',
			otherAnswers: [],
			variables: [
				'ANS', 'r', '𝜃', 
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			includeDefinitions:true,
			definitions: {
				r: 'Magnitude (modulus) of complex number',
				𝜃: 'Argument (angle in radians) of the complex number'
			}
		},{
			name: 'Euler\'s form to Conjugate',
			type: 'formula_expression',
			formula: 're^i𝜃 -> re^-i𝜃',
			defaultVariable: 'ANS',
			otherAnswers: [],
			variables: [
				'ANS', 'r', '𝜃', 
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			includeDefinitions:true,
			definitions: {
				r: 'Magnitude (modulus) of complex number',
				𝜃: 'Argument (angle in radians) of the complex number'
			}
		},{
			name: 'Conjugate to Standard form',
			type: 'formula_expression',
			formula: 'a/b - (c/d)i -> a/b + (c/d)i',
			defaultVariable: 'ANS',
			fraction:true,
			otherAnswers: [],
			variables: [
				'ANS', 'a', 'b', 'c', 'd', 
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			includeDefinitions:true,
			definitions: {
				a: 'Numerator of real part of complex number',
				b: 'Denominator of real part of complex number',
				c: 'Numerator of complex part of complex number',
				d: 'Denominator of complex part of complex number',
			}
		},{
			name: 'Conjugate to Polar form',
			type: 'formula_expression',
			formula: 'r(cos(-𝜃) + i sin(-𝜃)) -> r(cos(𝜃) + i sin(𝜃))',
			defaultVariable: 'ANS',
			otherAnswers: [],
			variables: [
				'ANS', 'r', '𝜃', 
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			includeDefinitions:true,
			definitions: {
				r: 'Magnitude (modulus) of complex number',
				𝜃: 'Argument (angle in radians) of the complex number'
			}
		},{
			name: 'Conjugate to Euler\'s form',
			type: 'formula_expression',
			formula: 're^-i𝜃 -> re^i𝜃',
			defaultVariable: 'ANS',
			otherAnswers: [],
			variables: [
				'ANS', 'r', '𝜃', 
			],
			units: {},
			formatTypes: {},
			calculationType: {},
			leftSideUtil: {},
			includeDefinitions:true,
			definitions: {
				r: 'Magnitude (modulus) of complex number',
				𝜃: 'Argument (angle in radians) of the complex number'
			}
		},{
			name: 'Mean',
			type: 'array',
			defaultVariable: 'X',
			defaultLeftSideUtilValue: '15',
			topBar:true,
			startCharacter: '[',
			endCharacter: ']',
			splitCharacter: ',',
			variables:[
				'X', [
					'a',
					'b',
					'c',
					'd',
					'e',
					'f',
					'g',
					'h',
					'i',
					'j',
					'k',
					'l',
					'm',
					'n',
					'o'
				]
			],
			definitions: [
				'Mean(average)',
				'Data Points'
			],
			moreInfo: {}
		},{
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
		}
	],
	tabs:[
		{
			id:1,
			mode: 'Mean',
			type: 'array',
			variables:{
				X: 'X',
				a:'a',
				b:'b',
				c:'c',
				d:'d',
				e:'e',
				f:'f',
				g:'g',
				h:'h',
				i:'i',
				j:'j',
				k:'k',
				l:'l',
				m:'m',
				n:'n',
				o:'o'
			},
			selectedVariable: 'X',
			leftSideUtilValue: '15',
			arrayVar: 'a',
			answer: 'Error: missing variable/s',
		},
		{
			id:2,
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
		}
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
			const newId = state.tabs.at(-1)?.id + 1
			let defaultAnswer = 'Error: missing variable/s'
			if(!isUndefined(currentTabData.otherAnswers)){
				defaultAnswer = ''
				for(let i = 0; i < currentTabData.otherAnswers.length; i++){
					defaultAnswer += `Error: missing variable/s${i===currentTabData.otherAnswers.length-1?'':'||'}`
				}
			}
			if(currentTabData){
				if(currentTabData.type === 'formula'){
					state.tabs.push({
						id:newId,
						mode: currentTabData.name,
						type: currentTabData.type,
						variables: currentTabData.variables.reduce((acc, curr) => ({ ...acc, [curr]: curr }), {}),
						selectedVariable: currentTabData.defaultVariable,
						leftSideUtilValue: currentTabData.defaultLeftSideUtilValue,
						answer: defaultAnswer,
						conversions: {}
					})
				} else if(currentTabData.type === 'formula_expression'){
					state.tabs.push({
						id:newId,
						mode: currentTabData.name,
						type: currentTabData.type,
						variables: currentTabData.variables.reduce((acc, curr) => ({ ...acc, [curr]: curr }), {}),
						selectedVariable: currentTabData.defaultVariable,
						leftSideUtilValue: currentTabData.defaultLeftSideUtilValue,
						answer: defaultAnswer,
						conversions: {}
					})
				} else if(currentTabData.type === 'array'){
					state.tabs.push({
						id:newId,
						mode:currentTabData.name,
						type:currentTabData.type,
						variables: { [currentTabData.variables[0]]: currentTabData.variables[0], ...currentTabData.variables[1].reduce((acc, item) => ({ ...acc, [item]: item }), {}) },
						selectedVariable: currentTabData.defaultVariable,
						leftSideUtilValue: currentTabData.defaultLeftSideUtilValue,
						arrayVar: 'a',
						answer: defaultAnswer
					})
				} else if(currentTabData.type === 'array_expression'){
					state.tabs.push({
						id:newId,
						mode:currentTabData.name,
						type:currentTabData.type,
						variables: { [currentTabData.variables[0]]: currentTabData.variables[0], ...currentTabData.variables[1].reduce((acc, item) => ({ ...acc, [item]: item }), {}) },
						selectedVariable: currentTabData.defaultVariable,
						leftSideUtilValue: currentTabData.defaultLeftSideUtilValue,
						arrayVar: 'a',
						answer: defaultAnswer
					})
				} else if(currentTabData.type === 'polynomial_expression'){
					state.tabs.push({
						id:newId,
						mode: currentTabData.name,
						type: currentTabData.type,
						variables: currentTabData.variables.reduce((acc, curr) => ({ ...acc, [curr]: curr }), {}),
						selectedVariable: currentTabData.defaultVariable,
						leftSideUtilValue: currentTabData.defaultLeftSideUtilValue,
						answer: defaultAnswer,
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
				id: index + 1
			}));

			if (state.currentTabId > idToRemove) {
				state.currentTabId -= 1;
			  } else if (state.currentTabId === idToRemove) {
				if (state.currentTabId === state.tabs.length + 1) {
				  state.currentTabId -= 1;
				}
			  }
		},
		changeTermNumber: (state, action) => {
			const {updatedVariables, termNumber} = action.payload
			const id = state.currentTabId
			const currentTab = state.tabs.find(obj => obj.id === id)
			currentTab.leftSideUtilValue = termNumber

			currentTab.variables = updatedVariables
		},
		changeLeftSideUtilValueForArray: (state, action) => {
			const {id, value} = action.payload
			const currentTab = state.tabs.find(obj => obj.id === id)
			currentTab.leftSideUtilValue = value
		},
		changeArrayVar: (state, action) => {
			const {id, value} = action.payload
			const currentTab = state.tabs.find(obj => obj.id === id)
			currentTab.arrayVar = value
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
	removeTab,
	changeTermNumber,
	changeLeftSideUtilValueForArray,
	changeArrayVar
} = calculatorSlice.actions
		
export const selectTabData = (state) => state.calculator.tabData;
export const selectTabs = (state) => state.calculator.tabs;
export const selectCurrentTabId = (state) => state.calculator.currentTabId;

export default calculatorSlice.reducer;
