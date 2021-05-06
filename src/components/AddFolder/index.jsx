import React, { useState } from 'react';
import Button from '../rButton';
import ListBadges from '../ListBadges';

import addIcon from '../../assets/icons/add.svg';
import closeIcon from '../../assets/icons/close.svg';
import './AddFolder.scss'

const AddFolder = ({handleAddFolder}) => {
  const [state, setState] = useState({
    selectedColor: '#e57373',
    showPopup: false,
    folderName: ''
  })
  const setSelected = (color) => (setState({...state, 'selectedColor': color}))
  const showPopup = () => (setState({...state, 'showPopup': true}))
  const closePopup = () => (setState({...state, 'showPopup': false}))
  const setName = (name) => (setState({...state, 'folderName': name}))
  const addFolder = () => {
    handleAddFolder(state.folderName, state.selectedColor)
    setName('')
    closePopup()
  }

  return (
    <div className="addFolder">
      <Button icon={addIcon}
              style={{color: '#808080'}}
              onClick={showPopup}>
                Добавить папку
      </Button>

      {state.showPopup && 
        <div className="addFolder__popup">

          <input placeholder="Название папки"
                 className="popup__input"
                 style={{borderColor: state.selectedColor}}
                 onChange={e => setName(e.target.value)}/>

          <ListBadges handleSelect={setSelected}/>

          <Button className="filled center"
                  style={{backgroundColor: state.selectedColor}}
                  onClick={addFolder}>
                    Добавить
          </Button>

          <div className="popup__close">
            <Button icon={closeIcon} onClick={closePopup}/>
          </div>

        </div>
      }
    </div>
  );
}

export default AddFolder;
