import React , { useState } from 'react';
import List from './components/List';
import Button from './components/rButton';
import AddFolder from './components/AddFolder';

import listIcon from './assets/icons/list.svg';
import './App.scss';

function App() {
  const [state, setState] = useState({
  listData: [
    { label: 'Срочное', color: '#e57373', selected: true },
    { label: 'Личное', color: '#90a4ae', selected: false },
    { label: 'Frontend', color: '#ffcc80', selected: false },
    { label: 'Посмотреть', color: '#80cbc4', selected: false }
  ]})
  const handleAddFolder = (label, color) => {
    const newList = { label, color, selected: false }
    setState({...state, listData: [...state.listData, newList]})
  }
  const handleDelFolder = (name) => {
    const filteredList = state.listData.filter(({label}) => label !== name)
    setState({...state, listData: filteredList})
  }

  return (
    <div className="app">
      <div className="app__sidebar">
        <Button icon={listIcon}>Все задачи</Button>
        <List handleDelFolder={handleDelFolder} data={state.listData}/>
        <AddFolder handleAddFolder={handleAddFolder}/>
      </div>
      <div className="app__ticks">

      </div>
    </div>
  );
}

export default App;
