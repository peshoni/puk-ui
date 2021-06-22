import Paper from '@material-ui/core/Paper';
import { React } from 'react';
import API from '../services/api';
import UserService from '../services/user-service';

const Home = (props) => {  
  let username = localStorage.getItem('username');
  localStorage.removeItem('username');
  if (username) {
    API.post(`/users/${username}/`)
      .then(function (res) {
        UserService.setUser(res.data); 
        props.fun(res.data)
      })
      .catch(function (er) {
        console.log(er);
      });
  }
  return (
    <>
      <Paper >
        <h1>Welcome</h1>
      </Paper>
    </>
  );
};

export default Home;
