import Paper from '@material-ui/core/Paper';
import { React, useState } from 'react';
import API from '../services/api';

const Home = (props) => {
  const [user, setUser] = useState({});
  console.log(props);
  let username = localStorage.getItem('username');
  localStorage.removeItem('username');
  console.log(username);
  
  API.post(`/users/${username}/`)
    .then(function (res) {
      let u = res.data;
      setUser(u);
        console.log(user);
        //https://www.pluralsight.com/guides/how-to-pass-data-between-react-components
      // sendData(user);
    })
    .catch(function (er) {
      console.log(er);
    });
  
  return (
    <> 
      <Paper>
        <h1>Welcome</h1> 
      </Paper> 
    </>
  );
};

export default Home;
