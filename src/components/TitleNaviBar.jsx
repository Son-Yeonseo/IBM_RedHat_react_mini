import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider';

const TitleNaviBar = () => {
    const { currUser, setCurrUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        const logOutCK = window.confirm('정말 로그아웃 하시겠습니까?');
        if (logOutCK) {
            setCurrUser(null);
            navigate('/login');
        }
    }

    const handleWritePost = () => {
        if (!currUser) {
            alert("로그인이 필요한 기능입니다.");
            navigate('/login');
            return;
        }
        navigate('/addpost');
    }

    return (
        <header className="flex flex-col items-center justify-center p-8 bg-[#FFFAE9] font-sans">
            <h1 className="text-5xl font-bold text-[#F36B3B] mb-4">Hi! Study</h1>
            <nav className="w-full max-w-lg">
                <ul className="flex justify-around items-center text-[#71C5A8] text-lg font-bold">
                    <li>
                        <Link to="/" className="hover:text-[#F36B3B] transition-colors duration-200">홈</Link>
                    </li>
                    {currUser ? 
                        (<>
                            <li>
                                <span onClick={handleLogOut} className="hover:text-[#F36B3B] transition-colors duration-200 cursor-pointer">로그아웃</span>
                            </li>
                            <li>
                                <span onClick={handleWritePost} className="hover:text-[#F36B3B] transition-colors duration-200 cursor-pointer">게시글 작성</span>
                            </li>
                        </>) : 
                        (<li>
                            <Link to='/login' className="hover:text-[#F36B3B] transition-colors duration-200">로그인</Link>
                        </li>)
                    }
                </ul>
            </nav>
        </header>
    );
};

export default TitleNaviBar;