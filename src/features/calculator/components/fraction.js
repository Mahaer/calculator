import React from 'react';
import styles from '../css/fraction.module.css';

export function Fraction({numerator=1, denominator=1, size}){
    return (
        <div className={styles.fraction}>
            <p style={{fontSize: size}}>{numerator}</p>
            <hr></hr>
            <p style={{fontSize: size}}>{denominator}</p>
        </div>
    );
}