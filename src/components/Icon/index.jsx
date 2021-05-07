import React from 'react';
import setClass from '../../plugins/ClassNames.js'

import './Icon.scss';

const Icon = ({children, className = '', icon, size = 'small'}) => {
  return (
    <i className={setClass(['icon ', className])}>
      {icon &&
        <img src={icon} className={size} alt="icon"/>
      }
      {children}
    </i>
  );
}

export default Icon;
