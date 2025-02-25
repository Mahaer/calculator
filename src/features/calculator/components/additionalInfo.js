import React from 'react';
import styles from '../css/additionalInfo.module.css';
import { useSelector } from 'react-redux';
import { selectTabData } from '../calculatorSlice';

export function AdditionalInfo({mode, type}){
    const tabData = useSelector(selectTabData)
    const tD = tabData.find(obj => obj.name === mode);

    if(type === 'formula'){
        return (
            <div className={styles.additionalInfo}>
                <h2>Additional Information:</h2>
                <div>
                    <label key={`feature_given`}>
                        <h3>{' - '}</h3>
                        <h4>You can use the up/down arrows to switch between inputs</h4>
                    </label>
                    {tD.moreInfo.features?((tD.moreInfo.features).map((feature, index) => (
                        <label key={`feature_${index}`}>
                            <h3>{' - '}</h3>
                            <h4>{feature}</h4>
                        </label>
                    ))):''}
                </div>
                {tD.moreInfo.links?(Object.keys(tD.moreInfo.links).length !== 0 &&
                    <>
                        <h2>Helpful Links and Resources:</h2>
                        <div className={styles.links}>
                            <ul>
                                {Object.keys(tD.moreInfo.links).map((link, index) => (
                                    <label key={`link_${index}`}>
                                        <h3>{' - '}</h3>
                                        <a href={tD.moreInfo.links[link]} target='_blank' rel='noreferrer'>
                                            <li>{link}</li>
                                        </a>
                                    </label>
                                ))}
                            </ul>
                        </div>
                    </>
                ): ''}
            </div>
        );
    }
}