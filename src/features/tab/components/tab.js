import React from 'react';
import styles from '../css/tab.module.css';
import { Dropdown } from './dropdown';

export function Tab() {
	return (
		<section className={styles.tab}>
			<Dropdown/>
		</section>
	);
}