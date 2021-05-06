import React from 'react';
import Badge from '../Badge'
import Button from '../rButton';
import setClass from '../../plugins/ClassNames.js'

import './ListItem.scss';
import deleteIcon from '../../assets/icons/delete.svg';

const ListItem = ({label, color, selected, handleDelFolder}) => {
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
      <div className="list_delete">
        <Button icon={deleteIcon} onClick={() => handleDelFolder(label)}/>
      </div>  
    </li>
  );
}

export default ListItem;
