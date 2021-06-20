import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { React, useEffect, useState } from 'react';

export default function UserFormDialog(props) { 
  const { open, onClose } = props; 
  const [user, setUser] = useState({});
  const [moderator, setModerator] =  useState({  
    check:false,
  });

  useEffect(() => { 
    setUser(props.user); 
    setModerator({check:props.user.role === 'MODERATOR'})
  }, [props]); 
  
  const textChanged = (e, v) => { 
    let u = Object.assign({}, user);
   
    u[e] = v;
    console.log(u);
    setUser( u);
  };
  const handleChange = (event) => {
    console.log(user)
    let u = Object.assign({}, user);
    u.role = event.target.checked ? 'MODERATOR' : 'USER';
    setUser(u);
    console.log(user);

    setModerator({ ...moderator, [event.target.name]: event.target.checked });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      u={user}
      aria-labelledby='form-dialog-title'
    >
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
          value={user.firstName}
          onChange={(e) => {
            textChanged("firstName", e.target.value);
          }}
        />
        <TextField
          variant='outlined'
          margin='normal'
          id='lastName'
          name='lastName'
          label='last name'
          type='text'
          fullWidth
          value={user.lastName}
          onChange={(e) => {
            textChanged("lastName", e.target.value);
          }}
        />
         <TextField
          variant='outlined'
          margin='normal'
          id='username'
          name='username'
          label='username'
          type='text'
          fullWidth
          value={user.username}
          onChange={(e) => {
            textChanged("username", e.target.value);
          }}
          
        />
         <TextField
          variant='outlined'
          margin='normal'
          id='password'
          name='password'
          label='password'
          type='text'
          fullWidth
          value={user.password}
          onChange={(e) => {
            textChanged("password", e.target.value);
          }}
        />
        {user.role !== 'ADMIN' && (
         <FormControlLabel
        control={
          <Switch
            checked={moderator.check}
            onChange={handleChange}
            name="check"
            color="primary"
          />
        }
        label="moderator"
      />
      )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => {
            onClose({ result: 'cancel', user: user });
          }}
          color='primary'
        >
          Cancel{' '}
        </Button>
        <Button
          onClick={(e) => {
            onClose({ result: 'ok', user: user });
          }}
          color='primary'
        >
          Save{' '}
        </Button>{' '}
      </DialogActions>{' '}
    </Dialog>
  );
}
