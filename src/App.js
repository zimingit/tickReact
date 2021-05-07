import React , { useState } from 'react';
import { List, Folder, Button, AddFolder, Task } from './components';
import { tasks, folders } from './dataset/tasks.json'

import listIcon from './assets/icons/list.svg';
import './App.scss';

function App() {
  const [foldersList, setFolders] = useState(folders)

  const selectedFolderLabel = (foldersList.find(folder => folder.selected) || {}).label
  const [filterlabel, setFilterLabel] = useState(selectedFolderLabel)

  const tasksFiltered = tasks.filter(({label}) => (filterlabel === label || !filterlabel))
  const [tasksList, setTasks] = useState(tasksFiltered)

  const getTaskColor = (name) => foldersList.find(folder => folder.label === name).color
  const handleAddFolder = (label, color) => {
    const newFolder = { label, color, selected: false }
    setFolders(folders => ([...folders, newFolder]))
  }

  const handleDelFolder = (name) => {
    setFolders(folders => (folders.filter(({label}) => label !== name)))
    if (name === filterlabel) {
      handleFilter(null)
    }
  }

  const handleFilter = (labelName = null) => {
    setFilterLabel(labelName)
    const newTask = tasks.filter(({label}) => (labelName === label || !labelName))
    setTasks(newTask)
    setFolders(folders => folders.map(folder => ({...folder, selected: folder.label === labelName})))
  }

  return (
    <div className="app">
      <div className="app__sidebar">
        <Button icon={listIcon}
                isActive={!filterlabel}
                onClick={() => handleFilter()}>Все задачи</Button>
        <List>
          { foldersList.map(({label, color, selected}) => (
            <Folder {...{label, color, selected, handleDelFolder}}
                    onClick={() => { handleFilter(label) }}
                    key={label}/>
          ))}
        </List>
        <AddFolder handleAddFolder={handleAddFolder}/>
      </div>
      <div className="app__tasks">
        <List>
          { tasksList.map(task => (
            <Task task={task} color={getTaskColor(task.label)} key={task.label}/>
          ))}
        </List>
      </div>
    </div>
  );
}

export default App;
