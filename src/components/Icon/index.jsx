import React from 'react';

import './Icon.scss';

const Icon = ({className = '', icon, size = 'small'}) => {
  return (
    <i className={['icon ', className].join(' ')}>
      <img src={icon} className={size} alt="icon"/>
    </i>
  );
}

export default Icon;
