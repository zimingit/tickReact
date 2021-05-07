import React from 'react';

import './Task.scss';

const Task = ({ task, color }) => {
  const styles = {
    color,
    borderColor: `${color}50`
  }
  return (
    <div className="task">
      <h1 style={styles} className="task__label">{task.label}</h1>
    </div>
  );
}

export default Task;
