import React from 'react';
import styles from './navbar.module.css';

export function Navbar() {
	return (
		<header className={styles.header}>
			<div className={styles.siteName}>
				<h1>
					<span style={{color:'blue'}}>C</span>omplex
					<span style={{color:'blue'}}>C</span>alculator.
					<span style={{color:'blue'}}>C</span>om
				</h1>
			</div>
			<nav className={styles.links}>
				<ul>
				<li><div className={styles.link}>Calculator</div></li>
				<li><div className={styles.link}>How to Use</div></li>
				<li><div className={styles.link}>Learn More Math</div></li>
				</ul>
			</nav>
		</header>
	);
} 
