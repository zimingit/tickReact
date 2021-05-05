import List from './components/List';
import Button from './components/rButton';

import listIcon from './assets/icons/list.svg';
import addIcon from './assets/icons/add.svg';

import './App.scss';

function App() {
  const listData = [
    { label: 'Срочное', color: '#e57373', selected: true },
    { label: 'Личное', color: '#90a4ae', selected: false },
    { label: 'Frontend', color: '#ffcc80', selected: false },
    { label: 'Посмотреть', color: '#80cbc4', selected: false }
  ]
  return (
    <div className="app">
      <div className="app__sidebar">
        <Button icon={listIcon}>Все задачи</Button>
        <List data={listData}/>
        <Button icon={addIcon} style={{color: '#808080'}}>Добавить папку</Button>
      </div>
      <div className="app__ticks">

      </div>
    </div>
  );
}

export default App;
