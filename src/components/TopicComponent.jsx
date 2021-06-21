import Fab from '@material-ui/core/Fab';
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
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Tooltip from 'react-simple-tooltip';
import API from '../services/api';
import UserService from '../services/user-service';
import DataDialog from './DataDialog';

const columns = [
  { id: 'id', label: 'id', minWidth: 70 },
  { id: 'text', label: 'text', width: 300 },
  {
    id: 'createdAt',
    label: 'Created At',
    width: 100,
  },
  { id: 'modifiedAt', label: 'Modified At', width: 100 },
  {
    id: 'fullName',
    label: 'modified by',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
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

const Topic = (props) => {
  const [user] = useState(UserService.getUSer());
  const [topic, setTopic] = useState();
  const [repliesPage, setRepliesPage] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [allItems, setAllItems] = useState(0);
  const [topicId] = useState(+props.match.params.topicId);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    loadTopic(topicId, page, rowsPerPage);
  }, []);

  const loadTopic = (id, page, limit) => {
    API.get(`/reply/topicId/${topicId}/${page}/${rowsPerPage}/`)
      .then((response) => {
        let top = response.data.result;
        if (response.data.count === 0) {
          alert('empty collection');
          return;
        }
        setAllItems(response.data.count);

        top.repliesPage.forEach((element) => {
          let u = element.user;
          element.fullName =
            u.firstName + ' ' + u.lastName + ' (' + u.role + ')';
          element.createdAt = Moment(element.createdAt)
            .format('DD.MM.YYYY - HH:mm:ss')
            .toString();
          element.modifiedAt = Moment(element.modifiedAt)
            .format('DD.MM.YYYY - HH:mm:ss')
            .toString();
        });

        setTopic(top);
        setRepliesPage(top.repliesPage);

        API.get('/topics/saw/' + user.id + '/' + top.id + '/')
          .then((response) => {})
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    loadTopic(topicId, newPage, rowsPerPage);
  };

  const onCellClick = (action, params) => {
    switch (action) {
      case 'show':
        history.push(`/topic/${params.id}`);
        return;
      case 'edit':
        alert('Edit - Not implemented yet');
        break;
      case 'delete':
        alert('Delete - Not implemented yet');
        break;
      default:
        break;
    }
  };

  const canEditThis = (id) => {
    if (user.role === 'ADMIN' || user.role === 'MODERATOR') {
      return true;
    } else if (user.id === id) {
      return true;
    } else {
      return false;
    }
  };

  // DIALOG
  const [dialogIsOpen, setDialogIsOpen] = React.useState({
    isOpen: false,
  });
  const addReply = () => {
    let data = { isOpen: true, label: 'Add topic' };
    openDialog(data);
  };

  const openDialog = (params) => setDialogIsOpen(params);

  const closeDialog = (props) => {
    if (props?.length > 0) {
      const payload = {
        userId: user.id,
        topicId: topicId,
        text: props,
      };

      API.post('/reply', payload)
        .then((response) => {
          loadTopic(topicId, page, rowsPerPage);
          //history.push('/topics');
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setDialogIsOpen({ isOpen: false });
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={5}>
                <h2> Topic: {topic?.title} </h2>
              </TableCell>
              <TableCell align='right'>
                {' '}
                <Fab
                  size='small'
                  color='secondary'
                  aria-label='add'
                  onClick={() => addReply()}
                >
                  <AddIcon />
                </Fab>
              </TableCell>
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
            {repliesPage.map((row) => {
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
                          {canEditThis(row.user.id) === true && (
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

                          {canEditThis(row.user.id) === true && (
                            <Tooltip
                              title='delete'
                              content='delete'
                              style={{ zIndex: 10000 }}
                            >
                              <IconButton
                                aria-label='expand row'
                                size='small'
                                onClick={() => onCellClick('delete', row)}
                              >
                                <DeleteIcon />
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
        rowsPerPageOptions={[10]}
        component='div'
        count={allItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <DataDialog
        label='Add reply'
        open={dialogIsOpen.isOpen}
        onClose={closeDialog}
      />
    </Paper>
  );
};

export default Topic;
