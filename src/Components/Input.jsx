import React from 'react';

export const Input = (props) => {
    return(
        <input type={props.type} value={props.value} onChange={props.onChange} />
    )
}
