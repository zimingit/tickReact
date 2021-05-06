import React from 'react';
import ListItem from '../ListItem';

import './List.scss';

const List = ({data = [], handleDelFolder}) => {
  return (
    <ul className="sidebar__list">
      { data.map(({label, color, selected}) => (
      <ListItem {...{label, color, selected, handleDelFolder}}
                key={label}/>
      )) }
    </ul>
  );
}

export default List;
