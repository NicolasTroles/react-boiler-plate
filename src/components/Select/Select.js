
import React from 'react';
import styled from 'styled-components';

const FieldStyled = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .475rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    select {
        width: 100%;
        border: 0;
        outline: none;
        color: #495057;
        background: transparent;
    }
    span {
        color: red;
        margin: 10px 0 0 -12px;
        font-size: 10px;
    }
`

const Select = ({
    input,
    label,
    id,
    type,
    onChangeFunction,
    options,
    defaultValue,
    fieldToShow,
    meta: { touched, error, warning }
}) => {
    return (
        <FieldStyled>
            <select {...input} id={id} placeholder={label} component='select' type={type} onClick={e => onChangeFunction(e.target.value)}>

                <option>{defaultValue}</option>
                {options.map((item, index) =>
                    <option key={index} value={fieldToShow ? item[fieldToShow] : item}>{fieldToShow ? item[fieldToShow] : item}</option>
                )}
            </select>
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </FieldStyled>
    )
}


export default Select;