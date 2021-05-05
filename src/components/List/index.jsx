import React from 'react';
import ListItem from '../ListItem';

import './List.scss';

const List = ({data = []}) => {
  return (
    <ul className="sidebar__list">
      { data.map(({label, color, selected}) => (
      <ListItem label={label} color={color} selected={selected} key={label} />
      )) }
    </ul>
  );
}

export default List;
