import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { React, useState } from 'react';

export default function DataDialog(props) {
  const { open, onClose } = props;
  const [userResponse, setUserResponse] = useState('');
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'> {props.label} </DialogTitle>
      <DialogContent>
        <TextareaAutosize
          aria-label='minimum height'
          rowsMin={3}
          placeholder=''
          cols={50}
          autoFocus={true}
          onChange={(e) => {
            setUserResponse(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={(e) => {
            onClose(userResponse);
            setUserResponse('');
          }}
          color='primary'
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
