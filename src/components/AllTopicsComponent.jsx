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
import EditIcon from '@material-ui/icons/Edit';
import ReplyAll from '@material-ui/icons/ReplyAll';
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Tooltip from 'react-simple-tooltip';
import API from '../services/api';
import DataDialog from './DataDialog';

//const addActionRef = React.useRef();
const columns = [
  { id: 'id', label: 'id', minWidth: 70 },
  { id: 'title', label: 'Title', width: 130 },
  {
    id: 'createdAt',
    label: 'Created At',
    width: 200,
  },
  { id: 'modifiedAt', label: 'Modified At', width: 200 },
  {
    id: 'fullName',
    label: 'created by',
    description: 'This column has a value getter and is not sortable.',
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

const AllTopics = (props) => {
  const history = useHistory();
  Moment.locale('bg');
  const classes = useStyles();

  const [topics, setTopics] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [allItems, setAllItems] = React.useState(0);
  const [editorId, setEditorId] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onCellClick = (action, params) => {
    switch (action) {
      case 'show':
        history.push(`/topic/${params.id}`);
        return;
      case 'edit':
        console.log(' EDIT ');
        break;
      case 'delete':
        console.log(' DELETE ');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = (e) => {
    
    API.get(`/topics/${page}/${rowsPerPage}/`)
      .then((res) => {
        setAllItems(res.data.count);
        setEditorId(res.data.editorId);
        res.data.result.forEach((element) => {
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
        setTopics(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const [dialogIsOpen, setDialogIsOpen] = React.useState({
    isOpen: false,
  });

  const addTopic = () => {
    let data = { isOpen: true, label: 'Add topic' };
    openDialog(data);
  };

  const openDialog = (params) => setDialogIsOpen(params);

  const closeDialog = (props) => { 
    if (props?.length > 0) {
      const payload = {
        userId: 1, // TODO User..?
        title: props,
      };

      API.post('/topics', payload)
        .then((response) => {
          loadTopics();
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
                <h2> topics </h2>
              </TableCell>
              <TableCell align='right'>
                <Fab size='small' color='secondary' aria-label='add'>
                  <AddIcon onClick={() => addTopic()} />
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
            {topics.map((row) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    if (column.id === 'edit') {                      
                      if (row.user.id === editorId) {
                        return (
                          <TableCell
                            key={row.id}
                            align={column.align}
                            style={{ marginRight: 15 }}
                          >
                            <Tooltip
                              title='comments'
                              content='comments'
                              style={{ zIndex: 10000 }}
                            >
                              <IconButton
                                aria-label='expand row'
                                size='small'
                                onClick={() => onCellClick('show', row)}
                              >
                                <ReplyAll />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title='edit'
                              content='edit'
                              style={{ zIndex: 10000 }}
                            >
                              <IconButton
                                aria-label='expand row'
                                size='small'
                                disabled={row.user.id !== editorId}
                                onClick={() => onCellClick('edit', row)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={row.id}
                            align={column.align}
                            style={{ marginRight: 15 }}
                          >
                            <Tooltip
                              title='comments'
                              content='comments'
                              style={{ zIndex: 10000 }}
                            >
                              <IconButton
                                aria-label='expand row'
                                size='small'
                                onClick={() => onCellClick('show', row)}
                              >
                                <ReplyAll />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        );
                      }
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
      <DataDialog
        label='Add Topic'
        open={dialogIsOpen.isOpen}
        onClose={closeDialog}
      />
    </Paper>
  );
};

export default AllTopics;
