import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../services/api';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CreateTopic = (props) => {
  //export default function CreateTopic() 
  const classes = useStyles();
  const history = useHistory();

  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      userId: 1,
      title: title
    }

    if (!title) {
      return;
    }


    API.post('/topics', payload)
      .then((response) => {
        history.push('/topics');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Topic
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
            value={title}
            onChange={event => setTitle(event.target.value)}
            autoComplete="off"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add
          </Button>

        </form>
      </div>
    </Container>
  );
}

export default CreateTopic;