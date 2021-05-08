import React , { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { List, Folder, Button, AddFolder, AddTask, TaskContainer, Task } from '../../components';
import setClass from '../../plugins/ClassNames'
import ls from '../../plugins/LocalDataset'

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

  const [foldersList, setFolders] = useState([])
  const [tasksList, setTasks] = useState([])
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
    await ls.delTasks(name)
  }
  
  // Filters
  const handleTasksFilter = async (data, tasksFilter = null) => {
    const newTasks = (await ls.getTasks()).map(tasks => {
      if (tasks.label === data.label) {
        tasks.filter = tasksFilter
      }
      return tasks
    })
    await ls.updTasks(newTasks)
    setTasks(await ls.getTasks(filter))
  }

  const handleFolderFilter = async (filter = null) => {
    const newFoldres = foldersList.map(folder => ({...folder, selected: folder.label === filter}))
    await ls.updFolders(newFoldres)
    setFolders(await ls.getFolders())
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

  const onDetailedView = ({label: folder}, id) => {
    history.push(`/${folder}/${id}`)
  }

  return (
    <div className={setClass(['app', {'menu-opened': showMenu}])}>
      <div className="menu"><Button icon={getMenuIcon} onClick={() => setShowMenu(!showMenu)}/></div>
      
      <div className="app__sidebar">
        {tasksList.length > 0 &&
          <Button icon={listIcon}
                  isActive={!filter}
                  onClick={() => handleFolderFilter()}>Все задачи</Button>
        }
        {tasksList.length > 0 &&
          <List>
            { foldersList.map(({label, color, selected}) => (
              <Folder {...{label, color, selected, handleDelFolder}}
                      onClick={handleFolderFilter}
                      key={label}/>
            ))}
          </List>
        }
        <AddFolder handleAddFolder={handleAddFolder}/>
      </div>

      <div className="app__tasks">
        {tasksList.length > 0 ?
        <List>
          { tasksList.map(data => (
            <TaskContainer data={data}
                           key={data.label}
                           setFilter={handleTasksFilter}>

              { data.tasks
                .filter(task => filterFunc(data, task))
                .map((task, id) => (
                <Task task={task} key={task.text}
                      onCompleteTask={(task) => onCompleteTask(data, task)}
                      onDeleteTask={(task) => onDeleteTask(data, task)}
                      onDetailedView={() => onDetailedView(data, id)}/>
              ))}

            <AddTask onAddTask={(task) => onAddTask(data, task)}/>
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
