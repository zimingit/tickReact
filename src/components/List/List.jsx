import React from 'react';
import ListItem from '../ListItem/ListItem';

import './List.scss';

const List = ({data = []}) => {
  return (
    <ul className="sidebar__list">
      { data.map(({label, color}) => (<ListItem label={label} color={color} key={label} />)) }
    </ul>
  );
}

export default List;
