import { Link } from 'react-router-dom';

const Home = (props) => {
    return <>
        <h1>Home</h1>
        <Link to='/topics'>All Topics</Link>
    </>
};

export default Home;