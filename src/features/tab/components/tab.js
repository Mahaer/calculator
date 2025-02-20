import React from 'react';
import styles from '../css/tab.module.css';
import { Dropdown } from './dropdown';
import { Calculator } from '../../calculator/components/calculator';
import { SelectedVariable } from '../../calculator/components/selectedVariable';
import { LeftSideUtil } from '../../calculator/components/leftSideUtil';
import { VariableDefinitions } from '../../calculator/components/variableDefinitions';
import { AdditionalInfo } from '../../calculator/components/additionalInfo';

export function Tab() {
	const mode = 'Compound Interest'
	const tabId = 3
	const type = 'formula'

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
}