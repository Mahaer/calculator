import React from "react";
import styles from '../css/leftSideUtil.module.css'
import { useSelector, useDispatch } from "react-redux";
import { nonSerializedFormulaData } from "./calculator";
import { selectTabData, selectTabs, changeLeftSideUtilValue, getAnswer } from "../calculatorSlice";

export function LeftSideUtil({mode, tabId, type}){
    const dispatch = useDispatch();

    const tabData = useSelector(selectTabData)
    const tD = tabData.find(obj => obj.name === mode);
    const tabs = useSelector(selectTabs)
     
    const currentTab = tabs.find(obj => obj.id === tabId)
    const tabVariables = currentTab?.variables || {}
    const tVKeys = Object.keys(tabVariables);
    let tV = {};
    for (let i = 0; i < tVKeys.length; i++) {tV[tVKeys[i]] = tVKeys[i] === tabVariables[tVKeys[i]] ? '' : tabVariables[tVKeys[i]];}
    for (let key in tV) {if(key === currentTab.selectedVariable){tV[key] = key}}


    if (type === 'formula' && Object.keys(tD.leftSideUtil).length !== 0){
        return <div className={`${styles.leftSideUtil} ${currentTab.selectedVariable === tD.leftSideUtil.omittedVariable? styles.fade : ''}`}>
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
        </div>
    }
}