import React , { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Editor from '../../components/Editor'
import Button from '../../components/rButton'

import { useParams } from 'react-router-dom';
import ls from '../../plugins/LocalDataset'

import './Detailed.scss';

const Detailed = () => {
  const history = useHistory()
  const [saveLavel, setSaveLabel] = useState('Сохранено')
  const [backLabel, setBackLabel] = useState('Назад')
  const {folder, id} = useParams();
  const [task, setTask] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    (async () => {
      const task = await ls.getTask(folder, id)
      setTask(task)
      setDescription(task.description)
    })()
  }, [folder, id])

  const onChange = (description) => {
    setDescription(description)
    setSaveLabel('Сохранить')
    setBackLabel('Отменить')
  }

  const onSave = async () => {
    const newTask = { ...task, description }
    await ls.updTask(folder, newTask)
    setSaveLabel('Сохранено')
    setBackLabel('Назад')
  }

  const goBack = () => {
    history.goBack()
  }

  return (
    task 
    ? <div className="detailed">
        <h1 style={{color: task.color}}>{task.text}</h1>
        <Editor content={task.description} onChange={onChange}/>
        <div className="detailed__buttons">
          <Button onClick={onSave}
                  className="filled center"
                  style={{backgroundColor: task.color}}>{saveLavel}</Button>
          <Button onClick={goBack}
                  className="filled center"
                  style={{backgroundColor: task.color}}>Отменить</Button>
        </div>
      </div>
    : ''
  );
}

export default Detailed;
