import { Fragment } from "react"
import { Fraction } from "./features/calculator/components/hub/fraction"
import { MathRoot } from "./features/calculator/components/hub/mathRoot"
import Polynomial from "polynomial"
import { create, all, isUndefined } from "mathjs"
const math = create(all)

const styles={
    polynomialFormula:{
        fontSize:'20px', 
        marginLeft:'42px',
    },
    polynomialFlexColumn:{
        display:'flex',
        flexDirection:'column',
        marginLeft:'-10px',
        marginTop:'-10px',
        position:'relative'
    },
    polynomialExponent:{
        fontSize:'16px'
    },
    polynomialDash:{
        fontSize:'18px',
        marginLeft:'0px',
        width:'inherit',
        backgroundColor: 'black',
        height:'2px',
        marginTop:'0px'
    },
    polynomialOperation:{
        fontSize:'40px',
        position:'absolute',
        left:10,
        top:12
    },
    checkVarSelectedVariableColor:{
        color:'darkred',
    },
    complexNumberIAndEFontSize:'50',
    trigDisplayFontSize:'40',
    checkVarTopBarFontSize:{
        fontSize:'32px'
    },
    inlineBlockDisplay:{
        display:'inline-block'
    },
    alignItemsDisplay:{
        display:'flex',
        alignItems:'center'
    },
}

export const nonSerializedFormulaData = {
    check: (variables) => variables.every((str) => 
        str && 
        !str.includes('Error') && 
        !str.includes('Impossible') && 
        str !== '-' && 
        str !== '-.' && 
        str !== '-.0' && 
        str !== '-.00' && 
        str !== '-.000' && 
        str !== '-.0000' && 
        str !== '-0' && 
        str !== '-0.' && 
        str !== '-0.0' && 
        str !== '-0.00' && 
        str !== '-0.000' && 
        str !== '-0.0000' && 
        str !== '-00' && 
        str !== '-00.' && 
        str !== '-00.0' && 
        str !== '-00.00' && 
        str !== '-00.000' && 
        str !== '-00.0000' && 
        str !== '-000' && 
        str !== '-000.' && 
        str !== '-000.0' && 
        str !== '-000.00' && 
        str !== '-000.000' && 
        str !== '-000.0000' && 
        str !== '-0000' && 
        str !== '-0000.' && 
        str !== '-0000.0' && 
        str !== '-0000.00' && 
        str !== '-0000.000' && 
        str !== '-0000.0000' && 
        str !== '.0' && 
        str !== '.00' && 
        str !== '.000' && 
        str !== '.0000' &&
        !isNaN(Number(str))
    ),
    checkVar: (variables, selectedVariable, variable, { 
        lessThanZeroParen=false, 
        paren=false, 
        sub=false, 
        subVar=false, 
        subVal='', 
        topBar=false, 
        minusOne=false, 
        format='standard', 
        alwaysDarkRed=false,
        addPlus=false,
        polynomial=false,
        dividePolynomial=false,
    } = {}) => {
        if(!lessThanZeroParen && !paren && !sub && !topBar && !minusOne && !addPlus && !polynomial){
            let displayVar = variables[variable]
            if(String(displayVar).includes('|[') && String(displayVar).includes(']|')){
                displayVar = String(displayVar).split('|[')[1].split(']|')[0]
            }
            return displayVar !== '' && displayVar !== undefined 
            ? (isNaN(Number(displayVar))
                ? (String(displayVar).includes('/')
                    ? (String(displayVar).includes('i')
                        ? <span style={{display:'flex', alignItems:'center', color:alwaysDarkRed?'darkred':(selectedVariable === variable? 'darkred': 'black')}}>
                            {
                                String(displayVar).split('/')[0].startsWith('-')
                                    ? '-'
                                    : ''
                            }
                            {math.abs(Number(String(displayVar).split('/')[0])) === 0
                                ? ''
                                : (Number(String(displayVar).split('/')[1].split(' ')[0]) === 1
                                    ?math.abs(Number(String(displayVar).split('/')[0]))
                                    :<Fraction parsing='children' scrunch={true} color={alwaysDarkRed?'darkred':(selectedVariable === variable? 'darkred': 'black')}>
                                        <>
                                            <p>{math.abs(Number(String(displayVar).split('/')[0]))}</p>
                                            <p>{String(displayVar).split('/')[1].split(' ')[0]}</p>
                                        </>
                                    </Fraction>
                                )
                            }
                            {math.abs(Number(String(displayVar).split('/')[0])) === 0
                            && String(displayVar).split('/')[1].split(' ')[1] === '+'
                                ? ''
                                : String(displayVar).split('/')[1].split(' ')[1]
                            }
                            {math.abs(Number(String(displayVar).split('/')[1].split('(')[1])) === 0
                            || (math.abs(Number(String(displayVar).split('/')[1].split('(')[1])) === 1
                            && Number(String(displayVar).split('/')[2].split(')')[0]) === 1)
                                ? ''
                                : (Number(String(displayVar).split('/')[2].split(')')[0]) === 1
                                    ? math.abs(Number(String(displayVar).split('/')[1].split('(')[1]))
                                    :<Fraction parsing='children' scrunch={true} color={alwaysDarkRed?'darkred':(selectedVariable === variable? 'darkred': 'black')}>
                                        <>
                                            <p>{math.abs(Number(String(displayVar).split('/')[1].split('(')[1]))}</p>
                                            <p>{String(displayVar).split('/')[2].split(')')[0]}</p>
                                        </>
                                    </Fraction>)
                            }
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32" width="20" height="32">
                                <text 
                                    x="10" 
                                    y="36" 
                                    fontSize={styles.complexNumberIAndEFontSize}
                                    textAnchor="middle" 
                                    fill={selectedVariable === variable? 'darkred': 'black'}
                                    fontFamily="Times New Roman, serif" 
                                    fontStyle="italic"
                                >
                                i
                                </text>
                            </svg>
                        </span>
                        : <span style={{display:'flex', alignItems:'center', color:(alwaysDarkRed?'darkred':(selectedVariable === variable? 'darkred': 'black'))}}>
                            {
                                String(displayVar).split('/')[0].startsWith('-')
                                    ? '-'
                                    : ''
                            }
                            {String(displayVar).split('/')[1].split(' ')[0] === '1'
                                ? math.abs(Number(String(displayVar).split('/')[0]))
                                : <Fraction parsing='children' scrunch={true} color={alwaysDarkRed?'darkred':(selectedVariable === variable? 'darkred': 'black')}>
                                    <>
                                        <p>{math.abs(Number(String(displayVar).split('/')[0]))}</p>
                                        <p>{String(displayVar).split('/')[1].split(' ')[0]}</p>
                                    </>
                                </Fraction>
                            }
                        </span>
                    )
                    :<span style={{color:alwaysDarkRed?'darkred':(selectedVariable === variable?'darkred':'black')}}>{variable}
                    </span>
                  )
                : <span style={{color:alwaysDarkRed?'darkred':(selectedVariable === variable?'darkred':'black')}}>{String(displayVar).includes(',')
                        ? variable
                        : nonSerializedFormulaData.formatValue(displayVar, format)
                        }
                  </span>
                  )
            : <span style={{color:alwaysDarkRed?'darkred':(selectedVariable === variable?'darkred':'black')}}>{variable}</span>
        } else if(paren && !sub && !topBar && !minusOne && !addPlus && !polynomial){
            return variables[variable] !== '' && variables[variable] !== undefined 
            ? (isNaN(Number(variables[variable])) 
                ? <span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable}</span>
                : <span style={selectedVariable === variable
                    ? {color: 'darkred'}
                    : {}}>{`(${nonSerializedFormulaData.formatValue(variables[variable], format)})`}
                  </span>)
            : <span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable}</span>
        } else if(lessThanZeroParen && !sub && !topBar && !minusOne && !addPlus && !polynomial){
            return variables[variable] !== '' && variables[variable] !== undefined 
                ? (isNaN(Number(variables[variable])) 
                    ? <span style={selectedVariable === variable || alwaysDarkRed? {color: 'darkred'}: {}}>{variable}</span>
                    :(variables[variable] < 0
                        ?<span style={selectedVariable === variable || alwaysDarkRed
                            ? {color: 'darkred'}
                            : {}}>{`(${nonSerializedFormulaData.formatValue(variables[variable], format)})`}
                          </span>
                        :<span style={{color:selectedVariable === variable || alwaysDarkRed?'darkred':'black'}}>{nonSerializedFormulaData.formatValue(variables[variable], format)}
                          </span>))
                : <span style={selectedVariable === variable || alwaysDarkRed? {color: 'darkred'}: {}}>{variable}</span>
        } else if(sub && !lessThanZeroParen && !paren && !subVar && !topBar && !minusOne && !addPlus && !polynomial){
            return variables[variable] !== '' && variables[variable] !== undefined 
                ? (isNaN(Number(variables[variable])) 
                    ? (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></span>) 
                    :<span style={selectedVariable === variable
                        ? {color: 'darkred'}
                        : {}}>{nonSerializedFormulaData.formatValue(variables[variable], format)}
                      </span>)
                : (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></span>)
        } else if(sub && paren && !subVar && !topBar && !minusOne && !addPlus && !polynomial){
            return variables[variable] !== '' && variables[variable] !== undefined 
                ? (isNaN(Number(variables[variable])) 
                    ? (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></span>) 
                    :<span style={selectedVariable === variable
                        ? {color: 'darkred'}
                        : {}}>{`(${nonSerializedFormulaData.formatValue(variables[variable], format)})`}
                      </span>)
                : (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></span>)
        } else if(sub && lessThanZeroParen && !subVar && !topBar && !minusOne && !addPlus && !polynomial){
            return variables[variable] !== '' && variables[variable] !== undefined 
                ? (isNaN(Number(variables[variable])) 
                    ? (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></span>)
                    :(variables[variable] < 0
                        ? <span style={selectedVariable === variable
                            ? {color: 'darkred'}
                            : {}}>{`(${nonSerializedFormulaData.formatValue(variables[variable], format)})`}
                          </span>
                        : nonSerializedFormulaData.formatValue(variables[variable], format))) 
                    : (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></span>)
        } else if(sub && !lessThanZeroParen && !paren && subVar && !topBar && !minusOne && !addPlus && !polynomial){
            return variables[variable] !== '' && variables[variable] !== undefined 
            ? (isNaN(Number(variables[variable])) 
                ? (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{subVal}</sub></span>) 
                :<span style={selectedVariable === variable
                    ? {color: 'darkred'}
                    : {}}>{nonSerializedFormulaData.formatValue(variables[variable], format)}
                  </span>)
            : (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{subVal}</sub></span>)
        } else if(sub && !lessThanZeroParen && !paren && subVar && !topBar && minusOne && !addPlus && !polynomial){
            return variables[variable] !== '' && variables[variable] !== undefined 
            ? (isNaN(Number(variables[variable])) 
                ? (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{subVal}-1</sub></span>) 
                :<span style={selectedVariable === variable
                    ? {color: 'darkred'}
                    : {}}>{nonSerializedFormulaData.formatValue(variables[variable], format)}
                  </span>) 
            : (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{subVal}-1</sub></span>)
        } else if(topBar && !lessThanZeroParen && !paren && !sub && !minusOne && !addPlus && !polynomial){
            return variables[variable] !== '' && variables[variable] !== undefined 
            ? (isNaN(Number(variables[variable])) 
                ? (<span style={selectedVariable === variable
                    ? {color: 'darkred', display:'inline-flex', flexDirection: 'column', alignItems: 'center'}
                    : {display:'inline-flex', flexDirection: 'column', alignItems: 'center'}}
                   >
                    <h3 style={{height:'8px'}}>&#772;
                        <span style={{color: 'transparent'}}>-</span>
                    </h3>
                    <h3 style={styles.checkVarTopBarFontSize}>{variable}</h3>
                   </span>)
                :<span style={selectedVariable === variable
                    ? {color: 'darkred'}
                    : {}}>{nonSerializedFormulaData.formatValue(variables[variable], format)}
                  </span>) 
            : (<span style={selectedVariable === variable
                ? {color: 'darkred', display:'inline-flex', flexDirection: 'column', alignItems: 'center'}
                : {display:'inline-flex', flexDirection: 'column', alignItems: 'center'}}
               >
                <h3 style={{height:'8px'}}>&#772;
                    <span style={{color: 'transparent'}}>-</span>
                </h3>
                <h3 style={styles.checkVarTopBarFontSize}>{variable}</h3>
               </span>)
        } else if(!lessThanZeroParen && !sub && !topBar && !minusOne && addPlus && !polynomial){
            return variables[variable] !== '' && variables[variable] !== undefined 
                ? (isNaN(Number(variables[variable])) 
                    ? <>&nbsp;+&nbsp;<span style={selectedVariable === variable || alwaysDarkRed? {color: 'darkred'}: {}}>{variable}</span></>
                    :(variables[variable] < 0
                        ?<span style={selectedVariable === variable || alwaysDarkRed
                            ? {color: 'darkred'}
                            : {}}>&nbsp;-&nbsp;{math.abs(nonSerializedFormulaData.formatValue(variables[variable], format))}
                          </span>
                        :<>&nbsp;+&nbsp;<span style={{color:selectedVariable === variable || alwaysDarkRed?'darkred':'black'}}>
                            {nonSerializedFormulaData.formatValue(variables[variable], format)}
                          </span></>))
                : <>&nbsp;+&nbsp;<span style={selectedVariable === variable || alwaysDarkRed? {color: 'darkred'}: {}}>{variable}</span></>
        } else if(!lessThanZeroParen && !paren && !sub && !topBar && !minusOne && !addPlus && polynomial){
            if (dividePolynomial){
                try{ 
                    const polyData = String(variables[variable].split('|[')[1]).slice(0, -2)
                    const coefficients = polyData.split(':::')[1].split('&&&')[0].split('$')
                    const exponents = polyData.split(':::')[0].split('#')
                    const remainder = polyData.split('&&&')[1].split('@@@')[0]
                    if(remainder === 'NOREMAINDER'){
                        return variables[variable] !== '' && variables[variable] !== undefined 
                        ? <span style={selectedVariable === variable? {color: 'darkred'}: {}}>
                            {coefficients.map((term, index) => (
                                <span key={`term_${index+1}`}>
                                    {(index !== 0) 
                                        ? <span>{String(term).startsWith('-')
                                            ? <>&nbsp;-&nbsp;</>
                                            : <>&nbsp;+&nbsp;</>
                                        }</span>
                                        : <>{String(term).startsWith('-')
                                            ? <>-</>
                                            : null
                                        }</>
                                    }
                                    {(nonSerializedFormulaData.formatValue(math.abs(Number(term)), format) !== 1 || Number(exponents[index]) === 0) &&
                                        <span>{nonSerializedFormulaData.formatValue(math.abs(Number(term)), format)}</span>
                                    }
                                    {Number(exponents[index]) !== 0 &&
                                        <span>x</span>
                                    }
                                    {(Number(exponents[index]) !== 1 && Number(exponents[index]) !== 0) &&
                                        <sup style={styles.polynomialExponent}>{exponents[index]}</sup>
                                    }
                                </span>
                            ))}
                        </span>
                        : <span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable}</span>
                    } else {
                        return variables[variable] !== '' && variables[variable] !== undefined 
                        ? <span style={styles.alignItemsDisplay}>
                            <span style={selectedVariable === variable? {color: 'darkred'}: {}}>
                                {coefficients.map((term, index) => (
                                    (nonSerializedFormulaData.formatValue((math.abs(term)), 'standard') !== 0 &&
                                        <span key={`term_${index+1}`}>
                                            {(index !== 0) 
                                                ? <span>{String(term).startsWith('-')
                                                    ? <>&nbsp;-&nbsp;</>
                                                    : <>&nbsp;+&nbsp;</>
                                                }</span>
                                                : <>{String(term).startsWith('-')
                                                    ? <>-</>
                                                    : null
                                                }</>
                                            }
                                            {(nonSerializedFormulaData.formatValue(math.abs(Number(term)), format) !== 1 || Number(exponents[index]) === 0) &&
                                                <span>{nonSerializedFormulaData.formatValue(math.abs(Number(term)), format)}</span>
                                            }
                                            {Number(exponents[index]) !== 0 &&
                                                <span>x</span>
                                            }
                                            {(Number(exponents[index]) !== 1 && Number(exponents[index]) !== 0) &&
                                                <sup style={styles.polynomialExponent}>{exponents[index]}</sup>
                                            }
                                        </span>
                                    )
                                ))}
                                <span>&nbsp;+&nbsp;</span>
                            </span>
                            <Fraction parsing='children' color='darkred' size='16px' polynomials={true}>
                                <>
                                    <p>{remainder}</p>
                                    <p>{polyData.split('@@@')[1]}</p>
                                </>
                            </Fraction>
                        </span>
                        : <span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable}</span>
                    }
                } catch (e) {
                    return  <span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable}</span>
                }
            } else {
                try{ 
                    const polyData = String(variables[variable].split('|[')[1]).slice(0, -2)
                    const coefficients = polyData.split(':::')[1].split('$')
                    const exponents = polyData.split(':::')[0].split('#')
                    return variables[variable] !== '' && variables[variable] !== undefined 
                    ? <span style={selectedVariable === variable? {color: 'darkred'}: {}}>
                        {coefficients.map((term, index) => (
                            <span key={`term_${index+1}`}>
                                {(index !== 0) 
                                    ? <span>{String(term).startsWith('-')
                                        ? <>&nbsp;-&nbsp;</>
                                        : <>&nbsp;+&nbsp;</>
                                    }</span>
                                    : <>{String(term).startsWith('-')
                                        ? <>-</>
                                        : null
                                    }</>
                                }
                                {(nonSerializedFormulaData.formatValue(math.abs(Number(term)), format) !== 1 || Number(exponents[index]) === 0) &&
                                    <span>{nonSerializedFormulaData.formatValue(math.abs(Number(term)), format)}</span>
                                }
                                {Number(exponents[index]) !== 0 &&
                                    <span>x</span>
                                }
                                {(Number(exponents[index]) !== 1 && Number(exponents[index]) !== 0) &&
                                    <sup style={styles.polynomialExponent}>{exponents[index]}</sup>
                                }
                            </span>
                        ))}
                    </span>
                    : <span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable}</span>
                } catch (e) {
                    return  <span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable}</span>
                }
            }
        }
    },
    formatValue: (value, type='standard') => {
        if(String(value).includes('i') 
            || String(value).includes('/')
            || String(value) === '-'
            || String(value) === '.'
            || String(value) === '-.'
            || String(value) === '-0'
            || String(value) === '-0.'
            || String(value) === '-.0'
            || String(value) === '-.00'
            || String(value) === '-.000'
            || String(value) === '-.0000'
            || String(value) === '-0.0'
            || String(value) === '-0.00'
            || String(value) === '-0.000'
            || String(value) === '-0.0000'
            || String(value) === '-00'
            || String(value) === '-00.'
            || String(value) === '-00.0'
            || String(value) === '-00.00'
            || String(value) === '-00.000'
            || String(value) === '-00.0000'
            || String(value) === '-000'
            || String(value) === '-000.'
            || String(value) === '-000.0'
            || String(value) === '-000.00'
            || String(value) === '-000.000'
            || String(value) === '-000.0000'
            || String(value) === '-0000'
            || String(value) === '-0000.'
            || String(value) === '-0000.0'
            || String(value) === '-0000.00'
            || String(value) === '-0000.000'
            || String(value) === '-0000.0000'
            || String(value) === '.0'
            || String(value) === '.00'
            || String(value) === '.000'
            || String(value) === '.0000'
            || String(value).startsWith('-e')
            || String(value).startsWith('-.e')
        ){
            return value
        } else if(type === 'money'){
            return Number(value).toFixed(2)
        } else {
            return math.round(value, nonSerializedFormulaData.roundingValue)
        }
    },
    complexNumberI: (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32" width="20" height="32">
                <text x="10" y="36" fontSize='50' textAnchor="middle" fill="black" fontFamily="Times New Roman, serif" fontStyle="italic">
                i
                </text>
            </svg>
        </>
    ),
    e: (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32" width="20" height="32">
                <text x="10" y="30" fontSize='50' textAnchor="middle" fill="black" fontFamily="Times New Roman, serif" fontStyle="italic">
                e
                </text>
            </svg>
        </>
    ),
    trigDisplay: (trig) => (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32" width="54" height="32">
                <text x="14" y="26" fontSize={styles.trigDisplayFontSize} textAnchor="middle" fill="black" fontFamily="Times New Roman, serif" fontStyle="italic">
                {trig}
                </text>
            </svg>
        </>
    ),
    formatComplex: (c) => {
        let realPart;
        let imagPart;
        if(String(c.re).includes('e')){
            const ePart = `e${String(c.re).split('e')[1]}`
            const nonEPart = math.round(Number(String(c.re).split('e')[0]), nonSerializedFormulaData.roundingValue)
            realPart = `${nonEPart}${ePart}`
        } else {
            realPart = math.round(c.re, 4);
        }
        if(String(c.im).includes('e')){
            const ePart = `e${String(c.im).split('e')[1]}`
            const nonEPart = math.round(Number(String(c.im).split('e')[0]), nonSerializedFormulaData.roundingValue)
            imagPart = `${nonEPart}${ePart}`
        } else {
            imagPart = math.round(c.im, 4);
        }
      
        if (imagPart === 1) {
          imagPart = 'i';
        } else if (imagPart === -1) {
          imagPart = '-i';
        } else if (imagPart > 0) {
          imagPart = `${imagPart}i`;
        } else if (imagPart < 0) {
          imagPart = `${imagPart}i`;
        }
        if(String(imagPart).startsWith('-')){
            imagPart = ` - ${imagPart.split('-')[1]}`
        } else {
            imagPart = ` + ${imagPart}`
        }
        return `${realPart}${imagPart}`;
    },
    roundingValue:4,
    'Addition': {
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }

            let keys = Object.keys(variables).filter(val => val !== Object.keys(variables)[0])
            let values = []
            for(let i = 0; i < keys.length; i++){
                values.push(variables[keys[i]])
            }
            switch(selectedVariable){
                case 'S':
                    if(nonSerializedFormulaData.check([...values])){
                        result = math.sum(values)
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Subtraction': {
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }

            let keys = Object.keys(variables).filter(val => val !== Object.keys(variables)[0])
            let values = []
            for(let i = 0; i < keys.length; i++){
                values.push(variables[keys[i]])
            }
            switch(selectedVariable){
                case 'D':
                    if(nonSerializedFormulaData.check([...values])){
                        result = values.reduce((acc, curr) => acc - curr)
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Multiplication': {
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }

            let keys = Object.keys(variables).filter(val => val !== Object.keys(variables)[0])
            let values = []
            for(let i = 0; i < keys.length; i++){
                values.push(variables[keys[i]])
            }
            switch(selectedVariable){
                case 'P':
                    if(nonSerializedFormulaData.check([...values])){
                        result = values.reduce((acc, curr) => acc * curr)
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Division': {
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let keys = Object.keys(variables).filter(val => val !== Object.keys(variables)[0])
            let values = []
            for(let i = 0; i < keys.length; i++){
                i===0 || !nonSerializedFormulaData.check([variables[keys[i]]])
                    ?values.push(variables[keys[i]])
                    :( Number(variables[keys[i]]) === 0
                        ? values.push('Error: cannot divide by zero')
                        : values.push(String(1 / variables[keys[i]]))
                    )
            }
            switch(selectedVariable){
                case 'Q':
                    for(let i = 0; i < values.length; i++){
                        if(String(values[i]) === 'Error: cannot divide by zero'){
                            result = 'Error: cannot divide by zero'
                            break;
                        }
                    }
                    if (result === 'Error: cannot divide by zero') {
                        break;
                    }
                    if(nonSerializedFormulaData.check([...values])){
                        result = values.reduce((acc, num) => acc * num);
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error: try refreshing the page'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Modulus (Remainder)': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r')}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}
                &nbsp;%&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b', {lessThanZeroParen:true})}
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'r':
                    if(nonSerializedFormulaData.check([a, b])){
                        if (Number(b) !== 0) {
                            result = math.mod(a, b)
                            break;
                        } else {
                            result = 'Error: cannot divide by zero';
                            break;
                        }
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Factorial': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x')}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n', {lessThanZeroParen:true})}
                !
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {n} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'x':
                    if(nonSerializedFormulaData.check([n])){
                        if (Number(n) < 0 && Number.isInteger(Number(n))) {
                            result = 'Error: undefined for negative integers'
                            break;
                        } else {
                            result = math.gamma(Number(n) + 1)
                            break;
                        }
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Square': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'y')}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x', {lessThanZeroParen:true})}
                <sup>2</sup>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {x} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'y':
                    if(nonSerializedFormulaData.check([x])){
                        result = math.pow(x, 2)
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Cube': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'y')}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x', {lessThanZeroParen:true})}
                <sup>3</sup>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {x} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'y':
                    if(nonSerializedFormulaData.check([x])){
                        result = math.pow(x, 3)
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Nth Power': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'y')}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x', {lessThanZeroParen:true})}
                <sup>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n', {lessThanZeroParen:true})}</sup>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {x, n} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'y':
                    if(nonSerializedFormulaData.check([x, n])){
                        if(Number(x) === 0 && Number(n) < 0){
                            result = 'Error: n cannot be < 0 for x = 0'
                            break;
                        } else {
                            if(Number(x) < 0 && (Number(n) % 1 !== 0)){
                                const complexResult = math.pow(x, n)
                                const re = math.round(complexResult.re, 3)
                                const im = math.round(complexResult.im, 3)
                                if(im === 0){
                                    result = `${re}`
                                } else if(im > 0){
                                    result = `${re !== 0? `${re} +`: ''} ${im !== 1? im:''}i`
                                } else if(im < 0){
                                    result = `${re !== 0? `${re} -`: ''} ${math.abs(im) !== 1?math.abs(im):''}i`
                                } else {
                                    result = 'Error'
                                }
                                break;
                            } else {
                                result = math.pow(x, n)
                                break;
                            }
                        }
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Square Root': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'y')}
                &nbsp;=&nbsp;
                <MathRoot styling='normal'>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x')}</p>
                    </>
                </MathRoot>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {x} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'y':
                    if(nonSerializedFormulaData.check([x])){
                        if(Number(x) < 0){
                            const complexResult = math.pow(x, 0.5)
                            const re = math.round(complexResult.re, 3)
                            const im = math.round(complexResult.im, 3)
                            if(im === 0){
                                result = `${re}`
                            } else if(im > 0){
                                result = `${re !== 0? `${re} +`: ''} ${im !== 1? im:''}i`
                            } else if(im < 0){
                                result = `${re !== 0? `${re} -`: ''} ${math.abs(im) !== 1?math.abs(im):''}i`
                            } else {
                                result = 'Error'
                            }
                            break;
                        } else {
                            result = math.pow(x, 0.5)
                            break;
                        }
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Cube Root': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'y')}
                &nbsp;=&nbsp;
                <MathRoot styling='normal'>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x')}</p>
                        <p>3</p>
                    </>
                </MathRoot>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {x} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'y':
                    if(nonSerializedFormulaData.check([x])){
                        if(Number(x) < 0){
                            const complexResult = math.pow(x, (1 / 3))
                            const re = math.round(complexResult.re, 3)
                            const im = math.round(complexResult.im, 3)
                            if(im === 0){
                                result = `${re}`
                            } else if(im > 0){
                                result = `${re !== 0? `${re} +`: ''} ${im !== 1? im:''}i`
                            } else if(im < 0){
                                result = `${re !== 0? `${re} -`: ''} ${math.abs(im) !== 1?math.abs(im):''}i`
                            } else {
                                result = 'Error'
                            }
                            break;
                        } else {
                            result = math.pow(x, (1 / 3))
                            break;
                        }
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Nth Root': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'y')}
                &nbsp;=&nbsp;
                <MathRoot styling='normal'>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')}</p>
                    </>
                </MathRoot>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {x, n} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'y':
                    if(nonSerializedFormulaData.check([x, n])){
                        if(Number(x) === 0 && Number(n) < 0){
                            result = 'Error: cannot take negative roots if x = 0'
                            break;
                        } else {
                            if(Number(n) !== 0){
                                if(Number(x) < 0){
                                    const complexResult = math.pow(x, (1 / n))
                                    if(!isUndefined(complexResult?.re)){
                                        const re = math.round(complexResult.re, 3)
                                        const im = math.round(complexResult.im, 3)
                                        if(im === 0){
                                            result = `${re}`
                                        } else if(im > 0){
                                            result = `${re !== 0? `${re} +`: ''} ${im !== 1? im:''}i`
                                        } else if(im < 0){
                                            result = `${re !== 0? `${re} -`: ''} ${math.abs(im) !== 1?math.abs(im):''}i`
                                        } else {
                                            result = 'Error'
                                        }
                                    } else {
                                        result = complexResult
                                    }
                                    break;
                                } else {
                                    result = math.pow(x, (1 / n))
                                    break;
                                }
                            } else {
                                result = 'Error: cannot take zeroth root'
                                break;
                            }
                        }
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Adding Fractions': {
        'display':(variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'S')}
                &nbsp;=&nbsp;
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                &nbsp;+&nbsp;
                <Fraction parsing='children' negativeStyling={true} lessThanZeroParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'S':
                    if (nonSerializedFormulaData.check([a, b, c, d])) {
                        if(Number(b) === 0 || Number(d) === 0){
                            result = 'Error: cannot divide by zero'
                        } else {
                            const fraction1Decimal = a / b;
                            const fraction2Decimal = c / d;
                            const resultDecimal = fraction1Decimal + fraction2Decimal;
                            const resultFraction = math.fraction(resultDecimal);
                            result = `${String(resultFraction.s) === '-1'? '-': ''}${resultFraction.n}/${resultFraction.d}`;
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s';
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Subtracting Fractions': {
        'display':(variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'D')}
                &nbsp;=&nbsp;
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                &nbsp;-&nbsp;
                <Fraction parsing='children' negativeStyling={true} lessThanZeroParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'D':
                    if (nonSerializedFormulaData.check([a, b, c, d])) {
                        if(Number(b) === 0 || Number(d) === 0){
                            result = 'Error: cannot divide by zero'
                        } else {
                            const fraction1Decimal = a / b;
                            const fraction2Decimal = c / d;
                            const resultDecimal = fraction1Decimal - fraction2Decimal;
                            const resultFraction = math.fraction(resultDecimal);
                            result = `${String(resultFraction.s) === '-1'? '-': ''}${resultFraction.n}/${resultFraction.d}`;
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s';
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Multiplying Fractions': {
        'display':(variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'P')}
                &nbsp;=&nbsp;
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                &nbsp;×&nbsp;
                <Fraction parsing='children' negativeStyling={true} lessThanZeroParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'P':
                    if (nonSerializedFormulaData.check([a, b, c, d])) {
                        if(Number(b) === 0 || Number(d) === 0){
                            result = 'Error: cannot divide by zero'
                        } else {
                            const fraction1Decimal = a / b;
                            const fraction2Decimal = c / d;
                            const resultDecimal = fraction1Decimal * fraction2Decimal;
                            const resultFraction = math.fraction(resultDecimal);
                            result = `${String(resultFraction.s) === '-1'? '-': ''}${resultFraction.n}/${resultFraction.d}`;
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s';
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Dividing Fractions': {
        'display':(variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'Q')}
                &nbsp;=&nbsp;
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                &nbsp;÷&nbsp;
                <Fraction parsing='children' negativeStyling={true} lessThanZeroParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'Q':
                    if (nonSerializedFormulaData.check([a, b, c, d])) {
                        if(Number(b) === 0 || Number(d) === 0 || Number(c) === 0){
                            result = 'Error: cannot divide by zero'
                        } else {
                            const fraction1Decimal = a / b;
                            const fraction2Decimal = c / d;
                            const resultDecimal = fraction1Decimal / fraction2Decimal;
                            const resultFraction = math.fraction(resultDecimal);
                            result = `${String(resultFraction.s) === '-1'? '-': ''}${resultFraction.n}/${resultFraction.d}`;
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s';
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Adding Complex Numbers': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'S')}
                &nbsp;=&nbsp;(
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
                
                {nonSerializedFormulaData.complexNumberI})
                +&nbsp;(
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'e')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'f')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'g')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'h')}</p>
                    </>
                </Fraction>

                {nonSerializedFormulaData.complexNumberI})
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d, e, f, g, h} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'S':
                    if (nonSerializedFormulaData.check([a, b, c, d, e, f, g, h])) {
                        if(Number(b) !== 0 && Number(f) !== 0 && Number(d) !== 0 && Number(h) !== 0) {
                            const fraction1Decimal = a / b;
                            const fraction2Decimal = e / f;
                            const resultDecimal = fraction1Decimal + fraction2Decimal;
                            const resultFraction = math.fraction(resultDecimal);
                            const fraction3Decimal = c / d;
                            const fraction4Decimal = g / h;
                            const resultDecimal2 = fraction3Decimal + fraction4Decimal;
                            const resultFraction2 = math.fraction(resultDecimal2);
                            const realPart = `${String(resultFraction.s) === '-1'? '-': ''}${resultFraction.n}/${resultFraction.d}`
                            const imaginaryPart = `(${resultFraction2.n}/${resultFraction2.d})`
                            const imaginaryDisplay = String(resultFraction2.n) !== '0' ? 'i' : '';
                            const displayPart = `${realPart} ${String(resultFraction2.s) === '-1'
                                ? '-'
                                : '+'
                            } ${imaginaryPart}${imaginaryDisplay}`;
                            const scrunchedRealPart = (String(resultFraction.n) === '0'
                                ? ''
                                : (String(resultFraction.d) === '1' 
                                    ? `${String(resultFraction.s) === '-1'? '-': ''}${resultFraction.n}`
                                    : realPart
                                )
                            )
                            const scrunchedImaginaryPart = (String(resultFraction2.d) === '1' 
                                ? (String(resultFraction2.n) === '1'
                                    ? ''
                                    :(String(resultFraction2.n) === '0'
                                        ? ''
                                        :`${resultFraction2.n}`
                                    )
                                )
                                : imaginaryPart
                            )
                            const inputPart = `${scrunchedRealPart}${String(resultFraction2.s) === '-1'
                                ? (scrunchedRealPart === ''
                                    ? '-'
                                    : ' - '
                                )
                                : (scrunchedRealPart === '' || scrunchedImaginaryPart === ''
                                    ? ''
                                    : ' + '
                                )
                            }${scrunchedImaginaryPart}${imaginaryDisplay}`;
                            result = `${inputPart===''?'0':inputPart}|[${displayPart}]|`
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s';
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Subtracting Complex Numbers': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'D')}
                &nbsp;=&nbsp;(
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
                
                {nonSerializedFormulaData.complexNumberI})
                -&nbsp;(
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'e')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'f')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'g')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'h')}</p>
                    </>
                </Fraction>
                
                {nonSerializedFormulaData.complexNumberI})
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d, e, f, g, h} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'D':
                    if (nonSerializedFormulaData.check([a, b, c, d, e, f, g, h])) {
                        if(Number(b) !== 0 && Number(f) !== 0 && Number(d) !== 0 && Number(h) !== 0) {
                            const fraction1Decimal = a / b;
                            const fraction2Decimal = e / f;
                            const resultDecimal = fraction1Decimal - fraction2Decimal;
                            const resultFraction = math.fraction(resultDecimal);
                            const fraction3Decimal = c / d;
                            const fraction4Decimal = g / h;
                            const resultDecimal2 = fraction3Decimal - fraction4Decimal;
                            const resultFraction2 = math.fraction(resultDecimal2);
                            const realPart = `${String(resultFraction.s) === '-1'? '-': ''}${resultFraction.n}/${resultFraction.d}`
                            const imaginaryPart = `(${resultFraction2.n}/${resultFraction2.d})`
                            const imaginaryDisplay = String(resultFraction2.n) !== '0' ? 'i' : '';
                            const displayPart = `${realPart} ${String(resultFraction2.s) === '-1'
                                ? '-'
                                : '+'
                            } ${imaginaryPart}${imaginaryDisplay}`;
                            const scrunchedRealPart = (String(resultFraction.n) === '0'
                                ? ''
                                : (String(resultFraction.d) === '1' 
                                    ? `${String(resultFraction.s) === '-1'? '-': ''}${resultFraction.n}`
                                    : realPart
                                )
                            )
                            const scrunchedImaginaryPart = (String(resultFraction2.d) === '1' 
                                ? (String(resultFraction2.n) === '1'
                                    ? ''
                                    :(String(resultFraction2.n) === '0'
                                        ? ''
                                        :`${resultFraction2.n}`
                                    )
                                )
                                : imaginaryPart
                            )
                            const inputPart = `${scrunchedRealPart}${String(resultFraction2.s) === '-1'
                                ? (scrunchedRealPart === ''
                                    ? '-'
                                    : ' - '
                                )
                                : (scrunchedRealPart === '' || scrunchedImaginaryPart === ''
                                    ? ''
                                    : ' + '
                                )
                            }${scrunchedImaginaryPart}${imaginaryDisplay}`;
                            result = `${inputPart===''?'0':inputPart}|[${displayPart}]|`
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s';
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Multiplying Complex Numbers': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'P')}
                &nbsp;=&nbsp;(
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
                
                {nonSerializedFormulaData.complexNumberI})
                ×&nbsp;(
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'e')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'f')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'g')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'h')}</p>
                    </>
                </Fraction>
                
                {nonSerializedFormulaData.complexNumberI})
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d, e, f, g, h} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'P':
                    if (nonSerializedFormulaData.check([a, b, c, d, e, f, g, h])) {
                        if(Number(b) !== 0 && Number(f) !== 0 && Number(d) !== 0 && Number(h) !== 0) {
                            const fractionReal1 = math.fraction(a / b);
                            const fractionImag1 = math.fraction(c / d);
                            const fractionReal2 = math.fraction(e / f);
                            const fractionImag2 = math.fraction(g / h); 
                            const complex1 = math.complex(
                                math.number(fractionReal1), 
                                math.number(fractionImag1)
                            );
                            const complex2 = math.complex(
                                math.number(fractionReal2), 
                                math.number(fractionImag2)
                            );
                            const resultFrac = math.multiply(complex1, complex2);
                            const resultFraction = math.fraction(resultFrac.re);
                            const resultFraction2 = math.fraction(resultFrac.im);
                            const realPart = `${String(resultFraction.s) === '-1'? '-': ''}${resultFraction.n}/${resultFraction.d}`
                            const imaginaryPart = `(${resultFraction2.n}/${resultFraction2.d})`
                            const imaginaryDisplay = String(resultFraction2.n) !== '0' ? 'i' : '';
                            const displayPart = `${realPart} ${String(resultFraction2.s) === '-1'
                                ? '-'
                                : '+'
                            } ${imaginaryPart}${imaginaryDisplay}`;
                            const scrunchedRealPart = (String(resultFraction.n) === '0'
                                ? ''
                                : (String(resultFraction.d) === '1' 
                                    ? `${String(resultFraction.s) === '-1'? '-': ''}${resultFraction.n}`
                                    : realPart
                                )
                            )
                            const scrunchedImaginaryPart = (String(resultFraction2.d) === '1' 
                                ? (String(resultFraction2.n) === '1'
                                    ? ''
                                    :(String(resultFraction2.n) === '0'
                                        ? ''
                                        :`${resultFraction2.n}`
                                    )
                                )
                                : imaginaryPart
                            )
                            const inputPart = `${scrunchedRealPart}${String(resultFraction2.s) === '-1'
                                ? (scrunchedRealPart === ''
                                    ? '-'
                                    : ' - '
                                )
                                : (scrunchedRealPart === '' || scrunchedImaginaryPart === ''
                                    ? ''
                                    : ' + '
                                )
                            }${scrunchedImaginaryPart}${imaginaryDisplay}`;
                            result = `${inputPart===''?'0':inputPart}|[${displayPart}]|`
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s';
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Dividing Complex Numbers': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'Q')}
                &nbsp;=&nbsp;(
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
                
                {nonSerializedFormulaData.complexNumberI})
                ÷&nbsp;(
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'e')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'f')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'g')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'h')}</p>
                    </>
                </Fraction>
                
                {nonSerializedFormulaData.complexNumberI})
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d, e, f, g, h} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'Q':
                    if (nonSerializedFormulaData.check([a, b, c, d, e, f, g, h])) {
                        if(Number(e) === 0 && Number(g) === 0){
                            result = 'Error: e and g cannot both be zero'
                        } else {
                            if(Number(b) !== 0 && Number(f) !== 0 && Number(d) !== 0 && Number(h) !== 0) {
                                const fractionReal1 = math.fraction(a / b);
                                const fractionImag1 = math.fraction(c / d);
                                const fractionReal2 = math.fraction(e / f);
                                const fractionImag2 = math.fraction(g / h); 
                                const complex1 = math.complex(
                                    math.number(fractionReal1), 
                                    math.number(fractionImag1)
                                );
                                const complex2 = math.complex(
                                    math.number(fractionReal2), 
                                    math.number(fractionImag2)
                                );
                                const resultFrac = math.divide(complex1, complex2);
                                const resultFraction = math.fraction(resultFrac.re);
                                const resultFraction2 = math.fraction(resultFrac.im);
                                const realPart = `${String(resultFraction.s) === '-1'? '-': ''}${resultFraction.n}/${resultFraction.d}`
                                const imaginaryPart = `(${resultFraction2.n}/${resultFraction2.d})`
                                const imaginaryDisplay = String(resultFraction2.n) !== '0' ? 'i' : '';
                                const displayPart = `${realPart} ${String(resultFraction2.s) === '-1'
                                    ? '-'
                                    : '+'
                                } ${imaginaryPart}${imaginaryDisplay}`;
                                const scrunchedRealPart = (String(resultFraction.n) === '0'
                                    ? ''
                                    : (String(resultFraction.d) === '1' 
                                        ? `${String(resultFraction.s) === '-1'? '-': ''}${resultFraction.n}`
                                        : realPart
                                    )
                                )
                                const scrunchedImaginaryPart = (String(resultFraction2.d) === '1' 
                                    ? (String(resultFraction2.n) === '1'
                                        ? ''
                                        :(String(resultFraction2.n) === '0'
                                            ? ''
                                            :`${resultFraction2.n}`
                                        )
                                    )
                                    : imaginaryPart
                                )
                                const inputPart = `${scrunchedRealPart}${String(resultFraction2.s) === '-1'
                                    ? (scrunchedRealPart === ''
                                        ? '-'
                                        : ' - '
                                    )
                                    : (scrunchedRealPart === '' || scrunchedImaginaryPart === ''
                                        ? ''
                                        : ' + '
                                    )
                                }${scrunchedImaginaryPart}${imaginaryDisplay}`;
                                result = `${inputPart===''?'0':inputPart}|[${displayPart}]|`
                            } else {
                                result = 'Error: cannot divide by zero'
                            }
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s';
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Algebraic Complex Addition': {
        'display': (variables, selectedVariable) => (
            <>
                (<Fraction parsing='children' negativeStyling={true}
                    numColor={'p' === selectedVariable?'darkred':'black'}
                    denColor={'q' === selectedVariable?'darkred':'black'}
                >
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'p')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'q')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}
                    numColor={'r' === selectedVariable?'darkred':'black'}
                    denColor={'s' === selectedVariable?'darkred':'black'}
                >
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 's')}</p>
                    </>
                </Fraction>
                {nonSerializedFormulaData.complexNumberI})=(<Fraction parsing='children' negativeStyling={true}
                    numColor={'a' === selectedVariable?'darkred':'black'}
                    denColor={'b' === selectedVariable?'darkred':'black'}
                >
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}
                    numColor={'c' === selectedVariable?'darkred':'black'}
                    denColor={'d' === selectedVariable?'darkred':'black'}
                >
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
                {nonSerializedFormulaData.complexNumberI})+(<Fraction parsing='children' negativeStyling={true}
                    numColor={'e' === selectedVariable?'darkred':'black'}
                    denColor={'f' === selectedVariable?'darkred':'black'}
                >
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'e')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'f')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}
                    numColor={'g' === selectedVariable?'darkred':'black'}
                    denColor={'h' === selectedVariable?'darkred':'black'}
                >
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'g')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'h')}</p>
                    </>
                </Fraction>
                {nonSerializedFormulaData.complexNumberI})
            </>
        ),
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d, e, f, g, h, p, q, r, s} = updatedVariables

            switch(selectedVariable){
                case 'p':
                    if(nonSerializedFormulaData.check([a, b, e, f, q])){
                        if(Number(b) !== 0 && Number(f) !== 0 && Number(q) !== 0){
                            const frac1 = math.fraction(a/b)
                            const frac2 = math.fraction(e/f)
                            const resultFrac = math.add(frac1, frac2)
                            result = math.number(math.multiply(resultFrac, q))
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'q':
                    if(nonSerializedFormulaData.check([a, b, e, f, p])){
                        if(Number(b) !== 0 && Number(f) !== 0){
                            const frac1 = math.fraction(a/b)
                            const frac2 = math.fraction(e/f)
                            const resultFrac = math.add(frac1, frac2)
                            if (String(resultFrac.n) === '0'){
                                result = 'Error: a/b + e/f cannot be zero'
                            } else {
                                result = math.number(math.divide(p, resultFrac))
                            }
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a':
                    if(nonSerializedFormulaData.check([q, b, e, f, p])){
                        if(Number(b) !== 0 && Number(f) !== 0 && Number(q) !== 0){
                            const frac1 = math.fraction(p/q)
                            const frac2 = math.fraction(e/f)
                            const resultFrac = math.subtract(frac1, frac2)
                            result = math.number(math.multiply(b, resultFrac))
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'b':
                    if(nonSerializedFormulaData.check([q, a, e, f, p])){
                        if(Number(f) !== 0 && Number(q) !== 0){
                            const frac1 = math.fraction(p/q)
                            const frac2 = math.fraction(e/f)
                            const resultFrac = math.subtract(frac1, frac2)
                            if (String(resultFrac.n) === '0'){
                                result = 'Error: p/q - e/f cannot be zero'
                            } else {
                                result = math.number(math.divide(a, resultFrac))
                            }
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'e':
                    if(nonSerializedFormulaData.check([q, a, b, f, p])){
                        if(Number(f) !== 0 && Number(q) !== 0 && Number(b) !== 0){
                            const frac1 = math.fraction(p/q)
                            const frac2 = math.fraction(a/b)
                            const resultFrac = math.subtract(frac1, frac2)
                            result = math.number(math.multiply(f, resultFrac))
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'f':
                    if(nonSerializedFormulaData.check([q, a, e, b, p])){
                        if(Number(q) !== 0 && Number(b) !== 0){
                            const frac1 = math.fraction(p/q)
                            const frac2 = math.fraction(a/b)
                            const resultFrac = math.subtract(frac1, frac2)
                            if (String(resultFrac.n) === '0'){
                                result = 'Error: p/q - a/b cannot be zero'
                            } else {
                                result = math.number(math.divide(e, resultFrac))
                            }
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'r':
                    if(nonSerializedFormulaData.check([c, d, s, g, h])){
                        if(Number(d) !== 0 && Number(h) !== 0 && Number(s) !== 0){
                            const frac1 = math.fraction(c/d)
                            const frac2 = math.fraction(g/h)
                            const resultFrac = math.add(frac1, frac2)
                            result = math.number(math.multiply(s, resultFrac))
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 's':
                    if(nonSerializedFormulaData.check([c, d, r, g, h])){
                        if(Number(d) !== 0 && Number(h) !== 0){
                            const frac1 = math.fraction(c/d)
                            const frac2 = math.fraction(g/h)
                            const resultFrac = math.add(frac1, frac2)
                            if (String(resultFrac.n) === '0'){
                                result = 'Error: c/d + g/h cannot be zero'
                            } else {
                                result = math.number(math.divide(r, resultFrac))
                            }
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'c':
                    if(nonSerializedFormulaData.check([r, d, s, g, h])){
                        if(Number(d) !== 0 && Number(h) !== 0 && Number(s) !== 0){
                            const frac1 = math.fraction(r/s)
                            const frac2 = math.fraction(g/h)
                            const resultFrac = math.subtract(frac1, frac2)
                            result = math.number(math.multiply(d, resultFrac))
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'd':
                    if(nonSerializedFormulaData.check([c, s, r, g, h])){
                        if(Number(s) !== 0 && Number(h) !== 0){
                            const frac1 = math.fraction(r/s)
                            const frac2 = math.fraction(g/h)
                            const resultFrac = math.subtract(frac1, frac2)
                            if (String(resultFrac.n) === '0'){
                                result = 'Error: r/s - g/h cannot be zero'
                            } else {
                                result = math.number(math.divide(c, resultFrac))
                            }
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'g':
                    if(nonSerializedFormulaData.check([r, d, s, c, h])){
                        if(Number(d) !== 0 && Number(h) !== 0 && Number(s) !== 0){
                            const frac1 = math.fraction(r/s)
                            const frac2 = math.fraction(c/d)
                            const resultFrac = math.subtract(frac1, frac2)
                            result = math.number(math.multiply(h, resultFrac))
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'h':
                    if(nonSerializedFormulaData.check([c, s, r, g, d])){
                        if(Number(s) !== 0 && Number(d) !== 0){
                            const frac1 = math.fraction(r/s)
                            const frac2 = math.fraction(c/d)
                            const resultFrac = math.subtract(frac1, frac2)
                            if (String(resultFrac.n) === '0'){
                                result = 'Error: r/s - c/d cannot be zero'
                            } else {
                                result = math.number(math.divide(g, resultFrac))
                            }
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Algebraic Complex Subtraction': {
        'display': (variables, selectedVariable) => (
            <>
                (<Fraction parsing='children' negativeStyling={true}
                    numColor={'p' === selectedVariable?'darkred':'black'}
                    denColor={'q' === selectedVariable?'darkred':'black'}
                >
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'p')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'q')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}
                    numColor={'r' === selectedVariable?'darkred':'black'}
                    denColor={'s' === selectedVariable?'darkred':'black'}
                >
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 's')}</p>
                    </>
                </Fraction>
                {nonSerializedFormulaData.complexNumberI})=(<Fraction parsing='children' negativeStyling={true}
                    numColor={'a' === selectedVariable?'darkred':'black'}
                    denColor={'b' === selectedVariable?'darkred':'black'}
                >
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}
                    numColor={'c' === selectedVariable?'darkred':'black'}
                    denColor={'d' === selectedVariable?'darkred':'black'}
                >
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
                {nonSerializedFormulaData.complexNumberI})-(<Fraction parsing='children' negativeStyling={true}
                    numColor={'e' === selectedVariable?'darkred':'black'}
                    denColor={'f' === selectedVariable?'darkred':'black'}
                >
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'e')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'f')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}
                    numColor={'g' === selectedVariable?'darkred':'black'}
                    denColor={'h' === selectedVariable?'darkred':'black'}
                >
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'g')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'h')}</p>
                    </>
                </Fraction>
                {nonSerializedFormulaData.complexNumberI})
            </>
        ),
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d, e, f, g, h, p, q, r, s} = updatedVariables

            switch(selectedVariable){
                case 'p':
                    if(nonSerializedFormulaData.check([a, b, e, f, q])){
                        if(Number(b) !== 0 && Number(f) !== 0 && Number(q) !== 0){
                            const frac1 = math.fraction(a/b)
                            const frac2 = math.fraction(e/f)
                            const resultFrac = math.subtract(frac1, frac2)
                            result = math.number(math.multiply(resultFrac, q))
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'q':
                    if(nonSerializedFormulaData.check([a, b, e, f, p])){
                        if(Number(b) !== 0 && Number(f) !== 0){
                            const frac1 = math.fraction(a/b)
                            const frac2 = math.fraction(e/f)
                            const resultFrac = math.subtract(frac1, frac2)
                            if (String(resultFrac.n) === '0'){
                                result = 'Error: a/b - e/f cannot be zero'
                            } else {
                                result = math.number(math.divide(p, resultFrac))
                            }
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a':
                    if(nonSerializedFormulaData.check([q, b, e, f, p])){
                        if(Number(b) !== 0 && Number(f) !== 0 && Number(q) !== 0){
                            const frac1 = math.fraction(p/q)
                            const frac2 = math.fraction(e/f)
                            const resultFrac = math.add(frac1, frac2)
                            result = math.number(math.multiply(b, resultFrac))
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'b':
                    if(nonSerializedFormulaData.check([q, a, e, f, p])){
                        if(Number(f) !== 0 && Number(q) !== 0){
                            const frac1 = math.fraction(p/q)
                            const frac2 = math.fraction(e/f)
                            const resultFrac = math.add(frac1, frac2)
                            if (String(resultFrac.n) === '0'){
                                result = 'Error: p/q + e/f cannot be zero'
                            } else {
                                result = math.number(math.divide(a, resultFrac))
                            }
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'e':
                    if(nonSerializedFormulaData.check([q, a, b, f, p])){
                        if(Number(f) !== 0 && Number(q) !== 0 && Number(b) !== 0){
                            const frac1 = math.fraction(a/b)
                            const frac2 = math.fraction(p/q)
                            const resultFrac = math.subtract(frac1, frac2)
                            result = math.number(math.multiply(f, resultFrac))
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'f':
                    if(nonSerializedFormulaData.check([q, a, e, b, p])){
                        if(Number(q) !== 0 && Number(b) !== 0){
                            const frac1 = math.fraction(a/b)
                            const frac2 = math.fraction(p/q)
                            const resultFrac = math.subtract(frac1, frac2)
                            if (String(resultFrac.n) === '0'){
                                result = 'Error: p/q - a/b cannot be zero'
                            } else {
                                result = math.number(math.divide(e, resultFrac))
                            }
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'r':
                    if(nonSerializedFormulaData.check([c, d, s, g, h])){
                        if(Number(d) !== 0 && Number(h) !== 0 && Number(s) !== 0){
                            const frac1 = math.fraction(c/d)
                            const frac2 = math.fraction(g/h)
                            const resultFrac = math.subtract(frac1, frac2)
                            result = math.number(math.multiply(resultFrac, s))
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 's':
                    if(nonSerializedFormulaData.check([c, d, r, g, h])){
                        if(Number(d) !== 0 && Number(h) !== 0){
                            const frac1 = math.fraction(c/d)
                            const frac2 = math.fraction(g/h)
                            const resultFrac = math.subtract(frac1, frac2)
                            if (String(resultFrac.n) === '0'){
                                result = 'Error: c/d - g/h cannot be zero'
                            } else {
                                result = math.number(math.divide(r, resultFrac))
                            }
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'c':
                    if(nonSerializedFormulaData.check([r, d, s, g, h])){
                        if(Number(d) !== 0 && Number(h) !== 0 && Number(s) !== 0){
                            const frac1 = math.fraction(r/s)
                            const frac2 = math.fraction(g/h)
                            const resultFrac = math.add(frac1, frac2)
                            result = math.number(math.multiply(d, resultFrac))
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'd':
                    if(nonSerializedFormulaData.check([c, s, r, g, h])){
                        if(Number(s) !== 0 && Number(h) !== 0){
                            const frac1 = math.fraction(r/s)
                            const frac2 = math.fraction(g/h)
                            const resultFrac = math.add(frac1, frac2)
                            if (String(resultFrac.n) === '0'){
                                result = 'Error: r/s + g/h cannot be zero'
                            } else {
                                result = math.number(math.divide(c, resultFrac))
                            }
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'g':
                    if(nonSerializedFormulaData.check([r, d, s, c, h])){
                        if(Number(d) !== 0 && Number(h) !== 0 && Number(s) !== 0){
                            const frac1 = math.fraction(c/d)
                            const frac2 = math.fraction(r/s)
                            const resultFrac = math.subtract(frac1, frac2)
                            result = math.number(math.multiply(h, resultFrac))
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'h':
                    if(nonSerializedFormulaData.check([c, s, r, g, d])){
                        if(Number(s) !== 0 && Number(d) !== 0){
                            const frac1 = math.fraction(c/d)
                            const frac2 = math.fraction(r/s)
                            const resultFrac = math.subtract(frac1, frac2)
                            if (String(resultFrac.n) === '0'){
                                result = 'Error: r/s - c/d cannot be zero'
                            } else {
                                result = math.number(math.divide(g, resultFrac))
                            }
                        } else {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Factors of an Integer': {
        'display': (variables, selectedVariable) => (
            <></>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {n} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'Factors':
                    if(nonSerializedFormulaData.check([n])){
                        if(!math.isInteger(Number(n)) || Number(n) === 0) {
                            result = 'Error: number must be non-zero integer'
                        } else {
                            const absN = Math.abs(n);
                            let divisors = [];
                            for (let i = 1; i <= Math.sqrt(absN); i++) {
                                if (absN % i === 0) {
                                    divisors.push(i);
                                    if (i !== absN / i) {
                                        divisors.push(absN / i);
                                    }
                                }
                            }
                            const negativeDivisors = (divisors.length > 36 && !math.isNegative(n)
                                ? []
                                : divisors.map(d => -d)
                            )
                            const finalResult = [...divisors, ...negativeDivisors].sort((a, b) => a - b).reverse();
                            if(finalResult.length > 72){
                                result = `Error: too many factors(${math.isNegative(n)?finalResult.length:finalResult.length * 2})`
                            } else {
                                result = finalResult
                            }
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Greatest Common Factor (GCF)': {
        'display': (variables, selectedVariable) => (
            <>
                <span>
                The GCF of&nbsp; 
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n_1', {sub:true})}
                &nbsp;and&nbsp; 
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n_2', {sub:true})}
                &nbsp;is:&nbsp; 
                <br/>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'GCF')}
                </span>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {n_1, n_2} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'GCF':
                    if(nonSerializedFormulaData.check([n_1, n_2])){
                        if(Number(n_1) <= 0 
                            || Number(n_2) <= 0 
                            || !math.isInteger(Number(n_1)) 
                            || !math.isInteger(Number(n_2)))
                        {
                            result = 'Error: numbers must be whole numbers'
                        } else {
                            function gcd(a, b) {
                                while (b !== 0) {
                                    let remainder = a % b;
                                    a = b;
                                    b = remainder;
                                }
                                return a;
                            }
                            result = gcd(n_1, n_2)
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Least Common Multiple (LCM)': {
        'display': (variables, selectedVariable) => (
            <>
                <span>
                The LCM of&nbsp; 
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n_1', {sub:true})}
                &nbsp;and&nbsp; 
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n_2', {sub:true})}
                &nbsp;is:&nbsp; 
                <br/>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'LCM')}
                </span>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {n_1, n_2} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'LCM':
                    if(nonSerializedFormulaData.check([n_1, n_2])){
                        if(Number(n_1) <= 0 
                            || Number(n_2) <= 0 
                            || !math.isInteger(Number(n_1)) 
                            || !math.isInteger(Number(n_2)))
                        {
                            result = 'Error: numbers must be whole numbers'
                        } else {
                            function gcd(a, b) {
                                while (b !== 0) {
                                    let remainder = a % b;
                                    a = b;
                                    b = remainder;
                                }
                                return a;
                            }
                            result = math.abs(n_1 * n_2) / gcd(n_1, n_2)
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Algebraic Addition': {
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {S} = updatedVariables

            let keys = Object.keys(variables).filter(val => val !== Object.keys(variables)[0])
            let values = []
            for(let i = 0; i < keys.length; i++){
                values.push(variables[keys[i]])
            }
            switch(selectedVariable){
                case 'S':
                    if(nonSerializedFormulaData.check([...values])){
                        result = math.sum(values)
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    keys = (Object.keys(variables).filter(val => val !== Object.keys(variables)[0] && val !== selectedVariable))
                    values = []
                    for(let i = 0; i < keys.length; i++){
                        values.push(variables[keys[i]])
                    }
                    if(nonSerializedFormulaData.check([...values, S])){
                        result = S - math.sum(values);
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Algebraic Subtraction': {
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {D} = updatedVariables

            let keys = Object.keys(variables).filter(val => val !== Object.keys(variables)[0])
            let values = []
            for(let i = 0; i < keys.length; i++){
                i===0 || !nonSerializedFormulaData.check([variables[keys[i]]])
                    ?values.push(variables[keys[i]])
                    :values.push(String(variables[keys[i]] * -1))
            }
            switch(selectedVariable){
                case 'D':
                    if(nonSerializedFormulaData.check([...values])){
                        result = math.sum(values)
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    keys = (Object.keys(variables).filter(val => val !== Object.keys(variables)[0] && val !== selectedVariable))
                    values = []
                    for(let i = 0; i < keys.length; i++){
                        values.push(variables[keys[i]])
                    }
                    if(nonSerializedFormulaData.check([...values, D])){
                        result = D - math.sum(values);
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Algebraic Multiplication': {
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {P} = updatedVariables

            let keys = Object.keys(variables).filter(val => val !== Object.keys(variables)[0])
            let values = []
            for(let i = 0; i < keys.length; i++){
                values.push(variables[keys[i]])
            }
            switch(selectedVariable){
                case 'P':
                    if(nonSerializedFormulaData.check([...values])){
                        result = values.reduce((acc, num) => acc * num);
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    keys = (Object.keys(variables).filter(val => val !== Object.keys(variables)[0] && val !== selectedVariable))
                    values = []
                    for(let i = 0; i < keys.length; i++){
                        values.push(variables[keys[i]])
                    }
                    if(nonSerializedFormulaData.check([...values, P])){
                        result = P / values.reduce((acc, num) => acc * num);
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Algebraic Division': {
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {Q} = updatedVariables
            let keys = Object.keys(variables).filter(val => val !== Object.keys(variables)[0])
            let values = []
            for(let i = 0; i < keys.length; i++){
                i===0 || !nonSerializedFormulaData.check([variables[keys[i]]])
                    ?values.push(variables[keys[i]])
                    :( Number(variables[keys[i]]) === 0
                        ? values.push('Error: cannot divide by zero')
                        : values.push(String(1 / variables[keys[i]]))
                    )
            }
            switch(selectedVariable){
                case 'Q':
                    for(let i = 0; i < values.length; i++){
                        if(String(values[i]) === 'Error: cannot divide by zero'){
                            result = 'Error: cannot divide by zero'
                            break;
                        }
                    }
                    if (result === 'Error: cannot divide by zero') {
                        break;
                    }
                    if(nonSerializedFormulaData.check([...values])){
                        result = values.reduce((acc, num) => acc * num);
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    keys = (Object.keys(variables).filter(val => val !== Object.keys(variables)[0] && val !== selectedVariable))
                    values = []
                    for(let i = 0; i < keys.length; i++){
                        values.push(variables[keys[i]])
                    }
                    if(selectedVariable === 'a'){
                        for(let i = 0; i < values.length; i++){
                            if(Number(values[i]) === 0){
                                result = 'Error: cannot divide by zero'
                                break;
                            }
                        }
                    } else {
                        for(let i = 0; i < values.length; i++){
                            if(Number(values[i]) === 0 && i !== 0){
                                result = 'Error: cannot divide by zero'
                                break;
                            }
                        }   
                    }
                    if (result === 'Error: cannot divide by zero') {
                        break;
                    }
                    if(nonSerializedFormulaData.check([...values, Q])){
                        if(selectedVariable === 'a'){
                            result = values.reduce((acc, num) => acc * num) * Q;
                        } else {
                            result = values.reduce((acc, num) => acc / num) / Q;
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Algebraic Proportions': {
        'display': (variables, selectedVariable) => (
            <>
                <Fraction parsing='children' size='35px'>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                &nbsp;=&nbsp;
                <Fraction parsing='children' size='35px'>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
            </>
        ),
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d} = updatedVariables

            switch(selectedVariable){
                case 'a':
                    if(nonSerializedFormulaData.check([b, c, d])){
                        if(Number(d) !== 0){
                            result = (b * c) / d
                        } else {
                            result = 'Error: d cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'b':
                    if(nonSerializedFormulaData.check([a, c, d])){
                        if(Number(c) !== 0){
                            result = (d * a) / c
                        } else {
                            result = 'Error: c cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'c':
                    if(nonSerializedFormulaData.check([a, b, d])){
                        if(Number(b) !== 0){
                            result = (d * a) / b
                        } else {
                            result = 'Error: b cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'd':
                    if(nonSerializedFormulaData.check([a, b, c])){
                        if(Number(a) !== 0){
                            result = (b * c) / a
                        } else {
                            result = 'Error: a cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Slope Intercept Form': {
        'display':(variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'y')}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'm')}
                {nonSerializedFormulaData.checkVar(variables, selectedVariable,'x', {paren:true})}
                &nbsp;+&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable,'b', {lessThanZeroParen:true})}
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {y, m, x, b} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'y':
                    if(nonSerializedFormulaData.check([m, x, b])){
                        result = (m * x) + Number(b)
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                case 'm':
                    if(nonSerializedFormulaData.check([y, x, b])){
                        if (Number(x) !== 0) {
                            result = (y-b) / x
                            break;
                        } else {
                            result = 'Error: cannot divide by zero';
                            break;
                        }
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                case 'x':
                    if(nonSerializedFormulaData.check([y, m, b])){
                        if (Number(m) !== 0) {
                            result = (y-b) / m
                            break;
                        } else {
                            result = 'Error: cannot divide by zero';
                            break;
                        }
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                case 'b':
                    if(nonSerializedFormulaData.check([m, x, y])){
                        result = y - (m * x)
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Slope': {
        'display':(variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'm')}
                &nbsp;=&nbsp;
                    <Fraction parsing='children'>
                        <>
                            <p>
                                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'Y_2', {sub:true})}
                                &nbsp;-&nbsp;
                                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'Y_1', {sub:true, lessThanZeroParen:true})}
                            </p>
                            <p>
                                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'X_2', {sub:true})}
                                &nbsp;-&nbsp;
                                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'X_1', {sub:true, lessThanZeroParen:true})}
                            </p>
                        </>
                    </Fraction>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {m, Y_2, Y_1, X_2, X_1} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'm':
                    if(nonSerializedFormulaData.check([Y_2, Y_1, X_2, X_1])){
                        if (Number(X_2) - Number(X_1) !== 0) {
                            result = (Y_2 - Y_1) / (X_2 - X_1)
                            break;
                        } else {
                            result = 'Error: cannot divide by zero';
                            break;
                        }
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                case 'Y_2':
                    if(nonSerializedFormulaData.check([m, Y_1, X_2, X_1])){
                        result = (m * (X_2 - X_1)) + Number(Y_1)
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                case 'Y_1':
                    if(nonSerializedFormulaData.check([m, Y_2, X_2, X_1])){
                        result = Y_2 - (m * (X_2 - X_1))
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                case 'X_2':
                    if(nonSerializedFormulaData.check([Y_2, Y_1, m, X_1])){
                        if (Number(m) !== 0) {
                            result = ((Y_2 - Y_1) / m) + Number(X_1)
                            break;
                        } else {
                            result = 'Error: cannot divide by zero';
                            break;
                        }
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                case 'X_1':
                    if(nonSerializedFormulaData.check([Y_2, Y_1, m, X_2])){
                        if (Number(m) !== 0) {
                            result = X_2 - ((Y_2 - Y_1) / m)
                            break;
                        } else {
                            result = 'Error: cannot divide by zero';
                            break;
                        }
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'General Form of a Quadratic': {
        'display':(variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a', {lessThanZeroParen:true})}
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x', {paren:true})}
                <sup>2</sup>&nbsp;+&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b', {lessThanZeroParen:true})}
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x', {paren:true})}
                &nbsp;+&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c', {lessThanZeroParen:true})}
                &nbsp;=&nbsp;0
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {x, a, b, c} = updatedVariables

            switch(selectedVariable){
                case 'x':
                    if(nonSerializedFormulaData.check([a, b, c])){
                        if (Number(a) !== 0) {
                            const discriminant = math.subtract(math.pow(b, 2), math.multiply(4, a, c));

                            if (math.smaller(discriminant, 0)) {
                                result = "Error: use quadratic formula calculator for complex numbers"; // Complex numbers can be handled differently
                                break;
                            }
                        
                            const sqrtDiscriminant = math.sqrt(discriminant);
                            const denominator = math.multiply(2, a);
                        
                            const root1 = math.divide(math.subtract(-b, sqrtDiscriminant), denominator);
                            const root2 = math.divide(math.add(-b, sqrtDiscriminant), denominator);
                        
                            result = `${math.round(root1, 5)}, ${math.round(root2, 5)}`
                        } else {
                            result = 'Error: a cannot be zero ';
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a':
                    if(nonSerializedFormulaData.check([x, b, c])){
                        if (Number(x) !== 0) {
                            result = ((b * -1 * x) - c) / (x * x)
                        } else {
                            result = 'Error: cannot divide by zero';
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                case 'b':
                    if(nonSerializedFormulaData.check([x, a, c])){
                        if (Number(x) !== 0) {
                            result = ((a * -1 * (x * x)) - c) / x
                        } else {
                            result = 'Error: cannot divide by zero';
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                case 'c':
                    if(nonSerializedFormulaData.check([x, a, b])){
                        result = (a * -1 * (x * x)) - (b * x)
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Quadratic Formula': {
        'display':(variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x')}&nbsp;=&nbsp;
                <Fraction parsing='children'>
                    <>
                        <p>
                            -{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b', {lessThanZeroParen:true})}
                            &nbsp;&plusmn;&nbsp;
                            <MathRoot size={20} sup={true}>
                                <>
                                    <span>
                                        {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b', {lessThanZeroParen:true})}
                                        <sup>2</sup>&nbsp;-&nbsp;4
                                        {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a', {paren:true})}
                                        {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c', {paren:true})}
                                    </span>
                                </>
                            </MathRoot>
                        </p>
                        <p>2
                            {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a',{paren:true})}
                        </p>
                    </>
                </Fraction>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {x, a, b, c} = updatedVariables

            switch(selectedVariable){
                case 'x':
                    if (nonSerializedFormulaData.check([a, b, c])) {
                        if (Number(a) !== 0) {
                            const discriminant = math.subtract(math.pow(b, 2), math.multiply(4, a, c));
                    
                            if (math.smaller(discriminant, 0)) {
                                // For complex numbers, calculate real and imaginary parts
                                const realPart = math.divide(-b, math.multiply(2, a));
                                const imaginaryPart = math.sqrt(math.abs(discriminant));
                                
                                // Format as a complex number
                                const root1 = `${math.round(realPart, 4)} + ${math.round(imaginaryPart, 4)}i`;
                                const root2 = `${math.round(realPart, 4)} - ${math.round(imaginaryPart, 4)}i`;
                    
                                result = `${root1}, ${root2}`;
                            } else {
                                // If discriminant is non-negative, calculate real roots
                                const sqrtDiscriminant = math.sqrt(discriminant);
                                const denominator = math.multiply(2, a);
                            
                                const root1 = math.divide(math.subtract(-b, sqrtDiscriminant), denominator);
                                const root2 = math.divide(math.add(-b, sqrtDiscriminant), denominator);
                            
                                if(math.round(root1, 4) === math.round(root2, 4)){
                                    result = `${math.round(root1, 4)}`
                                } else {
                                    result = `${math.round(root1, 4)}, ${math.round(root2, 4)}`;
                                }
                            }
                        } else {
                            result = 'Error: a cannot be zero';
                        }
                    } else {
                        result = 'Error: missing variable/s';
                    }
                    break;
                case 'a':
                    if(nonSerializedFormulaData.check([x, b, c])){
                        if (Number(x) !== 0) {
                            result = ((b * -1 * x) - c) / (x * x)
                        } else {
                            result = 'Error: cannot divide by zero';
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                case 'b':
                    if(nonSerializedFormulaData.check([x, a, c])){
                        if (Number(x) !== 0) {
                            result = ((a * -1 * (x * x)) - c) / x
                        } else {
                            result = 'Error: cannot divide by zero';
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                case 'c':
                    if(nonSerializedFormulaData.check([x, a, b])){
                        result = (a * -1 * (x * x)) - (b * x)
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Vertex Form of a Quadratic': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'y')}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}(
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x')}
                &nbsp;-&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'h', {lessThanZeroParen:true})}
                )<sup>2</sup>&nbsp;+&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'k', {lessThanZeroParen:true})}
            </>
        ),
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {y, a, x, h, k} = updatedVariables

            switch(selectedVariable){
                case 'y':
                    if(nonSerializedFormulaData.check([a, x, h, k])){
                        result = a * (math.pow((x - h), 2)) + Number(k)
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a':
                    if(nonSerializedFormulaData.check([y, x, h, k])){
                        if (Number(x) !== Number(h)) {
                            result = (y - k) / (math.pow(x - h, 2))
                        } else {
                            result = 'x and h cannot be the same value';
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'k':
                    if(nonSerializedFormulaData.check([a, x, h, y])){
                        result = y - (a * (math.pow((x - h), 2))) 
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'x':
                    if(nonSerializedFormulaData.check([a, h, k, y])){
                        if (Number(a) === 0) {
                            result = 'Error: a cannot be zero'
                        } else {
                            let discriminant = (y - k) / a;
                            if (discriminant < 0) {
                                result = 'Error: use quadratic formula calculator for complex numbers'
                            } else {
                                let root = math.sqrt(discriminant);
                                result = `${math.round(Number(h) + root, 5)}, ${math.round(h - root, 5)}`
                            }
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'h':
                    if(nonSerializedFormulaData.check([a, x, k, y])){
                        if (Number(a) === 0) {
                            result = 'Error: a cannot be zero'
                        } else {
                            let discriminant = (y - k) / a;
                            if (discriminant < 0) {
                                result = 'Error: use quadratic formula calculator for complex numbers'
                            } else {
                                let root = math.sqrt(discriminant);
                                result = `${math.round(Number(x) + root, 5)}, ${math.round(x - root, 5)}`
                            }
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Absolute Value Equation': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'y')}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}|
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x')}
                &nbsp;-&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'h', {lessThanZeroParen:true})}
                |&nbsp;+&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'k', {lessThanZeroParen:true})}
            </>
        ),
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {y, a, x, h, k} = updatedVariables

            switch(selectedVariable){
                case 'y':
                    if(nonSerializedFormulaData.check([a, x, h, k])){
                        result = (a * math.abs(x - h)) + Number(k)
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a':
                    if(nonSerializedFormulaData.check([y, x, h, k])){
                        if (Number(x) !== Number(h)) {
                            result = (y - k) / (math.abs(x-h))
                        } else {
                            result = 'x and h cannot be the same value';
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'k':
                    if(nonSerializedFormulaData.check([a, x, h, y])){
                        result = y - (a * (math.abs(x-h))) 
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'x':
                    if(nonSerializedFormulaData.check([a, h, k, y])){
                        if (Number(a) === 0) {
                            result = 'Error: a cannot be zero'
                        } else {
                            if(y === k){
                                result = String(h)
                            } else {
                                const firstAns = Number(h) + ((y-k) / a)
                                const secondAns = Number(h) - ((y-k) / a)
                                result=`${firstAns},${secondAns}`
                            }
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'h':
                    if(nonSerializedFormulaData.check([a, x, k, y])){
                        if (Number(a) === 0) {
                            result = 'Error: a cannot be zero'
                        } else {
                            if(y === k){
                                result = String(x)
                            } else {
                                const firstAns = Number(x) - ((y-k) / a)
                                const secondAns = Number(x) + ((y-k) / a)
                                result=`${firstAns},${secondAns}`
                            }
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Adding Polynomial Expressions': {
        'display': (variables, selectedVariable) => {
            const {S, ...rest} = variables 
            let arr = Object.keys(rest)
            const dashIndex = arr.indexOf("--");
            const polyVariables = [arr.slice(0, dashIndex), arr.slice(dashIndex + 1)]
            const tVArray1 = {}
            for(let i=0;i<polyVariables[0].length;i++){
                tVArray1[polyVariables[0][i]] = variables[polyVariables[0][i]]
            }
            let tVArray2 = {}
            for(let i=0;i<polyVariables[1].length;i++){
                tVArray2[polyVariables[1][i]] = variables[polyVariables[1][i]]
            }
            return(
                <>
                    <span style={styles.polynomialFlexColumn}>
                        <span style={styles.polynomialFormula}> 
                            {Object.keys(tVArray1).map((variable, index, arr) => {
                                return (
                                    <Fragment key={index}>
                                        <span 
                                            key={index} 
                                            style={styles.inlineBlockDisplay}
                                        >
                                            {nonSerializedFormulaData.checkVar(variables, selectedVariable, variable, { addPlus: index === 0 ? false : true })}
                                            {index !== arr.length - 1 &&
                                                <span>x</span>}
                                            {(arr.length - 1 - index !== 0 && arr.length - 1 - index !== 1) &&
                                                <sup style={styles.polynomialExponent}>{arr.length - 1 - index}</sup>
                                            }
                                        </span>
                                    </Fragment>
                                );
                            })}
                        </span>
                        <span style={styles.polynomialFormula}> 
                            <span style={styles.polynomialOperation}>+</span>
                            {Object.keys(tVArray2).map((variable, index, arr) => {
                                return (
                                    <Fragment key={index}>
                                        <span 
                                            key={index} 
                                            style={styles.inlineBlockDisplay}
                                        >
                                            {nonSerializedFormulaData.checkVar(variables, selectedVariable, variable, { addPlus: index === 0 ? false : true })}
                                            {index !== arr.length - 1 &&
                                                <span>x</span>}
                                            {(arr.length - 1 - index !== 0 && arr.length - 1 - index !== 1) &&
                                                <sup style={styles.polynomialExponent}>{arr.length - 1 - index}</sup>
                                            }
                                        </span>
                                    </Fragment>
                                );
                            })}
                        </span>
                        <span style={styles.polynomialDash}></span>
                        <span style={styles.polynomialFormula}>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'S', {polynomial:true})} </span> 
                    </span>
                </>
            )
        },
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            const {S, ...rest} = updatedVariables 
            let arr = Object.keys(rest)
            const dashIndex = arr.indexOf("--");
            const polyVariables = [arr.slice(0, dashIndex), arr.slice(dashIndex + 1)]
            const tVArray1 = {}
            for(let i=0;i<polyVariables[0].length;i++){
                tVArray1[polyVariables[0][i]] = updatedVariables[polyVariables[0][i]]
            }
            let tVArray2 = {}
            for(let i=0;i<polyVariables[1].length;i++){
                tVArray2[polyVariables[1][i]] = updatedVariables[polyVariables[1][i]]
            }

            switch(selectedVariable){
                case 'S':
                    const allValues = [...Object.values(tVArray1), ...Object.values(tVArray2)]
                    if(nonSerializedFormulaData.check(allValues)){
                        const firstPolyValues = Object.values(tVArray1).reverse()
                        const secondPolyValues = Object.values(tVArray2).reverse()
                        const firstPoly = new Polynomial(firstPolyValues)
                        const secondPoly = new Polynomial(secondPolyValues)
                        const sumPoly = firstPoly.add(secondPoly)
                        const sumExponents = Object.keys(sumPoly.coeff).reverse()
                        const sumCoefficients = Object.values(sumPoly.coeff).reverse()
                        let sumString = ''
                        for(let i=0; i < sumCoefficients.length; i++){
                            const sign = String(sumCoefficients[i]).startsWith('-') || i===0?'':'+'
                            const coefficient = nonSerializedFormulaData.formatValue(sumCoefficients[i], 'standard') === 1 && Number(sumExponents[i]) !== 0
                                ? ''
                                : (nonSerializedFormulaData.formatValue(sumCoefficients[i], 'standard') === -1 && Number(sumExponents[i]) !== 0
                                    ? '-'
                                    : nonSerializedFormulaData.formatValue(sumCoefficients[i], 'standard')
                                )
                            const x = Number(sumExponents[i]) === 0 ?'':'x'
                            const exponent = (Number(sumExponents[i]) !== 0 && Number(sumExponents[i]) !== 1)
                                ? `^${sumExponents[i]}`
                                : ''
                            sumString += `${sign}${coefficient}${x}${exponent}`
                        }
                        if(sumString === ''){
                            sumString = '0'
                        }
                        result = `${sumString}|[${sumExponents.join('#')}:::${sumCoefficients.join('$')}]|`
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Subtracting Polynomial Expressions': {
        'display': (variables, selectedVariable) => {
            const {D, ...rest} = variables 
            let arr = Object.keys(rest)
            const dashIndex = arr.indexOf("--");
            const polyVariables = [arr.slice(0, dashIndex), arr.slice(dashIndex + 1)]
            const tVArray1 = {}
            for(let i=0;i<polyVariables[0].length;i++){
                tVArray1[polyVariables[0][i]] = variables[polyVariables[0][i]]
            }
            let tVArray2 = {}
            for(let i=0;i<polyVariables[1].length;i++){
                tVArray2[polyVariables[1][i]] = variables[polyVariables[1][i]]
            }
            return(
                <>
                    <span style={styles.polynomialFlexColumn}>
                        <span style={styles.polynomialFormula}> 
                            {Object.keys(tVArray1).map((variable, index, arr) => {
                                return (
                                    <Fragment key={index}>
                                        <span 
                                            key={index} 
                                            style={styles.inlineBlockDisplay}
                                        >
                                            {nonSerializedFormulaData.checkVar(variables, selectedVariable, variable, { addPlus: index === 0 ? false : true })}
                                            {index !== arr.length - 1 &&
                                                <span>x</span>}
                                            {(arr.length - 1 - index !== 0 && arr.length - 1 - index !== 1) &&
                                                <sup style={styles.polynomialExponent}>{arr.length - 1 - index}</sup>
                                            }
                                        </span>
                                    </Fragment>
                                );
                            })}
                        </span>
                        <span style={styles.polynomialFormula}> 
                            <span style={styles.polynomialOperation}>-</span>
                            {Object.keys(tVArray2).map((variable, index, arr) => {
                                return (
                                    <Fragment key={index}>
                                        <span 
                                            key={index} 
                                            style={styles.inlineBlockDisplay}
                                        >
                                            {nonSerializedFormulaData.checkVar(variables, selectedVariable, variable, { addPlus: index === 0 ? false : true })}
                                            {index !== arr.length - 1 &&
                                                <span>x</span>}
                                            {(arr.length - 1 - index !== 0 && arr.length - 1 - index !== 1) &&
                                                <sup style={styles.polynomialExponent}>{arr.length - 1 - index}</sup>
                                            }
                                        </span>
                                    </Fragment>
                                );
                            })}
                        </span>
                        <span style={styles.polynomialDash}></span>
                        <span style={styles.polynomialFormula}>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'D', {polynomial:true})} </span> 
                    </span>
                </>
            )
        },
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            const {D, ...rest} = updatedVariables 
            let arr = Object.keys(rest)
            const dashIndex = arr.indexOf("--");
            const polyVariables = [arr.slice(0, dashIndex), arr.slice(dashIndex + 1)]
            const tVArray1 = {}
            for(let i=0;i<polyVariables[0].length;i++){
                tVArray1[polyVariables[0][i]] = updatedVariables[polyVariables[0][i]]
            }
            let tVArray2 = {}
            for(let i=0;i<polyVariables[1].length;i++){
                tVArray2[polyVariables[1][i]] = updatedVariables[polyVariables[1][i]]
            }

            switch(selectedVariable){
                case 'D':
                    const allValues = [...Object.values(tVArray1), ...Object.values(tVArray2)]
                    if(nonSerializedFormulaData.check(allValues)){
                        const firstPolyValues = Object.values(tVArray1).reverse()
                        const secondPolyValues = Object.values(tVArray2).reverse()
                        const firstPoly = new Polynomial(firstPolyValues)
                        const secondPoly = new Polynomial(secondPolyValues)
                        const sumPoly = firstPoly.sub(secondPoly)
                        const sumExponents = Object.keys(sumPoly.coeff).reverse()
                        const sumCoefficients = Object.values(sumPoly.coeff).reverse()
                        let sumString = ''
                        for(let i=0; i < sumCoefficients.length; i++){
                            const sign = String(sumCoefficients[i]).startsWith('-') || i===0?'':'+'
                            const coefficient = nonSerializedFormulaData.formatValue(sumCoefficients[i], 'standard') === 1 && Number(sumExponents[i]) !== 0
                                ? ''
                                : (nonSerializedFormulaData.formatValue(sumCoefficients[i], 'standard') === -1 && Number(sumExponents[i]) !== 0
                                    ? '-'
                                    : nonSerializedFormulaData.formatValue(sumCoefficients[i], 'standard')
                                )
                            const x = Number(sumExponents[i]) === 0 ?'':'x'
                            const exponent = (Number(sumExponents[i]) !== 0 && Number(sumExponents[i]) !== 1)
                                ? `^${sumExponents[i]}`
                                : ''
                            sumString += `${sign}${coefficient}${x}${exponent}`
                        }
                        if(sumString === ''){
                            sumString = '0'
                        }
                        result = `${sumString}|[${sumExponents.join('#')}:::${sumCoefficients.join('$')}]|`
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Multiplying Polynomial Expressions': {
        'display': (variables, selectedVariable) => {
            const {P, ...rest} = variables 
            let arr = Object.keys(rest)
            const dashIndex = arr.indexOf("--");
            const polyVariables = [arr.slice(0, dashIndex), arr.slice(dashIndex + 1)]
            const tVArray1 = {}
            for(let i=0;i<polyVariables[0].length;i++){
                tVArray1[polyVariables[0][i]] = variables[polyVariables[0][i]]
            }
            let tVArray2 = {}
            for(let i=0;i<polyVariables[1].length;i++){
                tVArray2[polyVariables[1][i]] = variables[polyVariables[1][i]]
            }
            return(
                <>
                    <span style={styles.polynomialFlexColumn}>
                        <span style={styles.polynomialFormula}> 
                            {Object.keys(tVArray1).map((variable, index, arr) => {
                                return (
                                    <Fragment key={index}>
                                        <span 
                                            key={index} 
                                            style={styles.inlineBlockDisplay}
                                        >
                                            {nonSerializedFormulaData.checkVar(variables, selectedVariable, variable, { addPlus: index === 0 ? false : true })}
                                            {index !== arr.length - 1 &&
                                                <span>x</span>}
                                            {(arr.length - 1 - index !== 0 && arr.length - 1 - index !== 1) &&
                                                <sup style={styles.polynomialExponent}>{arr.length - 1 - index}</sup>
                                            }
                                        </span>
                                    </Fragment>
                                );
                            })}
                        </span>
                        <span style={styles.polynomialFormula}> 
                            <span style={styles.polynomialOperation}>×</span>
                            {Object.keys(tVArray2).map((variable, index, arr) => {
                                return (
                                    <Fragment key={index}>
                                        <span 
                                            key={index} 
                                            style={styles.inlineBlockDisplay}
                                        >
                                            {nonSerializedFormulaData.checkVar(variables, selectedVariable, variable, { addPlus: index === 0 ? false : true })}
                                            {index !== arr.length - 1 &&
                                                <span>x</span>}
                                            {(arr.length - 1 - index !== 0 && arr.length - 1 - index !== 1) &&
                                                <sup style={styles.polynomialExponent}>{arr.length - 1 - index}</sup>
                                            }
                                        </span>
                                    </Fragment>
                                );
                            })}
                        </span>
                        <span style={styles.polynomialDash}></span>
                        <span style={styles.polynomialFormula}>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'P', {polynomial:true})} </span> 
                    </span>
                </>
            )
        },
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            const {P, ...rest} = updatedVariables 
            let arr = Object.keys(rest)
            const dashIndex = arr.indexOf("--");
            const polyVariables = [arr.slice(0, dashIndex), arr.slice(dashIndex + 1)]
            const tVArray1 = {}
            for(let i=0;i<polyVariables[0].length;i++){
                tVArray1[polyVariables[0][i]] = updatedVariables[polyVariables[0][i]]
            }
            let tVArray2 = {}
            for(let i=0;i<polyVariables[1].length;i++){
                tVArray2[polyVariables[1][i]] = updatedVariables[polyVariables[1][i]]
            }

            switch(selectedVariable){
                case 'P':
                    const allValues = [...Object.values(tVArray1), ...Object.values(tVArray2)]
                    if(nonSerializedFormulaData.check(allValues)){
                        const firstPolyValues = Object.values(tVArray1).reverse()
                        const secondPolyValues = Object.values(tVArray2).reverse()
                        const firstPoly = new Polynomial(firstPolyValues)
                        const secondPoly = new Polynomial(secondPolyValues)
                        const sumPoly = firstPoly.mul(secondPoly)
                        const sumExponents = Object.keys(sumPoly.coeff).reverse()
                        const sumCoefficients = Object.values(sumPoly.coeff).reverse()
                        let sumString = ''
                        for(let i=0; i < sumCoefficients.length; i++){
                            const sign = String(sumCoefficients[i]).startsWith('-') || i===0?'':'+'
                            const coefficient = nonSerializedFormulaData.formatValue(sumCoefficients[i], 'standard') === 1 && Number(sumExponents[i]) !== 0
                                ? ''
                                : (nonSerializedFormulaData.formatValue(sumCoefficients[i], 'standard') === -1 && Number(sumExponents[i]) !== 0
                                    ? '-'
                                    : nonSerializedFormulaData.formatValue(sumCoefficients[i], 'standard')
                                )
                            const x = Number(sumExponents[i]) === 0 ?'':'x'
                            const exponent = (Number(sumExponents[i]) !== 0 && Number(sumExponents[i]) !== 1)
                                ? `^${sumExponents[i]}`
                                : ''
                            sumString += `${sign}${coefficient}${x}${exponent}`
                        }
                        if(sumString === ''){
                            sumString = '0'
                        }
                        result = `${sumString}|[${sumExponents.join('#')}:::${sumCoefficients.join('$')}]|`
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Dividing Polynomial Expressions': {
        'display': (variables, selectedVariable) => {
            const {Q, ...rest} = variables 
            let arr = Object.keys(rest)
            const dashIndex = arr.indexOf("--");
            const polyVariables = [arr.slice(0, dashIndex), arr.slice(dashIndex + 1)]
            const tVArray1 = {}
            for(let i=0;i<polyVariables[0].length;i++){
                tVArray1[polyVariables[0][i]] = variables[polyVariables[0][i]]
            }
            let tVArray2 = {}
            for(let i=0;i<polyVariables[1].length;i++){
                tVArray2[polyVariables[1][i]] = variables[polyVariables[1][i]]
            }
            return(
                <>
                    <span style={styles.polynomialFlexColumn}>
                        <span style={styles.polynomialFormula}> 
                            {Object.keys(tVArray1).map((variable, index, arr) => {
                                return (
                                    <Fragment key={index}>
                                        <span 
                                            key={index} 
                                            style={styles.inlineBlockDisplay}
                                        >
                                            {nonSerializedFormulaData.checkVar(variables, selectedVariable, variable, { addPlus: index === 0 ? false : true })}
                                            {index !== arr.length - 1 &&
                                                <span>x</span>}
                                            {(arr.length - 1 - index !== 0 && arr.length - 1 - index !== 1) &&
                                                <sup style={styles.polynomialExponent}>{arr.length - 1 - index}</sup>
                                            }
                                        </span>
                                    </Fragment>
                                );
                            })}
                        </span>
                        <span style={styles.polynomialFormula}> 
                            <span style={styles.polynomialOperation}>÷</span>
                            {Object.keys(tVArray2).map((variable, index, arr) => {
                                return (
                                    <Fragment key={index}>
                                        <span 
                                            key={index} 
                                            style={styles.inlineBlockDisplay}
                                        >
                                            {nonSerializedFormulaData.checkVar(variables, selectedVariable, variable, { addPlus: index === 0 ? false : true })}
                                            {index !== arr.length - 1 &&
                                                <span>x</span>}
                                            {(arr.length - 1 - index !== 0 && arr.length - 1 - index !== 1) &&
                                                <sup style={styles.polynomialExponent}>{arr.length - 1 - index}</sup>
                                            }
                                        </span>
                                    </Fragment>
                                );
                            })}
                        </span>
                        <span style={styles.polynomialDash}></span>
                        <span style={styles.polynomialFormula}>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'Q', {polynomial:true, dividePolynomial:true})} </span> 
                    </span>
                </>
            )
        },
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            const {Q, ...rest} = updatedVariables 
            let arr = Object.keys(rest)
            const dashIndex = arr.indexOf("--");
            const polyVariables = [arr.slice(0, dashIndex), arr.slice(dashIndex + 1)]
            const tVArray1 = {}
            for(let i=0;i<polyVariables[0].length;i++){
                tVArray1[polyVariables[0][i]] = updatedVariables[polyVariables[0][i]]
            }
            let tVArray2 = {}
            for(let i=0;i<polyVariables[1].length;i++){
                tVArray2[polyVariables[1][i]] = updatedVariables[polyVariables[1][i]]
            }

            switch(selectedVariable){
                case 'Q':
                    const allValues = [...Object.values(tVArray1), ...Object.values(tVArray2)]
                    if(nonSerializedFormulaData.check(allValues)){
                        try {
                            const firstPolyValues = Object.values(tVArray1).reverse()
                            const secondPolyValues = Object.values(tVArray2).reverse()
                            const firstPoly = new Polynomial(firstPolyValues)
                            const secondPoly = new Polynomial(secondPolyValues)
                            const sumPoly = firstPoly.div(secondPoly)
                            const sumExponents = Object.keys(sumPoly.coeff).reverse()
                            const sumCoefficients = Object.values(sumPoly.coeff).reverse()

                            let quotientCoeffs = [];
                            let remainder = new Polynomial(firstPoly.coeff)
                            while (remainder.degree() >= secondPoly.degree()) { 
                                const leadCoeffQuotient = remainder.coeff[remainder.degree()] / secondPoly.coeff[secondPoly.degree()];
                                const degreeDiff = remainder.degree() - secondPoly.degree();
                                const termQuotient = new Polynomial({ [degreeDiff]: leadCoeffQuotient });
                                quotientCoeffs[degreeDiff] = (quotientCoeffs[degreeDiff] || 0) + leadCoeffQuotient;
                                remainder = remainder.sub(termQuotient.mul(secondPoly));
                            }
                            remainder = Object.values(remainder.coeff)

                            let sumString = ''
                            for(let i=0; i < sumCoefficients.length; i++){
                                const sign = String(sumCoefficients[i]).startsWith('-') || i===0?'':'+'
                                const coefficient = nonSerializedFormulaData.formatValue(sumCoefficients[i], 'standard') === 1 && Number(sumExponents[i]) !== 0
                                    ? ''
                                    : (nonSerializedFormulaData.formatValue(sumCoefficients[i], 'standard') === -1 && Number(sumExponents[i]) !== 0
                                        ? '-'
                                        : nonSerializedFormulaData.formatValue(sumCoefficients[i], 'standard')
                                    )
                                const x = Number(sumExponents[i]) === 0 ?'':'x'
                                const exponent = (Number(sumExponents[i]) !== 0 && Number(sumExponents[i]) !== 1)
                                    ? `^${sumExponents[i]}`
                                    : ''
                                sumString += `${sign}${coefficient}${x}${exponent}`
                            }
                            if(sumString === ''){
                                sumString = '0'
                            }
                            let remExponents = Object.keys(new Polynomial(remainder).coeff)
                            let remCoefficients = Object.values(new Polynomial(remainder).coeff)
                            let remNumerator = remainder.map((val) => nonSerializedFormulaData.formatValue(val, 'standard'))
                            let remainderString = isUndefined(remainder[0])
                                ? ''
                                : `+((${new Polynomial(remNumerator).toString()})/(${secondPoly.toString()}))`
                            result = `${sumString}${remainderString}|[${sumExponents.join('#')}:::${sumCoefficients.join('$')}&&&${remainder.length===0?'NOREMAINDER':`${remExponents.reverse().join('"')}???${remCoefficients.reverse().join('/')}`}@@@${Object.keys(secondPoly.coeff).reverse().join('!')}%%%${Object.values(secondPoly.coeff).reverse().join('*')}]|`
                        } catch (e) {
                            result = 'Error: cannot divide by zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Axis of Symmetry': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'h')}
                &nbsp;=&nbsp;
                <Fraction parsing='children'>
                    <>
                        <p>-{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b', {lessThanZeroParen: true})}</p>
                        <p>2{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a', {paren: true})}</p>
                    </>
                </Fraction>
            </>
        ),
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {x, a, b} = updatedVariables

            switch(selectedVariable){
                case 'x':
                    if(nonSerializedFormulaData.check([a, b])){
                        if(Number(a) !== 0){
                            result = (b * -1) / (2 * a)
                        } else {
                            result = 'Error: a cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a':
                    if(nonSerializedFormulaData.check([x, b])){
                        if(Number(x) !== 0){
                            result = (b * -1) / (2 * x)
                        } else {
                            result = 'Error: x cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'b':
                    if(nonSerializedFormulaData.check([x, a])){
                        result = (-2 * a * x)
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Cubic Solver': {
        'display':(variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'Y')}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x', {paren:true})}
                <sup>3</sup>&nbsp;+&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x', {paren:true})}
                <sup>2</sup>&nbsp;+&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'x', {paren:true})}
                &nbsp;+&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {Y, x, a, b, c, d} = updatedVariables
            const D = d-Y

            switch(selectedVariable){
                case 'Y':
                    if(nonSerializedFormulaData.check([x, a, b, c, d])){
                        result = math.multiply(a, math.pow(x, 3)) + math.multiply(b, math.pow(x, 2)) + math.multiply(c, x) + Number(d)
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'x':
                    if(nonSerializedFormulaData.check([Y, a, b, c, d])){
                        const roots = math.polynomialRoot(D, c, b, a)
                        const firstRoot = typeof roots[0] === 'object'
                            ?nonSerializedFormulaData.formatComplex(roots[0])
                            :roots[0]
                        const secondRoot = typeof roots[1] === 'object'
                            ?nonSerializedFormulaData.formatComplex(roots[1])
                            :roots[1]
                        const thirdRoot = typeof roots[2] === 'object'
                            ?nonSerializedFormulaData.formatComplex(roots[2])
                            :roots[2]
                        let formattedRoots = [firstRoot, secondRoot, thirdRoot]
                        result= `${formattedRoots}`
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a':
                    if(nonSerializedFormulaData.check([x, Y, b, c, d])){
                        if(Number(x) !== 0){
                            result = (-b * (x ** 2) - c * x - D) / (x ** 3)
                        } else {
                            result = 'Error: x cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'b':
                    if(nonSerializedFormulaData.check([Y, x, a, c, d])){
                        if(Number(x) !== 0){
                            result = (-a * (x ** 3) - c * x - D) / (x ** 2)
                        } else {
                            result = 'Error: x cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'c':
                    if(nonSerializedFormulaData.check([Y, x, a, b, d])){
                        if(Number(x) !== 0){
                            result = (-a * (x ** 3) - b * (x ** 2) - D) / x
                        } else {
                            result = 'Error: x cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'd':
                    if(nonSerializedFormulaData.check([Y, x, a, b, c])){
                        result = -(a * (x ** 3) + b * (x ** 2) + c * x) + Number(Y)
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Arithmetic Sequence (Explicit Formula)': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, `a_n`, {sub:true, subVar:true, subVal: nonSerializedFormulaData.checkVar(variables, 'n')})}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a_1', {sub:true})}
                &nbsp;+&nbsp;(
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')}
                &nbsp;-&nbsp;1)
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}
            </>
        ),
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a_n, a_1, n, d} = updatedVariables

            switch(selectedVariable){
                case 'a_n':
                    if(nonSerializedFormulaData.check([a_1, n, d])){
                        result = Number(a_1) + ((n - 1) * d)
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a_1':
                    if(nonSerializedFormulaData.check([a_n, n, d])){
                        result = Number(a_n) - ((n - 1) * d)
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'n':
                    if(nonSerializedFormulaData.check([a_n, a_1, d])){
                        if(Number(d) !== 0){
                            result = ((a_n - a_1) / d)  + 1
                        } else {
                            result = 'Error: d cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'd':
                    if(nonSerializedFormulaData.check([a_n, a_1, n])){
                        if(Number(n) !== 1){
                            result = (a_n - a_1) / (n - 1)
                        } else {
                            result = 'Error: n cannot be 1'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Arithmetic Recursive Sequence': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, `a_n`, {sub:true, subVar:true, subVal: nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')})}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, `a_n-1`, {sub:true, subVar:true, subVal: nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n'), minusOne:true})}
                &nbsp;+&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd', {lessThanZeroParen:true})}
            </>
        ),
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a_n, a_1, n, d} = updatedVariables
            let a_n1 = updatedVariables['a_n-1']

            switch(selectedVariable){
                case 'a_n':
                    if(nonSerializedFormulaData.check([a_n1, d, n])){
                        result = Number(a_n1) + Number(d)
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a_n-1':
                    if(nonSerializedFormulaData.check([a_n, d, n])){
                        result = a_n - d
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'n':
                    if(nonSerializedFormulaData.check([a_n, a_1, d])){
                        if(Number(d) !== 0){
                            result = ((a_n - a_1) / d)  + 1
                        } else {
                            result = 'Error: d cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'd':
                    if(nonSerializedFormulaData.check([a_n, a_n1])){
                        result = a_n - a_n1
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Arithmetic General Sum Formula': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, `S_n`, {sub:true, subVar:true, subVal: nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')})}
                &nbsp;=&nbsp;
                <Fraction
                    numerator={nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')}
                    denominator='2'
                />
                &nbsp;&times;&nbsp;(2
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a_1', {paren:true, sub:true})}
                &nbsp;+&nbsp;(
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')}
                &nbsp;-&nbsp;1)
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')})
            </>
        ),
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {S_n, n, a_1, d} = updatedVariables

            switch(selectedVariable){
                case 'S_n':
                    if(nonSerializedFormulaData.check([n, a_1, d])){
                        result = (n / 2) * ((2 * a_1) + ((n - 1) * d))
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a_1':
                    if(nonSerializedFormulaData.check([S_n, n, d])){
                        if(Number(n) !== 0){
                            result = (((2 * S_n) / n) - ((n - 1) * d)) / 2
                        } else {
                            result = 'Error: n cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'n':
                    if(nonSerializedFormulaData.check([S_n, d, a_1])){
                        if(Number(d) !== 0){
                            a_1 = Number(a_1)
                            d = Number(d)
                            S_n = Number(S_n)
                            const term1 = -2 * a_1 + d;
                            const term2 = math.sqrt(8 * S_n * d + 4 * a_1 ** 2 - 4 * a_1 * d + d ** 2);
                          
                            const n1 = (term1 - term2) / (2 * d);
                            const n2 = (term1 + term2) / (2 * d);
                          
                            return `${n1}, ${n2}`; 
                        } else {
                            result = 'Error: d cannot be zero'
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'd':
                    if(nonSerializedFormulaData.check([S_n, n, a_1])){
                        if(Number(n) !== 0 && Number(n) !== 1){
                            result = ((2 * S_n) - (2 * n * a_1)) / ((n * n) - n)
                        } else {
                            result = 'Error: n cannot be 0 or 1'
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Arithmetic Alternate Sum Formula': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, `S_n`, {sub:true, subVar:true, subVal: nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')})}
                &nbsp;=&nbsp;
                <Fraction
                    numerator={nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')}
                    denominator='2'
                />
                &nbsp;&times;&nbsp;(
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a_1', {sub:true})}
                &nbsp;+&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, `a_n`, {sub:true, subVar:true, subVal: nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')})})
            </>
        ),
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {S_n, n, a_1, a_n} = updatedVariables

            switch(selectedVariable){
                case 'S_n':
                    if(nonSerializedFormulaData.check([n, a_1, a_n])){
                        result = (n / 2) * (Number(a_1) + Number(a_n))
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a_1':
                    if(nonSerializedFormulaData.check([S_n, n, a_n])){
                        if(Number(n) !== 0){
                            result = ((2 * S_n) / n) - a_n
                        } else {
                            result = 'Error: n cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a_n':
                    if(nonSerializedFormulaData.check([S_n, n, a_1])){
                        if(Number(n) !== 0){
                            result = ((2 * S_n) / n) - a_1
                        } else {
                            result = 'Error: n cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'n':
                    if(nonSerializedFormulaData.check([S_n, a_n, a_1])){
                        if(Number(a_1) + Number(a_n) !== 0){
                            result = (2 * S_n) / (Number(a_1) + Number(a_n)) 
                        } else {
                            result = 'Error: a_1 + a_n cannot be zero'
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Geometric Sequence (Explicit Formula)': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, `a_n`, {sub:true, subVar:true, subVal: nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')})}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a_1', {sub:true})}
                &nbsp;&times;&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r', {lessThanZeroParen:true})}
                <sup>({nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')} - 1)</sup>
            </>
        ),
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a_n, a_1, r, n} = updatedVariables

            switch(selectedVariable){
                case 'a_n':
                    if(nonSerializedFormulaData.check([n, a_1, r])){
                        result = a_1 * (math.pow(r, math.subtract(n, 1)))
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a_1':
                    if(nonSerializedFormulaData.check([r, n, a_n])){
                        if((math.pow(r, math.subtract(n, 1))) !== 0){
                            result = a_n / (math.pow(r, math.subtract(n, 1)))
                        } else {
                            result = 'Error: r^(n-1) cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'r':
                    if(nonSerializedFormulaData.check([a_n, n, a_1])){
                        if(Number(a_1) !== 0){
                            result = math.nthRoot((a_n / a_1), math.subtract(n, 1))
                        } else {
                            result = 'Error: a_1 cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'n':
                    if(nonSerializedFormulaData.check([r, a_n, a_1])){
                        if(r !== 1 ){
                            if(a_1 !== 0){
                                result = 1 + Number(math.log(a_n / a_1) / math.log(r))
                            } else {
                                result = 'Error: a_1 cannot be zero'
                            }
                        } else {
                            result = 'Error: r cannot be one'
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Geometric Recursive Sequence': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, `a_n`, {sub:true, subVar:true, subVal: nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')})}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r')}
                &nbsp;&times;&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, `a_n-1`, {sub:true, subVar:true, subVal: nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n'), minusOne:true})}
            </>
        ),
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a_n, a_1, r, n} = updatedVariables
            let a_n1 = updatedVariables['a_n-1']

            switch(selectedVariable){
                case 'a_n':
                    if(nonSerializedFormulaData.check([n, a_n1, r])){
                        result = a_n1 * r
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a_n-1':
                    if(nonSerializedFormulaData.check([r, n, a_n])){
                        if(Number(r) !== 0){
                            result = a_n / r
                        } else {
                            result = 'Error: r cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'r':
                    if(nonSerializedFormulaData.check([a_n, n, a_n1])){
                        if(Number(a_n1) !== 0){
                            result = a_n / a_n1
                        } else {
                            result = 'Error: a_n-1 cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'n':
                    if(nonSerializedFormulaData.check([r, a_n, a_1])){
                        if(r !== 1 ){
                            if(a_1 !== 0){
                                result = 1 + Number(math.log(a_n / a_1) / math.log(r))
                            } else {
                                result = 'Error: a_1 cannot be zero'
                            }
                        } else {
                            result = 'Error: r cannot be one'
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Geometric Finite Sum': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, `S_n`, {sub:true, subVar:true, subVal: nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')})}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a_1', {sub: true})}
                &nbsp;&times;&nbsp;
                <Fraction parsing='children'>
                    <>
                        <p>1&nbsp;-&nbsp;
                            {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r', {lessThanZeroParen:true})}
                            <sup>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')}</sup>
                        </p>
                        <p>1&nbsp;-&nbsp;
                            {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r', {lessThanZeroParen:true})}
                        </p>
                    </>
                </Fraction>
            </>
        ),
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {S_n, n, a_1, r} = updatedVariables

            switch(selectedVariable){
                case 'S_n':
                    if(nonSerializedFormulaData.check([n, a_1, r])){
                        if(Number(r) !== 1){
                            result = a_1 * ((1 - (math.pow(r, n))) / (1 - r))
                        } else {
                            result = 'Error: r cannot be one'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a_1':
                    if(nonSerializedFormulaData.check([n, S_n, r])){
                        if(Number(r) !== 1){
                            result = S_n * ((1 - r) / (1 - (math.pow(r, n))))
                        } else {
                            result = 'Error: r cannot be one'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'n':
                    if(nonSerializedFormulaData.check([S_n, a_1, r])){
                        if(Number(r) !== 1){
                            if(Number(a_1) !== 0){
                                result = math.log(1 - ((S_n * (1 - r)) / a_1)) / math.log(r)
                            } else {
                                result = 'Error: a_1 cannot be zero'
                            }
                        } else {
                            result = 'Error: r cannot be one'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'r':
                    if(nonSerializedFormulaData.check([S_n, a_1, n])){
                        if(Number(n) !== 0){
                            if(Number(a_1) !== 0){
                                // result = math.nthRoot((1 - ((S_n(1 - r)) / a_1)), n)
                                // result = Number(S_n) + Number(a_1) + Number(n)
                                result = 'Error: solution did not converge'
                            } else {
                                result = 'Error: a_1 cannot be zero'
                            }
                        } else {
                            result = 'Error: n cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;    
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Geometric Infinite Sum For |r| < 1': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'S')}
                &nbsp;=&nbsp;
                <Fraction parsing='children'>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a_1', {sub: true})}</p>
                        <p>
                            1&nbsp;-&nbsp;
                            {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r', {lessThanZeroParen: true})}
                        </p>
                    </>
                </Fraction>
                ,&nbsp;|{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r')}| {`<`} 1
            </>
        ),
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {S, a_1, r} = updatedVariables

            switch(selectedVariable){
                case 'S':
                    if(nonSerializedFormulaData.check([a_1, r])){
                        if(math.abs(r) < 1){
                            result = a_1 / (math.subtract(1, r))
                        } else {
                            result = 'Error: |r| cannot be >= one'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'a_1':
                    if(nonSerializedFormulaData.check([S, r])){
                        if(math.abs(r) <= 1){
                            result = S * (math.subtract(1, r))
                        } else {
                            result = 'Error: |r| cannot be >= one'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'r':
                    if(nonSerializedFormulaData.check([S, a_1])){
                        if(math.abs(S) !== 0){
                            result = ((a_1 * -1) / S) + 1
                        } else {
                            result = 'Error: S cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Standard form to Polar form': {
        'display': (variables, selectedVariable) => (
            <>
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
                {nonSerializedFormulaData.complexNumberI}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r', {alwaysDarkRed:true})}
                ({nonSerializedFormulaData.trigDisplay('cos')}
                ({nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {alwaysDarkRed:true})})
                +&nbsp;{nonSerializedFormulaData.complexNumberI}
                {nonSerializedFormulaData.trigDisplay('sin')}(
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {alwaysDarkRed:true})}))
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'ANS':
                    if(nonSerializedFormulaData.check([a, b, c, d])){
                        if(Number(b) !== 0 && Number(d) !== 0){
                            const x = a/b
                            const y = c/d
                            const rValue = math.sqrt(math.add(x * x, y * y))
                            const thetaValue = math.arg(math.complex(x, y))
                            result = `${rValue}||${thetaValue}`
                        } else {
                            result = 'Error: cannot divide by zero||Error: cannot divide by zero'
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s||Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error||Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large||Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small||Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error||Error'
                return result
            }
        }
    },
    'Standard form to Euler\'s form': {
        'display': (variables, selectedVariable) => (
            <>
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
                {nonSerializedFormulaData.complexNumberI}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r', {alwaysDarkRed:true})}
                {nonSerializedFormulaData.e}
                <sup>{nonSerializedFormulaData.complexNumberI}{nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {alwaysDarkRed:true, lessThanZeroParen:true})}</sup>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'ANS':
                    if(nonSerializedFormulaData.check([a, b, c, d])){
                        if(Number(b) !== 0 && Number(d) !== 0){
                            const x = a/b
                            const y = c/d
                            const rValue = math.sqrt(math.add(x * x, y * y))
                            const thetaValue = math.arg(math.complex(x, y))
                            result = `${rValue}||${thetaValue}`
                        } else {
                            result = 'Error: cannot divide by zero||Error: cannot divide by zero'
                        }
                        break;
                    } else {
                        result = 'Error: missing variable/s||Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error||Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large||Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small||Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error||Error'
                return result
            }
        }
    },
    'Standard form to Conjugate': {
        'display': (variables, selectedVariable) => (
            <>
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                &nbsp;+&nbsp;
                <Fraction parsing='children' negativeStyling={true} lessThanZeroParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
                &nbsp;&rarr;&nbsp;
                <Fraction parsing='children' negativeStyling={true} numColor='darkred' denColor='darkred'>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                &nbsp;-&nbsp;
                <Fraction parsing='children' negativeStyling={true} lessThanZeroParen={true} numColor='darkred' denColor='darkred'>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'ANS':
                    if(nonSerializedFormulaData.check([a, b, c, d])){
                        result = 'Error: if you see this, something is wrong'
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Polar form to Standard form': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r')}
                ({nonSerializedFormulaData.trigDisplay('cos')}
                ({nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃')})
                +&nbsp;{nonSerializedFormulaData.complexNumberI}
                {nonSerializedFormulaData.trigDisplay('sin')}(
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃')}))
                =&nbsp;
                <Fraction parsing='children' negativeStyling={true} numColor='darkred' denColor='darkred'>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true} numColor='darkred' denColor='darkred'>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
                {nonSerializedFormulaData.complexNumberI}
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {r, 𝜃} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'ANS':
                    if(nonSerializedFormulaData.check([r, 𝜃])){
                        const realPart = math.fraction(r * math.cos(𝜃))
                        const realnum = realPart.s * realPart.n
                        const realDen = realPart.d
                        const imaginaryPart = math.fraction(r * math.sin(𝜃))
                        const imaginarynum = imaginaryPart.s * imaginaryPart.n
                        const imaginaryDen = imaginaryPart.d
                        result = `${realnum}||${realDen}||${imaginarynum}||${imaginaryDen}`
                        break;
                    } else {
                        result = 'Error: missing variable/s||Error: missing variable/s||Error: missing variable/s||Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error||Error||Error||Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large||Error: result is too large||Error: result is too large||Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small||Error: result is too small||Error: result is too small||Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error||Error||Error||Error'
                return result
            }
        }
    },
    'Polar form to Euler\'s form': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r')}
                ({nonSerializedFormulaData.trigDisplay('cos')}
                ({nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃')})
                +&nbsp;{nonSerializedFormulaData.complexNumberI}
                {nonSerializedFormulaData.trigDisplay('sin')}(
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃')}))
                =&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r', {alwaysDarkRed:true})}
                {nonSerializedFormulaData.e}
                <sup>{nonSerializedFormulaData.complexNumberI}{nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {alwaysDarkRed:true, lessThanZeroParen:true})}</sup>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {r} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'ANS':
                    if(nonSerializedFormulaData.check([r])){
                        result = 'Error: if you see this, something is wrong'
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Polar form to Conjugate': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r')}
                ({nonSerializedFormulaData.trigDisplay('cos')}
                ({nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃')})
                +&nbsp;{nonSerializedFormulaData.complexNumberI}
                {nonSerializedFormulaData.trigDisplay('sin')}(
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃')}))
                &rarr;&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r', {alwaysDarkRed:true})}
                ({nonSerializedFormulaData.trigDisplay('cos')}
                (-{nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {alwaysDarkRed:true, lessThanZeroParen:true})})
                +&nbsp;{nonSerializedFormulaData.complexNumberI}
                {nonSerializedFormulaData.trigDisplay('sin')}(-
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {alwaysDarkRed: true, lessThanZeroParen:true})}))
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {r} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'ANS':
                    if(nonSerializedFormulaData.check([r])){
                        result = 'Error: if you see this, something is wrong'
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Euler\'s form to Standard form': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r')}
                {nonSerializedFormulaData.e}
                <sup>{nonSerializedFormulaData.complexNumberI}{nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {lessThanZeroParen:true})}</sup>
                &nbsp;=&nbsp;
                <Fraction parsing='children' negativeStyling={true} numColor='darkred' denColor='darkred'>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                <Fraction parsing='children' negativeStyling={true} addPlus={true} negParen={true} numColor='darkred' denColor='darkred'>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
                {nonSerializedFormulaData.complexNumberI}
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {r, 𝜃} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'ANS':
                    if(nonSerializedFormulaData.check([r, 𝜃])){
                        const realPart = math.fraction(r * math.cos(𝜃))
                        const realnum = realPart.s * realPart.n
                        const realDen = realPart.d
                        const imaginaryPart = math.fraction(r * math.sin(𝜃))
                        const imaginarynum = imaginaryPart.s * imaginaryPart.n
                        const imaginaryDen = imaginaryPart.d
                        result = `${realnum}||${realDen}||${imaginarynum}||${imaginaryDen}`
                        break;
                    } else {
                        result = 'Error: missing variable/s||Error: missing variable/s||Error: missing variable/s||Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error||Error||Error||Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large||Error: result is too large||Error: result is too large||Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small||Error: result is too small||Error: result is too small||Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error||Error||Error||Error'
                return result
            }
        }
    },
    'Euler\'s form to Polar form': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r',)}
                {nonSerializedFormulaData.e}
                <sup>{nonSerializedFormulaData.complexNumberI}{nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {lessThanZeroParen:true})}</sup>
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r', {alwaysDarkRed:true})}
                ({nonSerializedFormulaData.trigDisplay('cos')}
                ({nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {alwaysDarkRed:true})})
                +&nbsp;{nonSerializedFormulaData.complexNumberI}
                {nonSerializedFormulaData.trigDisplay('sin')}(
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {alwaysDarkRed:true})}))
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {r} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'ANS':
                    if(nonSerializedFormulaData.check([r])){
                        result = 'Error: if you see this, something is wrong'
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Euler\'s form to Conjugate': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r')}
                {nonSerializedFormulaData.e}
                <sup>{nonSerializedFormulaData.complexNumberI}{nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {lessThanZeroParen:true})}</sup>
                &nbsp;&rarr;&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r', {alwaysDarkRed:true})}
                {nonSerializedFormulaData.e}
                <sup>-{nonSerializedFormulaData.complexNumberI}{nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {alwaysDarkRed:true, lessThanZeroParen:true})}</sup>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {r} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'ANS':
                    if(nonSerializedFormulaData.check([r])){
                        result = 'Error: if you see this, something is wrong'
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Conjugate to Standard form': {
        'display': (variables, selectedVariable) => (
            <>
                <Fraction parsing='children' negativeStyling={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                &nbsp;-&nbsp;
                <Fraction parsing='children' negativeStyling={true} lessThanZeroParen={true}>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
                &nbsp;&rarr;&nbsp;
                <Fraction parsing='children' negativeStyling={true} numColor='darkred' denColor='darkred'>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'a')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'b')}</p>
                    </>
                </Fraction>
                &nbsp;+&nbsp;
                <Fraction parsing='children' negativeStyling={true} lessThanZeroParen={true} numColor='darkred' denColor='darkred'>
                    <>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'c')}</p>
                        <p>{nonSerializedFormulaData.checkVar(variables, selectedVariable, 'd')}</p>
                    </>
                </Fraction>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {a, b, c, d} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'ANS':
                    if(nonSerializedFormulaData.check([a, b, c, d])){
                        result = 'Error: if you see this, something is wrong'
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Conjugate to Polar form': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r')}
                ({nonSerializedFormulaData.trigDisplay('cos')}
                (-{nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {lessThanZeroParen:true})})
                +&nbsp;{nonSerializedFormulaData.complexNumberI}
                {nonSerializedFormulaData.trigDisplay('sin')}(-
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {lessThanZeroParen:true})}))
                &rarr;&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r', {alwaysDarkRed:true})}
                ({nonSerializedFormulaData.trigDisplay('cos')}
                ({nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {alwaysDarkRed:true})})
                +&nbsp;{nonSerializedFormulaData.complexNumberI}
                {nonSerializedFormulaData.trigDisplay('sin')}(
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {alwaysDarkRed:true})}))
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {r} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'ANS':
                    if(nonSerializedFormulaData.check([r])){
                        result = 'Error: if you see this, something is wrong'
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Conjugate to Euler\'s form': {
        'display': (variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r')}
                {nonSerializedFormulaData.e}
                <sup>-{nonSerializedFormulaData.complexNumberI}{nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {lessThanZeroParen:true})}</sup>
                &nbsp;&rarr;&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r', {alwaysDarkRed:true})}
                {nonSerializedFormulaData.e}
                <sup>{nonSerializedFormulaData.complexNumberI}{nonSerializedFormulaData.checkVar(variables, selectedVariable, '𝜃', {alwaysDarkRed:true, lessThanZeroParen:true})}</sup>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {r} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'ANS':
                    if(nonSerializedFormulaData.check([r])){
                        result = 'Error: if you see this, something is wrong'
                        break;
                    } else {
                        result = 'Error: missing variable/s'
                        break;
                    }
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Mean': {
        'math': (selectedVariable, variables) => {
            let updatedVariables = {...variables}
            let result = 0
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {X} = updatedVariables

            let keys = Object.keys(variables).filter(val => val !== Object.keys(variables)[0])
            let values = []
            for(let i = 0; i < keys.length; i++){
                values.push(variables[keys[i]])
            }

            switch(selectedVariable){
                case 'X':
                    if(nonSerializedFormulaData.check([...values])){
                        result = math.sum(values) / values.length
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                default:
                    keys = (Object.keys(variables).filter(val => val !== Object.keys(variables)[0] && val !== selectedVariable))
                    values = []
                    for(let i = 0; i < keys.length; i++){
                        values.push(variables[keys[i]])
                    }
                    if(nonSerializedFormulaData.check([...values, X])){
                        result = (X * (values.length + 1)) - math.sum(values)
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    },
    'Compound Interest': {
        'display':(variables, selectedVariable) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'A', {format:'money'})}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'P', {format:'money'})}
                {`(`}
                1&nbsp;+&nbsp; 
                <Fraction 
                    numerator={nonSerializedFormulaData.checkVar(variables, selectedVariable, 'r')} 
                    denominator={nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')} 
                />
                {`)`}
                <sup>
                    {nonSerializedFormulaData.checkVar(variables, selectedVariable, 'n')}
                    {nonSerializedFormulaData.checkVar(variables, selectedVariable, 't', {paren:true})}
                </sup>
            </>
        ),
        'math':(selectedVariable, variables) => {
            let updatedVariables = {...variables}
            for(let key in variables){
                if(key === updatedVariables[key]){
                    updatedVariables[key] = ''
                }
            }
            let {A, P, r, n, t} = updatedVariables

            let result = 0
            switch(selectedVariable){
                case 'A':
                    if (nonSerializedFormulaData.check([P, r, n, t])) {
                        if (Number(n) !== 0) {
                            if(Number(n) >= 0 && P >= 0 && r >= 0 && t >= 0){
                                result = (P * Math.pow((1 + (r / n)), n * t)).toFixed(2);
                            } else {
                                result = 'Error: all variables must be positive numbers'
                            }
                        } else {
                            result = 'Error: cannot divide by zero';
                        }
                    } else {
                        result = 'Error: missing variable/s';
                    }
                    break;
                case 'P':
                    if (nonSerializedFormulaData.check([A, r, n, t])) {
                        if (Number(n) !== 0) {
                            if(Number(n) >= 0 && A >= 0 && r >= 0 && t >= 0){
                                result = (A / Math.pow(1 + (r / n), n * t)).toFixed(2);
                            } else {
                                result = 'Error: all variables must be positive numbers'
                            }
                        } else {
                            result = 'Error: cannot divide by zero';
                        }
                    } else {
                        result = 'Error: missing variable/s';
                    }
                    break;
                case 'r':
                    if(nonSerializedFormulaData.check([A, P, n, t])){
                        if (Number(P) !== 0) {
                            if(Number(n) >= 0 && A >= 0 && n >= 0 && t >= 0){
                                if(Number(n) === 0 || Number(t) === 0){
                                    result = 'Error: n and t cannot be zero'
                                } else {
                                    result = math.round(n *((math.nthRoot(A / P, n * t)) - 1), 3)
                                }
                            } else {
                                result = 'Error: all variables must be positive numbers'
                            }
                        } else {
                            result = 'Error: cannot divide by zero';
                        }
                    } else {
                        result = 'Error: missing variable/s';
                    }
                    break;
                case 'n':
                    if(nonSerializedFormulaData.check([A, P, r, t])){
                        if (P <= 0 || A <= 0 || r <= 0 || t <= 0) {
                            result = 'Error: all variables must be positive numbers'
                        }
                    
                        let n = 1; 
                        let tolerance = 1e-7;
                        let maxIterations = 1000; 
                        let iteration = 0;
                    
                        while (iteration < maxIterations) {
                            let f = Math.log(A / P) - (n * t) * Math.log(1 + r / n);
                            let fDerivative = -t * Math.log(1 + r / n) + (t * n) / (n + r);
                    
                            let newN = n - f / fDerivative;
                    
                            if (Math.abs(newN - n) < tolerance) {
                                result = newN;
                            }
                    
                            n = newN;
                            iteration++;
                        }
                    
                        result = 'Error: solution did not converge'
                        //fix this code, this code doesn't accurately calculate n
                        // Add different edge cases for n too
                    } else {
                        result = 'Error: missing variable/s';
                    }
                    break;
                case 't':
                    if(nonSerializedFormulaData.check([A, P, r, n])){
                        if (Number(n) === 0 || Number(P) === 0) {
                            result = 'Error: cannot divide by zero';
                        } else {
                            if(Number(n) >= 0 && A >= 0 && r >= 0 && n >= 0){
                                if(Number(A) === 0 || Number(r) === 0 || (n * math.log(1 + (r / n))) === 0){
                                    result = 'Error: cannot take natural log of 0'
                                } else {
                                    result = math.round(math.log(A / P) / (n * math.log(1 + (r / n))), 2);
                                }
                            } else {
                                result = 'Error: all variables must be positive numbers'
                            }
                        }
                    } else {
                        result = 'Error: missing variable/s';
                    }
                    break;
                default:
                    result = 'Error'
                    break;
            }
            if(result || result === 0){
                if(String(result) === 'Infinity'){
                    result = 'Error: result is too large'
                    return result
                } else {
                    if(String(result) === '-Infinity'){
                        result = 'Error: result is too small'
                        return result
                    } else {
                        return result
                    }
                }
            } else {
                result = 'Error'
                return result
            }
        }
    }
}
//remember to learn about how to solve for n in the compound interest formula,
//       and r in the geometric finite sum formula
//Fixes: compound interest formula for n
//       geometric finite sum formula for r