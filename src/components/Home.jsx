import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserProvider';

const Home = () => {


    return (
        <div>
            <Link to='/addpost'>테스트용 addPost</Link><br />
            <Link to='/post/1'>테스트용 Post</Link>
        </div>
    );
};

export default Home;