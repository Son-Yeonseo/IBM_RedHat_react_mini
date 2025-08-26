import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const TitleNaviBar = () => {

    const [currUser,setCurrUser] = useState(window.localStorage.getItem('currUser'));

    const navigate = useNavigate();
    const handleLogOut = () => { // 로그아웃 클릭 시 실행
        const logOutCK = window.confirm('정말 로그아웃 하시겠습니까?'); // 로그아웃 여부 재확인
        if (logOutCK){
            localStorage.removeItem('currUser'); // 로컬스토리지 currUser 삭제
            setCurrUser({});
            navigate('/logIn');
        }
        else{
            return;
        }
    }

    return (
        <>
        <div>
            <h1>HiStudy</h1>
        </div>
        <nav>
            <ul>
                <li><Link to='/'>홈</Link></li>
                <li><Link to='/ranking'>명예의전당</Link></li>
                {currUser ? 
                    (<>
                    <li onClick={handleLogOut}>로그아웃</li>
                    <li><Link to='/addPost'>게시글 작성</Link></li>
                    </> ):
                    (<li><Link to='/logIn'>로그인</Link></li>)
                }
            </ul>
        </nav>
        </>
    );
};

export default TitleNaviBar;