import React from 'react';
import setClass from '../../plugins/ClassNames.js'

import './Icon.scss';

const Icon = ({className = '', icon, size = 'small'}) => {
  return (
    <i className={setClass(['icon ', className])}>
      <img src={icon} className={size} alt="icon"/>
    </i>
  );
}

export default Icon;
