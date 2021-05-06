import React from 'react';
import Icon from '../Icon';
import setClass from '../../plugins/ClassNames.js'

import './rButton.scss';

const rButton = ({children, icon, style, isActive, className, onClick = () => {}}) => {
  const classes = setClass(['rbutton', {isActive}, className ])
  return (
    <button type="button" className={classes} style={style} onClick={onClick}>
      { icon && <Icon icon={icon}/> }
      { children && <span>{children}</span> }
    </button>
  );
}

export default rButton;
