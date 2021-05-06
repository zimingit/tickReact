import React from 'react';
import Badge from '../Badge';

import './ListBadges.scss'

const ListBadges = ({handleSelect}) => {
  const colors = ['#e57373', '#90a4ae', '#ffcc80', '#80cbc4', '#ce93d8', '#dce775', '#bcaaa4', '#7986cb']
  return (
    <ul className="list_badges">
      {colors.map(color => (
        <li key={color} onClick={() => handleSelect(color)}>
          <Badge color={color} size="large"/>
        </li>
      ))}
    </ul>
  );
}

export default ListBadges;
