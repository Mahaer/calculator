import { Fraction } from "./features/calculator/components/hub/fraction"
import { MathRoot } from "./features/calculator/components/hub/mathRoot"
import { create, all, isUndefined } from "mathjs"
const math = create(all)

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
    checkVar: (variables, selectedVariable, variable,{ lessThanZeroParen=false, paren=false, sub=false, subVar=false, subVal='', topBar=false, minusOne=false, format='standard'} = {}) => {
        if(!lessThanZeroParen && !paren && !sub && !topBar && !minusOne){
            return variables[variable] !== '' && variables[variable] !== undefined 
            ? (!isNaN(Number(variables[variable]))
                ? <span style={selectedVariable === variable
                    ? {color: 'darkred'}
                    : {}}>{variable}
                  </span>
                : <span style={selectedVariable === variable
                    ? {color: 'darkred'}
                    : {}}>{String(variables[variable]).includes(',')
                        ? variable
                        : nonSerializedFormulaData.formatValue(variables[variable], format)
                        }
                  </span>)
            : <span style={selectedVariable === variable
                ? {color: 'darkred'}
                : {}}>{variable}</span>
        } else if(paren && !sub && !topBar && !minusOne){
            return variables[variable] !== '' && variables[variable] !== undefined 
            ? (isNaN(Number(variables[variable])) 
                ? <span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable}</span>
                : <span style={selectedVariable === variable
                    ? {color: 'darkred'}
                    : {}}>{`(${nonSerializedFormulaData.formatValue(variables[variable], format)})`}
                  </span>)
            : <span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable}</span>
        } else if(lessThanZeroParen && !sub && !topBar && !minusOne){
            return variables[variable] !== '' && variables[variable] !== undefined 
                ? (isNaN(Number(variables[variable])) 
                    ? <span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable}</span>
                    :(variables[variable] < 0
                        ?<span style={selectedVariable === variable
                            ? {color: 'darkred'}
                            : {}}>{`(${nonSerializedFormulaData.formatValue(variables[variable], format)})`}
                          </span>
                        :<span style={selectedVariable === variable
                            ? {color: 'darkred'}
                            : {}}>{nonSerializedFormulaData.formatValue(variables[variable], format)}
                          </span>))
                : <span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable}</span>
        } else if(sub && !lessThanZeroParen && !paren && !subVar && !topBar && !minusOne){
            return variables[variable] !== '' && variables[variable] !== undefined 
                ? (isNaN(Number(variables[variable])) 
                    ? (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></span>) 
                    :<span style={selectedVariable === variable
                        ? {color: 'darkred'}
                        : {}}>{nonSerializedFormulaData.formatValue(variables[variable], format)}
                      </span>)
                : (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></span>)
        } else if(sub && paren && !subVar && !topBar && !minusOne){
            return variables[variable] !== '' && variables[variable] !== undefined 
                ? (isNaN(Number(variables[variable])) 
                    ? (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></span>) 
                    :<span style={selectedVariable === variable
                        ? {color: 'darkred'}
                        : {}}>{`(${nonSerializedFormulaData.formatValue(variables[variable], format)})`}
                      </span>)
                : (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></span>)
        } else if(sub && lessThanZeroParen && !subVar && !topBar && !minusOne){
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
        } else if(sub && !lessThanZeroParen && !paren && subVar && !topBar && !minusOne){
            return variables[variable] !== '' && variables[variable] !== undefined 
            ? (isNaN(Number(variables[variable])) 
                ? (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{subVal}</sub></span>) 
                :<span style={selectedVariable === variable
                    ? {color: 'darkred'}
                    : {}}>{nonSerializedFormulaData.formatValue(variables[variable], format)}
                  </span>)
            : (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{subVal}</sub></span>)
        } else if(sub && !lessThanZeroParen && !paren && subVar && !topBar && minusOne){
            return variables[variable] !== '' && variables[variable] !== undefined 
            ? (isNaN(Number(variables[variable])) 
                ? (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{subVal}-1</sub></span>) 
                :<span style={selectedVariable === variable
                    ? {color: 'darkred'}
                    : {}}>{nonSerializedFormulaData.formatValue(variables[variable], format)}
                  </span>) 
            : (<span style={selectedVariable === variable? {color: 'darkred'}: {}}>{variable.split('_')[0]}<sub>{subVal}-1</sub></span>)
        } else if(topBar && !lessThanZeroParen && !paren && !sub && !minusOne){
            return variables[variable] !== '' && variables[variable] !== undefined 
            ? (isNaN(Number(variables[variable])) 
                ? (<span style={selectedVariable === variable
                    ? {color: 'darkred', display:'inline-flex', flexDirection: 'column', alignItems: 'center'}
                    : {display:'inline-flex', flexDirection: 'column', alignItems: 'center'}}
                   >
                    <h3 style={{height:'8px'}}>&#772;
                        <span style={{color: 'transparent'}}>-</span>
                    </h3>
                    <h3 style={{fontSize:'32px'}}>{variable}</h3>
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
                <h3 style={{fontSize:'32px'}}>{variable}</h3>
               </span>)
        }
    },
    formatValue: (value, type='standard') => {
        if(String(value).includes('i') 
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
                                const root1 = `${math.round(realPart, 5)} + ${math.round(imaginaryPart, 5)}i`;
                                const root2 = `${math.round(realPart, 5)} - ${math.round(imaginaryPart, 5)}i`;
                    
                                result = `${root1}, ${root2}`;
                            } else {
                                // If discriminant is non-negative, calculate real roots
                                const sqrtDiscriminant = math.sqrt(discriminant);
                                const denominator = math.multiply(2, a);
                            
                                const root1 = math.divide(math.subtract(-b, sqrtDiscriminant), denominator);
                                const root2 = math.divide(math.add(-b, sqrtDiscriminant), denominator);
                            
                                if(math.round(root1, 5) === math.round(root2, 5)){
                                    result = `${math.round(root1, 5)}`
                                } else {
                                    result = `${math.round(root1, 5)}, ${math.round(root2, 5)}`;
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
            let {h, a, b} = updatedVariables

            switch(selectedVariable){
                case 'h':
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
                    if(nonSerializedFormulaData.check([h, b])){
                        if(Number(h) !== 0){
                            result = (b * -1) / (2 * h)
                        } else {
                            result = 'Error: h cannot be zero'
                        }
                    } else {
                        result = 'Error: missing variable/s'
                    }
                    break;
                case 'b':
                    if(nonSerializedFormulaData.check([h, a])){
                        result = (-2 * a * h)
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