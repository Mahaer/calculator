import React, { useState } from "react";
import styles from '../css/selectedVariable.module.css'
import { useSelector, useDispatch } from "react-redux";
import { selectTabData, selectTabs, changeSelectedVariable, getAnswer, updateInputs } from "../calculatorSlice";
import { nonSerializedFormulaData } from "../../../nonSerializedFormulaData";
import { isUndefined } from "mathjs";

export function SelectedVariable(props){
    const dispatch = useDispatch();

    const {mode, tabId, type} = props;
    const tabData = useSelector(selectTabData)
    const tD = tabData.find(obj => obj.name === mode);
    const tabs = useSelector(selectTabs)
     
    const currentTab = tabs.find(obj => obj.id === tabId)
    const tabVariables = currentTab?.variables || {}
    const tVKeys = Object.keys(tabVariables);
    let tV = {}
    let tVArray = {array:{}}
    let numericVariables = {};
    for (let i = 0; i < tVKeys.length; i++) {tV[tVKeys[i]] = tVKeys[i] === tabVariables[tVKeys[i]] ? '' : tabVariables[tVKeys[i]];}
    for (let key in tV) {numericVariables[key] = tV[key] === '' ? '' : Number(tV[key]);}
    
    for (let key in tV) {
        if(key === currentTab.selectedVariable || tV[key].includes('Error') || tV[key].includes('Impossible') || tV[key] === Infinity || tV[key] === -Infinity){
            tV[key] = ''
        }
    }
    if(type === 'array'){
        tVArray[Object.keys(tV)[0]]= tV[Object.keys(tV)[0]]
        for(let i = 0; i < Object.keys(tV).filter(val => val !== Object.keys(tV)[0]).length; i++){
            tVArray.array[Object.keys(tV).filter(val => val !== Object.keys(tV)[0])[i]] = tV[Object.keys(tV).filter(val => val !== Object.keys(tV)[0])[i]]
        }
        for (let key in tVArray.array) {
            if(key === currentTab.selectedVariable || tVArray.array[key].includes('Error') || tVArray.array[key].includes('Impossible') || tVArray.array[key] === Infinity || tVArray.array[key] === -Infinity){
                tVArray.array[key] = ''
            }
        }
    }
    const [arrayVar, setArrayVar] = useState(Object.keys(tVArray.array)[0])

    const handleVariableChange = (variable) => {
        const oldVariable = currentTab.selectedVariable
        let updatedVariables = {}
        dispatch(changeSelectedVariable({
            id: tabId,
            value: variable
        }));
    
        let updatedTab = tabs.find(obj => obj.id === tabId).variables;
        if(updatedTab[oldVariable].includes(',')){
            let newVar;
            if(updatedTab[oldVariable].includes('i')){
                newVar = ''
            } else {
                let values = updatedTab[oldVariable].split(',')
                newVar = String(Math.max(...values.map(str => Number(str))))
            }
            
            dispatch(updateInputs({id:tabId, variable: oldVariable, value: newVar}))
            updatedVariables = { ...updatedTab, [oldVariable]: newVar };
        } else{
            updatedVariables = { ...updatedTab };
        }
    
        updatedVariables[variable] = ''; 
        const answer = nonSerializedFormulaData[mode]['math'](variable, updatedVariables);
        dispatch(getAnswer({
            id: tabId,
            answer: answer,
            selectedVariable: variable
        }));
    }
    const handleDropdownMouseEnter = (e) => {
        if(e.target.tagName === 'H3'){
            if(!isUndefined(e.target.parentNode.children[1])){
                e.target.parentNode.children[1].children[0].style.width = '100%'
                e.target.parentNode.children[1].children[0].style.opacity = '1'
                e.target.parentNode.children[1].children[0].style.transition = '0.1s'
            }
            if(!isUndefined(e.target.parentNode.parentNode.children[Number(e.target.parentNode.id)-1])){
                e.target.parentNode.parentNode.children[Number(e.target.parentNode.id)-1].children[1].children[0].style.width = '100%'
                e.target.parentNode.parentNode.children[Number(e.target.parentNode.id)-1].children[1].children[0].style.opacity = '1'
                e.target.parentNode.parentNode.children[Number(e.target.parentNode.id)-1].children[1].children[0].style.transition = '0.1s'
            }
        } else {
            e.target.style.width = '100%'
            e.target.style.opacity = '1'
            e.target.style.transition = '0.1s'
            if(Number(e.target.parentNode.parentNode.id)-1 !== -1){
                e.target.parentNode.parentNode.parentNode.children[Number(e.target.parentNode.parentNode.id)-1].children[1].children[0].style.width = '100%'
                e.target.parentNode.parentNode.parentNode.children[Number(e.target.parentNode.parentNode.id)-1].children[1].children[0].style.opacity = '1'
                e.target.parentNode.parentNode.parentNode.children[Number(e.target.parentNode.parentNode.id)-1].children[1].children[0].style.transition = '0.1s'
            }
        }
    }
    const handleDropdownMouseLeave = (e) => {
        if(e.target.tagName === 'H3'){
            if(!isUndefined(e.target.parentNode.children[1])){
                e.target.parentNode.children[1].children[0].style.width = '90%'
                e.target.parentNode.children[1].children[0].style.opacity = '0.4'
                e.target.parentNode.children[1].children[0].style.transition = '0s'
            }
            if(!isUndefined(e.target.parentNode.parentNode.children[Number(e.target.parentNode.id)-1])){
                e.target.parentNode.parentNode.children[Number(e.target.parentNode.id)-1].children[1].children[0].style.width = '90%'
                e.target.parentNode.parentNode.children[Number(e.target.parentNode.id)-1].children[1].children[0].style.opacity = '0.4'
                e.target.parentNode.parentNode.children[Number(e.target.parentNode.id)-1].children[1].children[0].style.transition = '0s'
            }
        } else {
            e.target.style.width = '90%'
            e.target.style.opacity = '0.4'
            e.target.style.transition = '0s'
            if(Number(e.target.parentNode.parentNode.id)-1 !== -1){
                e.target.parentNode.parentNode.parentNode.children[Number(e.target.parentNode.parentNode.id)-1].children[1].children[0].style.width = '90%'
                e.target.parentNode.parentNode.parentNode.children[Number(e.target.parentNode.parentNode.id)-1].children[1].children[0].style.opacity = '0.4'
                e.target.parentNode.parentNode.parentNode.children[Number(e.target.parentNode.parentNode.id)-1].children[1].children[0].style.transition = '0s'
            }
        }
    }

    if(type === 'formula'){
        return (
            <div className={styles.selectedVariable}>
                <h2>Solve for:</h2>
                <div>
                    {(tD.variables).map((variable, index) => (
                        <label 
                            key={index} 
                            className={variable === tD.leftSideUtil.omittedVariable? (currentTab.leftSideUtilValue === 'Custom Value'? '' : styles.leftSideUtilVar): ''}
                        >
                            <input
                                type="radio"
                                name='selectedVariableGroup'
                                value={variable}
                                checked={currentTab.selectedVariable === variable}
                                onChange={() => handleVariableChange(variable)}
                            />
                            {variable.includes('_')
                                ?<h3>{variable.split('_')[0]}<sub><h3>{variable.split('_')[1]}</h3></sub></h3>
                                :<h3>{variable}</h3>
                            }
                        </label>
                    ))}
                </div>
            </div>
        )
    } else if(type === 'array'){
        return (
            <div className={styles.selectedVariable}>
                <h2>Solve For:</h2>
                <label key={`${Object.keys(tVArray)[1]}`} >
                    <input
                        type="radio"
                        name='selectedVariableGroup'
                        value={Object.keys(tVArray)[1]}
                        checked={currentTab.selectedVariable === Object.keys(tVArray)[1]}
                        onChange={() => handleVariableChange(Object.keys(tVArray)[1])}
                    />
                    {Object.keys(tVArray)[1].includes('_')
                        ?<h3>{Object.keys(tVArray)[1].split('_')[0]}<sub><h3>{Object.keys(tVArray)[1].split('_')[1]}</h3></sub></h3>
                        :<h3>{Object.keys(tVArray)[1]}</h3>
                    }
                </label>
                <label key={`array`} >
                    <input
                        type="radio"
                        name='selectedVariableGroup'
                        value={'a'}
                        checked={currentTab.selectedVariable === 'a'}
                        onChange={() => handleVariableChange('a')}
                    />
                    <div className={styles.selectionDropdown}>
                        <h3>{arrayVar}<span className={styles.dropdownArrow}>v</span></h3>
                        <div>
                            {Object.keys(tVArray.array).map((variable, index, array) => (
                                <div 
                                    id={index}
                                    key={index} 
                                    onMouseEnter={(e) => handleDropdownMouseEnter(e)}
                                    onMouseLeave={(e) => handleDropdownMouseLeave(e)}
                                >
                                    <h3>{variable}</h3>
                                    {index < array.length - 1 && <span><hr></hr></span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </label>                  
            </div>
        )
    }
}