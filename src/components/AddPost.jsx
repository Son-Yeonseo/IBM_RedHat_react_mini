import React from 'react';
import { useState, useEffect, useRef } from 'react';
import uuid4 from 'uuid4'; //고유 식별자 생성
import { useNavigate } from 'react-router-dom';

const AddPost = () => {

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [posts,setPosts] = useState([{postId:'',user:'',title:'',content:'', date:'', postLikes:'',}])
    const contentRef= useRef(null);
    const [currUser,setCurrUser] = useState({});
    const navigate = useNavigate();
    

    useEffect(()=>{
         setCurrUser(JSON.parse(localStorage.getItem('currUser')) || {});
         setPosts(JSON.parse(localStorage.getItem('posts')) || [])
    },[])


    const savePost =()=>{

        if(title && content){ // 내용 유무 체크
            let saveCK=window.confirm('저장하시겠습니까?') // 저장 컨펌 

            if(saveCK){
                //1. 시간 포멧팅
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth() + 1;
                const day = currentDate.getDate();
                const hours = currentDate.getHours();
                const minutes = currentDate.getMinutes();
                const seconds = currentDate.getSeconds();

                const formattedDate = 
                    `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} 
                    ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

                //등록할 포스트 내용 
                let post = { postId: uuid4(),
                            user : currUser,
                            title,
                            content,
                            date :formattedDate,
                            postLikes:0,
                    
                }
                
                const newPosts = [...posts, post] // useState는 비동기 작동으로 즉시 localStorage에 넣을 수 있는 변수 생성 후 작업
                setPosts(newPosts);
                localStorage.setItem('posts',JSON.stringify(newPosts)); //localstotage에 넣기
                navigate('/');
            }
        }else{
            alert('제목과 내용을 입력해주세요')
        }
    }

    const cancelPost=()=>{ // post 작성 취소

        const check = window.confirm("게시물 작성을 취소하시겠습니까?"); // 실행 재확인
        if(check){
            navigate('/Post') //위치 확인
        }

    }

    const titleKeyDown=(e)=>{ // 엔터 누르면, content 입력칸으로 넘어감
        if(e.key==='Enter'){
            e.preventDefault();
            if(contentRef)
                contentRef.current.focus();
        }
    }

    return (
        <div>
            {currUser ? //로그인 상태 확인
                (<form onSubmit={savePost}>
                <input type='text' value={title} 
                    placeholder='제목을 입력해주세요' 
                    onKeyDown={titleKeyDown} // 엔터 누르면, content 입력칸으로 넘어감
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <br/>
                <textarea ref={contentRef} 
                    value={content} 
                    placeholder='내용을 입력해주세요' 
                    onChange={(e)=>setContent(e.target.value)} 
                />
            
                <button type='submit'>저장</button>
                <button onClick={cancelPost}>취소</button>
                </form>) :
                (navigate('/Login')) //유저 없다면 Login 화면으로
            }
        </div>
    );
};

export default AddPost;