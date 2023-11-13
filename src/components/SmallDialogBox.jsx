import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { changeSmallDBValue, closeSmallDB } from '../redux/DialogBoxes/smallDialogBox';
import { createFolderReducer } from '../redux/file_manager/fileSlice';

export const SmallDialogBox = () => {
    const {open, title, contentText, name , yesButtonText, noButtonText} = useSelector(state=>state.smallDB)
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const handleClose = () => {dispatch(closeSmallDB())}
    const handleChange = e =>{
      //  dispatch(changeSmallDBValue({value : e.target.value}))
      setValue(e.target.value); 
    }
    const handleProceed = e=> {
      if(title === 'Create Folder'){
        //create folder logic here
        console.log("creating folder here")
        dispatch(createFolderReducer({ name : value, createdAt : Date.now(), size : 100 }))


      }

      handleClose();
      setValue("");
    }
  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {contentText}
      </DialogContentText>
     {Boolean(name) && <TextField
        autoFocus
        margin="dense"
        id={name}
        label={name}
        fullWidth
        variant="standard"
        value={value}
        onChange={handleChange}
      />}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>{noButtonText}</Button>
      <Button onClick={handleProceed}>{yesButtonText}</Button>
    </DialogActions>
  </Dialog>
  )
}
