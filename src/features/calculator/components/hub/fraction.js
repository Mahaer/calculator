import React from 'react';
import styles from '../../css/hub/fraction.module.css';
import { create, all } from "mathjs";

export function Fraction(props) {
    const math = create(all)
    const {
        parsing='', 
        numerator=1, 
        denominator=1, 
        size = '25px', 
        color='black', 
        negativeStyling=false,
        lessThanZeroParen=false,
        scrunch=false,
        addPlus=false,
        negParen=false
    } = props
    let num;
    let den;
    if(parsing === 'children'){
        num = props.children.props.children[0].props.children
        den = props.children.props.children[1].props.children
    }
    if(negativeStyling){
        if(typeof num === 'object'){
            num = num?.props?.children
        }
        if(typeof den === 'object'){
            den = den?.props?.children
        }
        return (
            <span className={styles.fractionWrapper}>
                {((negativeStyling && 
                    (String(num).startsWith('-') || String(den).startsWith('-')) &&
                    !(String(num).startsWith('-') && String(den).startsWith('-')) &&
                    !(typeof num === 'string' || typeof den === 'string')) 
                    && lessThanZeroParen
                    ? '('
                    : ''
                )}
                {((negativeStyling && 
                ((String(num).startsWith('-') 
                || String(den).startsWith('-'))
                && !(String(num).startsWith('-') 
                && String(den).startsWith('-')))
                && !(typeof num === 'string' 
                || typeof den === 'string'))
                    ? addPlus?' - ':'-'
                    : addPlus?' + ':''
                )}
                {(negParen && (String(num).startsWith('-') && String(den).startsWith('-')))
                    ?'('
                    :''
                }
                {scrunch && Number(den) === 1
                    ?<span className={styles.fraction} style={{color:color}}>
                        <p className={styles.normalP}>
                            {parsing === 'children'
                                ?(negativeStyling
                                    ? (isNaN(Number(num))
                                        ? num
                                        : (String(num).startsWith('-') 
                                            && String(den).startsWith('-')
                                            ? num
                                            : (typeof num === 'string' 
                                                || typeof den === 'string'
                                                ? num
                                                : math.abs(num)
                                            )
                                        ))
                                    : num
                                )
                                :numerator
                            }
                        </p>
                    </span>
                    :<span className={styles.fraction} style={{color:color}}>
                        <p style={{ fontSize: size }}>
                            {parsing === 'children'
                                ?(negativeStyling
                                    ? (isNaN(Number(num))
                                        ? num
                                        : (String(num).startsWith('-') 
                                            && String(den).startsWith('-')
                                            ? num
                                            : (typeof num === 'string' 
                                                || typeof den === 'string'
                                                ? num
                                                : math.abs(num)
                                            )
                                        ))
                                    : num
                                )
                                :numerator
                            }
                        </p>
                        <hr style={{borderColor:color}}/>
                        <p style={{ fontSize: size }}>
                            {parsing === 'children'
                                ?(negativeStyling
                                    ? (isNaN(Number(den))
                                        ? den
                                        : (String(num).startsWith('-') 
                                            && String(den).startsWith('-')
                                            ? den
                                            : (typeof num === 'string' 
                                                || typeof den === 'string'
                                                ? den
                                                : math.abs(den)
                                            )
                                        ))
                                    :den
                                )
                                :denominator
                            }
                        </p>
                    </span>
                }
                {((negativeStyling && 
                    ((String(num).startsWith('-') || String(den).startsWith('-')) &&
                    !(String(num).startsWith('-') && String(den).startsWith('-')) &&
                    !(typeof num === 'string' || typeof den === 'string')) 
                    && lessThanZeroParen) || 
                    (negParen && (String(num).startsWith('-') && String(den).startsWith('-')))
                    ? ')'
                    : ''
                )}
            </span>
        );
    } else {
        return (
            <span className={styles.fraction} style={{color:color}}>
                <p style={{fontSize: size}}>
                    {parsing === 'children'
                        ? num
                        : numerator
                    }
                </p>
                <hr style={{borderColor:color}}/>
                <p style={{fontSize: size}}>
                    {parsing === 'children'
                        ? den
                        : denominator
                    }
                </p>
            </span>
        )
    }
}