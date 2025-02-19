import React from 'react';
import styles from '../css/tab.module.css';
import { Dropdown } from './dropdown';
import { Calculator } from '../../calculator/components/calculator';
import { SelectedVariable } from '../../calculator/components/selectedVariable';

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
						</div>
						<Calculator mode={mode} tabId={tabId} type={type}/>
					</div>
				</div>
		</section>
	);
}