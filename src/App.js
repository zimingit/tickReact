import React , { useState, useEffect } from 'react';
import { List, Folder, Button, AddFolder, AddTask, TaskContainer, Task } from './components';
import { tasks, folders } from './dataset/tasks.json'

import listIcon from './assets/icons/list.svg';
import './App.scss';

function App() {
  const [foldersList, setFolders] = useState(folders)
  const [tasksList, setTasks] = useState([])
  const [filterCleared, setFilterCleared] = useState(false)

  // Folders
  const handleAddFolder = (newFolder) => {
    setFolders([...foldersList, newFolder])
  }

  const handleDelFolder = (name) => {
    setFolders(foldersList.filter(({label}) => label !== name))
  }
  
  // Filters
  const handleFilter = (path = null) => {
    setFolders(foldersList.map(folder => ({...folder, selected: folder.label === path})))
    setFilterCleared(!path)
  }

  useEffect(() => {
    const filter = (foldersList.find(f => f.selected) || {}).label || null
    const getColor = (label) => foldersList.find(f => f.label === label).color
    const folderNames = foldersList.map(folder => folder.label)
    const tasksFiltered = tasks.filter(({label}) => {
      return (!filter || label === filter)
        && folderNames.includes(label)
      })
      .map(task => ({ ...task, color: getColor(task.label)}))
    setTasks(tasksFiltered)
  }, [foldersList])

  // Tasks
  const onCompleteTask = (task) => {
    const newTasks = tasksList.map(data => ({...data, tasks: data.tasks.map(t => (t.text === task.text ? task : t))}))
    setTasks(newTasks)
  }

  const onAddTask = (dataTask, task) => {
    const newTasks = tasksList.map(data => {
      return data.label !== dataTask.label
      ? data
      : {...data, tasks: [...data.tasks, task]}
    })
    setTasks(newTasks)
  }

  const onDeleteTask = (dataTask, task) => {
    const newTasks = tasksList.map(data => {
      return data.label !== dataTask.label
      ? data
      : {...data, tasks: data.tasks.filter(t => t.text !== task.text)}
    })
    setTasks(newTasks)
  }

  return (
    <div className="app">
      <div className="app__sidebar">
        <Button icon={listIcon}
                isActive={filterCleared}
                onClick={() => handleFilter()}>Все задачи</Button>
        <List>
          { foldersList.map(({label, color, selected}) => (
            <Folder {...{label, color, selected, handleDelFolder}}
                    onClick={handleFilter}
                    key={label}/>
          ))}
        </List>
        <AddFolder handleAddFolder={handleAddFolder}/>
      </div>
      <div className="app__tasks">
        <List>
          { tasksList.map(data => (
            <TaskContainer data={data} key={data.label}>
              { data.tasks.map(task => (
                <Task task={task} key={task.text}
                      onCompleteTask={onCompleteTask}
                      onDeleteTask={(task) => onDeleteTask(data, task)}/>
              ))}
            <AddTask onAddTask={(task) => onAddTask(data, task)}/>
            </TaskContainer>
          ))}
        </List>
      </div>
    </div>
  );
}

export default App;
