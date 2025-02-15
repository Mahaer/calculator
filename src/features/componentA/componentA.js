import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './componentA.module.css';

export function ComponentA() {
	return (
		<div
			className={styles.div}
></div>
	);
}
