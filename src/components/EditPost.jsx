/* eslint-disable no-unreachable */
import React, { useState,useRef,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditPost =()=>{

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [post,setPost] = useState({postId:'',user:'',title:'',content:'', date:'', postLikes:'',})
    const contentRef= useRef(null);
    const [currUser,setCurrUser] = useState({});
    const {ID} =useParams().id;
    const navigate = useNavigate();
  
    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('currUser')) || {};
      setCurrUser(user);
      const posts =(JSON.parse(localStorage.getItem('posts'))) || [];
      const currentPost=posts.find(p=>p.postId === ID);
      if (currentPost) {
        setPost(currentPost);
        setTitle(currentPost.title);
        setContent(currentPost.content);
      } else {
        alert("해당 게시물을 찾을 수 없습니다.");
        navigate("/home");
      }
    },[])

    const savePost =(e)=>{

      e.preventDefault()
      if(title && content){ // 내용 유무 체크
          let saveCK=window.confirm('저장하시겠습까?') // 저장 컨펌 

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
              let Modipost = { ...post,
                          user : currUser,
                          title,
                          content,
                          date :formattedDate,
                        }
                setPost(Modipost)
                let posts =(JSON.parse(localStorage.getItem('posts'))) || []; 
                posts = posts.map(p=>p.postId===Modipost.postId ? Modipost : p.postId?Modipost :p);
                localStorage.setItem('posts',JSON.stringify(posts)); //localstotage에 넣기
                navigate('/글리스트');
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

    return(
    <div>
      <form onSubmit={savePost}>
        <input type='text'value={title}
          onChange={(e)=>setTitle(e.target.value)}
          onKeyDown={titleKeyDown}
        />
        <textarea ref={contentRef} 
          value={content} 
          placeholder='내용을 입력해주세요' 
          onChange={(e)=>setContent(e.target.value)} 
        />
        <button type='submit'>수정완료</button>
        <button onClick={cancelPost}>취소</button>

      </form>
    </div>)
};

export default EditPost;