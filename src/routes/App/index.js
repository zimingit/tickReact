import React , { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { List, Folder, Button, AddFolder, AddTask, TaskContainer, Task } from '../../components';
import setClass from '../../plugins/ClassNames'
import $ds from '../../api/DataService'

import listIcon from '../../assets/icons/list.svg';
import menuIcon from '../../assets/icons/menu.svg';
import closeIcon from '../../assets/icons/close.svg';
import './App.scss';

function App() {
  const history = useHistory()
  const filterFunc = ({filter}, task) => {
    const filterMatrix = {
      'Все': true,
      'null': true,
      'Выполненные': task.completed,
      'Невыполненные': !task.completed
    }

    return filterMatrix[filter]
  }

  const [folders, setFolders] = useState(null)
  const [folderSelected, setFolderSelected] = useState(null)
  const [tasks, setTasks] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const getMenuIcon = showMenu ? closeIcon : menuIcon

  useEffect(() => {
    (async () => {
      const folders = await $ds.getFolders()
      const [select = null] = folders
      setFolderSelected(select)
      setFolders(folders)
    })()
  }, [])

  // Folders
  const handleAddFolder = async (folder) => {
    const newFolder = await $ds.addFolder(folder)
    setFolders([...folders, newFolder])
  }

  const handleDelFolder = async (folder) => {
    const deleted = await $ds.delFolder(folder)
    setFolders(folders.filter(f => f.id !== deleted.id))
  }
  
  // Filters
  const handleTasksFilter = async (data, filter = null) => {
    const newFolder = { 
      color: data.color,
      id: data.id,
      label: data.label,
      filter
    }
    const updatedFolder = await $ds.updFolder(newFolder)
    const tasks = folderSelected ? $ds.getTasks(updatedFolder) : $ds.getAllTasks()
    setTasks(await tasks)
  }

  const handleFolderFilter = async (folder = null) => {
    setFolderSelected(folder)
  }

  useEffect(() => {
    (async () => {
      if (!folders) return
      const tasks = folderSelected ? await $ds.getTasks(folderSelected) : await $ds.getAllTasks()
      setTasks(tasks)
    })()
  }, [folderSelected, folders])

  // Tasks
  const onCompleteTask = async (folder, task) => {
    await $ds.updTask(folder, task)
    const tasks = folderSelected ? $ds.getTasks(folderSelected) : $ds.getAllTasks()
    setTasks(await tasks)
  }

  const onAddTask = async (folder, task) => {
    await $ds.addTask(folder, task)
    const tasks = folderSelected ? $ds.getTasks(folderSelected) : $ds.getAllTasks()
    setTasks(await tasks)
  }

  const onDeleteTask = async (folder, task) => {
    await $ds.delTask(folder, task)
    const tasks = folderSelected ? $ds.getTasks(folderSelected) : $ds.getAllTasks()
    setTasks(await tasks)
  }

  const onDetailedView = (folder, task) => {
    history.push(`/${folder.id}/${task.id}`)
  }

  return (
    <div className={setClass(['app', {'menu-opened': showMenu}])}>
      <div className="menu"><Button icon={getMenuIcon} onClick={() => setShowMenu(!showMenu)}/></div>
      
      <div className="app__sidebar">
        {folders &&
          <Button icon={listIcon}
                  isActive={!folderSelected}
                  onClick={() => handleFolderFilter()}>Все задачи</Button>
        }
        {folders &&
          <List>
            { folders.map((folder) => (
              <Folder {...{...folder, handleDelFolder}}
                      selected={folderSelected}
                      onClick={() => handleFolderFilter(folder)}
                      key={folder.id}/>
            ))}
          </List>
        }
        <AddFolder handleAddFolder={handleAddFolder}/>
      </div>

      <div className="app__tasks">
        {tasks.length > 0 ?
        <List>
          { tasks.map(folder => (
            <TaskContainer data={folder}
                           key={folder.id}
                           setFilter={handleTasksFilter}>

              { folder.tasks
                .filter(task => filterFunc(folder, task))
                .map(task => (
                <Task task={task} key={task.name}
                      onCompleteTask={(task) => onCompleteTask(folder, task)}
                      onDeleteTask={(task) => onDeleteTask(folder, task)}
                      onDetailedView={() => onDetailedView(folder, task)}/>
              ))}

            <AddTask onAddTask={(task) => onAddTask(folder, task)}/>
            </TaskContainer>
          ))}
        </List>
        : <h3 className="app__placeholder">Задачи отсутствуют</h3>
        }
      </div>
    </div>
  );
}

export default App;
