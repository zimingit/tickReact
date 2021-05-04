import React from 'react';

import './ListItem.scss';

const ListItem = ({label, color}) => {
  return (
    <li className="list__item">
      <span style={{backgroundColor: color}}/>
      {label}
    </li>
  );
}

export default ListItem;
