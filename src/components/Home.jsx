import { useMemo, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider'; // Context 사용하도록 수정

const Home = () => {
    // Context에서 전역 상태 가져오기
    const { currUser, setCurrUser, posts, users } = useContext(UserContext);
    const navigate = useNavigate();

    // localStorage에서 데이터를 직접 가져오는 대신 Context 사용하도록 수정
    // useEffect는 UserProvider에서 이미 처리하므로 제거

    // 좋아요 계산 로직 수정 - post.likes -> post.postLikes로 통일
    const maxLikes = posts.length > 0 ? 
        Math.max(...posts.map(post => Number(post.postLikes) || 0)) 
        : 0;

    // 게시글 분류 - likes -> postLikes로 수정
    const popularPosts = posts.filter(post => (Number(post.postLikes) || 0) === maxLikes);
    const restPosts = posts.filter(post => (Number(post.postLikes) || 0) !== maxLikes);

    // 받은 좋아요 수 집계 - user.nickname -> user.userNickname, likes -> postLikes로 수정
    const receivedLikes = useMemo(() => {
        if (!currUser) return 0;
        return posts.filter(post => post.user?.userNickname === currUser.userNickname)
                   .reduce((sum, post) => sum + (Number(post.postLikes) || 0), 0);
    }, [currUser, posts]);

    // 로그아웃 - Context의 setCurrUser 사용
    const handleLogout = () => {
        setCurrUser(null);
    };

    // 게시글 등록 버튼 클릭 시 - 경로 수정 및 새 게시글 ID 생성
    const handlePostSubmit = () => {
        if (!currUser) {
            alert("로그인이 필요한 기능입니다. 로그인 창으로 이동합니다.");
            navigate("/login");
            return;
        }
        // 새 게시글 작성을 위해 'new' ID 사용
        navigate("/addpost");
    }

    return (
        <main>
<<<<<<<<< Temporary merge branch 1

=========
>>>>>>>>> Temporary merge branch 2
            {/* user profile */}
            <section>
                {!currUser ? (
                    <div>
                        <p>비로그인 상태입니다.</p>
<<<<<<<<< Temporary merge branch 1
                        <button onClick={()=>navigate("/login")}>로그인</button>
                    </div>
                    ):(
                    <div>
                        <div>
                            <p>{currUser.nickname}님</p>
=========
                        <button onClick={() => navigate("/login")}>로그인</button>
                    </div>
                ) : (
                    <div>
                        <div>
                            <p>{currUser.userNickname}님</p> {/* nickname -> userNickname으로 수정 */}
>>>>>>>>> Temporary merge branch 2
                        </div>
                        <div>
                            <p>Likes</p>
                            <p>{receivedLikes}</p>
                        </div>
                        <button onClick={handleLogout}>로그아웃</button>
<<<<<<<<< Temporary merge branch 1
                    </div>)}
            </section>


=========
                    </div>
                )}
            </section>

>>>>>>>>> Temporary merge branch 2
            {/* main board */}
            <section>
                <div>
                    <h2>게시글 목록</h2>
                    <button onClick={handlePostSubmit}>게시글 등록</button>
                </div>
                {posts.length === 0 ? (
                    <p>현재 게시글이 없습니다.</p>
<<<<<<<<< Temporary merge branch 1
                ):(
                    <>
                        <ul>
                            {restPosts.map((post)=>
                            <li key={post.postId}>
                            <Link to={`/post/${post.postId}`}>
                                <p>{post.title}</p>
                                <p>{post.user}</p>
                                <p>{post.likes}개 좋아요</p>
                            </Link>
                            </li>
=========
                ) : (
                    <>
                        <ul>
                            {restPosts.map((post) =>
                                <li key={post.postId}>
                                    <Link to={`/post/${post.postId}`}>
                                        <p>{post.title}</p>
                                        <p>{post.user?.userNickname}</p> {/* user -> user.userNickname으로 수정 */}
                                        <p>{post.postLikes}개 좋아요</p> {/* likes -> postLikes로 수정 */}
                                    </Link>
                                </li>
>>>>>>>>> Temporary merge branch 2
                            )}
                        </ul>
                    </>
                )}
            </section>

<<<<<<<<< Temporary merge branch 1

=========
>>>>>>>>> Temporary merge branch 2
            {/* popular posts */}
            <section>
                <h2>인기 게시글</h2>
                {popularPosts.length === 0 ? (
                    <p>인기 게시글이 없습니다.</p>
<<<<<<<<< Temporary merge branch 1
                ):(
                    <ul>
                        {popularPosts.map(post=>(
                            <li key={post.postId}>
                                <Link to={`/post/${post.postId}`}>
                                    <p>
                                        {post.title}
                                    </p>
                                    <p>
                                        {post.user}/{Number(post.likes) || 0}개 좋아요
=========
                ) : (
                    <ul>
                        {popularPosts.map(post => (
                            <li key={post.postId}>
                                <Link to={`/post/${post.postId}`}>
                                    <p>{post.title}</p>
                                    <p>
                                        {post.user?.userNickname}/{Number(post.postLikes) || 0}개 좋아요
>>>>>>>>> Temporary merge branch 2
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
};

export default Home;