import React from 'react';
import styles from './tabs.module.css';

export function Tabs() {
	return (
		<section className={styles.tabsSection}>
			<div className={styles.tabsTitle}>
				<h2>Tabs: </h2>
			</div>
			<div className={styles.tabs}>
				<div className={[styles.tab, styles.currentTab].join(' ')}>
					<h2>Custom Arithmetic</h2>
					<button type='button'>x</button>
				</div>
				<div className={styles.tab}>
					<h2>Pythagorean Theorm</h2>
					<button type='button'>x</button>
				</div>
				<div className={styles.tab}>
					<h2>Compund Interest</h2>
					<button type='button'>x</button>
				</div>
				<div className={styles.extraTab}>
					<button type='button'>+</button>
					<h2>Add Tab</h2>
				</div>
				
			</div>
		</section>
	);
}