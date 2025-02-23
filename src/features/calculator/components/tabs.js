import React from 'react';
import styles from '../css/tabs.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { removeTab, selectCurrentTabId, selectTabs, switchTabs } from '../calculatorSlice';

export function Tabs() {
	const dispatch = useDispatch()
	const tabs = useSelector(selectTabs)
	const id = useSelector(selectCurrentTabId)

	const handleTabChange = (e) => {
		dispatch(switchTabs(Number(e.target.id)))
	}

	return (
		<section className={styles.tabsSection}>
			<div className={styles.tabsTitle}>
				<h2>Tabs: </h2>
			</div>
			{tabs.map((tab) => (
				<div 
					key={tab.id}
					id={tab.id}
					className={`${Number(id) === Number(tab.id)? styles.currentTab: ''} ${styles.tab}`}
					onClick={(e) => handleTabChange(e)}
				>
					<h2 id={tab.id}>{tab.mode}</h2>
					<button 
						type='button' 
						id={tab.id}
						onClick={(e) => {
							e.stopPropagation()
							dispatch(removeTab(Number(e.target.id)))
						}}
					>&times;</button>
				</div>
			))}
			<div className={styles.extraTab}>
		 		<button type="button">+</button>
		 		<h2>Add Tab</h2>
			</div>
		</section>
	);
}