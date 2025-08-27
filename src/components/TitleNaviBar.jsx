import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider'; // Context 사용하도록 수정

const TitleNaviBar = () => {
    // localStorage 대신 Context에서 currUser 가져오기
    const { currUser, setCurrUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        const logOutCK = window.confirm('정말 로그아웃 하시겠습니까?');
        if (logOutCK) {
            // Context의 setCurrUser로 null 설정 (UserProvider에서 localStorage 자동 처리)
            setCurrUser(null);
            navigate('/login'); // 경로를 App.js에 맞춰 수정
        }
    }

    // 게시글 작성 버튼 클릭 핸들러 - 로그인 확인 후 리다이렉션
    const handleWritePost = () => {
        if (!currUser) {
            alert("로그인이 필요한 기능입니다.");
            navigate('/login');
            return;
        }
        navigate('/addpost'); // App.js의 경로에 맞춰 수정
    }

    return (
        <>
            <div>
                <h1>HiStudy</h1>
            </div>
            <nav>
                <ul>
                    <li><Link to='/'>홈</Link></li> {/* ranking 라우트는 App.js에 추가 필요 */}
                    {currUser ? 
                        (<>
                            <li onClick={handleLogOut} style={{cursor: 'pointer'}}>로그아웃</li> {/* 클릭 가능하도록 스타일 추가 */}
                            <li onClick={handleWritePost} style={{cursor: 'pointer'}}>게시글 작성</li> {/* 버튼 방식으로 변경하고 경로 수정 */}
                        </>) : 
                        (<li><Link to='/login'>로그인</Link></li>) // 경로 수정
                    }
                </ul>
            </nav>
        </>
    );
};

export default TitleNaviBar;