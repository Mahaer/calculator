import React from "react";
import styles from '../css/variableDefinitions.module.css'
import { useSelector } from "react-redux";
import { selectTabData } from "../calculatorSlice";

export function VariableDefinitions({mode, type}){
    const tabData = useSelector(selectTabData)
    const tD = tabData.find(obj => obj.name === mode);

    if(type === 'formula'){
        return (
            <div className={styles.variableDefinitions}>
                <h2>Variable Definitions:</h2>
                <div>
                    {Object.keys(tD.definitions).map((variable, index) => (
                        <label key={index}>
                            <h3>{`${variable} - `}</h3>
                            <h4>{tD.definitions[variable]}</h4>
                        </label>
                    ))}
                </div>
            </div>
        )
    }
}