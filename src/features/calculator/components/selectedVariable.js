import React from "react";
import styles from '../css/selectedVariable.module.css'
import { useSelector, useDispatch } from "react-redux";
import { selectTabData, selectTabs, changeSelectedVariable, getAnswer } from "../calculatorSlice";
import { nonSerializedFormulaData } from "./calculator";

export function SelectedVariable(props){
    const dispatch = useDispatch();

    const {mode, tabId} = props;
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
    return (
        <div className={styles.selectedVariable}>
            <h2>Solve for:</h2>
            <div>
                {Object.keys(tD.variables).map((variable, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            name='selectedVariableGroup'
                            value={variable}
                            checked={currentTab.selectedVariable === variable}
                            onChange={() => {
                                dispatch(changeSelectedVariable({
                                    id: tabId,
                                    value: variable
                                }));
                            
                                const updatedTab = tabs.find(obj => obj.id === tabId);
                                const updatedVariables = { ...updatedTab.variables }; // Ensure a new copy is used
                            
                                updatedVariables[variable] = ''; // Reset the new selected variable
                            
                                const answer = nonSerializedFormulaData[mode]['math'](variable, updatedVariables);
                            
                                dispatch(getAnswer({
                                    id: tabId,
                                    answer: answer,
                                    selectedVariable: variable // Make sure we update with the new selected variable
                                }));
                            }}
                        />
                        <h3>{variable}</h3>
                    </label>
                ))}
            </div>
        </div>
    )
}