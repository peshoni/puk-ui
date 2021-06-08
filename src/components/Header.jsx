import {
  AppBar,
  Button,
  Link as LinkUI,
  Toolbar,
  Typography
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { default as Menu } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Group from '@material-ui/icons/Group';
import List from '@material-ui/icons/List';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
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
  console.log(props);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <StyledMenu
          id='customized-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem to='/users' component={Link} onClick={handleClose}>
            <ListItemIcon>
              <Group fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='Users' />
          </StyledMenuItem>
          <StyledMenuItem to='/topics' component={Link} onClick={handleClose}>
            <ListItemIcon>
              <List fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='Topics' />
          </StyledMenuItem>
        </StyledMenu>

        <Typography variant='h6' className={classes.title}>
          <LinkUI to='/home' color='inherit' component={Link}>
            Home
          </LinkUI>
        </Typography>

        <Button color='inherit' to='/' component={Link}>
          Sign in
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
