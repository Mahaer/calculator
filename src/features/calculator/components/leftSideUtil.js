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
    const termArray = ['2', '3', '4', '5', '10', '15', '20', '25']
    const [customTerm, setCustomTerm] = useState(true);
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
                        <h4>{number}</h4>
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
                        placeholder="Enter:"
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
    }
}