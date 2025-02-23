import React from "react";
import styles from '../css/mathRoot.module.css';

export function MathRoot(props) {
    const childrenArray = React.Children.toArray(props.children.props.children);
    const base = childrenArray[0]?.props.children; 
    const index = childrenArray[1]?.props.children || '2'; 

    return (
        <span className={styles.mathRoot}>
            {index !== '2' && <sup><span>{index}</span></sup>}
            <span className={styles.radical}>√</span>
            <span className={`${styles.value}`}>{base}</span>
        </span>
    );
};