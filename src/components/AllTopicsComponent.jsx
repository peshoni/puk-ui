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
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

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

    // { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    // {
    //     id: 'population',
    //     label: 'Population',
    //     minWidth: 170,
    //     align: 'right',
    //     format: (value) => value.toLocaleString('en-US'),
    // },

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
    Moment.locale('bg');
    const classes = useStyles();

    const [topics, setTopics] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // const [pageChange, handleChangePage] = React.useState(0);
    // const [rowChange, handleChangeRowsPerPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        console.log(event, newPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        console.log(+event.target.value);
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {
        API.get('/topics')
            .then(res => {


                res.data.forEach(element => {
                    let u = element.user;
                    element.fullName = u.firstName + ' ' + u.lastName + ' (' + u.role + ')';
                    element.createdAt = Moment(element.createdAt).format('DD.MM.YYYY - HH:mm:ss').toString();
                    element.modifiedAt = Moment(element.modifiedAt).format('DD.MM.YYYY - HH:mm:ss').toString();
                });

                setTopics(res.data);

            })
            .catch(err => console.log(err))
    }, []);

    return (

        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={4}>
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
                        {topics.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[2, 10]}
                component="div"
                count={topics.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default AllTopics;