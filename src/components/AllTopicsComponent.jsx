import {allTopics} from '../services/mock';
import {useHistory} from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 130},
    { field: 'createdAt', headerName: 'Created At', width: 130 },
    { field: 'modifiedAt', headerName: 'Modified At', width: 130 },
    {
      field: 'user',
      headerName: 'User',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>{
          return `${params.row.user.firstName} ${params.row.user.lastName}`
      }
    },
];

const AllTopics = (props) => {

    const history = useHistory();

    const onCellClick = (params) => {
        if (params.field === 'title') {
            const topicId = params.row.id;
            history.push(`/topic/${topicId}`);
        }
    }

    return <>
        <h1>All Topics</h1>
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={allTopics} columns={columns} pageSize={5} onCellClick={onCellClick}/>
        </div>
    </>
};

export default AllTopics;