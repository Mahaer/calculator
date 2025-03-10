import React, { Fragment } from 'react';
import styles from '../../css/hub/calculator.module.css';
import { updateInputs, getAnswer } from '../../calculatorSlice';
import { useDispatch } from 'react-redux';
import { nonSerializedFormulaData } from '../../../../nonSerializedFormulaData';
import { create, all, isUndefined, isNaN } from 'mathjs'
import { Variable } from './variable';

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
        if(value === undefined){
            return ''
        }
        if (value === '' || isNaN(Number(value))
            || value.endsWith('e')
            || value.endsWith('e+')
            || value.endsWith('e-')
        ) {
            return value;
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
    const getRoundedValue = (answer, variable) => {
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
                    || answer.endsWith('0.')
                ){
                    return answer
                } else {
                    if(tD?.formatTypes?.[variable] === 'money'){
                        return math.toFixed(answer, 2)
                    } else {
                        return math.round(answer, 4)
                    }
                }
            }
        } catch(e){return answer}
    }
    const handleCopy = (e, copyValue) => {
        e.preventDefault();
        navigator.clipboard.writeText(copyValue);
    }
    const handleInputChange = (e, variable) => {
        let newValue = String(isNaN(Number(e.target.value))
            ? (!isUndefined(tD?.formatTypes?.[variable])
                ? formatValue(variable, tD?.formatTypes?.[variable])
                : getRoundedValue(e.target.value)
            )
            : getRoundedValue(e.target.value)
        )
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
                    ?.parentNode
                    ?.classList.contains(styles.fade)
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

        if(type === 'formula' || type === 'formula_expression'){
            formattedValue = formatValue(value, tD.formatTypes[variable]);
        } else if(type === 'array' || type === 'array_expression'){
            formattedValue = value
        }
        if(formattedValue === '-'
            || formattedValue === '-.'
            || formattedValue === '.'
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
            || String(formattedValue).startsWith('-e')
            || String(formattedValue).startsWith('-.e')
        ){
            formattedValue = ''
        }
        if(formattedValue === '0.'){formattedValue='0'}
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
                            <Variable
                                styles={styles}
                                getRoundedValue={getRoundedValue}
                                handleInputChange={handleInputChange}
                                handleKeyDown={handleKeyDown}
                                handleBlur={handleBlur}
                                currentTab={currentTab}
                                tabVariables={tabVariables}
                                tD={tD}
                                tV={tV}
                                tVArray={tVArray}
                                variable={variable}
                                index={index}
                                key={index}
                                minWidth={9}
                                placeholder={'Enter Here'}
                            />
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
                                                value={getRoundedValue(value, currentTab.selectedVariable)}
                                                spellCheck='false'
                                                readOnly
                                                style={{
                                                    minWidth:'10ch',
                                                    width: `${Math.max
                                                        (8, String(getRoundedValue(value.trim(), currentTab.selectedVariable))?.length || 0) + 1
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
                                        value={getRoundedValue(currentTab.answer, currentTab.selectedVariable)}
                                        spellCheck='false'
                                        readOnly
                                        style={{
                                            minWidth:'10ch',
                                            width: `${Math.max(8, String(getRoundedValue(currentTab.answer, currentTab.selectedVariable))?.length || 0) + 1}ch`
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
            </div>
        );
    } else if(type === 'formula_expression'){
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
                            (index !== 0 && <Variable
                                styles={styles}
                                getRoundedValue={getRoundedValue}
                                handleInputChange={handleInputChange}
                                handleKeyDown={handleKeyDown}
                                handleBlur={handleBlur}
                                currentTab={currentTab}
                                tabVariables={tabVariables}
                                tD={tD}
                                tV={tV}
                                tVArray={tVArray}
                                variable={variable}
                                index={index}
                                key={index}
                                minWidth={9}
                                placeholder={'Enter Here'}
                            />)
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
                                                value={getRoundedValue(value, currentTab.selectedVariable)}
                                                spellCheck='false'
                                                readOnly
                                                style={{
                                                    minWidth:'10ch',
                                                    width: `${Math.max
                                                        (8, String(getRoundedValue(value.trim(), currentTab.selectedVariable))?.length || 0) + 1
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
                                        value={getRoundedValue(currentTab.answer, currentTab.selectedVariable)}
                                        spellCheck='false'
                                        readOnly
                                        style={{
                                            minWidth:'10ch',
                                            width: `${Math.max(8, String(getRoundedValue(currentTab.answer, currentTab.selectedVariable))?.length || 0) + 1}ch`
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
            </div>
        );
    }else if(type === 'array'){
        return (
            <div className={`${styles.calculator} ${currentTab.leftSideUtilValue === '' || currentTab.leftSideUtilValue < 2 || currentTab.leftSideUtilValue > 25? styles.borderFade: ''}`}>
                <div className={currentTab.leftSideUtilValue === '' || currentTab.leftSideUtilValue < 2 || currentTab.leftSideUtilValue > 25? styles.extraFade: ''}>
                    <div className={styles.formula}>
                        <h1>{mode} Calculator</h1>
                        <div className={styles.flex}>
                        <h3 style={{fontSize:'32px'}}>{nonSerializedFormulaData.checkVar(tV, currentTab.selectedVariable, Object.keys(tVArray)[1], {topBar:!isUndefined(tD.topBar)? true: false})}</h3>
                        <h3 style={{fontSize:'32px'}}>&nbsp;=&nbsp;</h3>
                        {!isUndefined(tD.startCharacter) 
                            ? (!isUndefined(tD.wrapCharacters) && Object.keys(tVArray.array).length <= 5
                                ? null
                                : <h3 style={{height:'38px', fontSize:'32px'}}>{tD.startCharacter}</h3>
                            ) 
                            : null
                        }

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
                                    {rowIndex === array.length - 1
                                        ? ''
                                        : (
                                            <h3 style={{fontSize:'32px'}}>{tD.splitCharacter}</h3>
                                        )
                                    }
                                    {rowIndex === array.length - 1 && (
                                            !isUndefined(tD.endCharacter) 
                                            ? (!isUndefined(tD.wrapCharacters) && Object.keys(tVArray.array).length <= 5
                                                ? null
                                                : <h3 style={{height:'38px', fontSize:'32px'}}>{tD.endCharacter}</h3>
                                            ) 
                                            : null
                                        )
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                    <div className={styles.enter}>
                        <h2>Enter:</h2>
                        <div className={styles.variables}>
                            {(() => {
                                let variableConfig = {
                                    columnCount: 1,
                                    minWidth: 9,
                                    placeholder: 'Enter Here',
                                }
                                if(Object.keys(tVArray.array).length < 8){
                                    variableConfig = {
                                        columnCount: 1,
                                        minWidth: 9,
                                        placeholder: 'Enter Here',
                                    }
                                } else if (Object.keys(tVArray.array).length < 13){
                                    variableConfig = {
                                        columnCount: 2,
                                        minWidth: 6,
                                        placeholder: 'Enter',
                                        errorMsg: 'Error'
                                    }
                                } else if (Object.keys(tVArray.array).length < 19){
                                    variableConfig = {
                                        columnCount: 3,
                                        minWidth: 5,
                                        placeholder: 'Enter',
                                        errorMsg: 'Error',
                                        scrunch: true
                                    }
                                } else {
                                    variableConfig = {
                                        columnCount: 5,
                                        minWidth: 2,
                                        placeholder: '',
                                        errorMsg: 'Er',
                                        scrunch: true
                                    }
                                }

                                return (
                                    <>
                                        <Variable
                                            styles={styles}
                                            getRoundedValue={getRoundedValue}
                                            handleInputChange={handleInputChange}
                                            handleKeyDown={handleKeyDown}
                                            handleBlur={handleBlur}
                                            currentTab={currentTab}
                                            tabVariables={tabVariables}
                                            tD={tD}
                                            tV={tV}
                                            tVArray={tVArray}
                                            variable={Object.keys(tVArray)[1]}
                                            index={-1}
                                            key={0}
                                            minWidth={9}
                                            placeholder={'Enter Here'}
                                        />
                                        <div>
                                            {(() => {
                                                const variables = Object.keys(tVArray.array);
                                                const columnCount = variableConfig.columnCount;
                                                const rowCount = Math.ceil(variables.length / columnCount);

                                                return Array.from({ length: rowCount }).map((_, rowIndex, arr) => (
                                                <div key={rowIndex} className={styles.flex}>
                                                    {Array.from({ length: columnCount }).map((_, colIndex) => {
                                                    const varIndex = rowIndex + colIndex * rowCount;
                                                    const currentVar = variables[varIndex];
                                                    if (!currentVar) return null;
                                                    return (
                                                        <React.Fragment key={varIndex}>
                                                            <Variable
                                                                styles={styles}
                                                                getRoundedValue={getRoundedValue}
                                                                handleInputChange={handleInputChange}
                                                                handleKeyDown={handleKeyDown}
                                                                handleBlur={handleBlur}
                                                                currentTab={currentTab}
                                                                tabVariables={tabVariables}
                                                                tD={tD}
                                                                tV={tV}
                                                                tVArray={tVArray}
                                                                variable={currentVar}
                                                                index={varIndex}
                                                                key={varIndex}
                                                                minWidth={variableConfig.minWidth}
                                                                placeholder={variableConfig.placeholder}
                                                                errorMsg={variableConfig.errorMsg}
                                                                scrunch={variableConfig.scrunch}
                                                            />
                                                            {varIndex !== variables.length - 1 && Object.keys(tVArray.array).length > 7
                                                                && <h3 className={styles.comma}>,</h3>
                                                            }
                                                        </React.Fragment>
                                                    );
                                                    })}
                                                </div>
                                                ));
                                            })()}
                                        </div>
                                    </>
                                )
                            })()}
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
    } else if(type === 'array_expression'){
        return (
            <div className={`${styles.calculator} ${currentTab.leftSideUtilValue === '' || currentTab.leftSideUtilValue < 2 || currentTab.leftSideUtilValue > 25? styles.borderFade: ''}`}>
                <div className={currentTab.leftSideUtilValue === '' || currentTab.leftSideUtilValue < 2 || currentTab.leftSideUtilValue > 25? styles.extraFade: ''}>
                    <div className={styles.formula}>
                        <h1>{mode} Calculator</h1>
                        <div className={styles.flex}>
                            <h3 style={{fontSize:'32px'}}>{nonSerializedFormulaData.checkVar(tV, currentTab.selectedVariable, Object.keys(tVArray)[1], {topBar:!isUndefined(tD.topBar)? true: false})}</h3>
                            <h3 style={{fontSize:'32px'}}>&nbsp;=&nbsp;</h3>
                            {!isUndefined(tD.startCharacter) 
                                ? (!isUndefined(tD.wrapCharacters) && Object.keys(tVArray.array).length <= 7
                                    ? null
                                    : <h3 style={{height:'38px', fontSize:'32px'}}>{tD.startCharacter}</h3>
                                ) 
                                : null
                            }

                            <div className={styles.variablesWrapper}>
                                {Object.keys(tVArray.array).reduce((acc, variable, index) => {
                                    if (index % 7 === 0) {
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
                                        {rowIndex === array.length - 1
                                            ? ''
                                            : (
                                                <h3 style={{fontSize:'32px'}}>{tD.splitCharacter}</h3>
                                            )
                                        }
                                        {rowIndex === array.length - 1 && (
                                            !isUndefined(tD.endCharacter) 
                                                ? (!isUndefined(tD.wrapCharacters) && Object.keys(tVArray.array).length <= 7
                                                    ? null
                                                    : <h3 style={{height:'38px', fontSize:'32px'}}>{tD.endCharacter}</h3>
                                                ) 
                                                : null
                                            )
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.enter}>
                        <h2>Enter:</h2>
                        <div className={styles.variables}>
                            {(() => {
                                let variableConfig = {
                                    columnCount: 1,
                                    minWidth: 9,
                                    placeholder: 'Enter Here',
                                }
                                if(Object.keys(tVArray.array).length < 8){
                                    variableConfig = {
                                        columnCount: 1,
                                        minWidth: 9,
                                        placeholder: 'Enter Here',
                                    }
                                } else if (Object.keys(tVArray.array).length < 13){
                                    variableConfig = {
                                        columnCount: 2,
                                        minWidth: 6,
                                        placeholder: 'Enter',
                                    }
                                } else if (Object.keys(tVArray.array).length < 19){
                                    variableConfig = {
                                        columnCount: 3,
                                        minWidth: 5,
                                        placeholder: 'Enter',
                                        scrunch: true
                                    }
                                } else {
                                    variableConfig = {
                                        columnCount: 5,
                                        minWidth: 2,
                                        placeholder: '',
                                        scrunch: true
                                    }
                                }

                                return (
                                    <div>
                                        {(() => {
                                            const variables = Object.keys(tVArray.array);
                                            const columnCount = variableConfig.columnCount;
                                            const rowCount = Math.ceil(variables.length / columnCount);

                                            return Array.from({ length: rowCount }).map((_, rowIndex, arr) => (
                                            <div key={rowIndex} className={styles.flex}>
                                                {Array.from({ length: columnCount }).map((_, colIndex) => {
                                                const varIndex = rowIndex + colIndex * rowCount;
                                                const currentVar = variables[varIndex];
                                                if (!currentVar) return null;
                                                return (
                                                    <React.Fragment key={varIndex}>
                                                        <Variable
                                                            styles={styles}
                                                            getRoundedValue={getRoundedValue}
                                                            handleInputChange={handleInputChange}
                                                            handleKeyDown={handleKeyDown}
                                                            handleBlur={handleBlur}
                                                            currentTab={currentTab}
                                                            tabVariables={tabVariables}
                                                            tD={tD}
                                                            tV={tV}
                                                            tVArray={tVArray}
                                                            variable={currentVar}
                                                            index={varIndex}
                                                            key={varIndex}
                                                            minWidth={variableConfig.minWidth}
                                                            placeholder={variableConfig.placeholder}
                                                            scrunch={variableConfig.scrunch}
                                                        />
                                                        {varIndex !== variables.length - 1 && Object.keys(tVArray.array).length > 7
                                                            && <h3 className={styles.comma}>,</h3>
                                                        }
                                                    </React.Fragment>
                                                );
                                                })}
                                            </div>
                                            ));
                                        })()}
                                    </div>
                                )
                            })()}
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