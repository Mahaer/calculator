import React from "react";
import styles from '../css/variableDefinitions.module.css'

export function VariableDefinitions({type, tVArray, tD}){
    if(type === 'formula' || (type === 'formula_expression' && tD.includeDefinitions)){
        return (
            <div className={styles.variableDefinitions}>
                <h2>Variable Definitions:</h2>
                <div>
                    {Object.keys(tD.definitions).map((variable, index) => (
                        <label key={index}>
                            {variable.includes('_')
                                ?<h3>{variable.split('_')[0]}<sub><h3>{variable.split('_')[1]}</h3></sub></h3>
                                :<h3>{variable}</h3>
                            }
                            <h3>&nbsp;-&nbsp;</h3>
                            <h4>{tD.definitions[variable]}</h4>
                        </label>
                    ))}
                </div>
            </div>
        )
    } else if(type === 'array'){
        return (
            <div className={styles.variableDefinitions}>
                <h2>Variable Definitions:</h2>
                <div>
                    <label key='mainVar'>
                        {Object.keys(tVArray)[1].includes('_')
                            ?<h3>{Object.keys(tVArray)[1].split('_')[0]}<sub><h3>{Object.keys(tVArray)[1].split('_')[1]}</h3></sub></h3>
                            :(
                                tD.topBar
                                    ?<span style={{display:'inline-flex', flexDirection: 'column', alignItems: 'center'}}
                                       >
                                        <h3 style={{height:'8px'}}>&#772;
                                            <span style={{color: 'transparent'}}>-</span>
                                        </h3>
                                        <h3 style={{fontSize:'32px'}}>{Object.keys(tVArray)[1]}</h3>
                                       </span>
                                    :<h3>{Object.keys(tVArray)[1]}</h3>
                                )
                        }
                        <h3>&nbsp;-&nbsp;</h3>
                        <h4>{tD.definitions[0]}</h4>
                    </label>
                    <label key='variables'>
                        <h3>a<span className={styles.mdash}>&minus;</span>{Object.keys(tVArray.array)[Object.keys(tVArray.array).length - 1]}</h3>
                        <h3>&nbsp;-&nbsp;</h3>
                        <h4>{tD.definitions[1]}</h4>
                    </label>
                </div>
            </div>
        )
    } 
}