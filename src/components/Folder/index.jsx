import React, { useState, useEffect } from 'react'
import Badge from '../Badge'
import Button from '../rButton'
import setClass from '../../plugins/ClassNames.js'

import './Folder.scss'
import deleteIcon from '../../assets/icons/delete.svg'

const ListItem = ({label, color, selected, handleDelFolder, onClick}) => {
  // const testMultiClasses = setClass([
  //   ['arrayFirstClass', 'arraySecondClass'],
  //   [],
  //   {},
  //   'singleStringClass',
  //   {
  //     'objectClass': true,
  //     'objectSecondClass': false,
  //     'objectThirdClass': selected || true
  //   }
  // ])
  const [didMount, setDidMount] = useState(false)
  useEffect(() => {
    setDidMount(true)
    return () => setDidMount(false)
  }, [])

  const [isAccepted, setAccepted] = useState(false)
  const classes = setClass(['folder', {selected}])
  const getIcon = isAccepted ? null : deleteIcon
  const getDeleteLabel = isAccepted ? 'ok?' : null

  const handleDelete = (e) => {
    e.stopPropagation()
    if (isAccepted) return handleDelFolder(label)
    setAccepted(true)
    setTimeout(() => {
      if (!didMount) return
      setAccepted(false)
    }, 2000)
  }

  const handleClick = () => onClick(label)

  return (
    <li className={classes} onClick={handleClick}>
      <Badge color={color}/>
      <span className="label">{label}</span>
      <div className="folder_delete">
        <Button icon={getIcon} style={{color}} onClick={handleDelete}>{getDeleteLabel}</Button>
      </div>  
    </li>
  );
}

export default ListItem;
