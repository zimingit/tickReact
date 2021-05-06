import React from 'react';
import setClass from '../../plugins/ClassNames.js'
import './Badge.scss';

const Badge = ({color = '#9e9e9e', size = 'normal'}) => {
  return (
    <i className={setClass(['badge', `size--${size}`])} style={{backgroundColor: color}}/>
  );
}

export default Badge;
