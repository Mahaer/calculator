import React from "react";
import { nonSerializedFormulaData } from "../../../../nonSerializedFormulaData";
import { isUndefined } from "mathjs";

export function Variable(props){

    const {
        index,
        styles,
        getRoundedValue,
        handleInputChange,
        handleKeyDown,
        handleBlur,
        currentTab,
        tD,
        variable,
        tV,
        tabVariables,
        minWidth,
        placeholder,
        tVArray,
        errorMsg,
        scrunch
    } = props
    if (
        tD.type === 'formula' 
        || tD.type === 'formula_expression' 
        || tD.type === 'formula_fraction_expression'
    ){
        return (
            <div 
                className={
                    `${styles.variable} 
                    ${currentTab.selectedVariable === variable ? styles.fade : (variable === tD.leftSideUtil.omittedVariable && currentTab.leftSideUtilValue !== 'Custom Value'? styles.fade:'')}
                    ${!isUndefined(tD.fadedVariables)?
                        Object.keys(tD.fadedVariables).includes(variable) && 
                        !tD.fadedVariables[variable].includes(currentTab.selectedVariable)
                            ? styles.fade
                            : ''
                        :''
                    }`
                } 
                key={index}
            >
                {variable.includes('_')
                    ?<h3 style={{color: variable === currentTab.selectedVariable? 'darkred': 'black'}}>{variable.split('_')[0]}<sub><h3 style={{color: variable === currentTab.selectedVariable? 'darkred': 'black'}}>{variable.split('_')[1]}</h3></sub></h3>
                    :<h3 style={{color: variable === currentTab.selectedVariable? 'darkred': 'black'}}>{variable}</h3>
                }
                <h3>&nbsp;=</h3>
                {tabVariables[variable].includes(',') && variable === currentTab.selectedVariable
                    ? tabVariables[variable].split(',').map((value, index, array) => (
                        <React.Fragment key={index}>
                            <input 
                                style={{
                                    minWidth:`${minWidth}ch`,
                                    width: `${Math.max(Number(minWidth), 
                                        (variable === currentTab.selectedVariable
                                            ? String(getRoundedValue(value), variable) 
                                            : String(getRoundedValue(tV[variable], variable))
                                        )?.length || 0) + 1}ch`,
                                    color: `${variable === currentTab.selectedVariable? 'darkred' : (variable === tD.leftSideUtil.omittedVariable && currentTab.leftSideUtilValue !== 'Custom Value'? 'darkgreen': 'black')}`
                                }}
                                type='text' 
                                inputMode='numeric' 
                                value={getRoundedValue(value.trim(), variable)}
                                autoComplete='off'
                                autoCorrect='off'
                                spellCheck='false'
                                onChange={(e) => handleInputChange(e, variable)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                name={variable}
                                onBlur={(e) => handleBlur(e, variable)}
                                placeholder=''
                                aria-label={`enter the ${variable} value here`}
                            />
                            {index < array.length - 1 && <p key={`comma_${index}`} className={styles.comma}>, </p>}
                        </React.Fragment>
                    ))
                    : (<input 
                        style={{
                            minWidth:`${minWidth}ch`,
                            width: `${Math.max(Number(minWidth), 
                                (variable === currentTab.selectedVariable
                                    ? String(getRoundedValue(currentTab.answer, variable)) 
                                    : String(getRoundedValue(tV[variable], variable))
                                )?.length || 0) + 1}ch`,
                            color: `${variable === currentTab.selectedVariable? 'darkred' : (variable === tD.leftSideUtil.omittedVariable && currentTab.leftSideUtilValue !== 'Custom Value'? 'darkgreen': 'black')}`
                        }}
                        type='text' 
                        inputMode='numeric' 
                        value={variable === currentTab.selectedVariable
                            ? getRoundedValue(currentTab.answer, variable)
                            : getRoundedValue(tV[variable], variable)
                        }
                        autoComplete='off'
                        autoCorrect='off'
                        spellCheck='false'
                        onChange={(e) => handleInputChange(e, variable)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        name={variable}
                        onBlur={(e) => handleBlur(e, variable)}
                        placeholder={placeholder}
                        aria-label={`enter the ${variable} value here`}
                    />)
                }
                <h3>{tD.units[currentTab.variables[variable]] === 'DecimalPercentage' 
                || tD.units[currentTab.variables[variable]] === 'DecimalFraction'
                || tD.units[currentTab.variables[variable]] === 'Fraction'
                || tD.units[currentTab.variables[variable]] === undefined
                    ? ''
                    : tD.units[currentTab.variables[variable]]
                }</h3>
                {
                    currentTab.selectedVariable !== variable 
                    && tD.units[variable] !== '' && tD.units[variable] !== undefined
                    && (variable !== tD.leftSideUtil.omittedVariable
                    || currentTab.leftSideUtilValue === 'Custom Value')
                &&(
                    <button type='button'>add conversion</button>
                )}
            </div>
        )
    } else if (tD.type === 'array' || tD.type === 'array_expression'){
        return (
            <div 
                className={
                    `${styles.variable} 
                    ${currentTab.selectedVariable === variable ? styles.fade : ''}`
                }
                key={index}
            >
                {String(variable).includes('_')
                    ?<h3>{variable.split('_')[0]}<sub><h3>{variable.split('_')[1]}</h3></sub></h3>
                    :(isUndefined(tD.topBar)
                        ?<h3>{variable}</h3>
                        :(Object.keys(tV)[0] === variable
                            ?<h3>{nonSerializedFormulaData.checkVar(
                                tVArray.array, 
                                '7Ru42hF72M', 
                                variable, 
                                {topBar:true}
                            )}</h3>
                            :<h3>{variable}</h3>
                        )
                    )
                }
                <h3 style={{marginLeft:(!isUndefined(scrunch)
                    ? '-25px'
                    : '0px'
                )}}>&nbsp;=</h3>
                {String(tabVariables[variable]).includes(',') && variable === currentTab.selectedVariable
                        ? tabVariables[variable].split(',').map((value, index, array) => (
                            <React.Fragment key={index}>
                                <input 
                                    style={{
                                        minWidth:`${Number(minWidth)}ch`,
                                        width: `${Math.max(Number(minWidth), 
                                            (variable === currentTab.selectedVariable
                                                ? String(getRoundedValue(value, variable)) 
                                                : tV[variable]
                                            )?.length || 0) + 1}ch`,
                                        color: `${variable === currentTab.selectedVariable? 'darkred' : 'black'}`
                                    }}
                                    type='text' 
                                    inputMode='numeric' 
                                    value={getRoundedValue(value.trim(), variable)}
                                    autoComplete='off'
                                    autoCorrect='off'
                                    spellCheck='false'
                                    onChange={(e) => handleInputChange(e, variable)}
                                    onKeyDown={(e) => handleKeyDown(e, index+1)}
                                    name={variable}
                                    onBlur={(e) => handleBlur(e, variable)}
                                    placeholder=''
                                    aria-label={`enter the ${variable} value here`}
                                />
                                {index < array.length - 1 && <p key={`comma_${index}`} className={styles.comma}>, </p>}
                                {console.log(getRoundedValue(value.trim()))}
                            </React.Fragment>
                        ))
                        : (<input 
                            style={{
                                minWidth:`${Number(minWidth)}ch`,
                                width: `${Math.max(Number(minWidth), 
                                    (variable === currentTab.selectedVariable
                                        ? (String(getRoundedValue(currentTab.answer)) === 'Error: missing variable/s'
                                            ? (!isUndefined(errorMsg)
                                                ? String(errorMsg)
                                                : 'Error: missing variable/s'
                                            )
                                            : String(getRoundedValue(currentTab.answer))
                                        )
                                        : (tV[variable] === 'Error: missing variable/s'
                                            ? (!isUndefined(errorMsg)
                                                ? String(errorMsg)
                                                : 'Error: missing variable/s'
                                            )
                                            : String(getRoundedValue(tV[variable]))
                                        )
                                    )?.length || 0) + 1}ch`,
                                color: `${variable === currentTab.selectedVariable? 'darkred' : 'black'}`,
                                marginLeft: (!isUndefined(scrunch)
                                    ? '0px'
                                    : '25px'
                                )
                            }}
                            type='text' 
                            inputMode='numeric' 
                            value={((
                                variable === currentTab.selectedVariable 
                                    ? getRoundedValue(currentTab.answer) 
                                    : getRoundedValue(tV[variable])
                                ) === 'Error: missing variable/s'
                                ? (!isUndefined(errorMsg)
                                    ? String(errorMsg)
                                    : 'Error: missing variable/s'
                                )
                                : (
                                    variable === currentTab.selectedVariable 
                                        ? getRoundedValue(currentTab.answer) ?? ''
                                        : getRoundedValue(tV[variable]) ?? ''
                            ))}
                            autoComplete='off'
                            autoCorrect='off'
                            spellCheck='false'
                            onChange={(e) => handleInputChange(e, variable)}
                            onKeyDown={(e) => handleKeyDown(e, index+1)}
                            name={variable}
                            onBlur={(e) => handleBlur(e, variable)}
                            placeholder={String(placeholder)}
                            aria-label={`enter the ${variable} value here`}
                        />)
                    }
            </div>
        )
    } else {
        return (
            <h4>Missing type, try refreshing the page</h4>
        )
    }
}
