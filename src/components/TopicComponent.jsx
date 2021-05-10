
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect, useState } from 'react';
import API from '../services/api';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'modifiedAt', headerName: 'Modified At', width: 130 },
    { field: 'text', headerName: 'text', width: 200 },
    // {
    //     field: 'user',
    //     headerName: 'User',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160
    // },
];

const Topic = (props) => {
    const [topic, setTopic] = useState();
    const [repliesPage, setRepliesPage] = useState();

    const topicId = +props.match.params.topicId;
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        API.get(`/reply/topicId/${topicId}/0/20/`)
            .then(res => {
                console.log(res);
                //   topic = res.data.result;
                setTopic(res.data.result);

                setRepliesPage(res.data.result.repliesPage)
                setLoading(false);
            })
            .catch(err => console.log(err))
    }, []);

    console.log(repliesPage);

    // return <>{topic?.title}</>
    return <>
        <Grid container>
            <Grid item xs>
                <h1>{topic?.title}</h1>
            </Grid>
            {/* <Grid item>
                <Fab size="small" color="secondary" aria-label="add" to='/addtopic' component={Link} >
                    <AddIcon />
                </Fab>
            </Grid> */}
        </Grid>

        { loading && <CircularProgress />}
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={repliesPage} columns={columns} pageSize={10} />
        </div>
    </>

};

export default Topic;