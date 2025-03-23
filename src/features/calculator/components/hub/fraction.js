import React from 'react';
import styles from '../../css/hub/fraction.module.css';
import { create, all, isUndefined } from "mathjs";
import { nonSerializedFormulaData } from '../../../../nonSerializedFormulaData';

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
        negParen=false,
        numColor='black',
        denColor='black',
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
                        <p style={{ fontSize: size, color:numColor }}>
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
                        <p style={{ fontSize: size, color:denColor }}>
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
    } else if(!isUndefined(props.polynomials)){
        return (
            <span className={styles.fraction} style={{color:color}}>
                <p style={{fontSize: size}}>{(()=>{
                    const coefficients = num.split('???')[1].split('/')
                    const exponents = num.split('???')[0].split('"')
                    return (
                        <span>
                            {coefficients.map((term, index) => (
                                (nonSerializedFormulaData.formatValue(math.abs(Number(term)), 'standard') !== 0 &&
                                    <span key={`term_${index+1}`}>
                                        {(index !== 0) 
                                            ? <span>{String(term).startsWith('-')
                                                ? <>&nbsp;-&nbsp;</>
                                                : <>&nbsp;+&nbsp;</>
                                            }</span>
                                            : <>{String(term).startsWith('-')
                                                ? <>-</>
                                                : null
                                            }</>
                                        }
                                        {(nonSerializedFormulaData.formatValue(math.abs(Number(term)), 'standard') !== 1 || Number(exponents[index]) === 0) &&
                                            <span>{nonSerializedFormulaData.formatValue(math.abs(Number(term)), 'standard')}</span>
                                        }
                                        {Number(exponents[index]) !== 0 &&
                                            <span>x</span>
                                        }
                                        {(Number(exponents[index]) !== 1 && Number(exponents[index]) !== 0) &&
                                            <sup className={styles.denominatorSup}>{exponents[index]}</sup>
                                        }
                                    </span>
                                )
                            ))}
                        </span>
                    )
                })()}</p>
                <hr style={{borderColor:color}}/>
                <p style={{fontSize: size}}>{(()=>{
                    const coefficients = den.split('%%%')[1].split('*')
                    const exponents = den.split('%%%')[0].split('!')
                    return (
                        <span>
                            {coefficients.map((term, index) => (
                                (nonSerializedFormulaData.formatValue(math.abs(Number(term)), 'standard') !== 0 &&
                                    <span key={`term_${index+1}`}>
                                        {(index !== 0) 
                                            ? <span>{String(term).startsWith('-')
                                                ? <>&nbsp;-&nbsp;</>
                                                : <>&nbsp;+&nbsp;</>
                                            }</span>
                                            : <>{String(term).startsWith('-')
                                                ? <>-</>
                                                : null
                                            }</>
                                        }
                                        {(nonSerializedFormulaData.formatValue(math.abs(Number(term)), 'standard') !== 1 || Number(exponents[index]) === 0) &&
                                            <span>{nonSerializedFormulaData.formatValue(math.abs(Number(term)), 'standard')}</span>
                                        }
                                        {Number(exponents[index]) !== 0 &&
                                            <span>x</span>
                                        }
                                        {(Number(exponents[index]) !== 1 && Number(exponents[index]) !== 0) &&
                                            <sup className={styles.denominatorSup}>{exponents[index]}</sup>
                                        }
                                    </span>
                                )
                            ))}
                        </span>
                    )
                })()}</p>
            </span>
        )
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