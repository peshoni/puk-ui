import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { React, useState } from 'react';

export default function DataDialog(props) {
  console.log(props);
  const { open, onClose } = props;
  const [userResponse, setUserResponse] = useState('');

  const textChanged = (e) => {
    console.log(e.target.value);
    setUserResponse(e.target.value);
    //      setState({
    //   [e.target.name]: e.target.value
    // });
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'> {props.label} </DialogTitle>
      <DialogContent>
        <TextareaAutosize
          aria-label='minimum height'
          rowsMin={3}
          placeholder=''
          autoFocus='true'
          onChange={textChanged}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onClose} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
