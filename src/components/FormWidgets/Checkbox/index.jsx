import React from 'react';
import Icon from '../../Icon'
import setClass from '../../../plugins/ClassNames.js'

import check from '../../../assets/icons/check.svg'
import './Checkbox.scss';

const Checkbox = ({
                  className = '',
                  value = false,
                  onChange = () => {}
                }) => {
  const classes = setClass(['checkbox', className, { 'checkbox--checked': value }])
  return (
    <div className={classes} onClick={() => onChange(!value)}>
      {value && <Icon icon={check}/>}
    </div>
  );
}

export default Checkbox;
