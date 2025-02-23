import React, { useState } from 'react';
import styles from './sections.module.css';
import { selectSections } from './sectionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addTab, selectTabData } from '../calculator/calculatorSlice';

export function Sections() {
	const [hideSectionBulk, setHideSectionBulk] = useState(false);
	let tabData = useSelector(selectTabData)
	const dispatch = useDispatch();
	const sections = useSelector(selectSections)

	const handleHideHover = () => {
		setHideSectionBulk(true);
		setTimeout(() => setHideSectionBulk(false), 1);
	};

	return (
		<section className={styles.sections}>
		{sections.map((section, sectionIndex) => (
		  <div key={sectionIndex} className={styles.section}>
			<div className={styles.sectionTitle}>
			  <h2>{section.name}</h2>
			  {!hideSectionBulk && (
				<div className={styles.sectionBulk}>
					{section.categories.map((categoryGroup, groupIndex) => (
					<div key={groupIndex}>
						{Object.keys(categoryGroup).map((category, categoryIndex) => (
						<div key={categoryIndex}>
							<h3>{category}</h3>
							{categoryGroup[category].map((subCat, subCatIndex) => (
							<button 
								key={subCatIndex} 
								type='button'
								onClick={() => {
								dispatch(addTab({ name: subCat }));
								handleHideHover(); // Break hover state
								}}
								style={(tabData.find(obj => obj.name === subCat)) === undefined
								? { backgroundColor: 'lightcoral' }
								: { backgroundColor: 'green' }
								}
							>
								{subCat}
							</button>
							))}
						</div>
						))}
					</div>
					))}
				</div>
				)}
			</div>
		  </div>
		))}
		<div className={styles.sectionEnd}></div>
	  </section>
	);
}
