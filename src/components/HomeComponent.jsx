import { Link } from 'react-router-dom';
import API from '../services/api';


const Home = (props) => {
    let username = localStorage.getItem('username');
    localStorage.removeItem('username');
    console.log(username);
    API.post(`/users/${username}/`)
        .then(function (res) {
            console.log(res);
            // console.log('aaaa: ' + first.name);
            //   User.id = res.data;
            // setUserId(res.data);
        })
        .catch(function (er) {
            console.log(er);
        })

    return <>
        <h1>Home</h1>
        <Link to='/topics'>All Topics</Link>
        <Link to='/users'>All Users</Link>
    </>
};

export default Home;