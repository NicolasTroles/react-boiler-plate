
import React from 'react';
import styled from 'styled-components';

const FieldStyled = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    textarea {
        width: 100%;
        border: 0;
        outline: none;
        overflow: hidden;
        color: #495057;
        resize: none;
        min-height: 27px;
        background: transparent;
    }
    span {
        color: red;
        margin: 6px 0 0 -12px;
        font-size: 10px;
    }
`

const WarningSpan = styled('span')`
    color: #ff9800 !important;
`

const Textarea = ({
    input,
    placeholder,
    id,
    onKeyUpFunction,
    errorMessage,
    warningMessage,
    disabled,
    meta: { touched, error, warning }
}) => {
    return (
        <FieldStyled>
            <textarea disabled={disabled} {...input} id={id} placeholder={placeholder} component='textarea' onKeyUp={e => onKeyUpFunction(e.target.value)}>
                <span>
                    asdfasdf
                </span>
            </textarea>
            {touched &&
                ((error && <span>{error}</span>))}
            {errorMessage && <span>{errorMessage}</span>}
            {warningMessage && <WarningSpan>{warningMessage}</WarningSpan>}
        </FieldStyled>
    )
}


export default Textarea;