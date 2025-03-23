import React, { useState } from "react";
import styles from '../css/leftSideUtil.module.css'
import { isUndefined } from 'mathjs';
import { useDispatch } from "react-redux";
import { nonSerializedFormulaData } from "../../../nonSerializedFormulaData";
import { 
    changeLeftSideUtilValue, 
    getAnswer, 
    changeTermNumber, 
    changeSelectedVariable,
    changeLeftSideUtilValueForArray,
    changeArrayVar
} from "../calculatorSlice";


export function LeftSideUtil(props){
    const {
        mode, 
        tabId, 
        type, 
        currentTab, 
        tD,
        tV,
    } = props;
    const dispatch = useDispatch();
    const termArray = type === 'polynomial_expression'
    ?['2', '3', '4', `${tD.maxTerms}`]
    :['2', '3', '4', '5', '10', '15', '20', '25']
    const termDisplay = type === 'polynomial_expression'
    ?['Linear(2)', 'Quadratic(3)', 'Cubic(4)', `Max(${tD.maxTerms})`]
    :['2', '3', '4', '5', '10', '15', '20', '25']
        
    const [customTerm, setCustomTerm] = useState(true); 
    const [customTermTwo, setCustomTermTwo] = useState(true);
    const [intervalId, setIntervalId] = useState()
    const terms = currentTab.leftSideUtilValue

    const handleTermChange = (e, number) => {
        const currentVariables = tV
        setCustomTerm(e.target.dataset.term === 'custom')
        dispatch(changeLeftSideUtilValueForArray({id:tabId, value:number}))
        if(Number(number) >= 2 && Number(number < 26)){
            const alphabetArray = Array.from({ length: Number(number) }, (_, index) => 
                String.fromCharCode(97 + index)
            );
            let newVariables = {}
            newVariables[Object.keys(currentVariables)[0]] = currentVariables[Object.keys(currentVariables)[0]]
            for(let i=0; i < alphabetArray.length; i++){
                newVariables[alphabetArray[i]] = 
                    isUndefined(currentVariables[alphabetArray[i]])
                        ? alphabetArray[i]
                        : currentVariables[alphabetArray[i]]
            }
            let newSelectedVariable = currentTab.selectedVariable
            if(!Object.keys(Object.fromEntries(Object.entries(newVariables).slice(1))).includes(currentTab.selectedVariable) && Object.keys(newVariables)[0] !== currentTab.selectedVariable ) {
                newSelectedVariable =  Object.keys(newVariables).length > 0 ? Object.keys(newVariables)[Object.keys(newVariables).length - 1] : null;
                dispatch(changeArrayVar({id:tabId, value:newSelectedVariable}))
                dispatch(changeSelectedVariable({id:tabId, value: currentTab.arrayVar}))
            }
            dispatch(changeSelectedVariable({id:tabId, value: newSelectedVariable}))
            dispatch(changeTermNumber({updatedVariables: newVariables, termNumber: number}))
            const updatedVariables = {...newVariables}
            const answer = nonSerializedFormulaData[mode]['math'](newSelectedVariable, updatedVariables)
            dispatch(getAnswer({ id: tabId, answer: answer, selectedVariable: newSelectedVariable }))
        } else{
            dispatch(changeTermNumber({updatedVariables: tV, termNumber: number}))
        }  
    }
    const handleTermChangeForPolynomials = (e, number, polynomialNumber) => {
        const currentVariables = tV
        const answerVariable = {[currentTab.selectedVariable]:tV[currentTab.selectedVariable]}
        delete currentVariables[currentTab.selectedVariable]
        if(polynomialNumber === 1){
            setCustomTerm(e.target.dataset.term === 'custom')
            dispatch(changeLeftSideUtilValueForArray({id:tabId, value:`${number}|${terms.split('|')[1]}`}))
            if(Number(number) >= 1 && Number(number) <= tD.maxTerms){
                const currentVariableKeys = Object.keys(currentVariables)
                const dashIndex = currentVariableKeys.indexOf("--");
                const polyVariables = [currentVariableKeys.slice(0, dashIndex), currentVariableKeys.slice(dashIndex + 1)]
                const tVArray1 = {}
                for(let i=0;i<polyVariables[0].length;i++){
                    tVArray1[polyVariables[0][i]] = currentVariables[polyVariables[0][i]]
                }
                const tVArray2 = {}
                for(let i=0;i<polyVariables[1].length;i++){
                    tVArray2[polyVariables[1][i]] = currentVariables[polyVariables[1][i]]
                }
                const alphabet = 'abcdefghijklmnopqrstuvwxyz';
                const newSinglePolyVariables = {};     
                for (let i = 0; i < Number(number); i++) {
                    newSinglePolyVariables[alphabet[i]] = isUndefined(currentVariables[alphabet[i]])
                        ?''
                        :currentVariables[alphabet[i]]
                }
                const newVariables = {
                    ...answerVariable,
                    ...newSinglePolyVariables,
                    '--':'--',
                    ...tVArray2
                }
                dispatch(changeTermNumber({updatedVariables: newVariables, termNumber: `${number}|${terms.split('|')[1]}`}))
                const updatedVariables = {...newVariables}
                const answer = nonSerializedFormulaData[mode]['math'](currentTab.selectedVariable, updatedVariables)
                dispatch(getAnswer({ id: tabId, answer: answer, selectedVariable: currentTab.selectedVariable }))
            }
        } else if(polynomialNumber === 2){
            setCustomTermTwo(e.target.dataset.term === 'custom')
            if(Number(number) >= 1 && Number(number) <= tD.maxTerms){
                const currentVariableKeys = Object.keys(currentVariables)
                const dashIndex = currentVariableKeys.indexOf("--");
                const polyVariables = [currentVariableKeys.slice(0, dashIndex), currentVariableKeys.slice(dashIndex + 1)]
                const tVArray1 = {}
                for(let i=0;i<polyVariables[0].length;i++){
                    tVArray1[polyVariables[0][i]] = currentVariables[polyVariables[0][i]]
                }
                const tVArray2 = {}
                for(let i=0;i<polyVariables[1].length;i++){
                    tVArray2[polyVariables[1][i]] = currentVariables[polyVariables[1][i]]
                }
                const alphabet = 'klmnopqrstuvwxyz';
                const newSinglePolyVariables = {};     
                for (let i = 0; i < Number(number); i++) {
                    newSinglePolyVariables[alphabet[i]] = isUndefined(currentVariables[alphabet[i]])
                        ?''
                        :currentVariables[alphabet[i]]
                }
                const newVariables = {
                    ...answerVariable,
                    ...tVArray1,
                    '--':'--',
                    ...newSinglePolyVariables
                }
                dispatch(changeTermNumber({updatedVariables: newVariables, termNumber: `${terms.split('|')[0]}|${number}`}))
                const updatedVariables = {...newVariables}
                const answer = nonSerializedFormulaData[mode]['math'](currentTab.selectedVariable, updatedVariables)
                dispatch(getAnswer({ id: tabId, answer: answer, selectedVariable: currentTab.selectedVariable }))
            }
        }
    }
    const handleChangeForPolynomials = (e, polynomialNumber, {add=false, subtract=false}={}) => {
        if(polynomialNumber === 1){
            const value = document.getElementById('customInputOne').value
            if(value === '' || (/^(10|[1-9])$/.test(value))){
                if(!add && !subtract){
                    dispatch(changeLeftSideUtilValueForArray({id:tabId, value:`${value}|${terms.split('|')[1]}`}))
                    handleTermChangeForPolynomials(e, value, 1)
                } else if(add && value < tD.maxTerms) {
                    const newValue = String(Number(value) + 1)
                    dispatch(changeLeftSideUtilValueForArray({id:tabId, value:`${newValue}|${terms.split('|')[1]}`}))
                    handleTermChangeForPolynomials(e, newValue, 1)
                } else if (subtract && String(value) !== '1' && String(value) !== '0' && value !== '') {
                    const newValue = String(Number(value) - 1)
                    dispatch(changeLeftSideUtilValueForArray({id:tabId, value:`${newValue}|${terms.split('|')[1]}`}))
                    handleTermChangeForPolynomials(e, newValue, 1)
                }
            }
        } else if(polynomialNumber === 2){
            const value = document.getElementById('customInputTwo').value
            if(value === '' || (/^(10|[1-9])$/.test(value))){
                if(!add && !subtract){
                    dispatch(changeLeftSideUtilValueForArray({id:tabId, value:`${terms.split('|')[0]}|${value}`}))
                    handleTermChangeForPolynomials(e, value, 2)
                } else if(add && value < tD.maxTerms) {
                    const newValue = String(Number(value) + 1)
                    dispatch(changeLeftSideUtilValueForArray({id:tabId, value:`${terms.split('|')[0]}|${newValue}`}))
                    handleTermChangeForPolynomials(e, newValue, 2)
                } else if (subtract && String(value) !== '1' && String(value) !== '0' && value !== '') {
                    const newValue = String(Number(value) - 1)
                    dispatch(changeLeftSideUtilValueForArray({id:tabId, value:`${terms.split('|')[0]}|${newValue}`}))
                    handleTermChangeForPolynomials(e, newValue, 2)
                }
            }
        }
    }
    const handleMouseDownForPolynomials = (e, actionType, polynomialNumber) => {
        handleChangeForPolynomials(e, polynomialNumber, actionType)
        const startTime = Date.now()

        setIntervalId(setInterval(() => {
            if(Date.now() - startTime > 350){
                handleChangeForPolynomials(e, polynomialNumber, actionType)
            }
        }, 60))
    }
    const handleChange = (e, {add=false, subtract=false} = {}) => {
        const value = document.getElementById('customInput').value
        if (value === '' || (/^\d{1,2}$/.test(value))) {
            if(!add && !subtract){
                dispatch(changeLeftSideUtilValueForArray({id:tabId, value:value}))
                handleTermChange(e, value);
            } else if(add && value < 25) {
                dispatch(changeLeftSideUtilValueForArray({id:tabId, value:String(Number(value) + 1)}))
                handleTermChange(e, String(Number(value) + 1))
            } else if (subtract && String(value) !== '2' && String(value) !== '1' && String(value) !== '0' && value !== '') {
                dispatch(changeLeftSideUtilValueForArray({id:tabId, value:String(Number(value) - 1)}))
                handleTermChange(e, String(Number(value) - 1))
            }
        }
    };
    const handleBlur = (e) => {
        let value = e.target.value;
        if (/^0\d+$/.test(value)) {
            e.target.value = parseInt(value, 10);
        }
        e.target.style.color = 'darkgreen';
    }
    const handleMouseDown = (e, actionType) => {
        handleChange(e, actionType);
        const startTime = Date.now()

        setIntervalId(setInterval(() => {
            if(Date.now() - startTime > 350){
                handleChange(e, actionType)
            }
        }, 60))
    };
    const handleMouseUpAndLeave = () => {
        clearInterval(intervalId)
    }


    if ((type === 'formula' || type === 'formula_expresssion') && Object.keys(tD.leftSideUtil).length !== 0){
        return (<div className={`${styles.leftSideUtil} ${currentTab.selectedVariable === tD.leftSideUtil.omittedVariable? styles.fade : ''}`}>
            <h2>{`${tD.leftSideUtil.title} (${tD.leftSideUtil.omittedVariable}):`}</h2>
            <div>
                    {Object.keys(tD.leftSideUtil.values).map((value, index) => (
                        <label key={index}>
                            <input
                                type="radio"
                                name="leftSideUtilGroup"
                                value={value}
                                checked={currentTab.leftSideUtilValue === value}
                                onChange={() => {
                                    dispatch(changeLeftSideUtilValue({id:tabId, value:value, tD:tD}));
                                    const updatedVariables = {...tV, [tD.leftSideUtil.omittedVariable]:String(tD.leftSideUtil.values[value])}
                                    const answer = nonSerializedFormulaData[mode]['math'](currentTab.selectedVariable, updatedVariables)
                                    dispatch(getAnswer({ id: tabId, answer: answer, selectedVariable: currentTab.selectedVariable }))
                                }}
                            />
                            <h4>{value}</h4>
                        </label>
                    ))}
                    <label key='custom'>
                        <input
                            type="radio"
                            name="leftSideUtilGroup"
                            value='Custom Value'
                            checked={currentTab.leftSideUtilValue === 'Custom Value'}
                            onChange={() => dispatch(changeLeftSideUtilValue({id:tabId, value:'Custom Value', tD:tD}))}
                        />
                        <h4>Custom Value</h4>
                    </label>
            </div>
        </div>)
    } else if (type === 'array' || type === 'array_expression'){
        return (<div className={styles.leftSideUtil}>
            <h2>Number of Terms:</h2>
            <div>
                {termArray.map((number, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            name="leftSideUtilGroup"
                            data-term = 'notcustom'
                            value={number}
                            checked={!customTerm? currentTab.leftSideUtilValue === number: false}
                            onChange={(e) => handleTermChange(e, number)}
                        />
                        <h4>{termDisplay[index]}</h4>
                    </label>
                ))}
                <span className={styles.adjustValue}>
                    <label key='custom'>
                        <input
                            type="radio"
                            name="leftSideUtilGroup"
                            data-term = 'custom'
                            value={terms}
                            checked={customTerm}
                            onChange={(e) => handleTermChange(e, terms)}
                            onClick={(e) => handleTermChange(e, terms)}
                        />
                        <h4>Custom:</h4>
                    </label>
                    <input
                        id="customInput"
                        type="text"
                        inputMode="numeric"
                        value={terms}
                        data-term = 'custom'
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onChange={(e) => handleChange(e)}
                        onFocus={(e) => e.target.style.color = 'black'}
                        onBlur={(e) => handleBlur(e)}
                        placeholder="Enter"
                        aria-label="Enter the custom value here"
                        className={customTerm? '': styles.fade}
                    />
                    <button 
                        key='subtract'
                        type="button"
                        data-term='custom'
                        className={customTerm? '': styles.fade}
                        onMouseDown={(e) => handleMouseDown(e, {subtract: true})}
                        onMouseOut={(e) => handleMouseUpAndLeave()}
                        onMouseUp={(e) => handleMouseUpAndLeave()}
                        onMouseLeave={(e) => handleMouseUpAndLeave()}
                    >&minus;</button>            
                    <button 
                        key='add'
                        type="button"
                        data-term = 'custom'
                        className={customTerm? '': styles.fade}
                        onMouseDown={(e) => handleMouseDown(e, {add: true})}
                        onMouseOut={(e) => handleMouseUpAndLeave()}
                        onMouseUp={(e) => handleMouseUpAndLeave()}
                        onMouseLeave={(e) => handleMouseUpAndLeave()}
                    >+</button>
                </span>
            </div>
        </div>)
    } else if (type === 'polynomial_expression'){
        return (
            <div>
                <div className={`${styles.leftSideUtil} 
                    ${currentTab.leftSideUtilValue.split('|')[1] === ''
                        || currentTab.leftSideUtilValue.split('|')[1] < 1
                        || currentTab.leftSideUtilValue.split('|')[1] > tD.maxTerms
                        ? `${styles.extraFade}`
                        : ''
                    }`}
                >
                    <h2>Terms in 1st Polynomial:</h2>
                    <div>
                        {termArray.map((number, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="leftSideUtilGroup"
                                    data-term = 'notcustom'
                                    value={number}
                                    checked={!customTerm? currentTab.leftSideUtilValue.split('|')[0] === number: false}
                                    onChange={(e) => handleTermChangeForPolynomials(e, number, 1)}
                                />
                                <h4>{termDisplay[index]}</h4>
                            </label>
                        ))}
                        <span className={`${styles.adjustValue} ${styles.polynomialButtons}`}>
                            <label key='custom'>
                                <input
                                    type="radio"
                                    name="leftSideUtilGroup"
                                    data-term = 'custom'
                                    value={terms.split('|')[0]} 
                                    checked={customTerm}
                                    onChange={(e) => handleTermChangeForPolynomials(e, terms.split('|')[0], 1)}
                                    onClick={(e) => handleTermChangeForPolynomials(e, terms.split('|')[0], 1)}
                                />
                                <h4>Custom:</h4>
                            </label>
                            <input
                                id="customInputOne"
                                type="text"
                                inputMode="numeric"
                                value={terms.split('|')[0]}
                                data-term = 'custom'
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck="false"
                                onChange={(e) => handleChangeForPolynomials(e, 1)}
                                onFocus={(e) => e.target.style.color = 'black'}
                                onBlur={(e) => handleBlur(e)}
                                placeholder="Enter"
                                aria-label="Enter the custom value here"
                                className={customTerm? '': styles.fade}
                            />
                            <button 
                                key='subtract'
                                type="button"
                                data-term='custom'
                                className={customTerm? '': styles.fade}
                                onMouseDown={(e) => handleMouseDownForPolynomials(e, {subtract: true}, 1)}
                                onMouseOut={(e) => handleMouseUpAndLeave()}
                                onMouseUp={(e) => handleMouseUpAndLeave()}
                                onMouseLeave={(e) => handleMouseUpAndLeave()}
                            >&minus;</button>            
                            <button 
                                key='add'
                                type="button"
                                data-term = 'custom'
                                className={customTerm? '': styles.fade}
                                onMouseDown={(e) => handleMouseDownForPolynomials(e, {add: true}, 1)}
                                onMouseOut={(e) => handleMouseUpAndLeave()}
                                onMouseUp={(e) => handleMouseUpAndLeave()}
                                onMouseLeave={(e) => handleMouseUpAndLeave()}
                            >+</button>
                        </span>
                    </div>
                </div>
                <div className={`${styles.leftSideUtil} 
                    ${currentTab.leftSideUtilValue.split('|')[0] === ''
                        || currentTab.leftSideUtilValue.split('|')[0] < 1
                        || currentTab.leftSideUtilValue.split('|')[0] > tD.maxTerms
                        ? `${styles.extraFade}`
                        : ''
                    }`}
                >
                    <h2>Terms in 2nd Polynomial:</h2>
                    <div>
                        {termArray.map((number, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="leftSideUtilGroup2"
                                    data-term = 'notcustom'
                                    value={number}
                                    checked={!customTermTwo? currentTab.leftSideUtilValue.split('|')[1] === number: false}
                                    onChange={(e) => handleTermChangeForPolynomials(e, number, 2)}
                                />
                                <h4>{termDisplay[index]}</h4>
                            </label>
                        ))}
                        <span className={`${styles.adjustValue} ${styles.polynomialButtons}`}>
                            <label key='custom'>
                                <input
                                    type="radio"
                                    name="leftSideUtilGroup2"
                                    data-term = 'custom'
                                    value={terms.split('|')[1]}
                                    checked={customTermTwo}
                                    onChange={(e) => handleTermChangeForPolynomials(e, terms.split('|')[1], 2)}
                                    onClick={(e) => handleTermChangeForPolynomials(e, terms.split('|')[1], 2)}
                                />
                                <h4>Custom:</h4>
                            </label>
                            <input
                                id="customInputTwo"
                                type="text"
                                inputMode="numeric"
                                value={terms.split('|')[1]}
                                data-term = 'custom'
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck="false"
                                onChange={(e) => handleChangeForPolynomials(e, 2)}
                                onFocus={(e) => e.target.style.color = 'black'}
                                onBlur={(e) => handleBlur(e)}
                                placeholder="Enter"
                                aria-label="Enter the custom value here"
                                className={customTermTwo? '': styles.fade}
                            />
                            <button 
                                key='subtract'
                                type="button"
                                data-term='custom'
                                className={customTermTwo? '': styles.fade}
                                onMouseDown={(e) => handleMouseDownForPolynomials(e, {subtract: true}, 2)}
                                onMouseOut={(e) => handleMouseUpAndLeave()}
                                onMouseUp={(e) => handleMouseUpAndLeave()}
                                onMouseLeave={(e) => handleMouseUpAndLeave()}
                            >&minus;</button>            
                            <button 
                                key='add'
                                type="button"
                                data-term = 'custom'
                                className={customTermTwo? '': styles.fade}
                                onMouseDown={(e) => handleMouseDownForPolynomials(e, {add: true}, 2)}
                                onMouseOut={(e) => handleMouseUpAndLeave()}
                                onMouseUp={(e) => handleMouseUpAndLeave()}
                                onMouseLeave={(e) => handleMouseUpAndLeave()}
                            >+</button>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}