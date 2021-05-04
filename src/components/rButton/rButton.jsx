import React from 'react';

import './rButton.scss';

const rButton = ({children, icon, style, isActive}) => {
  return (
    <button type="button" className={`rbutton ${isActive ? 'active': ''}`} style={style}>
      {icon &&
        <i><img src={icon} alt="icon"></img></i>
      }
      <span>{children}</span>
    </button>
  );
}

export default rButton;
