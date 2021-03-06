import React from 'react';

import './Input.scss';

const Input = ({placeholder = '',
                autofocus = false,
                className = '',
                type = 'text',
                value = '', 
                style = {},
                onChange = () => {},
                onInput = () => {},
                onFocus = () => {},
                onBlur = () => {},
                onKeyUp = () => {}
              }) => {
  return (
    <input  type={type}
            value={value}
            autoFocus={autofocus}
            placeholder={placeholder}
            className={className}
            style={style}
            onChange={e => onChange(e.target.value)}
            onInput={e => onInput(e.target.value)}
            onFocus={e => onFocus(e.target)}
            onBlur={e => onBlur(e.target)}
            onKeyUp={onKeyUp}/>
  );
}

export default Input;
