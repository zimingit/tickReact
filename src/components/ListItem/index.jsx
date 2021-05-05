import React from 'react';
import Badge from '../Badge'
import setClass from '../../plugins/ClassNames.js'

import './ListItem.scss';

const ListItem = ({label, color, selected}) => {
  // const testMultiClasses = setClass([
  //   ['arrayFirstClass', 'arraySecondClass'],
  //   [],
  //   {},
  //   'singleStringClass',
  //   {
  //     'objectClass': true,
  //     'objectSecondClass': false,
  //     'objectThirdClass': selected || true
  //   }
  // ])

  const classes = setClass(['list__item', {selected}])
  return (
    <li className={classes}>
      <Badge color={color}/>
      <span>{label}</span>
    </li>
  );
}

export default ListItem;
