import { Fraction } from "./features/calculator/components/fraction"
import { create, all } from 'mathjs'
import { MathRoot } from "./features/calculator/components/mathRoot"
const math = create(all)

export const nonSerializedFormulaData = {
    check: (variables) => variables.every((str) => 
        str && 
        !str.includes('Error') && 
        !str.includes('Impossible') && 
        str !== '-' && 
        str !== '-.' && 
        !isNaN(Number(str))
    ),
    checkVar: (variables, variable,{ lessThanZeroParen=false, paren=false, sub=false, subVar=false, subVal=''} = {}) => {
        if(!lessThanZeroParen && !paren && !sub){
            return variables[variable] !== '' && variables[variable] !== undefined 
            ? (isNaN(Number(variables[variable])) 
                ? variable
                :math.round(variables[variable], nonSerializedFormulaData.roundingValue)) 
            : variable
        } else if(paren && !sub){
            return variables[variable] !== '' && variables[variable] !== undefined 
            ? (isNaN(Number(variables[variable])) 
                ? variable
                :`(${math.round(variables[variable], nonSerializedFormulaData.roundingValue)})`) 
            : variable
        } else if(lessThanZeroParen && !sub){
            return variables[variable] !== '' && variables[variable] !== undefined 
                ? (isNaN(Number(variables[variable])) 
                    ? variable
                    :(variables[variable] < 0?`(${math.round(variables[variable], nonSerializedFormulaData.roundingValue)})`:math.round(variables[variable], nonSerializedFormulaData.roundingValue))) 
                : variable
        } else if(sub && !lessThanZeroParen && !paren && !subVar){
            return variables[variable] !== '' && variables[variable] !== undefined 
                ? (isNaN(Number(variables[variable])) 
                    ? (<>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></>) 
                    :math.round(variables[variable], nonSerializedFormulaData.roundingValue)) 
                : (<>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></>)
        } else if(sub && paren && !subVar){
            return variables[variable] !== '' && variables[variable] !== undefined 
                ? (isNaN(Number(variables[variable])) 
                    ? (<>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></>) 
                    :`(${math.round(variables[variable], nonSerializedFormulaData.roundingValue)})`) 
                : (<>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></>)
        } else if(sub && lessThanZeroParen && !subVar){
            return variables[variable] !== '' && variables[variable] !== undefined 
                ? (isNaN(Number(variables[variable])) 
                    ? (<>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></>)
                    :(variables[variable] < 0? `(${math.round(variables[variable], nonSerializedFormulaData.roundingValue)})` :math.round(variables[variable], nonSerializedFormulaData.roundingValue))) 
                    : (<>{variable.split('_')[0]}<sub>{variable.split('_')[1]}</sub></>)
        } else if(sub && !lessThanZeroParen && !paren && subVar){
            return variables[variable] !== '' && variables[variable] !== undefined 
            ? (isNaN(Number(variables[variable])) 
                ? (<>{variable.split('_')[0]}<sub>{subVal}</sub></>) 
                :math.round(variables[variable], nonSerializedFormulaData.roundingValue)) 
            : (<>{variable.split('_')[0]}<sub>{subVal}</sub></>)
        }
    } ,
    roundingValue:2,
    'Compound Interest':{
        'display':(variables) => (
            <>
                {`${nonSerializedFormulaData.checkVar(variables, 'A')} = 
                ${nonSerializedFormulaData.checkVar(variables, 'P')}(1+ `}
                <Fraction 
                    numerator={nonSerializedFormulaData.checkVar(variables, 'r')} 
                    denominator={nonSerializedFormulaData.checkVar(variables, 'n')} 
                />
                {`)`}
                <sup>
                    {nonSerializedFormulaData.checkVar(variables, 'n')}
                    {nonSerializedFormulaData.checkVar(variables, 't', {paren:true})}
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
    },
    'Slope Intercept Form':{
        'display':(variables) => (
            <>
                {`${nonSerializedFormulaData.checkVar(variables, 'y')} = 
                ${nonSerializedFormulaData.checkVar(variables, 'm')}${nonSerializedFormulaData.checkVar(variables, 'x', {paren:true})} + 
                ${nonSerializedFormulaData.checkVar(variables, 'b', {lessThanZeroParen:true})}`}
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
    'Slope':{
        'display':(variables) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, 'm')}
                &nbsp;=&nbsp;
                    <Fraction parsing='children'>
                        <>
                            <p>
                                {nonSerializedFormulaData.checkVar(variables, 'Y_2', {sub:true})}
                                &nbsp;-&nbsp;
                                {nonSerializedFormulaData.checkVar(variables, 'Y_1', {sub:true, lessThanZeroParen:true})}
                            </p>
                            <p>
                                {nonSerializedFormulaData.checkVar(variables, 'X_2', {sub:true})}
                                &nbsp;-&nbsp;
                                {nonSerializedFormulaData.checkVar(variables, 'X_1', {sub:true, lessThanZeroParen:true})}
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
    'General Form of a Quadratic':{
        'display':(variables) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, 'a', {lessThanZeroParen:true})}
                {nonSerializedFormulaData.checkVar(variables, 'x', {paren:true})}
                <sup>2</sup>&nbsp;+&nbsp;
                {nonSerializedFormulaData.checkVar(variables, 'b', {lessThanZeroParen:true})}
                {nonSerializedFormulaData.checkVar(variables, 'x', {paren:true})}
                &nbsp;+&nbsp;
                {nonSerializedFormulaData.checkVar(variables, 'c', {lessThanZeroParen:true})}
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
    'Quadratic Formula':{
        'display':(variables) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, 'x')}&nbsp;=&nbsp;
                <Fraction parsing='children'>
                    <>
                        <p>
                            -{nonSerializedFormulaData.checkVar(variables, 'b', {lessThanZeroParen:true})}
                            &nbsp;&plusmn;&nbsp;
                            <MathRoot size={20} sup={true}>
                                <>
                                    <span>
                                        {nonSerializedFormulaData.checkVar(variables, 'b', {lessThanZeroParen:true})}
                                        <sup>2</sup>&nbsp;-&nbsp;4
                                        {nonSerializedFormulaData.checkVar(variables, 'a', {paren:true})}
                                        {nonSerializedFormulaData.checkVar(variables, 'c', {paren:true})}
                                    </span>
                                </>
                            </MathRoot>
                        </p>
                        <p>2
                            {nonSerializedFormulaData.checkVar(variables, 'a',{paren:true})}
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
                            
                                result = `${math.round(root1, 5)}, ${math.round(root2, 5)}`;
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
        'display': (variables) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, 'y')}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, 'a')}(
                {nonSerializedFormulaData.checkVar(variables, 'x')}
                &nbsp;-&nbsp;
                {nonSerializedFormulaData.checkVar(variables, 'h', {lessThanZeroParen:true})}
                )<sup>2</sup>&nbsp;+&nbsp;
                {nonSerializedFormulaData.checkVar(variables, 'k', {lessThanZeroParen:true})}
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
        'display': (variables) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, 'h')}
                &nbsp;=&nbsp;
                <Fraction
                    numerator={`-${nonSerializedFormulaData.checkVar(variables, 'b', {lessThanZeroParen: true})}`}
                    denominator={`2${nonSerializedFormulaData.checkVar(variables, 'a', {paren: true})}`}
                />
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
        'display': (variables) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, `a_n`, {sub:true, subVar:true, subVal: nonSerializedFormulaData.checkVar(variables, 'n')})}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, 'a_1', {sub:true})}
                &nbsp;+&nbsp;(
                {nonSerializedFormulaData.checkVar(variables, 'n')}
                &nbsp;-&nbsp;1)
                {nonSerializedFormulaData.checkVar(variables, 'd')}
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
        'display': (variables) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, `a_n`, {sub:true, subVar:true, subVal: nonSerializedFormulaData.checkVar(variables, 'n')})}
                &nbsp;=&nbsp;
                {nonSerializedFormulaData.checkVar(variables, `a_n-1`, {sub:true, subVar:true, subVal: `${nonSerializedFormulaData.checkVar(variables, 'n')}-1`})}
                &nbsp;+&nbsp;
                {nonSerializedFormulaData.checkVar(variables, 'd', {lessThanZeroParen:true})}
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
                        result = 'Error: missing variable/s -> a_n-1 n d'
                    }
                    break;
                case 'a_n-1':
                    if(nonSerializedFormulaData.check([a_n, d, n])){
                        result = a_n - d
                    } else {
                        result = 'Error: missing variable/s -> a_n n d'
                    }
                    break;
                case 'a_1':
                    if(nonSerializedFormulaData.check([a_n, d, n])){
                        result = a_n - ((n - 1) * d)
                    } else {
                        result = 'Error: missing variable/s -> a_n n d'
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
                        result = 'Error: missing variable/s -> a_n a_1 d'
                    }
                    break;
                case 'd':
                    if(nonSerializedFormulaData.check([a_n, a_n1])){
                        result = a_n - a_n1
                    } else {
                        result = 'Error: missing variable/s -> a_n a_n-1'
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
        'display': (variables) => (
            <>
                {nonSerializedFormulaData.checkVar(variables, `S_n`, {sub:true, subVar:true, subVal: nonSerializedFormulaData.checkVar(variables, 'n')})}
                &nbsp;=&nbsp;
                <Fraction
                    numerator={nonSerializedFormulaData.checkVar(variables, 'n')}
                    denominator='2'
                />
                &nbsp;&times;&nbsp;(2
                {nonSerializedFormulaData.checkVar(variables, 'a_1', {paren:true, sub:true})}
                &nbsp;+&nbsp;(
                {nonSerializedFormulaData.checkVar(variables, 'n')}
                &nbsp;-&nbsp;1)
                {nonSerializedFormulaData.checkVar(variables, 'd')})
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
    }
}
//remember to learn about how to solve for n in the compound interest formula
//Fixes: compound interest formula for n