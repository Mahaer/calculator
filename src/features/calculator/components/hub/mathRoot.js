import React from "react";
import styles from '../../css/hub/mathRoot.module.css';
import { isUndefined } from "mathjs";

export function MathRoot(props) {
    const childrenArray = React.Children.toArray(props.children.props.children);
    const base = childrenArray[0]?.props.children; 
    const index = childrenArray[1]?.props.children || ''; 
    const {styling} = props;
    return (
        <span className={`${styles.mathRoot} ${styling==='normal'?styles.normal:''}`}>
            <sup
                style={{
                    marginRight: (
                        !isUndefined(index?.props?.children)
                            ? (String(index?.props?.children)?.length === 1
                                ? '0px'
                                : String(index?.props?.children)?.length === 2
                                    ? '10px'
                                    : '20px')
                            : ''
                    )
                }}
            ><span>{index}</span></sup>
            <span className={styles.radical}>√</span>
            <span className={`${styles.value}`}>{base}</span>
        </span>
    );
};