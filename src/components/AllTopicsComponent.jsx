// import { CircularProgress } from '@material-ui/core';
// import Fab from '@material-ui/core/Fab';
// import Grid from '@material-ui/core/Grid';
// import { DataGrid } from '@material-ui/data-grid';
// import AddIcon from '@material-ui/icons/Add';
// import { useEffect, useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import API from '../services/api';


// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'title', headerName: 'Title', width: 130 },
//     { field: 'createdAt', headerName: 'Created At', width: 200 },
//     { field: 'modifiedAt', headerName: 'Modified At', width: 200 },
//     {
//         field: 'user',
//         headerName: 'User',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160
//     },
// ];

// const AllTopics = (props) => {
//     const history = useHistory();
//     const [topics, setTopics] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         API.get('/topics')
//             .then(res => {
//                 setTopics(res.data);
//                 setLoading(false);
//             })
//             .catch(err => console.log(err))
//     }, []);

//     const onCellClick = (params) => {
//         if (params.field === 'title') {
//             const topicId = params.row.id;
//             history.push(`/topic/${topicId}`);
//         }
//     }

//     return <>

//         <Grid container>
//             <Grid item xs>
//                 <h1>All Topics</h1>
//             </Grid>
//             <Grid item>
//                 <Fab size="small" color="secondary" aria-label="add" to='/addtopic' component={Link} >
//                     <AddIcon />
//                 </Fab>
//             </Grid>
//         </Grid>

//         {/* <h1>All Topics</h1>
//         <div class="actions">
//             <Fab size="small" color="secondary" aria-label="add" to='/addtopic' component={Link} >
//                 <AddIcon />
//             </Fab>
//         </div> */}




//         {/* <Button color="inherit" to='/addtopic' component={Link}>Create Topic</Button> */}
//         { loading && <CircularProgress />}
//         <div style={{ height: 500, width: '100%' }}>
//             <DataGrid rows={topics} columns={columns} pageSize={5} onCellClick={onCellClick} />
//         </div>
//     </>
// };

// export default AllTopics;

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
import ReplyAll from '@material-ui/icons/ReplyAll';
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Tooltip from "react-simple-tooltip";
import API from '../services/api';

 
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
        label: 'User',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
    },
    {
        id: 'edit',
        label: 'edit',

        // render: (rowData) =>
        //     rowData && (
        //         <IconButton
        //             color="secondary">
        //             EDIT
        //         </IconButton>
        //     )
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

const AllTopics = (props) => {
    const history = useHistory();
    Moment.locale('bg');
    const classes = useStyles();

    const [topics, setTopics] = useState([]);
    
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
   

    useEffect(() => {
        API.get(`/topics/${page}/${rowsPerPage}/`)
            .then(res => {
                console.log(res);
                setAllItems(res.data.count);
                res.data.result.forEach(element => {
                    let u = element.user;
                    element.fullName = u.firstName + ' ' + u.lastName + ' (' + u.role + ')';
                    element.createdAt = Moment(element.createdAt).format('DD.MM.YYYY - HH:mm:ss').toString();
                    element.modifiedAt = Moment(element.modifiedAt).format('DD.MM.YYYY - HH:mm:ss').toString();
                });
                setTopics(res.data.result);
            })
            .catch(err => console.log(err))
    }, [page, rowsPerPage]);


    const [open, setOpen] = React.useState(false);

    
    return (

        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={5}>
                                all topics
                               
                            </TableCell>
                            <TableCell align="right"> <Fab size="small" color="secondary" aria-label="add" to='/addtopic' component={Link} >
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
                        {topics.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];

                                        if (column.id === 'edit') {
                                            console.log('EHAAAA')
                                            return ( 
                                                <TableCell key={row.id} align={column.align} style={{ marginRight: 15 }}>
                                                    <Tooltip title="comments" content="comments"  style={{zIndex:10000}}> 
                                                        <IconButton aria-label="expand row" size="small" onClick={()=>onCellClick('show',row)}>
                                                        <ReplyAll /> 
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="edit" content="edit"  style={{zIndex:10000}}> 
                                                        <IconButton aria-label="expand row" size="small" onClick={()=>onCellClick('edit',row)}>                                    
                                                            < EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="delete" content="delete"  style={{zIndex:10000}}> 
                                                        <IconButton aria-label="expand row" size="small" onClick={()=>onCellClick('delete',row)}>
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
                rowsPerPageOptions={[5, 10]}
                component="div"
                // count={topics.length}
                count={allItems}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default AllTopics;