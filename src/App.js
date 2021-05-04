import List from './components/List/List';
import Button from './components/rButton/rButton';

import listIcon from './assets/icons/list.svg';
import addIcon from './assets/icons/add.svg';

import './App.scss';

function App() {
  const listData = [
    { label: 'Срочное', color: '#e57373' },
    { label: 'Личное', color: '#90a4ae' },
    { label: 'Frontend', color: '#ffcc80' },
    { label: 'Посмотреть', color: '#80cbc4' }
  ]
  return (
    <div className="app">
      <div className="app__sidebar">
        <Button icon={listIcon} isActive>Все задачи</Button>
        <List data={listData}/>
        <Button icon={addIcon} style={{color: '#808080'}}>Добавить папку</Button>
      </div>
      <div className="app__ticks">

      </div>
    </div>
  );
}

export default App;
