import React from 'react';

import './Badge.scss';

const Badge = ({color = '#9e9e9e'}) => {
  return (
    <i className="badge"  style={{backgroundColor: color}}/>
  );
}

export default Badge;
