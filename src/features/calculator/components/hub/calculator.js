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
            const value = String(variableList[variable]).includes('|[')
                        &&String(variableList[variable]).includes('|[')
                            ? String(variableList[variable]).split('|[')[0]
                            : variableList[variable]
            const replacement = value || variable;
            newFormula = newFormula.replace(new RegExp(`\\b${variable}\\b`, 'g'), replacement);
        }

        return newFormula
    } // Fix this
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
                id: tabId, 
                variable: variable, 
                value: newValue
            }));
            let updatedVariables = {}
            if((type === 'formula_expression' || type === 'formula') && 
                (!isUndefined(tD.fraction)? tD.fraction: false) &&
                ("acegikmoprtvxz".includes(variable)) &&
                (e.nativeEvent.inputType !== 'deleteContentBackward')
            ) {
                const nextVar = String.fromCharCode(variable.charCodeAt(0) + 1)
                if(currentTab.variables[nextVar] === nextVar || !currentTab.variables[nextVar]){
                    dispatch(updateInputs({
                        id: tabId,
                        variable: nextVar,
                        value: '1'
                    }))
                    updatedVariables = { 
                        ...tV, 
                        [variable]: newValue,
                        [nextVar]: '1'
                    };
                } else {
                    updatedVariables = { 
                        ...tV, 
                        [variable]: newValue
                    };
                }
            } else {
                updatedVariables = { 
                    ...tV, 
                    [variable]: newValue
                };
            }
            const answer = nonSerializedFormulaData[mode]['math'](currentTab.selectedVariable, updatedVariables);
            dispatch(getAnswer({ id: tabId, answer: answer, selectedVariable: currentTab.selectedVariable }));
            if(!isUndefined(tD.otherAnswers)){
                let answerVariable = answer
                if(String(answerVariable).includes('||')){
                    for(let i = 0; i < tD.otherAnswers.length; i++){
                        dispatch(updateInputs({
                            id: tabId,
                            variable: tD.otherAnswers[i],
                            value: String(answerVariable).split('||')[i]
                        }))
                    }
                }
            }
        }

        setTimeout(() => {
            input.setSelectionRange(cursorPos, cursorPos);
        }, 0);
    };
    const handleKeyDown = (e, index) => {
        const tVArray = {array: {...tV}}
        if(!isUndefined(tD.otherAnswers)){
            (tD.otherAnswers).forEach(otherAnswer => {
                delete tVArray.array[otherAnswer]
            });
            delete tVArray.array['ANS']
        }
        const keys = Object.keys(tVArray.array);
        let nextIndex = index;
        const currentInput = document.activeElement;
        if (e.key === "ArrowDown" || 
            e.key === "ArrowUp" || 
            e.key === 'Tab' || 
            (e.shiftKey && e.key === 'Tab') ||
            e.key === 'Enter'
        ) {
            if(type === 'polynomial_expression'){
                e.preventDefault()
                const validKeys = {...tV}
                delete validKeys['--']
                delete validKeys[currentTab.selectedVariable]
                for(let i = 0; i < Object.keys(validKeys).length; i++){
                    if(document.querySelector(`input[name="${Object.keys(tV)[i]}"]`)?.parentNode?.classList?.contains(styles.fade)){
                        delete validKeys[Object.keys(tV)[i]]
                    }
                }
                let oldIdx = Object.keys(validKeys).indexOf(currentInput.name)
                let currentIdx = oldIdx
                currentIdx += (e.key === "ArrowDown" || 
                    (!e.shiftKey && e.key === 'Tab') || 
                    e.key ===  'Enter'
                ) ? 1 : -1;
                let newIndex = Object.keys(validKeys)[currentIdx]
                if(isUndefined(newIndex)){
                    if(Object.keys(validKeys)[oldIdx] === Object.keys(validKeys)[Object.keys(validKeys).length - 1]){
                        newIndex = Object.keys(validKeys)[0]
                    } else if(Object.keys(validKeys)[oldIdx] === Object.keys(validKeys)[0]){
                        newIndex = Object.keys(validKeys)[Object.keys(validKeys).length - 1]
                    }
                }
                let newInput = document.querySelector(`input[name="${newIndex}"]`)
                setTimeout(() => {
                    newInput.focus();
                    newInput.selectionStart = newInput.selectionEnd = newInput.value.length;
                }, 0);
            } else if(type === 'array'){
                e.preventDefault()
                const validKeys = {...tV}
                for(let i = 0; i < Object.keys(validKeys).length; i++){
                    if(document.querySelector(`input[name="${Object.keys(tV)[i]}"]`).parentNode.classList.contains(styles.fade)){
                        delete validKeys[Object.keys(tV)[i]]
                    }
                }
                let oldIdx = Object.keys(validKeys).indexOf(currentInput.name)
                let currentIdx = oldIdx
                currentIdx += (e.key === "ArrowDown" || 
                    (!e.shiftKey && e.key === 'Tab') || 
                    e.key ===  'Enter'
                ) ? 1 : -1;
                let newIndex = Object.keys(validKeys)[currentIdx]
                if(isUndefined(newIndex)){
                    if(Object.keys(validKeys)[oldIdx] === Object.keys(validKeys)[Object.keys(validKeys).length - 1]){
                        newIndex = Object.keys(validKeys)[0]
                    } else if(Object.keys(validKeys)[oldIdx] === Object.keys(validKeys)[0]){
                        newIndex = Object.keys(validKeys)[Object.keys(validKeys).length - 1]
                    }
                }
                let newInput = document.querySelector(`input[name="${newIndex}"]`)
                setTimeout(() => {
                    newInput.focus();
                    newInput.selectionStart = newInput.selectionEnd = newInput.value.length;
                }, 0);
            } else {
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
                    if(mode === 'Polar form to Standard form'
                        || mode === 'Polar form to Euler\'s form'
                        || mode === 'Polar form to Conjugate'
                        || mode === 'Euler\'s form to Standard form'
                        || mode === 'Euler\'s form to Polar form'
                        || mode === 'Euler\'s form to Conjugate'
                        || mode === 'Conjugate to Polar form'
                        || mode === 'Conjugate to Euler\'s form'
                    ){
                        if(index === 1){
                            nextVariable = '𝜃'
                        } else {
                            nextVariable = 'r'
                        }
                    }
                    let nextInput = document.querySelector(`input[name="${nextVariable}"]`);
                    if (nextInput) {
                        setTimeout(() => {
                            nextInput.focus();
                            nextInput.selectionStart = nextInput.selectionEnd = nextInput.value.length;
                        }, 0);
                    }
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

        if(type === 'formula' || type === 'formula_expression' || type === 'polynomial_expression'){
            formattedValue = formatValue(value, tD.formatTypes[variable]);
        } else if(type === 'array' || type === 'array_expression'){
            formattedValue = value
        }
        if(formattedValue === '-'
            || (formattedValue === '-.'
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
            || String(formattedValue).startsWith('-.e'))
        ){
            formattedValue = ''
        }
        if(formattedValue === '0.'){formattedValue='0'}
        dispatch(updateInputs({
            id: tabId,
            variable: variable,
            value: formattedValue,
        }));
        const answer = nonSerializedFormulaData[mode]['math'](currentTab.selectedVariable, tV)
        dispatch(getAnswer({
            id: tabId,
            answer: answer,
            selectedVariable: currentTab.selectedVariable
        }));
        if(!isUndefined(tD.otherAnswers)){
            let answerVariable = answer
            if(String(answerVariable).includes('||')){
                for(let i = 0; i < tD.otherAnswers.length; i++){
                    dispatch(updateInputs({
                        id: tabId,
                        variable: tD.otherAnswers[i],
                        value: String(answerVariable).split('||')[i]
                    }))
                }
            }
        }
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
                        {(() => {
                            let variableConfig = {
                                columnCount: 1,
                                minWidth: 9,
                                placeholder: 'Enter Here',
                            }
                            if(Object.keys(tV).length < 8){
                                variableConfig = {
                                    columnCount: 1,
                                    minWidth: 9,
                                    placeholder: 'Enter Here',
                                    errorMsg: 'Error: missing variable/s'
                                }
                            } else if (Object.keys(tV).length < 12){
                                variableConfig = {
                                    columnCount: 2,
                                    minWidth: 6,
                                    placeholder: 'Enter',
                                    errorMsg: 'Error: missing variable/s'
                                }
                            } else if (Object.keys(tV).length < 19){
                                variableConfig = {
                                    columnCount: 3,
                                    minWidth: 5,
                                    placeholder: 'Enter',
                                    errorMsg: 'Error: missing variable/s',
                                    scrunch: true
                                }
                            } else {
                                variableConfig = {
                                    columnCount: 5,
                                    minWidth: 2,
                                    placeholder: '',
                                    errorMsg: 'Error: missing variable/s',
                                    scrunch: true
                                }
                            }
                            return (
                                <div>
                                    {(() => {
                                        const variables = Object.keys(tV);
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
                                                    {varIndex !== variables.length - 1 && Object.keys(tV).length > 7
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
                        <h3>{tD.units[currentTab.selectedVariable] === 'DecimalPercentage' 
                        || tD.units[currentTab.selectedVariable] === 'DecimalFraction'
                        || tD.units[currentTab.selectedVariable] === 'Fraction'
                        || tD.units[currentTab.selectedVariable] === undefined
                            ? ''
                            : tD.units[currentTab.selectedVariable]
                        }</h3>
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
                            onCopy={(e) => handleCopy(e, getCopyFormula(tD.formula, tV))} 
                            style={{marginTop:'10px'}}
                        >{nonSerializedFormulaData[mode]['display'](tV, currentTab.selectedVariable)}</h3>
                    </div>
                </div>
                <div className={styles.enter}>
                    <h2>Enter:</h2>
                    <div className={styles.variables}>
                        {(() => {
                            const tVArray = {array: {...tV}}
                            delete tVArray.array[Object.keys(tVArray.array)[0]]
                            if(!isUndefined(tD.otherAnswers)){
                                (tD.otherAnswers).forEach(otherAnswer => {
                                    delete tVArray.array[otherAnswer]
                                });
                                delete tVArray.array['ANS']
                            }
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
                                                        index={varIndex+1}
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
                    {!isUndefined(tD.otherAnswers)
                        ?(tD.otherAnswers.length === 0
                            ? null
                            : <h2>Answer:</h2>
                        )
                        :<h2>Answer:</h2>
                    }
                    {!isUndefined(tD.otherAnswers)
                        ?tD.otherAnswers.map((otherAnswer, index) => (
                            <div key={`answer_${index}`}>
                                {otherAnswer.includes('_')
                                    ?<h3>{otherAnswer.split('_')[0]}<sub><h3>{otherAnswer.split('_')[1]}</h3></sub></h3>
                                    :<h3>{otherAnswer}</h3>
                                }
                                <h3>&nbsp;{tD.calculationType[otherAnswer] === 'exact' || tD.calculationType[otherAnswer] === undefined? '=': (tD.calculationType[otherAnswer] === 'approximation'? '≈': '=')}</h3>
                                {
                                    tV[otherAnswer].includes(',')
                                        ? tV[otherAnswer]
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
                                                value={(
                                                    String(getRoundedValue(currentTab.answer.split('||')[index], otherAnswer)).includes('|[') && 
                                                    String(getRoundedValue(currentTab.answer.split('||')[index], otherAnswer)).includes(']|')
                                                        ? getRoundedValue(String(currentTab.answer.split('||')[index]).split('|[')[0], otherAnswer)
                                                        : getRoundedValue(currentTab.answer.split('||')[index], otherAnswer)
                                                )}
                                                spellCheck='false'
                                                readOnly
                                                style={{
                                                    minWidth:'10ch',
                                                    width: `${Math.max(8, String((
                                                        String(getRoundedValue(currentTab.answer.split('||')[index], otherAnswer)).includes('|[') && 
                                                        String(getRoundedValue(currentTab.answer.split('||')[index], otherAnswer)).includes(']|')
                                                            ? getRoundedValue(String(currentTab.answer.split('||')[index]).split('|[')[0], otherAnswer)
                                                            : getRoundedValue(currentTab.answer.split('||')[index], otherAnswer)
                                                    ))?.length || 0) + 1}ch`
                                                }} 
                                            />
                                        )
                                }
                                <h3>{tD.units[otherAnswer] === 'DecimalPercentage' 
                                || tD.units[otherAnswer] === 'DecimalFraction'
                                || tD.units[otherAnswer] === 'Fraction'
                                || tD.units[otherAnswer] === undefined
                                    ? ''
                                    : tD.units[otherAnswer]
                                }</h3>
                                {
                                    tD.units[otherAnswer] !== '' && tD.units[otherAnswer] !== undefined
                                    && (otherAnswer !== tD.leftSideUtil.omittedVariable
                                    || currentTab.leftSideUtilValue === 'Custom Value')
                                &&(
                                    <button type='button'>add conversion</button>
                                )}
                            </div>
                        ))
                        : <div key='default_answer' style={isUndefined(tD.inputWrapMarginLeft)?{alignItems:'center'}:{}}>
                            {currentTab.selectedVariable.includes('_')
                                ?<h3>{currentTab.selectedVariable.split('_')[0]}<sub><h3>{currentTab.selectedVariable.split('_')[1]}</h3></sub></h3>
                                :<h3>{currentTab.selectedVariable}</h3>
                            }
                            <h3 style={isUndefined(tD.inputWrapMarginLeft)?{}:{marginRight:'20px'}}>&nbsp;{tD.calculationType[currentTab.selectedVariable] === 'exact' || tD.calculationType[currentTab.selectedVariable] === undefined? '=': (tD.calculationType[currentTab.selectedVariable] === 'approximation'? '≈': '=')}</h3>
                            {
                                currentTab.answer.includes(',')
                                    ? (isUndefined(tD.inputWrapMarginLeft)
                                        ?currentTab.answer
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
                                        : <span>{(() => {
                                            const values = tabVariables[currentTab.selectedVariable].split(',')
                                            const splitValues = []
                                            for (let i = 0; i < values.length; i += 8) {
                                                splitValues.push(values.slice(i, i + 8)); 
                                            }
                                            return splitValues.map((valueArr, index) => (
                                                <span key={`3298498${index}`} className={styles.flex}>{(() => {
                                                    const rowValues = valueArr
                                                    return rowValues.map((rowValue, jindex) => (
                                                        <span key={`48938${jindex}`} style={{display:'flex'}}>
                                                            <input 
                                                                type='text'
                                                                placeholder=''
                                                                aria-label={`answer-${jindex}`}
                                                                value={getRoundedValue(rowValue, currentTab.selectedVariable)}
                                                                spellCheck='false'
                                                                readOnly 
                                                                style={{
                                                                    minWidth:'1ch',
                                                                    width: `${Math.max
                                                                        (1, String(getRoundedValue(rowValue.trim(), currentTab.selectedVariable))?.length || 0) + 1
                                                                    }ch`,
                                                                    marginLeft:'0px',
                                                                    marginRight:'0px'
                                                                }} 
                                                            />
                                                            {index * 8 + jindex < values.length - 1 && <p key={`comma_${index}`} className={`${styles.comma} ${styles.specialComma}`}>, </p>}
                                                        </span>
                                                        
                                                    ))
                                                })()}</span>
                                            ))
                                        })()}</span>
                                    )
                                    : (
                                        <input
                                            type='text'
                                            placeholder=''
                                            aria-label='answer'
                                            value={(
                                                String(getRoundedValue(currentTab.answer, currentTab.selectedVariable)).includes('|[') && 
                                                String(getRoundedValue(currentTab.answer, currentTab.selectedVariable)).includes(']|')
                                                    ? getRoundedValue(String(currentTab.answer).split('|[')[0], currentTab.selectedVariable)
                                                    : getRoundedValue(currentTab.answer, currentTab.selectedVariable)
                                            )}
                                            spellCheck='false'
                                            readOnly
                                            style={{
                                                minWidth:'10ch',
                                                width: `${Math.max(8, String((
                                                    String(getRoundedValue(currentTab.answer, currentTab.selectedVariable)).includes('|[') && 
                                                    String(getRoundedValue(currentTab.answer, currentTab.selectedVariable)).includes(']|')
                                                        ? getRoundedValue(String(currentTab.answer).split('|[')[0], currentTab.selectedVariable)
                                                        : getRoundedValue(currentTab.answer, currentTab.selectedVariable)
                                                ))?.length || 0) + 1}ch`
                                            }} 
                                        />
                                    )
                            }
                            <h3>{tD.units[currentTab.selectedVariable] === 'DecimalPercentage' 
                            || tD.units[currentTab.selectedVariable] === 'DecimalFraction'
                            || tD.units[currentTab.selectedVariable] === 'Fraction'
                            || tD.units[currentTab.selectedVariable] === undefined
                                ? ''
                                : tD.units[currentTab.selectedVariable]
                            }</h3>
                            {
                                tD.units[currentTab.selectedVariable] !== '' && tD.units[currentTab.selectedVariable] !== undefined
                                && (currentTab.selectedVariable !== tD.leftSideUtil.omittedVariable
                                || currentTab.leftSideUtilValue === 'Custom Value')
                            &&(
                                <button type='button'>add conversion</button>
                            )}
                        </div>
                    }
                </div>
            </div>
        );
    } else if(type === 'array'){
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
    } else if(type === 'polynomial_expression'){
        return (
            <div className={`${styles.calculator} ${currentTab.leftSideUtilValue.split('|')[0] === ''
                    || currentTab.leftSideUtilValue.split('|')[0] < 1
                    || currentTab.leftSideUtilValue.split('|')[0] > tD.maxTerms
                    || currentTab.leftSideUtilValue.split('|')[1] === ''
                    || currentTab.leftSideUtilValue.split('|')[1] < 1
                    || currentTab.leftSideUtilValue.split('|')[1] > tD.maxTerms
                    ? styles.borderFade
                    : ''
                }`}>
                <div className={currentTab.leftSideUtilValue.split('|')[0] === ''
                    || currentTab.leftSideUtilValue.split('|')[0] < 1
                    || currentTab.leftSideUtilValue.split('|')[0] > tD.maxTerms
                    || currentTab.leftSideUtilValue.split('|')[1] === ''
                    || currentTab.leftSideUtilValue.split('|')[1] < 1
                    || currentTab.leftSideUtilValue.split('|')[1] > tD.maxTerms
                    ? styles.extraFade
                    : ''
                }>
                    <div className={styles.formula}>
                        <h1>{mode} Calculator</h1>
                        <div>  
                            <h3 
                                onCopy={(e) => handleCopy(e, getCopyFormula(tD.formula, tV))} 
                                style={{marginTop:'10px'}}
                            >{nonSerializedFormulaData[mode]['display'](tV, currentTab.selectedVariable)}</h3>
                        </div>
                    </div>
                    <div className={styles.enter}>
                        <h2>Enter:</h2>
                        <div className={styles.variables}>
                            {(() => {
                                const tVArray = {array: {...tV}}
                                delete tVArray.array['--']
                                delete tVArray.array[Object.keys(tVArray.array)[0]]
                                if(!isUndefined(tD.otherAnswers)){
                                    (tD.otherAnswers).forEach(otherAnswer => {
                                        delete tVArray.array[otherAnswer]
                                    });
                                    delete tVArray.array['ANS']
                                }
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
                                                            index={varIndex+1}
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
                        {!isUndefined(tD.otherAnswers)
                            ?(tD.otherAnswers.length === 0
                                ? null
                                : <h2>Answer:</h2>
                            )
                            :<h2>Answer:</h2>
                        }
                        {!isUndefined(tD.otherAnswers)
                            ?tD.otherAnswers.map((otherAnswer, index) => (
                                <div key={`answer_${index}`}>
                                    {otherAnswer.includes('_')
                                        ?<h3>{otherAnswer.split('_')[0]}<sub><h3>{otherAnswer.split('_')[1]}</h3></sub></h3>
                                        :<h3>{otherAnswer}</h3>
                                    }
                                    <h3>&nbsp;{tD.calculationType[otherAnswer] === 'exact' || tD.calculationType[otherAnswer] === undefined? '=': (tD.calculationType[otherAnswer] === 'approximation'? '≈': '=')}</h3>
                                    {
                                        tV[otherAnswer].includes(',')
                                            ? tV[otherAnswer]
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
                                                    value={(
                                                        String(getRoundedValue(currentTab.answer.split('||')[index], otherAnswer)).includes('|[') && 
                                                        String(getRoundedValue(currentTab.answer.split('||')[index], otherAnswer)).includes(']|')
                                                            ? getRoundedValue(String(currentTab.answer.split('||')[index]).split('|[')[0], otherAnswer)
                                                            : getRoundedValue(currentTab.answer.split('||')[index], otherAnswer)
                                                    )}
                                                    spellCheck='false'
                                                    readOnly
                                                    style={{
                                                        minWidth:'10ch',
                                                        width: `${Math.max(8, String((
                                                            String(getRoundedValue(currentTab.answer.split('||')[index], otherAnswer)).includes('|[') && 
                                                            String(getRoundedValue(currentTab.answer.split('||')[index], otherAnswer)).includes(']|')
                                                                ? getRoundedValue(String(currentTab.answer.split('||')[index]).split('|[')[0], otherAnswer)
                                                                : getRoundedValue(currentTab.answer.split('||')[index], otherAnswer)
                                                        ))?.length || 0) + 1}ch`
                                                    }} 
                                                />
                                            )
                                    }
                                    <h3>{tD.units[otherAnswer] === 'DecimalPercentage' 
                                    || tD.units[otherAnswer] === 'DecimalFraction'
                                    || tD.units[otherAnswer] === 'Fraction'
                                    || tD.units[otherAnswer] === undefined
                                        ? ''
                                        : tD.units[otherAnswer]
                                    }</h3>
                                    {
                                        tD.units[otherAnswer] !== '' && tD.units[otherAnswer] !== undefined
                                        && (otherAnswer !== tD.leftSideUtil.omittedVariable
                                        || currentTab.leftSideUtilValue === 'Custom Value')
                                    &&(
                                        <button type='button'>add conversion</button>
                                    )}
                                </div>
                            ))
                            : <div key='default_answer' style={isUndefined(tD.inputWrapMarginLeft)?{alignItems:'center'}:{}}>
                                {currentTab.selectedVariable.includes('_')
                                    ?<h3>{currentTab.selectedVariable.split('_')[0]}<sub><h3>{currentTab.selectedVariable.split('_')[1]}</h3></sub></h3>
                                    :<h3>{currentTab.selectedVariable}</h3>
                                }
                                <h3 style={isUndefined(tD.inputWrapMarginLeft)?{}:{marginRight:'20px'}}>&nbsp;{tD.calculationType[currentTab.selectedVariable] === 'exact' || tD.calculationType[currentTab.selectedVariable] === undefined? '=': (tD.calculationType[currentTab.selectedVariable] === 'approximation'? '≈': '=')}</h3>
                                {
                                    currentTab.answer.includes(',')
                                        ? (isUndefined(tD.inputWrapMarginLeft)
                                            ?currentTab.answer
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
                                            : <span>{(() => {
                                                const values = tabVariables[currentTab.selectedVariable].split(',')
                                                const splitValues = []
                                                for (let i = 0; i < values.length; i += 8) {
                                                    splitValues.push(values.slice(i, i + 8)); 
                                                }
                                                return splitValues.map((valueArr, index) => (
                                                    <span key={`3298498${index}`} className={styles.flex}>{(() => {
                                                        const rowValues = valueArr
                                                        return rowValues.map((rowValue, jindex) => (
                                                            <span key={`48938${jindex}`} style={{display:'flex'}}>
                                                                <input 
                                                                    type='text'
                                                                    placeholder=''
                                                                    aria-label={`answer-${jindex}`}
                                                                    value={getRoundedValue(rowValue, currentTab.selectedVariable)}
                                                                    spellCheck='false'
                                                                    readOnly 
                                                                    style={{
                                                                        minWidth:'1ch',
                                                                        width: `${Math.max
                                                                            (1, String(getRoundedValue(rowValue.trim(), currentTab.selectedVariable))?.length || 0) + 1
                                                                        }ch`,
                                                                        marginLeft:'0px',
                                                                        marginRight:'0px'
                                                                    }} 
                                                                />
                                                                {index * 8 + jindex < values.length - 1 && <p key={`comma_${index}`} className={`${styles.comma} ${styles.specialComma}`}>, </p>}
                                                            </span>
                                                            
                                                        ))
                                                    })()}</span>
                                                ))
                                            })()}</span>
                                        )
                                        : (
                                            <input
                                                type='text'
                                                placeholder=''
                                                aria-label='answer'
                                                value={(
                                                    String(getRoundedValue(currentTab.answer, currentTab.selectedVariable)).includes('|[') && 
                                                    String(getRoundedValue(currentTab.answer, currentTab.selectedVariable)).includes(']|')
                                                        ? getRoundedValue(String(currentTab.answer).split('|[')[0], currentTab.selectedVariable)
                                                        : getRoundedValue(currentTab.answer, currentTab.selectedVariable)
                                                )}
                                                spellCheck='false'
                                                readOnly
                                                style={{
                                                    minWidth:'10ch',
                                                    width: `${Math.max(8, String((
                                                        String(getRoundedValue(currentTab.answer, currentTab.selectedVariable)).includes('|[') && 
                                                        String(getRoundedValue(currentTab.answer, currentTab.selectedVariable)).includes(']|')
                                                            ? getRoundedValue(String(currentTab.answer).split('|[')[0], currentTab.selectedVariable)
                                                            : getRoundedValue(currentTab.answer, currentTab.selectedVariable)
                                                    ))?.length || 0) + 1}ch`
                                                }} 
                                            />
                                        )
                                }
                                <h3>{tD.units[currentTab.selectedVariable] === 'DecimalPercentage' 
                                || tD.units[currentTab.selectedVariable] === 'DecimalFraction'
                                || tD.units[currentTab.selectedVariable] === 'Fraction'
                                || tD.units[currentTab.selectedVariable] === undefined
                                    ? ''
                                    : tD.units[currentTab.selectedVariable]
                                }</h3>
                                {
                                    tD.units[currentTab.selectedVariable] !== '' && tD.units[currentTab.selectedVariable] !== undefined
                                    && (currentTab.selectedVariable !== tD.leftSideUtil.omittedVariable
                                    || currentTab.leftSideUtilValue === 'Custom Value')
                                &&(
                                    <button type='button'>add conversion</button>
                                )}
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.errorSuggestion}>
                    {currentTab.leftSideUtilValue.split('|')[0] === ''
                    || currentTab.leftSideUtilValue.split('|')[0] < 1
                    || currentTab.leftSideUtilValue.split('|')[0] > tD.maxTerms
                    || currentTab.leftSideUtilValue.split('|')[1] === ''
                    || currentTab.leftSideUtilValue.split('|')[1] < 1
                    || currentTab.leftSideUtilValue.split('|')[1] > tD.maxTerms
                        ? (<div>
                            <h1>{currentTab.leftSideUtilValue.split('|')[0] > tD.maxTerms || currentTab.leftSideUtilValue.split('|')[1] > currentTab.maxTerms
                                ? `Enter at most ${tD.maxTerms} terms`
                                : 'Enter at least 1 term'
                            }</h1>
                        </div>)
                        : ''    
                    }
                </div>
            </div>
        );
    }
}