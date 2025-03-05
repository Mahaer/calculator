import React from 'react';
import styles from '../css/fraction.module.css';

export function Fraction(props) {
    const {parsing='', numerator=1, denominator=1, size = '25px' } = props
    return (
        <span className={styles.fraction}>
            <p style={{ fontSize: size }}>
                {parsing === 'children'
                    ?props.children.props.children[0].props.children
                    :numerator
                }
            </p>
            <hr />
            <p style={{ fontSize: size }}>
                {parsing === 'children'
                    ?props.children.props.children[1].props.children
                    :denominator
                }
            </p>
        </span>
    );
}