

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
import Reply from '@material-ui/icons/Reply';
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Tooltip from "react-simple-tooltip";
import API from '../services/api';
import User from '../services/user';


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
        label: 'User',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
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

const Topic = (props) => {
    const userId = User.id;
    console.log('USER: ' + userId);
    const [topic, setTopic] = useState();
    const [repliesPage, setRepliesPage] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [allItems, setAllItems] = useState(0);

    const [loading, setLoading] = useState(true);

    let topicId = +props.match.params.topicId;

    const classes = useStyles();
    const history = useHistory();



    const loadTopic = (id, page, litit) => {
        console.log(id, page, litit);
    }
    useEffect(() => {
        API.get(`/reply/topicId/${topicId}/${page}/${rowsPerPage}/`)
            .then(res => {

                let top = res.data.result;
                console.log(top.repliesPage);

                setAllItems(res.data.count);

                top.repliesPage.forEach(element => {
                    let u = element.user;
                    element.fullName = u.firstName + ' ' + u.lastName + ' (' + u.role + ')';
                    element.createdAt = Moment(element.createdAt).format('DD.MM.YYYY - HH:mm:ss').toString();
                    element.modifiedAt = Moment(element.modifiedAt).format('DD.MM.YYYY - HH:mm:ss').toString();
                });
                //   topic = res.data.result;
                setTopic(top);

                setRepliesPage(top.repliesPage)
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }, [page, topicId, rowsPerPage]);




    loadTopic(1, 1, 1);

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

    }
    const canEditThis = (a) => {
        console.log('current user: ' + userId)
        console.log('reply by user: ' + a);
    }
    //  console.log(repliesPage);

    // return <>{topic?.title}</>
    return (

        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={5}>
                                {topic?.title}
                            </TableCell>
                            <TableCell align="right"> <Fab size="small" color="secondary" aria-label="add" to='/addreply' component={Link} >
                                <AddIcon />
                            </Fab></TableCell>
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
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];

                                        // return (
                                        //     <TableCell key={column.id} align={column.align}>
                                        //         {column.format && typeof value === 'number' ? column.format(value) : value}
                                        //     </TableCell>
                                        // )

                                        if (column.id === 'edit') {

                                            return (
                                                <TableCell key={row.id} align={column.align} style={{ marginRight: 15 }}>
                                                    <Tooltip title="reply" content="reply" style={{ zIndex: 10000 }}>
                                                        <IconButton aria-label="expand row" size="small" onClick={() => onCellClick('show', row)}>
                                                            <Reply />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="edit" content="edit" style={{ zIndex: 10000 }}>
                                                        <IconButton disabled={canEditThis(row.user.id)} aria-label="expand row" size="small" onClick={() => onCellClick('edit', row)}>
                                                            < EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="delete" content="delete" style={{ zIndex: 10000 }}>
                                                        <IconButton disabled={userId === row.user.id} aria-label="expand row" size="small" onClick={() => onCellClick('delete', row)}>
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

                        {/* <TableCell key={column.id} align={column.align}>
                            brada
                                            </TableCell> */}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[1, 10]}
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
// return <>
//     <Grid container>
//         <Grid item xs>
//             <h1>{topic?.title}</h1>
//         </Grid>
//         {/* <Grid item>
//             <Fab size="small" color="secondary" aria-label="add" to='/addtopic' component={Link} >
//                 <AddIcon />
//             </Fab>
//         </Grid> */}
//     </Grid>

//     {loading && <CircularProgress />}
//     {/* <div style={{ height: 300, width: '100%' }}>
//         <DataGrid rows={repliesPage} columns={columns} pageSize={10} />
//     </div> */}
//  </>


export default Topic;