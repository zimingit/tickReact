import React , { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Editor from '../../components/Editor'
import Button from '../../components/rButton'

import { useParams } from 'react-router-dom';
import $ds from '../../api/DataService'

import './Detailed.scss';

const Detailed = () => {
  const history = useHistory()
  const [saveLavel, setSaveLabel] = useState('Сохранено')
  const [backLabel, setBackLabel] = useState('Назад')
  const {folderId, id} = useParams()
  const [task, setTask] = useState(null)
  const [folder, setFolder] = useState(null)
  const [description, setDescription] = useState('')

  useEffect(() => {
    (async () => {
      const folderData = await $ds.getFolder(folderId)
      const taskData = await $ds.getTask(folderData, id)
      setFolder(folderData)
      setTask(taskData)
      setDescription(taskData.description)
    })()
  }, [folderId, id])

  const onChange = (description) => {
    setDescription(description)
    setSaveLabel('Сохранить')
    setBackLabel('Отменить')
  }

  const onSave = async () => {
    const newTask = { ...task, description }
    await $ds.updTask(folder, newTask)
    setSaveLabel('Сохранено')
    setBackLabel('Назад')
  }

  const goBack = () => {
    history.goBack()
  }

  return (
    task 
    ? <div className="detailed">
        <h1 style={{color: folder.color}}>{task.name}</h1>
        <Editor content={task.description} onChange={onChange}/>
        <div className="detailed__buttons">
          <Button onClick={onSave}
                  className="filled center"
                  style={{backgroundColor: folder.color}}>{saveLavel}</Button>
          <Button onClick={goBack}
                  className="filled center"
                  style={{backgroundColor: folder.color}}>{backLabel}</Button>
        </div>
      </div>
    : ''
  );
}

export default Detailed;
