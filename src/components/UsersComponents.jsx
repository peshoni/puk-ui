import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import Moment from 'moment';
import { default as React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Tooltip from 'react-simple-tooltip';
import API from '../services/api';
import UserService from '../services/user-service';
import UserFormDialog from './UserFormDialog';
//const addActionRef = React.useRef();

const columns = [
  { id: 'id', label: 'id', minWidth: 70 },
  {
    id: 'createdAt',
    label: 'created at',
    description: ' ',
    sortable: false,
    width: 160,
  },
  {
    id: 'modifiedAt',
    label: 'modified at',
    description: ' ',
    sortable: false,
    width: 160,
  },
  {
    id: 'role',
    label: 'role',
    description: ' ',
    sortable: false,
    width: 160,
  },
  {
    id: 'username',
    label: 'username',
    description: ' ',
    sortable: false,
    width: 160,
  },

  {
    id: 'firstName',
    label: 'first name',
    description: ' ',
    sortable: false,
    width: 160,
  },
  {
    id: 'lastName',
    label: 'last name',
    description: ' ',
    sortable: false,
    width: 160,
  },
  {
    id: 'edit',
    label: 'edit',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
});

const AllUsers = (props) => {
  const [user, setUser] = useState(UserService.getUSer());
  const history = useHistory();
  Moment.locale('bg');
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [allItems, setAllItems] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = (e) => {
    API.get(`/users`)
      .then((res) => {
        setAllItems(res.data.count);
        res.data.result.forEach((element) => {
          // element.createdAt = Moment(element.createdAt)
          //   .format('DD.MM.YYYY - HH:mm:ss') 
          //   .toString();
          // element.modifiedAt = Moment(element.modifiedAt)
          //   .format('DD.MM.YYYY - HH:mm:ss')
          //   .toString();
        });
        setUsers(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const [dialogIsOpen, setDialogIsOpen] = React.useState({
    isOpen: false,
    user: {},
  });
  const openDialog = (params) => setDialogIsOpen(params);

  const closeDialog = (props) => {
    if (props.result === 'ok') {
      let us = props.user;
      us.createdAt = new Date(us.createdAt);
      delete us.updatedAt;
      if (us.role === null) {
        us.role = "USER";
      }
      us.modifiedAt = new Date();

      API.post('/users/up/', us)
        .then((response) => {
          loadUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setDialogIsOpen({ isOpen: false, user: {} });
  };

  const onCellClick = (action, params) => {
    let data = { isOpen: true, user: params }; 
    openDialog(data);
  };

  // const onAddUser = () => {
  //   console.log('ADD USER');let data = { isOpen: true, user: {} ,update:false}; 
  //   openDialog(data );
  // }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={8}>
                Users
              </TableCell> 
              {/* <TableCell align='right'>
                <Fab size='small' color='secondary' aria-label='add'>
                  <AddIcon onClick={() => onAddUser()} />
                </Fab>
              </TableCell> */}
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'edit') {
                      return (
                        <TableCell
                          key={row.id}
                          align={column.align}
                          style={{ marginRight: 15 }}
                        >

                          {user.role === 'ADMIN' && (
                            <Tooltip
                              title='edit'
                              content='edit'
                              style={{ zIndex: 10000 }}
                            >
                              <IconButton
                                aria-label='expand row'
                                size='small'
                                onClick={() => onCellClick('edit', row)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          )}

                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component='div'
        count={allItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <UserFormDialog
        user={dialogIsOpen.user}
        open={dialogIsOpen.isOpen}
        onClose={closeDialog}
      />
    </Paper>
  );
};

export default AllUsers;
