import React from 'react';
import styles from '../css/tab.module.css';
import { Dropdown } from './dropdown';
import { Calculator } from '../../calculator/components/calculator';
import { SelectedVariable } from '../../calculator/components/selectedVariable';
import { LeftSideUtil } from '../../calculator/components/leftSideUtil';
import { VariableDefinitions } from '../../calculator/components/variableDefinitions';
import { AdditionalInfo } from '../../calculator/components/additionalInfo';
import { useSelector } from 'react-redux';
import { selectCurrentTabId, selectTabs } from '../../calculator/calculatorSlice';

export function Tab() {
	const tabId = useSelector(selectCurrentTabId)
	const tabs = useSelector(selectTabs)
	try {
		const mode = tabs.find(obj => obj.id === tabId).mode
		const type = tabs.find(obj => obj.id === tabId).type
		return (
			<section className={styles.tab}>
				<div className={styles.tabContent}>
					<Dropdown/>
					<div>
						<div className={styles.leftSnap}>
							<SelectedVariable mode={mode} tabId={tabId} type={type}/>
							<LeftSideUtil mode={mode} tabId={tabId} type={type}/>
						</div>
						<Calculator mode={mode} tabId={tabId} type={type}/>
						<div className={styles.rightSnap}>
							<VariableDefinitions mode={mode} type={type}/>
							<AdditionalInfo mode={mode} tabId={tabId} type={type}/>
						</div>
					</div>
				</div>
			</section>
		);
	} catch (e){
		return (
			<section className={styles.tab}>
				No tabs yet? add one now
			</section>
		)
	}
}