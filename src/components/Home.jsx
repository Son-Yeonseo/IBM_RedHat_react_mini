import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {

    const [currUser,setCurrUser]=useState(null);
    const [posts, setPosts]=useState([]);

    const navigate = useNavigate();


    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("currUser") || "null");
        const postList=JSON.parse(localStorage.getItem("posts") || "[]");
        setCurrUser(user);
        setPosts(postList);
    },[]);
    
    //좋아요
    const maxLikes=posts.length > 0 ? 
    Math.max(...posts.map(post=>Number(post.likes) || 0)) 
    : 0;

    //게시글 분류(인기 게시글, 나머지 게시글)
    const popularPosts=posts.filter(post=>(Number(post.likes) || 0) === maxLikes);
    const restPosts=posts.filter(post=>(Number(post.likes) || 0) !== maxLikes);

    //받은 좋아요 수 집계
    const receivedLikes=useMemo(()=>{
        if(!currUser) return 0;
        return posts.filter(post=>post.user===currUser.nickname).reduce((sum,post)=>sum+(Number(post.likes) || 0),0);
    },[currUser,posts]);

    //로그아웃
    const handleLogout=()=>{
        setCurrUser(null);
        localStorage.removeItem("currUser");
    };

    //비로그인 시 경고창+로그인 경로 안내, 로그인 시 게시글 등록창으로
    const handlePostSubmit=()=>{
        if(!currUser) {
            alert("로그인이 필요한 기능입니다. 로그인 창으로 이동합니다.");
            navigate("/login");
            return;
        }
        navigate("/addEditPost/:postId");
    }

    return (
        <main>

            {/* user profile */}
            <section>
                {!currUser ? (
                    <div>
                        <p>비로그인 상태입니다.</p>
                        <button onClick={()=>navigate("/login")}>로그인</button>
                    </div>
                    ):(
                    <div>
                        <div>
                            <p>{currUser.nickname}님</p>
                        </div>
                        <div>
                            <p>Likes</p>
                            <p>{receivedLikes}</p>
                        </div>
                        <button onClick={handleLogout}>로그아웃</button>
                    </div>)}
            </section>


            {/* main board */}
            <section>
                <div>
                    <h2>게시글 목록</h2>
                    <button onClick={handlePostSubmit}>게시글 등록</button>
                </div>
                {posts.length === 0 ? (
                    <p>현재 게시글이 없습니다.</p>
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
                            )}
                        </ul>
                    </>
                )}
            </section>


            {/* popular posts */}
            <section>
                <h2>인기 게시글</h2>
                {popularPosts.length === 0 ? (
                    <p>인기 게시글이 없습니다.</p>
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