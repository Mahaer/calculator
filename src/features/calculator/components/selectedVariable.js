import React, { useState } from "react";
import styles from '../css/selectedVariable.module.css'
import { useDispatch } from "react-redux";
import { changeArrayVar, changeSelectedVariable, getAnswer, updateInputs } from "../calculatorSlice";
import { nonSerializedFormulaData } from "../../../nonSerializedFormulaData";
import { isUndefined } from "mathjs";

export function SelectedVariable(props){
    const dispatch = useDispatch();

    const {
        mode, 
        tabId, 
        type, 
        currentTab, 
        tD,
        tVArray,
        tabs,
    } = props;

    const [dropdownArrowDown, setDropdownArrowDown] = useState(false);
    const [hideDropdown, setHideDropdown] = useState(false);
    const numColumns = 5

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

        if(type === 'array' && variable !== Object.keys(tVArray)[1]){
            dispatch(changeArrayVar({id:tabId, value:variable}))
        }
    }
    const handleDropdownMouseEnter = (e) => {
        const divParent = e.target.parentNode.tagName === 'DIV' ? e.target.parentNode: e.target.parentNode.parentNode
        const lowerHr = divParent?.children[1]?.children[0] ?? undefined
        if(!isUndefined(lowerHr)){lowerHr.classList.add(styles.wideHr)}
        const highHrId = Number(e.target.parentNode.id) - 1
        const highHr = divParent.parentNode.children[highHrId]?.children[1]?.children[0] ?? undefined
        if(!isUndefined(highHr)){highHr.classList.add(styles.wideHr)}
    }
    const handleDropdownMouseLeave = (e) => {
        const divParent = e.target.parentNode.tagName === 'DIV' ? e.target.parentNode: e.target.parentNode.parentNode
        const lowerHr = divParent?.children[1]?.children[0] ?? undefined
        if(!isUndefined(lowerHr)){lowerHr.classList.remove(styles.wideHr)}
        const highHrId = Number(e.target.parentNode.id) - 1
        const highHr = divParent.parentNode.children[highHrId]?.children[1]?.children[0] ?? undefined
        if(!isUndefined(highHr)){highHr.classList.remove(styles.wideHr)}
    }
    const handleDropdownClick = () => {
        setHideDropdown(true)
        setTimeout(()=>{
            setHideDropdown(false)
        }, 1)
    }
    if(type === 'formula'){
        return (
            <div className={styles.selectedVariable}>
                <h2>Solve for:</h2>
                <div>
                    {(tD.variables).map((variable, index) => (
                        ((!isUndefined(tD.omittedSolveFor)? !(tD.omittedSolveFor).includes(variable): true)?<label 
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
                        </label>:'')
                    ))}
                </div>
            </div>
        )
    } else if(type === 'array'){
        return (
            <div className={`${styles.selectedVariable} ${Number(currentTab.leftSideUtilValue) >= 2 && Number(currentTab.leftSideUtilValue < 26)? '': styles.fade}`}>
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
                        :(isUndefined(tD.topBar)
                            ?<h3>{Object.keys(tVArray)[1]}</h3>
                            :(<span style={{display:'inline-flex', flexDirection: 'column', alignItems: 'center'}}>
                                <h3 style={{height:'5px', fontWeight:'bold'}}>&#772;
                                    <span style={{color: 'transparent'}}>-</span>
                                </h3>
                                <h3 style={{fontSize:'32px'}}>{Object.keys(tVArray)[1]}</h3>
                               </span>)
                        )
                    }
                </label>
                <span className={styles.flex}>
                    <label key={`array`}>
                        <input
                            type="radio"
                            name='selectedVariableGroup'
                            value={currentTab.arrayVar}
                            checked={currentTab.selectedVariable === currentTab.arrayVar}
                            onChange={() => handleVariableChange(Object.keys(tVArray.array).includes(currentTab.arrayVar)? currentTab.arrayVar: Object.keys(tVArray.array)[Object.keys(tVArray.array).length - 1])}
                        />
                    </label>
                    <div 
                            className={`${styles.selectionDropdown} ${currentTab.selectedVariable === Object.keys(tVArray)[1]? styles.fade: ''} `}
                            onMouseEnter={(e) => setDropdownArrowDown(true)}
                            onMouseLeave={(e) => setDropdownArrowDown(false)}
                        >
                            <h3>
                                {Object.keys(tVArray.array).includes(currentTab.arrayVar)? currentTab.arrayVar: Object.keys(tVArray.array)[Object.keys(tVArray.array).length - 1]}
                                {
                                    dropdownArrowDown
                                    ?<span className={styles.dropdownArrow}>&#9660;</span>
                                    :<span className={styles.dropdownArrow}>&#9658;</span>
                                }
                            </h3>
                            {!hideDropdown && 
                                <div 
                                    onClick={(e) => handleDropdownClick()}
                                    style={{gridTemplateRows:`repeat(${Object.keys(tVArray.array).length < numColumns? Object.keys(tVArray.array).length: numColumns}, 1fr)`}}
                                >
                                    {Object.keys(tVArray.array).map((variable, index, array) => (
                                        <div 
                                            id={index}
                                            key={index} 
                                            data-name={variable}
                                            onMouseEnter={(e) => handleDropdownMouseEnter(e)}
                                            onMouseLeave={(e) => handleDropdownMouseLeave(e)}
                                            onClick={(e) => {dispatch(changeArrayVar({id:tabId, value:e.target.dataset.name}));handleVariableChange(variable)}}
                                            className={
                                                index > (Math.floor(Object.keys(tVArray.array).length / numColumns))  * numColumns - 1 
                                                ||
                                                (Object.keys(tVArray.array).length % numColumns === 0 
                                                &&
                                                index >= Object.keys(tVArray.array).length - numColumns)
                                                    ? styles.noBorderRight
                                                    :''
                                            }
                                        >
                                            <h3 data-name={variable}>{variable}</h3>
                                            {
                                                (index % numColumns !==  numColumns - 1 )
                                                    ? (array.length < numColumns + 1 && index === array.length -1 
                                                        ? ''
                                                        : <span data-name={variable}><hr></hr></span>)
                                                    : null
                                            }
                                        </div>
                                ))} 
                                </div>
                            }
                    </div>    
                </span>           
            </div>
        )
    } 
}