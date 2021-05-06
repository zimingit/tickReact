import React, { useState } from 'react';
import Button from '../rButton';
import Input from '../FormWidgets/Input'
import ListBadges from '../ListBadges';

import addIcon from '../../assets/icons/add.svg';
import closeIcon from '../../assets/icons/close.svg';
import './AddFolder.scss'

const AddFolder = ({handleAddFolder}) => {
  const [color, setColor] = useState('#e57373');
  const [viewPopup, setViewPopup] = useState(false);
  const [folderName, setFolderName] = useState('');

  const showPopup = () => (setViewPopup(true))
  const closePopup = () => (setViewPopup(false))
  const addFolder = () => {
    handleAddFolder(folderName, color)
    setFolderName('')
    closePopup()
  }

  return (
    <div className="addFolder">
      <Button icon={addIcon}
              style={{color: '#808080'}}
              onClick={showPopup}>
                Добавить папку
      </Button>

      {viewPopup && 
        <div className="addFolder__popup">

          <Input  value={folderName}
                  onInput={setFolderName}
                  placeholder="Название папки"
                  style={{borderColor: color}}/>

          <ListBadges handleSelect={setColor}/>

          <Button className="filled center"
                  style={{backgroundColor: color}}
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
