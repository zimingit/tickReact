import React, { useState, useEffect } from 'react'
import Checkbox from '../FormWidgets/Checkbox'
import Icon from '../Icon'
import setClass from '../../plugins/ClassNames.js'

import deleteIcon from '../../assets/icons/close.svg'
import detailed from '../../assets/icons/eye.svg'
import './Task.scss'

const Task = ({ task, onCompleteTask, onDeleteTask = () => {}, onDetailedView = () => {}}) => {
  const [didMount, setDidMount] = useState(false)
  const [isAccepted, setAccepted] = useState(false)
  const getIcon = isAccepted ? null : deleteIcon
  const getDeleteLabel = isAccepted ? 'del?' : null

  useEffect(() => {
    setDidMount(true)
    return () => setDidMount(false)
  }, [])

  const handleDelete = (e) => {
    e.stopPropagation()
    if (isAccepted) return onDeleteTask(task)
    setAccepted(true)
    setTimeout(() => {
      if (!didMount) return
      setAccepted(false)
    }, 2000)
  }

  const onCompletedChange = (value) => {
    const newTask = { ...task, completed: value }
    onCompleteTask(newTask)
  }
  const classes = setClass(['task', { 'task--completed': task.completed}])
  return (
    <div className={classes}>
      <Checkbox value={task.completed} onChange={onCompletedChange}></Checkbox>

      <p className="task__text">{task.text}</p>

      
      <div className="task__view" onClick={onDetailedView}>
        <Icon icon={detailed} size="large"/>
      </div>
      <div className="task__delete" onClick={handleDelete}>
        <Icon icon={getIcon} size="tiny">{getDeleteLabel}</Icon>
      </div>
    </div>
  );
}

export default Task;
