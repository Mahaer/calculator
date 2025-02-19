import React from 'react';
import styles from './sections.module.css';
import { selectSections } from './sectionsSlice';
import { useSelector } from 'react-redux';

export function Sections() {

	const sections = useSelector(selectSections)

	return (
		<section className={styles.sections}>
		{sections.map((section, sectionIndex) => (
		  <div key={sectionIndex} className={styles.section}>
			<div className={styles.sectionTitle}>
			  <h2>{section.name}</h2>
			  <div className={styles.sectionBulk}>
				{section.categories.map((categoryGroup, groupIndex) => (
				  <div key={groupIndex}>
					{categoryGroup.map((category, categoryIndex) => (
					  <div key={categoryIndex}>
						<h3>{category.categoryName}</h3>
						{category.subCategories.map((subCategory, subCategoryIndex) => (
						  <button key={subCategoryIndex} type='button'>
							{subCategory}
						  </button>
						))}
					  </div>
					))}
				  </div>
				))}
			  </div>
			</div>
		  </div>
		))}
		<div className={styles.sectionEnd}></div>
	  </section>
	);
}
