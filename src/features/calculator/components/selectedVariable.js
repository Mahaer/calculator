import React from "react";
import styles from '../css/selectedVariable.module.css'
import { useSelector, useDispatch } from "react-redux";
import { selectTabData, selectTabs, changeSelectedVariable, getAnswer, updateInputs } from "../calculatorSlice";
import { nonSerializedFormulaData } from "../../../nonSerializedFormulaData";

export function SelectedVariable(props){
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
        if(key === currentTab.selectedVariable){
            tV[key] = key
        }
    }

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
    }
}