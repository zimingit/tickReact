import React from 'react';

import './Input.scss';

const Input = ({placeholder = '',
                className = '',
                type = 'text',
                value = '', 
                style = {},
                onChange = () => {},
                onInput = () => {},
                onFocus= () => {},
                onBlur= () => {}
              }) => {
  return (
    <input  type={type}
            value={value}
            placeholder={placeholder}
            className={className}
            style={style}
            onChange={e => onChange(e.target.value)}
            onInput={e => onInput(e.target.value)}
            onFocus={e => onFocus(e.target)}
            onBlur={e => onBlur(e.target)}/>
  );
}

export default Input;
