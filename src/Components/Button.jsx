import React from 'react';
import './Button.css';

export const Button = (props) => {
    return(
        <button className="buttonstyle" onClick={props.onClick}>{props.label}</button>
    )
}