import React from 'react';
import styles from '../css/tab.module.css';
import { Dropdown } from './dropdown';
import { Calculator } from '../../calculator/components/calculator';
import { SelectedVariable } from '../../calculator/components/selectedVariable';
import { LeftSideUtil } from '../../calculator/components/leftSideUtil';
import { VariableDefinitions } from '../../calculator/components/variableDefinitions';
import { AdditionalInfo } from '../../calculator/components/additionalInfo';
import { useSelector } from 'react-redux';
import { selectCurrentTabId, selectTabs, selectTabData } from '../../calculator/calculatorSlice';

export function Tab() {
	const tabId = useSelector(selectCurrentTabId)
	const tabs = useSelector(selectTabs)
	const tabData = useSelector(selectTabData)

	const mode = tabs.find(obj => obj.id === tabId)?.mode ?? ""
	const type = tabs.find(obj => obj.id === tabId)?.type ?? ""

	const tD = tabData.find(obj => obj.name === mode);
		 
	const currentTab = tabs.find(obj => obj.id === tabId)
	const tabVariables = currentTab?.variables || {}
	const tVKeys = Object.keys(tabVariables);
	let tV = {}
	let tVArray = {array:{}}
	let numericVariables = {};
	for (let i = 0; i < tVKeys.length; i++) {tV[tVKeys[i]] = tVKeys[i] === tabVariables[tVKeys[i]] ? '' : tabVariables[tVKeys[i]];}
	for (let key in tV) {numericVariables[key] = tV[key] === '' ? '' : Number(tV[key]);}
	
	for (let key in tV) {
		if(tV[key].includes('Error') || tV[key].includes('Impossible') || tV[key] === Infinity || tV[key] === -Infinity){
			tV[key] = ''
		}
	}
	if(type === 'array'){
		tVArray[Object.keys(tV)[0]]= tV[Object.keys(tV)[0]]
		for(let i = 0; i < Object.keys(tV).filter(val => val !== Object.keys(tV)[0]).length; i++){
			tVArray.array[Object.keys(tV).filter(val => val !== Object.keys(tV)[0])[i]] = tV[Object.keys(tV).filter(val => val !== Object.keys(tV)[0])[i]]
		}
		for (let key in tVArray.array) {
			if(tVArray.array[key].includes('Error') || tVArray.array[key].includes('Impossible') || tVArray.array[key] === Infinity || tVArray.array[key] === -Infinity){
				tVArray.array[key] = ''
			}
		}
	}

	if(mode !== "" && type !== ""){
		return (
			<section className={styles.tab}>
				<div className={styles.tabContent}>
					<Dropdown/>
					<div>
						<div className={styles.leftSnap}>
							<SelectedVariable 
								mode={mode} 
								tabId={tabId} 
								type={type}
								currentTab={currentTab}
								tV={tV}
								tD={tD}
								tVArray={tVArray}
								tabVariables={tabVariables}
								tabs={tabs}
							/>
							<LeftSideUtil 
								mode={mode} 
								tabId={tabId} 
								type={type}
								currentTab={currentTab}
								tV={tV}
								tD={tD}
								tVArray={tVArray}
								tabVariables={tabVariables}
								tabs={tabs}
							/>
						</div>
						<Calculator 
							mode={mode} 
							tabId={tabId} 
							type={type}
							currentTab={currentTab}
							tV={tV}
							tD={tD}
							tVArray={tVArray}
							tabVariables={tabVariables}
							tabs={tabs}
						/>
						<div className={styles.rightSnap}>
							<VariableDefinitions 
								type={type} 
								tVArray={tVArray}
								tD={tD}
							/>
							<AdditionalInfo mode={mode} tabId={tabId} type={type}/>
						</div>
					</div>
				</div>
			</section>
		);
	} else{
		return (
			<div className={styles.tab}>
				<h1>No tabs yet? Add a new tab now!</h1>
			</div>
		)
	}
}