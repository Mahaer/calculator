import React from 'react';
import styles from '../css/calculator.module.css';
import { selectTabData, selectTabs, updateInputs, getAnswer } from '../calculatorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { nonSerializedFormulaData } from '../../../nonSerializedFormulaData';
import { create, all } from 'mathjs'

export function Calculator(props) {
    const dispatch = useDispatch();
    const math = create(all)

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

        if(type === 'standard' || type === undefined){
            return String(math.round(Number(numValue.toString()), 4));
        } else if(type === 'money'){
            return numValue.toFixed(2);
        }
    }
    const getCopyFormula = (formula, variableList) => {
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
    const getRoundedValue = (answer) => {
        try{return math.round(answer, 4)} catch(e){return answer}
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
            input.setSelectionRange(cursorPos, cursorPos);
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
                        <h3 onCopy={(e) => handleCopy(e, getCopyFormula(tD.formula, tV))} style={{marginTop:'10px'}}>{nonSerializedFormulaData[mode]['display'](tV)}</h3>
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
                                key={index}>
                                {variable.includes('_')
                                    ?<h3>{variable.split('_')[0]}<sub><h3>{variable.split('_')[1]}</h3></sub></h3>
                                    :<h3>{variable}</h3>
                                }
                                <h3>&nbsp;=</h3>
                                {tabVariables[variable].includes(',') && variable === currentTab.selectedVariable
                                    ? tabVariables[variable].split(',').map((value, index, array) => (
                                        <React.Fragment key={index}>
                                            <input 
                                                style={{
                                                    width: `${Math.max(8, 
                                                        (variable === currentTab.selectedVariable
                                                            ? String(getRoundedValue(value)) 
                                                            : tV[variable]
                                                        )?.length || 0) + 1}ch`,
                                                    color: `${variable === currentTab.selectedVariable? 'darkred' : (variable === tD.leftSideUtil.omittedVariable && currentTab.leftSideUtilValue !== 'Custom Value'? 'darkgreen': 'black')}`
                                                }}
                                                type='text' 
                                                inputMode='numeric' 
                                                value={getRoundedValue(value.trim())}
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
                                            {index < array.length - 1 && <p key={`comma_${index}`} className={styles.comma}>, </p>}
                                        </React.Fragment>
                                    ))
                                    : (<input 
                                        style={{
                                            width: `${Math.max(8, 
                                                (variable === currentTab.selectedVariable
                                                    ? String(getRoundedValue(currentTab.answer)) 
                                                    : tV[variable]
                                                )?.length || 0) + 1}ch`,
                                            color: `${variable === currentTab.selectedVariable? 'darkred' : (variable === tD.leftSideUtil.omittedVariable && currentTab.leftSideUtilValue !== 'Custom Value'? 'darkgreen': 'black')}`
                                        }}
                                        type='text' 
                                        inputMode='numeric' 
                                        value={variable === currentTab.selectedVariable? getRoundedValue(currentTab.answer) : tV[variable]}
                                        autoComplete='off'
                                        autoCorrect='off'
                                        spellCheck='false'
                                        onChange={(e) => handleInputChange(e, variable)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        name={variable}
                                        onBlur={(e) => handleBlur(e, variable)}
                                        placeholder=''
                                        aria-label={`enter the ${variable} value here`}
                                    />)
                                }
                                <h3>{tD.units[variable] === 'DecimalPercentage' || tD.units[variable] === 'DecimalFraction' || tD.units[variable] === undefined? '': tD.units[variable]}</h3>
                                {
                                    currentTab.selectedVariable !== variable 
                                    && tD.units[variable] !== '' && tD.units[variable] !== undefined
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
                        {currentTab.selectedVariable.includes('_')
                            ?<h3>{currentTab.selectedVariable.split('_')[0]}<sub><h3>{currentTab.selectedVariable.split('_')[1]}</h3></sub></h3>
                            :<h3>{currentTab.selectedVariable}</h3>
                        }
                        <h3>&nbsp;{tD.calculationType[currentTab.selectedVariable] === 'exact' || tD.calculationType[currentTab.selectedVariable] === undefined? '=': (tD.calculationType[currentTab.selectedVariable] === 'approximation'? '≈': '=')}</h3>
                        {
                            currentTab.answer.includes(',')
                                ? currentTab.answer
                                    .split(',')
                                    .map((value, index, array) => (
                                        <React.Fragment key={index}>
                                            <input
                                                type='text'
                                                placeholder=''
                                                aria-label={`answer-${index}`}
                                                value={getRoundedValue(value)}
                                                spellCheck='false'
                                                readOnly
                                                style={{
                                                    width: `${Math.max
                                                        (8, String(getRoundedValue(value.trim()))?.length || 0) + 1
                                                    }ch`
                                                }} 
                                            />
                                            {index < array.length - 1 && <p key={`comma_${index}`} className={styles.comma}>, </p>}
                                        </React.Fragment>
                                    ))
                                : (
                                    <input
                                        type='text'
                                        placeholder=''
                                        aria-label='answer'
                                        value={getRoundedValue(currentTab.answer)}
                                        spellCheck='false'
                                        readOnly
                                        style={{
                                            width: `${Math.max(8, String(getRoundedValue(currentTab.answer))?.length || 0) + 1}ch`
                                        }} 
                                    />
                                )
                        }
                        <h3>{tD.units[currentTab.selectedVariable] === 'DecimalPercentage' || tD.units[currentTab.selectedVariable] === 'DecimalFraction' || tD.units[currentTab.selectedVariable] === undefined? '': tD.units[currentTab.selectedVariable]}</h3>
                        {
                            tD.units[currentTab.selectedVariable] !== '' && tD.units[currentTab.selectedVariable] !== undefined
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