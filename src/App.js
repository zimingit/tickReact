import React , { useState, useEffect } from 'react';
import { List, Folder, Button, AddFolder, AddTask, TaskContainer, Task } from './components';
import setClass from './plugins/ClassNames'
import ls from './plugins/LocalDataset'

import listIcon from './assets/icons/list.svg';
import menuIcon from './assets/icons/menu.svg';
import closeIcon from './assets/icons/close.svg';
import './App.scss';

function App() {
  const [foldersList, setFolders] = useState([])
  const [tasksList, setTasks] = useState([])
  const [filterCleared, setFilterCleared] = useState(false)
  const [filter, setFilter] = useState(null)
  const [showMenu, setShowMenu] = useState(false)
  const getMenuIcon = showMenu ? closeIcon : menuIcon

  useEffect(() => {
    (async () => {
      setFolders(await ls.getFolders())
    })()
  }, [])

  // Folders
  const handleAddFolder = async (folder) => {
    await ls.addFolder(folder)
    setFolders(await ls.getFolders())
    await ls.initTasks(folder.label)
  }

  const handleDelFolder = async (name) => {
    await ls.delFolder(name)
    setFolders(await ls.getFolders())
  }
  
  // Filters
  const handleFilter = async (filter = null) => {
    const newFoldres = foldersList.map(folder => ({...folder, selected: folder.label === filter}))
    await ls.updFolders(newFoldres)
    setFolders(await ls.getFolders())
    setFilterCleared(!filter)
  }

  useEffect(() => {
    (async () => {
      const filter = (foldersList.find(f => f.selected) || {}).label || null
      setFilter(filter)
      setTasks(await ls.getTasks(filter))
    })()
  }, [foldersList])

  // Tasks
  const onCompleteTask = async (dataTask, task) => {
    await ls.completeTask(dataTask, task)
    setTasks(await ls.getTasks(filter))
  }

  const onAddTask = async (dataTask, task) => {
    await ls.addTask(dataTask, task)
    setTasks(await ls.getTasks(filter))
  }

  const onDeleteTask = async (dataTask, task) => {
    await ls.delTask(dataTask, task)
    setTasks(await ls.getTasks(filter))
  }

  return (
    <div className={setClass(['app', {'menu-opened': showMenu}])}>
      <div className="menu"><Button icon={getMenuIcon} onClick={() => setShowMenu(!showMenu)}/></div>
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
                      onCompleteTask={(task) => onCompleteTask(data, task)}
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
