import React, { useState } from 'react';
import Input from '../FormWidgets/Input'
import Button from '../rButton'
import Icon from '../Icon'

import addIcon from '../../assets/icons/add.svg';
import './AddTask.scss';

const AddTask = ({ onAddTask }) => {
  const btnColor = '#5acab7'
  const [showField, setShowField] = useState(false)
  const [taskText, setTaskText] = useState('')

  const debounceHideField = () => {
    setTimeout(() => setShowField(false), 500)
  }

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleAddTask()
    } else if (e.key === 'Escape') {
      setTaskText('')
      setShowField(false)
    }
  }
  const handleAddTask = () => {
    if (!taskText) return
    const newTask = { text: taskText, completed: false }
    onAddTask(newTask)
    setTaskText('')
    setShowField(false)
  }

  return (
    <div className="add-task">
      {!showField &&
        <div className="add-task__placeholder" onClick={() => setShowField(!showField)}>
          <span><Icon icon={addIcon} size="micro"/></span>
        </div>
      }
      {showField &&
        <div className="add-task__field">
          <Input  
            autofocus={true}
            value={taskText}
            onBlur={debounceHideField}
            onInput={setTaskText}
            onKeyUp={onKeyUp}
            placeholder="Введите описание и нажмите Enter"/>

          <Button className="filled center"
                  style={{backgroundColor: btnColor}}
                  onClick={handleAddTask}>Добавить</Button>
          
        </div>
      }
    </div>
  );
}

export default AddTask;
