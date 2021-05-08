import { AppBar, Button, IconButton, Link as LinkUI, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {

  const classes = useStyles();

  return <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        <LinkUI to='/home' color="inherit" component={Link}>Home</LinkUI>
      </Typography>
      <Button color="inherit" to='/' component={Link}>Sign in</Button>
    </Toolbar>
  </AppBar>
}

export default Header;