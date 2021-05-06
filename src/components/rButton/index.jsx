import React from 'react';
import Icon from '../Icon';

import './rButton.scss';

const rButton = ({children, icon, style, isActive}) => {
  return (
    <button type="button" className={`rbutton ${isActive ? 'active': ''}`} style={style}>
      { icon && <Icon icon={icon}/> }
      { children && <span>{children}</span> }
    </button>
  );
}

export default rButton;
