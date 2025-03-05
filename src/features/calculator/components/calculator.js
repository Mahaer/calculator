import React, { Fragment } from 'react';
import styles from '../css/calculator.module.css';
import { updateInputs, getAnswer } from '../calculatorSlice';
import { useDispatch } from 'react-redux';
import { nonSerializedFormulaData } from '../../../nonSerializedFormulaData';
import { create, all, isUndefined, isNaN } from 'mathjs'

export function Calculator(props) {
    const dispatch = useDispatch();
    const math = create(all)

    const {
        mode, 
        tabId, 
        type, 
        currentTab, 
        tV,
        tD,
        tabVariables,
        tVArray
    } = props;

    const formatValue = (value, type='standard') => {
        if (value === undefined || value === '' || isNaN(value)) {
            return '';
        }

        let numValue = parseFloat(value);
        if(numValue === 0){
            return '0'
        }

        if(type === 'standard' || type === undefined){
            return String(math.round(numValue, 4));
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
        try{
            if(answer === ''){
                return answer
            } else {
                if(answer.endsWith('.') 
                    || answer.endsWith('.0') 
                    || answer.endsWith('.00') 
                    || answer.endsWith('.000')
                    || answer.endsWith('.0000')
                    || answer.endsWith('-0') 
                    || answer.endsWith('-0.') 
                    || answer.endsWith('-0.0') 
                    || answer.endsWith('-0.00') 
                    || answer.endsWith('-0.000')
                    || answer.endsWith('-0.0000')
                    || answer.endsWith('-00') 
                    || answer.endsWith('-00.') 
                    || answer.endsWith('-00.0') 
                    || answer.endsWith('-00.00') 
                    || answer.endsWith('-00.000')
                    || answer.endsWith('-00.0000')
                    || answer.endsWith('-000') 
                    || answer.endsWith('-000.') 
                    || answer.endsWith('-000.0') 
                    || answer.endsWith('-000.00') 
                    || answer.endsWith('-000.000')
                    || answer.endsWith('-000.0000')
                    || answer.endsWith('-0000') 
                    || answer.endsWith('-0000.') 
                    || answer.endsWith('-0000.0') 
                    || answer.endsWith('-0000.00') 
                    || answer.endsWith('-0000.000')
                    || answer.endsWith('-0000.0000')
                    || answer.endsWith('-.0') 
                    || answer.endsWith('-.00') 
                    || answer.endsWith('-.000')
                    || answer.endsWith('-.0000')
                ){
                        return answer
                    } else {
                        return math.round(answer, 4)
                    }
            }
        } catch(e){return answer}
    }
      
    const handleCopy = (e, copyValue) => {
        e.preventDefault();
        navigator.clipboard.writeText(copyValue);
    }
    const handleInputChange = (e, variable) => {
        const newValue = String(isNaN(Number(e.target.value))? e.target.value: getRoundedValue(e.target.value))
        const regex = /^-?\d*\.?\d*(e[+-]?\d*)?$/;
        const input = e.target;
        const cursorPos = input.selectionStart;
        
        if (regex.test(newValue) && tV[variable] !== newValue) {
            dispatch(updateInputs({ 
                id: tabId, variable, 
                value: newValue
            }));
            const updatedVariables = { 
                ...tV, 
                [variable]: newValue
            };
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
        const currentInput = document.activeElement;
    
        if (e.key === "ArrowDown" || 
            e.key === "ArrowUp" || 
            e.key === 'Tab' || 
            (e.shiftKey && e.key === 'Tab') ||
            e.key === 'Enter'
        ) {
            e.preventDefault()
            do {
                nextIndex += (e.key === "ArrowDown" || (!e.shiftKey && e.key === 'Tab') || e.key ===  'Enter') ? 1 : -1;
                
                if (nextIndex < 0) {
                    nextIndex = keys.length - 1;
                } else if (nextIndex >= keys.length) {
                    nextIndex = 0;
                }
    
            } while (
                nextIndex >= 0 &&
                nextIndex < keys.length &&
                document.querySelector(`input[name="${keys[nextIndex]}"]`)
                    ?.closest(`.${styles.variable}`)
                    ?.classList.contains(styles.fade) // Skipping conditions
            );
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
            currentInput.setSelectionRange(currentInput.selectionStart, currentInput.selectionEnd);
        } else if ((e.key === "ArrowLeft" || e.key === "ArrowRight")) {
            if(!e.ctrlKey && !e.shiftKey){e.preventDefault();
    
            if (e.key === "ArrowLeft") {
                if (currentInput.selectionStart === 0) {
                    currentInput.selectionStart = currentInput.selectionEnd = currentInput.value.length;
                } else {
                    if(currentInput.selectionStart === currentInput.selectionEnd){
                        currentInput.selectionStart -= 1;
                        currentInput.selectionEnd -= 1;
                    } else {
                        currentInput.selectionEnd = currentInput.selectionStart
                    }
                }
            }
    
            if (e.key === "ArrowRight") {
                if (currentInput.selectionEnd === currentInput.value.length) {
                    currentInput.selectionStart = currentInput.selectionEnd = 0;
                } else {
                    if(currentInput.selectionStart === currentInput.selectionEnd){
                        currentInput.selectionStart += 1;
                        currentInput.selectionEnd -= 0;
                    } else {
                        currentInput.selectionStart = currentInput.selectionEnd
                    }
                }
            }
            currentInput.setSelectionRange(currentInput.selectionStart, currentInput.selectionEnd);}
        } 
    };
    const handleBlur = (e, variable) => {
        let value = e.target.value.trim(); 
        value = value.replace(/e[+-]?$/, '');  

        value = value.replace(/^e/, '');  
    
        let formattedValue;

        if(type === 'formula'){
            formattedValue = formatValue(value, tD.formatTypes[variable]);
        } else if(type === 'array'){
            formattedValue = value
        }
        if(formattedValue === '-'
            || formattedValue === '-.'
            || formattedValue === '-0'
            || formattedValue === '-0.'
            || formattedValue === '-.0'
            || formattedValue === '-.00'
            || formattedValue === '-.000'
            || formattedValue === '-.0000'
            || formattedValue === '-0.0'
            || formattedValue === '-0.00'
            || formattedValue === '-0.000'
            || formattedValue === '-0.0000'
            || formattedValue === '-00'
            || formattedValue === '-00.'
            || formattedValue === '-00.0'
            || formattedValue === '-00.00'
            || formattedValue === '-00.000'
            || formattedValue === '-00.0000'
            || formattedValue === '-000'
            || formattedValue === '-000.'
            || formattedValue === '-000.0'
            || formattedValue === '-000.00'
            || formattedValue === '-000.000'
            || formattedValue === '-000.0000'
            || formattedValue === '-0000'
            || formattedValue === '-0000.'
            || formattedValue === '-0000.0'
            || formattedValue === '-0000.00'
            || formattedValue === '-0000.000'
            || formattedValue === '-0000.0000'
            || formattedValue === '.0'
            || formattedValue === '.00'
            || formattedValue === '.000'
            || formattedValue === '.0000'
        ){
            formattedValue = ''
        }
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
                        <h3 
                            onCopy={(e) => handleCopy(e, tD.formula)}
                        >{nonSerializedFormulaData[mode]['display'](Object.keys(tD.variables), currentTab.selectedVariable)}</h3>
                        <h3 
                            onCopy={(e) => handleCopy(e, getCopyFormula(tD.formula, tV))} 
                            style={{marginTop:'10px'}}
                        >{nonSerializedFormulaData[mode]['display'](tV, currentTab.selectedVariable)}</h3>
                    </div>
                </div>
                <div className={styles.enter}>
                    <h2>Enter:</h2>
                    <div className={styles.variables}>
                        {Object.keys(tV).map((variable, index) => (
                            <div 
                                className={
                                    `${styles.variable} 
                                    ${currentTab.selectedVariable === variable ? styles.fade : (variable === tD.leftSideUtil.omittedVariable && currentTab.leftSideUtilValue !== 'Custom Value'? styles.fade:'')}
                                    ${!isUndefined(tD.fadedVariables)?
                                        Object.keys(tD.fadedVariables).includes(variable) && 
                                        !tD.fadedVariables[variable].includes(currentTab.selectedVariable)
                                            ? styles.fade
                                            : ''
                                        :''
                                    }`
                                } 
                                key={index}
                            >
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
                                                    minWidth:'10ch',
                                                    width: `${Math.max(8, 
                                                        (variable === currentTab.selectedVariable
                                                            ? String(getRoundedValue(value)) 
                                                            : String(getRoundedValue(tV[variable]))
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
                                            minWidth:'10ch',
                                            width: `${Math.max(8, 
                                                (variable === currentTab.selectedVariable
                                                    ? String(getRoundedValue(currentTab.answer)) 
                                                    : String(getRoundedValue(tV[variable]))
                                                )?.length || 0) + 1}ch`,
                                            color: `${variable === currentTab.selectedVariable? 'darkred' : (variable === tD.leftSideUtil.omittedVariable && currentTab.leftSideUtilValue !== 'Custom Value'? 'darkgreen': 'black')}`
                                        }}
                                        type='text' 
                                        inputMode='numeric' 
                                        value={variable === currentTab.selectedVariable
                                            ? getRoundedValue(currentTab.answer) 
                                            : getRoundedValue(tV[variable])
                                        }
                                        autoComplete='off'
                                        autoCorrect='off'
                                        spellCheck='false'
                                        onChange={(e) => handleInputChange(e, variable)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        name={variable}
                                        onBlur={(e) => handleBlur(e, variable)}
                                        placeholder='Enter Here'
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
                                        <Fragment key={index}>
                                            <input
                                                type='text'
                                                placeholder=''
                                                aria-label={`answer-${index}`}
                                                value={getRoundedValue(value)}
                                                spellCheck='false'
                                                readOnly
                                                style={{
                                                    minWidth:'10ch',
                                                    width: `${Math.max
                                                        (8, String(getRoundedValue(value.trim()))?.length || 0) + 1
                                                    }ch`
                                                }} 
                                            />
                                            {index < array.length - 1 && <p key={`comma_${index}`} className={styles.comma}>, </p>}
                                        </Fragment>
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
                                            minWidth:'10ch',
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
    } else if(type === 'array'){
        return (
            <div className={`${styles.calculator} ${currentTab.leftSideUtilValue === '' || currentTab.leftSideUtilValue < 2 || currentTab.leftSideUtilValue > 25? styles.borderFade: ''}`}>
                <div className={currentTab.leftSideUtilValue === '' || currentTab.leftSideUtilValue < 2 || currentTab.leftSideUtilValue > 25? styles.extraFade: ''}>
                    <div className={styles.formula}>
                        <h1>{mode} Calculator</h1>
                        <div className={styles.flex}>
                        <h3>{nonSerializedFormulaData.checkVar(tV, currentTab.selectedVariable, Object.keys(tVArray)[1], {topBar:!isUndefined(tD.topBar)? true: false})}</h3>
                        <h3>&nbsp;=&nbsp;</h3>
                        <h3 style={{height:'38px', fontSize:'32px'}}>{!isUndefined(tD.startCharacter) ? tD.startCharacter : ''}</h3>

                        <div className={styles.variablesWrapper}>
                            {Object.keys(tVArray.array).reduce((acc, variable, index) => {
                                if (index % 5 === 0) {
                                    acc.push([]);
                                }
                                acc[acc.length - 1].push(variable);
                                return acc;
                            }, []).map((row, rowIndex, array) => (
                                <div key={`row_${rowIndex}`} className={styles.flex}>
                                    {row.map((variable, index) => (
                                        <Fragment key={index}>
                                            <h3 style={{fontSize:'32px'}}>
                                                {
                                                    variable === currentTab.selectedVariable
                                                        ? 
                                                        nonSerializedFormulaData.checkVar(
                                                            tVArray.array,
                                                            currentTab.selectedVariable,
                                                            variable,
                                                            {
                                                                sub: variable.includes('_'),
                                                                lessThanZeroParen:(!isUndefined(tD.lessThanZeroParen)? true: false),
                                                                paren:(!isUndefined(tD.paren)
                                                                    ? true
                                                                    : (!isUndefined(tD.lessThanZeroParen) && String(getRoundedValue(tVArray.array[variable])).includes('.')
                                                                        ?true
                                                                        :false
                                                                    )
                                                                )
                                                            }
                                                        )
                                                        : nonSerializedFormulaData.checkVar(
                                                            tVArray.array,
                                                            currentTab.selectedVariable,
                                                            variable,
                                                            {
                                                                sub: variable.includes('_'), 
                                                                lessThanZeroParen:(!isUndefined(tD.lessThanZeroParen)? true: false),
                                                                paren:(!isUndefined(tD.paren)
                                                                    ? true
                                                                    : (!isUndefined(tD.lessThanZeroParen) && String(getRoundedValue(tVArray.array[variable])).includes('.')
                                                                        ?true
                                                                        :false
                                                                    )
                                                                )
                                                            }
                                                        )
                                                }
                                            </h3>
                                            {index < row.length - 1 && <h3 key={`comma_${index}`} style={{fontSize:'32px'}}>{tD.splitCharacter}</h3>}
                                        </Fragment>
                                    ))}
                                    {rowIndex === array.length - 1 && rowIndex === array.length - 1 && (
                                        <h3 style={{fontSize:'32px'}}>{!isUndefined(tD.endCharacter) ? tD.endCharacter : ''}</h3>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                    <div className={styles.enter}>
                        <h2>Enter:</h2>
                        <div className={styles.variables}>
                            {Object.keys(tVArray.array).length < 8 
                                ? Object.keys(tV).map((variable, index) => (       
                                    <div 
                                        className={
                                            `${styles.variable} 
                                            ${currentTab.selectedVariable === variable ? styles.fade : ''}`
                                        } 
                                        key={index}
                                    >
                                        {variable.includes('_')
                                            ?<h3>{variable.split('_')[0]}<sub><h3>{variable.split('_')[1]}</h3></sub></h3>
                                            :(isUndefined(tD.topBar)
                                                ?<h3>{variable}</h3>
                                                :(Object.keys(tV)[0] === variable
                                                    ?<h3>{nonSerializedFormulaData.checkVar(
                                                        tVArray.array, 
                                                        '7Ru42hF72M', 
                                                        variable, 
                                                        {topBar:true}
                                                    )}</h3>
                                                    :<h3>{variable}</h3>
                                                )
                                            )
                                        }
                                        <h3>&nbsp;=</h3>
                                        {tabVariables[variable].includes(',') && variable === currentTab.selectedVariable
                                                ? tabVariables[variable].split(',').map((value, index, array) => (
                                                    <React.Fragment key={index}>
                                                        <input 
                                                            style={{
                                                                minWidth:'10ch',
                                                                width: `${Math.max(12, 
                                                                    (variable === currentTab.selectedVariable
                                                                        ? String(getRoundedValue(value)) 
                                                                        : tV[variable]
                                                                    )?.length || 0) + 1}ch`,
                                                                color: `${variable === currentTab.selectedVariable? 'darkred' : 'black'}`
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
                                                        {console.log(getRoundedValue(value.trim()))}
                                                    </React.Fragment>
                                                ))
                                                : (<input 
                                                    style={{
                                                        minWidth:'10ch',
                                                        width: `${Math.max(4, 
                                                            (variable === currentTab.selectedVariable
                                                                ? String(getRoundedValue(currentTab.answer)) 
                                                                : String(getRoundedValue(tV[variable]))
                                                            )?.length || 0) + 1}ch`,
                                                        color: `${variable === currentTab.selectedVariable? 'darkred' : 'black'}`
                                                    }}
                                                    type='text' 
                                                    inputMode='numeric' 
                                                    value={variable === currentTab.selectedVariable
                                                        ? getRoundedValue(currentTab.answer) 
                                                        : getRoundedValue(tV[variable])
                                                    }
                                                    autoComplete='off'
                                                    autoCorrect='off'
                                                    spellCheck='false'
                                                    onChange={(e) => handleInputChange(e, variable)}
                                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                                    name={variable}
                                                    onBlur={(e) => handleBlur(e, variable)}
                                                    placeholder='Enter Here'
                                                    aria-label={`enter the ${variable} value here`}
                                                />)
                                            }
                                    </div>
                                ))
                                : (Object.keys(tVArray.array).length < 15
                                    ? (
                                        <>
                                            <div 
                                                className={
                                                    `${styles.variable} 
                                                    ${currentTab.selectedVariable === Object.keys(tVArray)[1] ? styles.fade : ''}`
                                                } 
                                            >
                                                {Object.keys(tVArray)[1].includes('_')
                                                    ?<h3>{Object.keys(tVArray)[1].split('_')[0]}<sub><h3>{Object.keys(tVArray)[1].split('_')[1]}</h3></sub></h3>
                                                    :(isUndefined(tD.topBar)
                                                        ?<h3>{Object.keys(tVArray)[1]}</h3>
                                                        :(Object.keys(tV)[0] === Object.keys(tVArray)[1]
                                                            ?<h3>{nonSerializedFormulaData.checkVar(
                                                                tVArray.array, 
                                                                '7Ru42hF72M', 
                                                                Object.keys(tVArray)[1], 
                                                                {topBar:true}
                                                            )}</h3>
                                                            :<h3>{Object.keys(tVArray)[1]}</h3>
                                                        )
                                                    )
                                                }
                                                <h3>&nbsp;=</h3>
                                                {tabVariables[Object.keys(tVArray)[1]].includes(',') && Object.keys(tVArray)[1] === currentTab.selectedVariable
                                                        ? tabVariables[Object.keys(tVArray)[1]].split(',').map((value, index, array) => (
                                                            <React.Fragment key={index}>
                                                                <input 
                                                                    style={{
                                                                        minWidth:'6ch',
                                                                        width: `${Math.max(12, 
                                                                            (Object.keys(tVArray)[1] === currentTab.selectedVariable
                                                                                ? String(getRoundedValue(value)) 
                                                                                : tV[Object.keys(tVArray)[1]]
                                                                            )?.length || 0) + 1}ch`,
                                                                        color: `${Object.keys(tVArray)[1] === currentTab.selectedVariable? 'darkred' : 'black'}`
                                                                    }}
                                                                    type='text' 
                                                                    inputMode='numeric' 
                                                                    value={getRoundedValue(value.trim())}
                                                                    autoComplete='off'
                                                                    autoCorrect='off'
                                                                    spellCheck='false'
                                                                    onChange={(e) => handleInputChange(e, Object.keys(tVArray)[1])}
                                                                    onKeyDown={(e) => handleKeyDown(e, index+1)}
                                                                    name={Object.keys(tVArray)[1]}
                                                                    onBlur={(e) => handleBlur(e, Object.keys(tVArray)[1])}
                                                                    placeholder=''
                                                                    aria-label={`enter the ${Object.keys(tVArray)[1]} value here`}
                                                                />
                                                                {index < array.length - 1 && <p key={`comma_${index}`} className={styles.comma}>, </p>}
                                                            </React.Fragment>
                                                        ))
                                                        : (<input 
                                                            style={{
                                                                minWidth:'10ch',
                                                                width: `${Math.max(4, 
                                                                    (Object.keys(tVArray)[1] === currentTab.selectedVariable
                                                                        ? String(getRoundedValue(currentTab.answer)) 
                                                                        : String(getRoundedValue(tV[Object.keys(tVArray)[1]]))
                                                                    )?.length || 0) + 1}ch`,
                                                                color: `${Object.keys(tVArray)[1] === currentTab.selectedVariable? 'darkred' : 'black'}`
                                                            }}
                                                            type='text' 
                                                            inputMode='numeric' 
                                                            value={Object.keys(tVArray)[1] === currentTab.selectedVariable? getRoundedValue(currentTab.answer) : getRoundedValue(tV[Object.keys(tVArray)[1]])}
                                                            autoComplete='off'
                                                            autoCorrect='off'
                                                            spellCheck='false'
                                                            onChange={(e) => handleInputChange(e, Object.keys(tVArray)[1])}
                                                            onKeyDown={(e) => handleKeyDown(e, 0)}
                                                            name={Object.keys(tVArray)[1]}
                                                            onBlur={(e) => handleBlur(e, Object.keys(tVArray)[1])}
                                                            placeholder='Enter Here'
                                                            aria-label={`enter the ${Object.keys(tVArray)[1]} value here`}
                                                        />)
                                                    }
                                            </div>
                                            <div>
                                                {(() => {
                                                    const variables = Object.keys(tVArray.array);
                                                    const columnCount = 2;
                                                    const rowCount = Math.ceil(variables.length / columnCount);

                                                    return Array.from({ length: rowCount }).map((_, rowIndex) => (
                                                    <div key={rowIndex} className={styles.flex}>
                                                        {Array.from({ length: columnCount }).map((_, colIndex) => {
                                                        const varIndex = rowIndex + colIndex * rowCount;
                                                        const currentVar = variables[varIndex];

                                                        if (!currentVar) return null; 

                                                        return (
                                                            <React.Fragment key={varIndex}>
                                                    
                                                            {colIndex > 0 && <h3 className={styles.comma}>,</h3>}

                                                            <div
                                                                className={`${styles.variable} ${currentTab.selectedVariable === currentVar ? styles.fade : ''}`}
                                                                key={varIndex}
                                                            >
                                                                {currentVar.includes('_')
                                                                ? <h3>{currentVar.split('_')[0]}<sub><h3>{currentVar.split('_')[1]}</h3></sub></h3>
                                                                : (isUndefined(tD.topBar)
                                                                    ? <h3>{currentVar}</h3>
                                                                    : (Object.keys(tV)[0] === currentVar
                                                                    ? <h3>{nonSerializedFormulaData.checkVar(
                                                                        tVArray.array, 
                                                                        '7Ru42hF72M', 
                                                                        currentVar, 
                                                                        { topBar: true }
                                                                        )}</h3>
                                                                    : <h3>{currentVar}</h3>
                                                                    )
                                                                )
                                                                }
                                                                <h3>&nbsp;=</h3>
                                                                {tabVariables[currentVar].includes(',') && currentVar === currentTab.selectedVariable
                                                                ? tabVariables[currentVar].split(',').map((value, inputIndex, arr) => (
                                                                    <React.Fragment key={inputIndex}>
                                                                        <input
                                                                        style={{
                                                                            minWidth: '6ch',
                                                                            width: `${Math.max(12, 
                                                                            (currentVar === currentTab.selectedVariable
                                                                                ? String(getRoundedValue(value)) 
                                                                                : tV[currentVar]
                                                                            )?.length || 0) + 1}ch`,
                                                                            color: `${currentVar === currentTab.selectedVariable ? 'darkred' : 'black'}`
                                                                        }}
                                                                        type='text'
                                                                        inputMode='numeric'
                                                                        value={getRoundedValue(value.trim())}
                                                                        autoComplete='off'
                                                                        autoCorrect='off'
                                                                        spellCheck='false'
                                                                        onChange={(e) => handleInputChange(e, currentVar)}
                                                                        onKeyDown={(e) => handleKeyDown(e, inputIndex+1)}
                                                                        name={currentVar}
                                                                        onBlur={(e) => handleBlur(e, currentVar)}
                                                                        placeholder=''
                                                                        aria-label={`enter the ${currentVar} value here`}
                                                                        />
                                                                        {inputIndex < arr.length - 1 && <p key={`comma_${inputIndex}`} className={styles.comma}>, </p>}
                                                                    </React.Fragment>
                                                                    ))
                                                                : (<input
                                                                    style={{
                                                                        minWidth: '6ch',
                                                                        width: `${Math.max(4, 
                                                                        (currentVar === currentTab.selectedVariable
                                                                            ? (String(getRoundedValue(currentTab.answer)) === 'Error: missing variable/s'? 'Error': String(getRoundedValue(currentTab.answer)))
                                                                            : (tV[currentVar] === 'Error: missing variable/s'? 'Error': String(getRoundedValue(tV[currentVar])))
                                                                        )?.length || 0) + 1}ch`,
                                                                        color: `${currentVar === currentTab.selectedVariable ? 'darkred' : 'black'}`
                                                                    }}
                                                                    type='text'
                                                                    inputMode='numeric'
                                                                    value={
                                                                        ((
                                                                        currentVar === currentTab.selectedVariable 
                                                                            ? getRoundedValue(currentTab.answer) 
                                                                            : getRoundedValue(tV[currentVar])
                                                                        ) === 'Error: missing variable/s'
                                                                        ? 'Error'
                                                                        : (
                                                                            currentVar === currentTab.selectedVariable 
                                                                                ? getRoundedValue(currentTab.answer) 
                                                                                : getRoundedValue(tV[currentVar])
                                                                            ))
                                                                        }
                                                                    autoComplete='off'
                                                                    autoCorrect='off'
                                                                    spellCheck='false'
                                                                    onChange={(e) => handleInputChange(e, currentVar)}
                                                                    onKeyDown={(e) => handleKeyDown(e, varIndex+1)}
                                                                    name={currentVar}
                                                                    onBlur={(e) => handleBlur(e, currentVar)}
                                                                    placeholder='Enter'
                                                                    aria-label={`enter the ${currentVar} value here`}
                                                                    />)
                                                                }
                                                            </div>
                                                            </React.Fragment>
                                                        );
                                                        })}
                                                    </div>
                                                    ));
                                                })()}
                                            </div>
                                        </>
                                    )
                                    : (Object.keys(tVArray.array).length < 19
                                        ? (
                                            <>
                                                <div 
                                                    className={
                                                        `${styles.variable} 
                                                        ${currentTab.selectedVariable === Object.keys(tVArray)[1] ? styles.fade : ''}`
                                                    } 
                                                >
                                                    {Object.keys(tVArray)[1].includes('_')
                                                        ?<h3>{Object.keys(tVArray)[1].split('_')[0]}<sub><h3>{Object.keys(tVArray)[1].split('_')[1]}</h3></sub></h3>
                                                        :(isUndefined(tD.topBar)
                                                            ?<h3>{Object.keys(tVArray)[1]}</h3>
                                                            :(Object.keys(tV)[0] === Object.keys(tVArray)[1]
                                                                ?<h3>{nonSerializedFormulaData.checkVar(
                                                                    tVArray.array, 
                                                                    '7Ru42hF72M', 
                                                                    Object.keys(tVArray)[1], 
                                                                    {topBar:true}
                                                                )}</h3>
                                                                :<h3>{Object.keys(tVArray)[1]}</h3>
                                                            )
                                                        )
                                                    }
                                                    <h3>&nbsp;=</h3>
                                                    {tabVariables[Object.keys(tVArray)[1]].includes(',') && Object.keys(tVArray)[1] === currentTab.selectedVariable
                                                            ? tabVariables[Object.keys(tVArray)[1]].split(',').map((value, index, array) => (
                                                                <React.Fragment key={index}>
                                                                    <input 
                                                                        style={{
                                                                            minWidth:'6ch',
                                                                            width: `${Math.max(12, 
                                                                                (Object.keys(tVArray)[1] === currentTab.selectedVariable
                                                                                    ? String(getRoundedValue(value)) 
                                                                                    : tV[Object.keys(tVArray)[1]]
                                                                                )?.length || 0) + 1}ch`,
                                                                            color: `${Object.keys(tVArray)[1] === currentTab.selectedVariable? 'darkred' : 'black'}`
                                                                        }}
                                                                        type='text' 
                                                                        inputMode='numeric' 
                                                                        value={getRoundedValue(value.trim())}
                                                                        autoComplete='off'
                                                                        autoCorrect='off'
                                                                        spellCheck='false'
                                                                        onChange={(e) => handleInputChange(e, Object.keys(tVArray)[1])}
                                                                        onKeyDown={(e) => handleKeyDown(e, index+1)}
                                                                        name={Object.keys(tVArray)[1]}
                                                                        onBlur={(e) => handleBlur(e, Object.keys(tVArray)[1])}
                                                                        placeholder=''
                                                                        aria-label={`enter the ${Object.keys(tVArray)[1]} value here`}
                                                                    />
                                                                    {index < array.length - 1 && <p key={`comma_${index}`} className={styles.comma}>, </p>}
                                                                </React.Fragment>
                                                            ))
                                                            : (<input 
                                                                style={{
                                                                    minWidth:'10ch',
                                                                    width: `${Math.max(4, 
                                                                        (Object.keys(tVArray)[1] === currentTab.selectedVariable
                                                                            ? String(getRoundedValue(currentTab.answer)) 
                                                                            : String(getRoundedValue(tV[Object.keys(tVArray)[1]]))
                                                                        )?.length || 0) + 1}ch`,
                                                                    color: `${Object.keys(tVArray)[1] === currentTab.selectedVariable? 'darkred' : 'black'}`
                                                                }}
                                                                type='text' 
                                                                inputMode='numeric' 
                                                                value={Object.keys(tVArray)[1] === currentTab.selectedVariable? getRoundedValue(currentTab.answer) : getRoundedValue(tV[Object.keys(tVArray)[1]])}
                                                                autoComplete='off'
                                                                autoCorrect='off'
                                                                spellCheck='false'
                                                                onChange={(e) => handleInputChange(e, Object.keys(tVArray)[1])}
                                                                onKeyDown={(e) => handleKeyDown(e, 0)}
                                                                name={Object.keys(tVArray)[1]}
                                                                onBlur={(e) => handleBlur(e, Object.keys(tVArray)[1])}
                                                                placeholder='Enter Here'
                                                                aria-label={`enter the ${Object.keys(tVArray)[1]} value here`}
                                                            />)
                                                        }
                                                </div>
                                                <div>
                                                    {(() => {
                                                        const variables = Object.keys(tVArray.array);
                                                        const columnCount = 3;
                                                        const rowCount = Math.ceil(variables.length / columnCount);

                                                        return Array.from({ length: rowCount }).map((_, rowIndex) => (
                                                        <div key={rowIndex} className={styles.flex}>
                                                            {Array.from({ length: columnCount }).map((_, colIndex) => {
                                                            const varIndex = rowIndex + colIndex * rowCount;
                                                            const currentVar = variables[varIndex];

                                                            if (!currentVar) return null; 

                                                            return (
                                                                <React.Fragment key={varIndex}>
                                                        
                                                                {colIndex > 0 && <h3 className={styles.comma}>,</h3>}

                                                                <div
                                                                    className={`${styles.variable} ${currentTab.selectedVariable === currentVar ? styles.fade : ''}`}
                                                                    key={varIndex}
                                                                >
                                                                    {currentVar.includes('_')
                                                                    ? <h3>{currentVar.split('_')[0]}<sub><h3>{currentVar.split('_')[1]}</h3></sub></h3>
                                                                    : (isUndefined(tD.topBar)
                                                                        ? <h3>{currentVar}</h3>
                                                                        : (Object.keys(tV)[0] === currentVar
                                                                        ? <h3>{nonSerializedFormulaData.checkVar(
                                                                            tVArray.array, 
                                                                            '7Ru42hF72M', 
                                                                            currentVar, 
                                                                            { topBar: true }
                                                                            )}</h3>
                                                                        : <h3>{currentVar}</h3>
                                                                        )
                                                                    )
                                                                    }
                                                                    <h3 style={{marginLeft:'-20px'}}>&nbsp;=</h3>
                                                                    {tabVariables[currentVar].includes(',') && currentVar === currentTab.selectedVariable
                                                                    ? tabVariables[currentVar].split(',').map((value, inputIndex, arr) => (
                                                                        <React.Fragment key={inputIndex}>
                                                                            <input
                                                                            style={{
                                                                                minWidth: '6ch',
                                                                                width: `${Math.max(12, 
                                                                                (currentVar === currentTab.selectedVariable
                                                                                    ? String(getRoundedValue(value)) 
                                                                                    : tV[currentVar]
                                                                                )?.length || 0) + 1}ch`,
                                                                                color: `${currentVar === currentTab.selectedVariable ? 'darkred' : 'black'}`,
                                                                                marginLeft: '5px'
                                                                            }}
                                                                            type='text'
                                                                            inputMode='numeric'
                                                                            value={getRoundedValue(value.trim())}
                                                                            autoComplete='off'
                                                                            autoCorrect='off'
                                                                            spellCheck='false'
                                                                            onChange={(e) => handleInputChange(e, currentVar)}
                                                                            onKeyDown={(e) => handleKeyDown(e, inputIndex+1)}
                                                                            name={currentVar}
                                                                            onBlur={(e) => handleBlur(e, currentVar)}
                                                                            placeholder=''
                                                                            aria-label={`enter the ${currentVar} value here`}
                                                                            />
                                                                            {inputIndex < arr.length - 1 && <p key={`comma_${inputIndex}`} className={styles.comma}>, </p>}
                                                                        </React.Fragment>
                                                                        ))
                                                                    : (<input
                                                                        style={{
                                                                            minWidth: '6ch',
                                                                            width: `${Math.max(4, 
                                                                            (currentVar === currentTab.selectedVariable
                                                                                ? String(getRoundedValue(currentTab.answer)) === 'Error: missing variable/s'
                                                                                    ? 'Error'
                                                                                    : String(getRoundedValue(currentTab.answer))
                                                                                : tV[currentVar] === 'Error: missing variable/s'
                                                                                    ? 'Error'
                                                                                    : String(getRoundedValue(tV[currentVar]))
                                                                            )?.length || 0) + 1}ch`,
                                                                            color: `${currentVar === currentTab.selectedVariable ? 'darkred' : 'black'}`,
                                                                            marginLeft: '5px'
                                                                        }}
                                                                        type='text'
                                                                        inputMode='numeric'
                                                                        value={(currentVar === currentTab.selectedVariable 
                                                                            ? getRoundedValue(currentTab.answer) 
                                                                            : tV[currentVar]) === 'Error: missing variable/s'
                                                                                ? 'Error'
                                                                                : (currentVar === currentTab.selectedVariable 
                                                                                    ? getRoundedValue(currentTab.answer) 
                                                                                    : getRoundedValue(tV[currentVar])
                                                                                )
                                                                            }
                                                                        autoComplete='off'
                                                                        autoCorrect='off'
                                                                        spellCheck='false'
                                                                        onChange={(e) => handleInputChange(e, currentVar)}
                                                                        onKeyDown={(e) => handleKeyDown(e, varIndex+1)}
                                                                        name={currentVar}
                                                                        onBlur={(e) => handleBlur(e, currentVar)}
                                                                        placeholder='Enter'
                                                                        aria-label={`enter the ${currentVar} value here`}
                                                                        />)
                                                                    }
                                                                </div>
                                                                </React.Fragment>
                                                            );
                                                            })}
                                                        </div>
                                                        ));
                                                    })()}
                                                </div>
                                            </>
                                        )
                                        : (
                                            <>
                                                <div 
                                                    className={
                                                        `${styles.variable} 
                                                        ${currentTab.selectedVariable === Object.keys(tVArray)[1] ? styles.fade : ''}`
                                                    } 
                                                >
                                                    {Object.keys(tVArray)[1].includes('_')
                                                        ?<h3>{Object.keys(tVArray)[1].split('_')[0]}<sub><h3>{Object.keys(tVArray)[1].split('_')[1]}</h3></sub></h3>
                                                        :(isUndefined(tD.topBar)
                                                            ?<h3>{Object.keys(tVArray)[1]}</h3>
                                                            :(Object.keys(tV)[0] === Object.keys(tVArray)[1]
                                                                ?<h3>{nonSerializedFormulaData.checkVar(
                                                                    tVArray.array, 
                                                                    '7Ru42hF72M', 
                                                                    Object.keys(tVArray)[1], 
                                                                    {topBar:true}
                                                                )}</h3>
                                                                :<h3>{Object.keys(tVArray)[1]}</h3>
                                                            )
                                                        )
                                                    }
                                                    <h3>&nbsp;=</h3>
                                                    {tabVariables[Object.keys(tVArray)[1]].includes(',') && Object.keys(tVArray)[1] === currentTab.selectedVariable
                                                            ? tabVariables[Object.keys(tVArray)[1]].split(',').map((value, index, array) => (
                                                                <React.Fragment key={index}>
                                                                    <input 
                                                                        style={{
                                                                            minWidth:'6ch',
                                                                            width: `${Math.max(12, 
                                                                                (Object.keys(tVArray)[1] === currentTab.selectedVariable
                                                                                    ? String(getRoundedValue(value)) 
                                                                                    : tV[Object.keys(tVArray)[1]]
                                                                                )?.length || 0) + 1}ch`,
                                                                            color: `${Object.keys(tVArray)[1] === currentTab.selectedVariable? 'darkred' : 'black'}`
                                                                        }}
                                                                        type='text' 
                                                                        inputMode='numeric' 
                                                                        value={getRoundedValue(value.trim())}
                                                                        autoComplete='off'
                                                                        autoCorrect='off'
                                                                        spellCheck='false'
                                                                        onChange={(e) => handleInputChange(e, Object.keys(tVArray)[1])}
                                                                        onKeyDown={(e) => handleKeyDown(e, index+1)}
                                                                        name={Object.keys(tVArray)[1]}
                                                                        onBlur={(e) => handleBlur(e, Object.keys(tVArray)[1])}
                                                                        placeholder=''
                                                                        aria-label={`enter the ${Object.keys(tVArray)[1]} value here`}
                                                                    />
                                                                    {index < array.length - 1 && <p key={`comma_${index}`} className={styles.comma}>, </p>}
                                                                </React.Fragment>
                                                            ))
                                                            : (<input 
                                                                style={{
                                                                    minWidth:'10ch',
                                                                    width: `${Math.max(4, 
                                                                        (Object.keys(tVArray)[1] === currentTab.selectedVariable
                                                                            ? String(getRoundedValue(currentTab.answer)) 
                                                                            : String(getRoundedValue(tV[Object.keys(tVArray)[1]]))
                                                                        )?.length || 0) + 1}ch`,
                                                                    color: `${Object.keys(tVArray)[1] === currentTab.selectedVariable? 'darkred' : 'black'}`
                                                                }}
                                                                type='text' 
                                                                inputMode='numeric' 
                                                                value={Object.keys(tVArray)[1] === currentTab.selectedVariable? getRoundedValue(currentTab.answer) : getRoundedValue(tV[Object.keys(tVArray)[1]])}
                                                                autoComplete='off'
                                                                autoCorrect='off'
                                                                spellCheck='false'
                                                                onChange={(e) => handleInputChange(e, Object.keys(tVArray)[1])}
                                                                onKeyDown={(e) => handleKeyDown(e, 0)}
                                                                name={Object.keys(tVArray)[1]}
                                                                onBlur={(e) => handleBlur(e, Object.keys(tVArray)[1])}
                                                                placeholder='Enter Here'
                                                                aria-label={`enter the ${Object.keys(tVArray)[1]} value here`}
                                                            />)
                                                        }
                                                </div>
                                                <div>
                                                    {(() => {
                                                        const variables = Object.keys(tVArray.array);
                                                        const columnCount = 5;
                                                        const rowCount = Math.ceil(variables.length / columnCount);

                                                        return Array.from({ length: rowCount }).map((_, rowIndex) => (
                                                        <div key={rowIndex} className={styles.flex}>
                                                            {Array.from({ length: columnCount }).map((_, colIndex) => {
                                                            const varIndex = rowIndex + colIndex * rowCount;
                                                            const currentVar = variables[varIndex];

                                                            if (!currentVar) return null; 

                                                            return (
                                                                <React.Fragment key={varIndex}>
                                                        
                                                                {colIndex > 0 && <h3 className={styles.comma}>,</h3>}

                                                                <div
                                                                    className={`${styles.variable} ${currentTab.selectedVariable === currentVar ? styles.fade : ''}`}
                                                                    key={varIndex}
                                                                >
                                                                    {currentVar.includes('_')
                                                                    ? <h3>{currentVar.split('_')[0]}<sub><h3>{currentVar.split('_')[1]}</h3></sub></h3>
                                                                    : (isUndefined(tD.topBar)
                                                                        ? <h3>{currentVar}</h3>
                                                                        : (Object.keys(tV)[0] === currentVar
                                                                        ? <h3>{nonSerializedFormulaData.checkVar(
                                                                            tVArray.array, 
                                                                            '7Ru42hF72M', 
                                                                            currentVar, 
                                                                            { topBar: true }
                                                                            )}</h3>
                                                                        : <h3>{currentVar}</h3>
                                                                        )
                                                                    )
                                                                    }
                                                                    <h3 style={{marginLeft:'-25px'}}>&nbsp;=</h3>
                                                                    {tabVariables[currentVar].includes(',') && currentVar === currentTab.selectedVariable
                                                                    ? tabVariables[currentVar].split(',').map((value, inputIndex, arr) => (
                                                                        <React.Fragment key={inputIndex}>
                                                                            <input
                                                                            style={{
                                                                                minWidth: '2ch',
                                                                                width: `${Math.max(2, 
                                                                                (currentVar === currentTab.selectedVariable
                                                                                    ? String(getRoundedValue(value)) 
                                                                                    : tV[currentVar]
                                                                                )?.length || 0) + 1}ch`,
                                                                                color: `${currentVar === currentTab.selectedVariable ? 'darkred' : 'black'}`,
                                                                                marginLeft: '0px'
                                                                            }}
                                                                            type='text'
                                                                            inputMode='numeric'
                                                                            value={getRoundedValue(value.trim())}
                                                                            autoComplete='off'
                                                                            autoCorrect='off'
                                                                            spellCheck='false'
                                                                            onChange={(e) => handleInputChange(e, currentVar)}
                                                                            onKeyDown={(e) => handleKeyDown(e, inputIndex+1)}
                                                                            name={currentVar}
                                                                            onBlur={(e) => handleBlur(e, currentVar)}
                                                                            placeholder=''
                                                                            aria-label={`enter the ${currentVar} value here`}
                                                                            />
                                                                            {inputIndex < arr.length - 1 && <p key={`comma_${inputIndex}`} className={styles.comma}>, </p>}
                                                                        </React.Fragment>
                                                                        ))
                                                                    : (<input
                                                                        style={{
                                                                            minWidth: '2ch',
                                                                            width: `${Math.max(2, 
                                                                            (currentVar === currentTab.selectedVariable
                                                                                ? String(getRoundedValue(currentTab.answer)) === 'Error: missing variable/s'
                                                                                    ? 'Err' 
                                                                                    : String(getRoundedValue(currentTab.answer))
                                                                                : tV[currentVar] === 'Error: missing variable/s'
                                                                                    ? 'Err'
                                                                                    : String(getRoundedValue(tV[currentVar]))
                                                                            )?.length || 0) + 1}ch`,
                                                                            color: `${currentVar === currentTab.selectedVariable ? 'darkred' : 'black'}`,
                                                                            marginLeft: '0px'
                                                                        }}
                                                                        type='text'
                                                                        inputMode='numeric'
                                                                        value={(currentVar === currentTab.selectedVariable 
                                                                            ? getRoundedValue(currentTab.answer) 
                                                                            : tV[currentVar]) === 'Error: missing variable/s'
                                                                                ? 'Err'
                                                                                : (currentVar === currentTab.selectedVariable 
                                                                                    ? getRoundedValue(currentTab.answer) 
                                                                                    : getRoundedValue(tV[currentVar])
                                                                                )
                                                                            }
                                                                        autoComplete='off'
                                                                        autoCorrect='off'
                                                                        spellCheck='false'
                                                                        onChange={(e) => handleInputChange(e, currentVar)}
                                                                        onKeyDown={(e) => handleKeyDown(e, varIndex+1)}
                                                                        name={currentVar}
                                                                        onBlur={(e) => handleBlur(e, currentVar)}
                                                                        placeholder=''
                                                                        aria-label={`enter the ${currentVar} value here`}
                                                                        />)
                                                                    }
                                                                </div>
                                                                </React.Fragment>
                                                            );
                                                            })}
                                                        </div>
                                                        ));
                                                    })()}
                                                </div>
                                            </>
                                        )
                                    )
                                )
                            }
                        </div>
                    </div>
                    <div className={styles.answer}>
                        <h2>Answer:</h2>
                        <div>
                            {currentTab.selectedVariable.includes('_')
                                ?<h3>{currentTab.selectedVariable.split('_')[0]}<sub><h3>{currentTab.selectedVariable.split('_')[1]}</h3></sub></h3>
                                    :(isUndefined(tD.topBar)
                                    ?<h3>{currentTab.selectedVariable}</h3>
                                    :(Object.keys(tV)[0] === currentTab.selectedVariable
                                        ?<h3>{nonSerializedFormulaData.checkVar(
                                            tVArray.array, 
                                            '7Ru42hF72M', 
                                            currentTab.selectedVariable, 
                                            {topBar:true}
                                        )}</h3>
                                        :<h3>{currentTab.selectedVariable}</h3>
                                    )
                                )
                            }
                            <h3>&nbsp;=&nbsp;</h3>
                            {
                                    currentTab.answer.includes(',')
                                        ? currentTab.answer
                                            .split(',')
                                            .map((value, index, array) => (
                                                <Fragment key={index}>
                                                    <input
                                                        type='text'
                                                        placeholder=''
                                                        aria-label={`answer-${index}`}
                                                        value={getRoundedValue(value)}
                                                        spellCheck='false'
                                                        readOnly
                                                        style={{
                                                            minWidth:'10ch',
                                                            width: `${Math.max
                                                                (8, String(getRoundedValue(value.trim()))?.length || 0) + 1
                                                            }ch`
                                                        }} 
                                                    />
                                                    {index < array.length - 1 && <p key={`comma_${index}`} className={styles.comma}>, </p>}
                                                </Fragment>
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
                                                    minWidth:'10ch',
                                                    width: `${Math.max(8, String(getRoundedValue(currentTab.answer))?.length || 0) + 1}ch`
                                                }} 
                                            />
                                        )
                                }
                        </div>
                    </div>
                </div>
                <div className={styles.errorSuggestion}>
                    {currentTab.leftSideUtilValue === '' || currentTab.leftSideUtilValue < 2 || currentTab.leftSideUtilValue > 25
                        ? (<div>
                            <h1>
                                {
                                    currentTab.leftSideUtilValue === '' || Number(currentTab.leftSideUtilValue) < 2
                                    ? 'Enter at least 2 terms'
                                    : 'Enter at most 25 terms'
                                }
                            </h1>
                        </div>)
                        : ''    
                    }
                </div>
            </div>
        )
    }
}