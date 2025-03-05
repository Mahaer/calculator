import React from 'react';
import styles from '../css/additionalInfo.module.css';
import { useSelector } from 'react-redux';
import { selectTabData } from '../calculatorSlice';

export function AdditionalInfo({mode, type}){
    const tabData = useSelector(selectTabData)
    const tD = tabData.find(obj => obj.name === mode);

    if(type === 'formula' || type === 'array'){
        return (
            <div className={styles.additionalInfo}>
                <h2>Additional Information:</h2>
                <div>
                    <label key={`feature_given_1`}>
                        <h3>{' - '}</h3>
                        <h4>Use the up/down arrows to switch between inputs</h4>
                    </label>
                    <label key={`feature_given_2`}>
                        <h3>{' - '}</h3>
                        <h4>Also use tab/shift + tab to switch as well</h4>
                    </label>
                    {type === 'array'
                        ?(
                            <>
                                <label key={`feature_given_array_1`}>
                                    <h3>{` - `}</h3>
                                    <h4>The mininum amount of terms is 2</h4>
                                </label>
                                <label key={`feature_given_array_2`}>
                                    <h3>{` - `}</h3>
                                    <h4>The maximum amount of terms is 25</h4>
                                </label>
                            </>
                        )
                        : ''
                    }
                    {tD.moreInfo.features ? (
                    tD.moreInfo.features.map((feature, index) => {
                        // Check if feature contains <br> and split it
                        const featureParts = feature.split('<br>');
                        
                        return (
                        <label key={`feature_${index}`}>
                            <h3>{' - '}</h3>
                            {featureParts.length > 1 ? (
                            <span>
                                <h4>{featureParts[0]}</h4>
                                <h4>{featureParts[1]}</h4>
                            </span>
                            ) : (
                            <h4>{feature}</h4>
                            )}
                        </label>
                        );
                    })
                    ) : ''}
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