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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Moment from 'moment';
import { default as React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Tooltip from "react-simple-tooltip";
import API from '../services/api';


//const addActionRef = React.useRef();

const columns = [
    { id: 'id', label: 'id', minWidth: 70 },
    // { id: 'title', label: 'Title', width: 130 },
    // {
    //     id: 'createdAt',
    //     label: 'Created At',
    //     width: 200,
    // },
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
 
    }
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
    const history = useHistory();
    Moment.locale('bg');
    const classes = useStyles();

    const [users, setUsers] = useState([]);
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [allItems, setAllItems] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        console.log(event, newPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onCellClick = (action, params) => {
        console.log(action);
        console.log(params);
        switch (action) {
          
            case 'edit':
               alert(' EDIT - Not implemented ');
            break;
            case 'delete':
                alert(' DELETE - Not implemented ');  
            break;
        
            default:
                break;
        }
      
    }
   

    useEffect(() => {
        console.log('oooo')
        API.get(`/users`)
            .then(res => {
                console.log(res);
                setAllItems(res.data.count);
                res.data.result.forEach(element => {
                    // let u = element.user;
                    // element.fullName = u.firstName + ' ' + u.lastName + ' (' + u.role + ')';
                    console.log(element );
                    
                      element.createdAt = Moment(element.createdAt).format('DD.MM.YYYY - HH:mm:ss').toString();
                      element.modifiedAt = Moment(element.modifiedAt).format('DD.MM.YYYY - HH:mm:ss').toString();
                });
                 setUsers(res.data.result );
            })
            .catch(err => console.log(err))
    }, [page, rowsPerPage]);
 
    return (

        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={5}>
                                all Users
                               
                            </TableCell>
                            {/* <TableCell align="right"> <Fab size="small" color="secondary" aria-label="add" to='/addUser' component={Link} >
                                <AddIcon />
                            </Fab></TableCell> */}
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
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id]; 
                                        if (column.id === 'edit') { 
                                            return (
                                                <TableCell key={row.id} align={column.align} style={{ marginRight: 15 }}> 
                                                    <Tooltip title="edit" content="edit" style={{ zIndex: 10000 }}>
                                                        <IconButton aria-label="expand row" size="small" onClick={() => onCellClick('edit', row)}>
                                                            < EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="delete" content="delete" style={{ zIndex: 10000 }}>
                                                        <IconButton aria-label="expand row" size="small" onClick={() => onCellClick('delete', row)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            )
                                        } else {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            )
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
                component="div" 
                count={allItems}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default AllUsers;