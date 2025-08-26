import React from 'react';
import { Link } from 'react-router-dom';

const NaviBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to='/'>홈</Link></li>
                <li><Link to='/'>친구관리</Link></li>
                <li><Link to='/'>친구목록</Link></li>
                <li><Link to='/board'>피드</Link></li>
            </ul>
        </nav>
    );
};

export default NaviBar;