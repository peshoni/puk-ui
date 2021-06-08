import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { React, useState } from 'react';

export default function UserFormDialog(props) {
  console.log(props);
  const { open, onClose } = props;
  const [user, setUser] = useState();

  console.log(user);
  // setUser(_.clone(props?.user));

  const textChanged = (e) => {
    //     console.log(state)
    //      setState({
    //   [e.target.name]: e.target.value
    // });
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'> Edit user </DialogTitle>
      <DialogContent>
        <TextField
          variant='outlined'
          margin='normal'
          id='firstName'
          name='firstName'
          label='first name'
          type='text'
          fullWidth
          value={user?.firstName}
          onChange={textChanged}
        />{' '}
        <TextField
          variant='outlined'
          margin='normal'
          id='lastName'
          name='lastName'
          label='last name'
          type='text'
          fullWidth
          value={user?.lastName}
          onChange={textChanged}
        />{' '}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel{' '}
        </Button>
        <Button onClick={onClose} color='primary'>
          Save{' '}
        </Button>{' '}
      </DialogActions>{' '}
    </Dialog>
  );
}
