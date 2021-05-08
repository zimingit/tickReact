import React, { useState } from 'react';
import Button from '../rButton';
import List from '../List';
import setClass from '../../plugins/ClassNames'

import filterIcon from '../../assets/icons/filter.svg';
import filteredIcon from '../../assets/icons/filtered.svg';
import './Filter.scss';

const Filter = ({data, setFilter}) => {
  const [showPopup, setShowPopup] = useState(false)
  const filters = ['Все', 'Выполненные', 'Невыполненные']
  const getActiveClass = (filter) => data.filter === filter ? 'active' : ''
  const getIcon = data.filter ? filteredIcon : filterIcon
  const classes = setClass(['filter', {'filter--filtered':  data.filter}])

  const handleSetFilter = (filter) => {
    if (filter === data.filter) {
      filter = null
    }
    setFilter(data, filter)
    setShowPopup(false)
  }
  
  return (
    <div className={classes}>
      <Button icon={getIcon} onClick={() => setShowPopup(!showPopup)}/>
      
      {showPopup && 
        <div className="filter__popup">
          <List>
            { filters.map(filter => (
              <li onClick={() => handleSetFilter(filter)}
                  className={getActiveClass(filter)}
                  key={filter}>{filter}</li>
            ))}
          </List>
        </div>
      }
    </div>
  );
}

export default Filter;
