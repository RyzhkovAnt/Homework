import React from 'react';
import "./style.css";
export const Error = ({ text }) => {
    return (
        <div className={'form-error'}>
            {text}
        </div>
    )
}