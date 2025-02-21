import React from 'react';
import { Fraction } from './fraction';
import styles from '../css/calculator.module.css';
import { selectTabData, selectTabs, updateInputs, getAnswer } from '../calculatorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { create, all} from 'mathjs';
const math = create(all)

export const nonSerializedFormulaData = {
    check: (variables) => variables.every(str => str && !str.includes('Error') && !str.includes('Impossible')),
    'Compound Interest':{
        'display':(variables) => (
            <>
                {`${variables.A !== '' && variables.A !== undefined ? variables.A : 'A'} = 
                ${variables.P !== '' && variables.P !== undefined ? variables.P : 'P'}(1+ `}
                <Fraction 
                    numerator={variables.r !== '' && variables.r !== undefined ? variables.r : 'r'} 
                    denominator={variables.n !== '' && variables.n !== undefined ? variables.n : 'n'} 
                    size="20px" 
                />
                {`)`}
                <sup>
                    {variables.n !== '' && variables.n !== undefined ? `(${variables.n})` : 'n'}
                    {variables.t !== '' && variables.t !== undefined ? `(${variables.t})` : 't'}
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
            const {A, P, r, n, t} = updatedVariables
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
//remember to learn about how to solve for n in the compound interest formula

export function Calculator(props) {
    const dispatch = useDispatch();

    const {mode, tabId, type} = props;
    const tabData = useSelector(selectTabData)
    const tD = tabData.find(obj => obj.name === mode);
    const tabs = useSelector(selectTabs)
     
    const currentTab = tabs.find(obj => obj.id === tabId)
    const tabVariables = currentTab?.variables || {}
    const tVKeys = Object.keys(tabVariables);
    let tV = {};
    let numericVariables = {};
    for (let i = 0; i < tVKeys.length; i++) {tV[tVKeys[i]] = tVKeys[i] === tabVariables[tVKeys[i]] ? '' : tabVariables[tVKeys[i]];}
    for (let key in tV) {numericVariables[key] = tV[key] === '' ? '' : Number(tV[key]);}
    for (let key in tV) {
        if(key === currentTab.selectedVariable || tV[key].includes('Error') || tV[key].includes('Impossible') || tV[key] === Infinity || tV[key] === -Infinity){
            tV[key] = ''
        }
    }

    const formatValue = (value, type='standard') => {
        if (value === undefined || value === '' || isNaN(value)) {
            return '';
        }

        let numValue = parseFloat(value);
        if(numValue === 0){
            return '0'
        }

        if(type === 'standard'){
            return numValue.toString();
        } else if(type === 'money'){
            return numValue.toFixed(2);
        }
    }
    function getCopyFormula(formula, variableList) {
        const variableNames = Object.keys(variableList);
        const regex = new RegExp(`(${variableNames.join('|')})|([+\\-*/^=()])`, 'g');
        const components = formula.match(regex);
    
        let groups = [];
        let i = 0;
    
        while (i < components.length) {
            if (variableNames.includes(components[i])) {
                let group = [components[i]];
                i++;
                while (i < components.length && variableNames.includes(components[i])) {
                    group.push(components[i]);
                    i++;
                }
                if (group.length > 1) {
                    groups.push(group);
                }
            } else {
                i++;
            }
        }
        
        let formattedGroups = JSON.parse(JSON.stringify(groups));

        for (i = 0; i < formattedGroups.length; i++) {
            for (let j = 0; j < formattedGroups[i].length; j++) {
                if (variableList[formattedGroups[i][j]] !== '' ) {
                    formattedGroups[i][j] = `(${formattedGroups[i][j]})`;
                }
            }
        }
    
        const combinedGroups = groups.map(group => group.join(''));
        const combinedFormattedGroups = formattedGroups.map(group => group.join(''));

        const result = {};
        for (let i = 0; i < combinedGroups.length; i++) {
            result[combinedGroups[i]] = combinedFormattedGroups[i];
        }

        let newFormula = formula;
        for (const key in result) {
            newFormula = newFormula.replace(new RegExp(key, 'g'), result[key]);
        }

        for (const variable in variableList) {
            const value = variableList[variable];
            const replacement = value || variable;
            newFormula = newFormula.replace(new RegExp(`\\b${variable}\\b`, 'g'), replacement);
        }

        return newFormula
    }
      
    const handleCopy = (e, copyValue) => {
        e.preventDefault();
        navigator.clipboard.writeText(copyValue);
    }
    const handleInputChange = (e, variable) => {
        const newValue = e.target.value;
        const regex = /^-?\d*\.?\d*(e[+-]?\d*)?$/;
        const input = e.target;
        const cursorPos = input.selectionStart;
        
        if (regex.test(newValue) && tV[variable] !== newValue) {
            
            dispatch(updateInputs({ id: tabId, variable, value: newValue }));
    
            const updatedVariables = { ...tV, [variable]: newValue };
            const answer = nonSerializedFormulaData[mode]['math'](currentTab.selectedVariable, updatedVariables);
    
            dispatch(getAnswer({ id: tabId, answer: answer, selectedVariable: currentTab.selectedVariable }));
        }

        setTimeout(() => {
            input.setSelectionRange(cursorPos + 1, cursorPos + 1);
        }, 0);
    };
    const handleKeyDown = (e, index) => {
        const keys = Object.keys(tV);
        let nextIndex = index;
    
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            do {
                nextIndex += e.key === "ArrowDown" ? 1 : -1;
            } while (
                nextIndex >= 0 &&
                nextIndex < keys.length &&
                document.querySelector(`input[name="${keys[nextIndex]}"]`)
                    ?.closest(`.${styles.variable}`)
                    ?.classList.contains(styles.fade)
            );
        } else if (e.key === "ArrowLeft") {
            return;
        } else if (e.key === "ArrowRight") {
            return;
        }
    
        if (nextIndex >= 0 && nextIndex < keys.length) {
            let nextVariable = keys[nextIndex];
            let nextInput = document.querySelector(`input[name="${nextVariable}"]`);
    
            if (nextInput) {
                setTimeout(() => {
                    nextInput.focus();
                    nextInput.selectionStart = nextInput.selectionEnd = nextInput.value.length;
                }, 0);
            }
        }
    };
    const handleBlur = (e, variable) => {
        let value = e.target.value.trim(); 
        value = value.replace(/e[+-]?$/, '');  

        value = value.replace(/^e/, '');  
    
        const formattedValue = formatValue(value, tD.formatTypes[variable]);
    
        dispatch(updateInputs({
            id: tabId,
            variable: variable,
            value: formattedValue,
        }));
    
        dispatch(getAnswer({
            id: tabId,
            answer: nonSerializedFormulaData[mode]['math'](currentTab.selectedVariable, tV),
            selectedVariable: currentTab.selectedVariable
        }));
    };

    if(type === 'formula'){
        return (
            <div className={styles.calculator}>
                <div className={styles.formula}>
                    <h1>{mode} Calculator</h1>
                    <div>
                        <h3 onCopy={(e) => handleCopy(e, tD.formula)}>{nonSerializedFormulaData[mode]['display'](Object.keys(tD.variables))}</h3>
                        <h3 onCopy={(e) => handleCopy(e, getCopyFormula(tD.formula, tV))}>{nonSerializedFormulaData[mode]['display'](tV)}</h3>
                    </div>
                </div>
                <div className={styles.enter}>
                    <h2>Enter:</h2>
                    <div className={styles.variables}>
                        {Object.keys(tV).map((variable, index) => (
                            <div 
                                className={
                                    `${styles.variable} 
                                    ${currentTab.selectedVariable === variable ? styles.fade : (variable === tD.leftSideUtil.omittedVariable && currentTab.leftSideUtilValue !== 'Custom Value'? styles.fade:'')}`
                                } 
                                key={variable}>
                                <h3>{variable} =</h3>
                                <input 
                                    style={{
                                        width: `${Math.max(8, (variable === currentTab.selectedVariable? currentTab.answer : tV[variable])?.length || 0) + 1}ch`,
                                        color: `${variable === currentTab.selectedVariable? 'darkred' : (variable === tD.leftSideUtil.omittedVariable && currentTab.leftSideUtilValue !== 'Custom Value'? 'darkgreen': 'black')}`
                                    }}
                                    type='text' 
                                    inputMode='numeric' 
                                    value={variable === currentTab.selectedVariable? currentTab.answer : tV[variable]}
                                    autoComplete='off'
                                    autoCorrect='off'
                                    spellCheck='false'
                                    onChange={(e) => handleInputChange(e, variable)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    name={variable}
                                    onBlur={(e) => handleBlur(e, variable)}
                                    placeholder=''
                                    aria-label={`enter the ${variable} value here`}
                                />
                                <h3>{tD.units[variable] !== 'DecimalPercentage'? tD.units[variable]: ''}</h3>
                                {
                                    currentTab.selectedVariable !== variable 
                                    && tD.units[variable] !== ''
                                    && (variable !== tD.leftSideUtil.omittedVariable
                                    || currentTab.leftSideUtilValue === 'Custom Value')
                                &&(
                                    <button type='button'>add conversion</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.answer}>
                    <h2>Answer:</h2>
                    <div>
                        <h3>
                            {`${currentTab.selectedVariable}
                             ${tD.calculationType[currentTab.selectedVariable] === 'exact'? '=': (tD.calculationType[currentTab.selectedVariable] === 'approximation'? '≈': '=')} `}
                        </h3>
                        <input
                            type='text'
                            placeholder=''
                            aria-label='answer'
                            value={currentTab.answer}
                            spellCheck='false'
                            readOnly
                            style={{width: `${Math.max(8, currentTab.answer?.length || 0) + 1}ch`}} 
                        />
                        <h3>{tD.units[currentTab.selectedVariable] !== 'DecimalPercentage'? tD.units[currentTab.selectedVariable]: ''}</h3>
                        {
                            tD.units[currentTab.selectedVariable] !== ''
                            && (currentTab.selectedVariable !== tD.leftSideUtil.omittedVariable
                            || currentTab.leftSideUtilValue === 'Custom Value')
                        &&(
                            <button type='button'>add conversion</button>
                        )}
                    </div>
                </div>
                {props.children}
            </div>
        );
    }
}