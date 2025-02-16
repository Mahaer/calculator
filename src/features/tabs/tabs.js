import React from 'react';
import styles from './tabs.module.css';
import { selectTabs, changeTabs } from './tabsSlice';
import { useSelector, useDispatch } from 'react-redux';

export function Tabs() {
	const tabs = useSelector(selectTabs);
	const dispatch = useDispatch()
	const generateKey = (tab, index) => `${tab}-${index}`;
	const currentTab = tabs.currentTab

	return (
		<section className={styles.tabsSection}>
			<div className={styles.tabsTitle}>
				<h2>Tabs: </h2>
			</div>
			<div className={styles.tabs}>
				{tabs.tabs.map((tab, index) => (
					<div
						key={generateKey(tab, index)}
						className={`${styles.tab} ${tab === currentTab ? styles.currentTab : ''}`}
						onClick={() => dispatch(changeTabs(tab))}
					>
						<h2>{tab}</h2>
						<button type="button">&minus;</button>
					</div>
				))}
				<div className={styles.extraTab}>
					<button type="button">+</button>
					<h2>Add Tab</h2>
				</div>	
			</div>
		</section>
	);
}