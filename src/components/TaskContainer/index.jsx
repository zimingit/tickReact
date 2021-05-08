import React from 'react';
import Filter from '../Filter';

import './TaskContainer.scss';

const TaskContainer = ({ children, data, setFilter }) => {
  const styles = {
    color: data.color,
    borderColor: `${data.color}50`
  }

  return (
    <div className="task-container">
      <h1 style={styles} className="task-container__label">
        {data.label}
        <Filter {...{data, setFilter}} />
      </h1>
      <div className="task-container__list">
        {children}
      </div>
    </div>
  );
}

export default TaskContainer;
