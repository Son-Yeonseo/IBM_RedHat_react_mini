import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './UserProvider';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const contentRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // Context에서 전역 상태 가져오기
  // 직접 localstrage에서 갖고 오니 수정 후 Post에 반영이 안됨. 
  const { currUser, posts, setPosts } = useContext(UserContext);
  const [post, setPost] = useState(null);

  // 초기 로딩
  useEffect(() => {
    const currentPost = posts.find(p => String(p.postId) === String(id));
    if (currentPost) {
      setPost(currentPost);
      setTitle(currentPost.title);
      setContent(currentPost.content);
    } else {
      alert("해당 게시물을 찾을 수 없습니다.");
      navigate("/");
    }
  }, [id, posts, navigate]); 
  //초기에 []로 초기 랜더링시에만 동작하게 코딩했으나, 더 의존성 기반에 반응하기 위해 수정
  //editpost/1 수정 중 다른 접속자가 수정하면 자동으로 수정된 post로 작업할 수있게

  // 저장
  const savePost = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('제목과 내용을 입력해주세요');
      return;
    }

    const saveCK = window.confirm('저장하시겠습니까?');
    if (!saveCK) return;

    // 현재 시간 포맷
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;

    // 수정된 포스트 객체
    const Modipost = {
      ...post,
      user: currUser,
      title,
      content,
      date: formattedDate,
    };

    // posts 배열 업데이트
    const updatedPosts = posts.map(p =>
      p.postId === Modipost.postId ? Modipost : p
    );

    setPosts(updatedPosts); // Context 상태 업데이트 → localStorage 자동 반영

    navigate(`/post/${id}`); // 수정한 글 상세 페이지로 이동
  };

  // 취소
  const cancelPost = () => {
    const check = window.confirm("게시물 수정을 취소하시겠습니까?");
    if (check) {
      navigate(`/post/${id}`);
    }
  };

  // 엔터 → content 입력칸 이동
  const titleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (contentRef.current) contentRef.current.focus();
    }
  };


  return (
    <div>
      <form onSubmit={savePost}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={titleKeyDown}
        />
        <textarea
          ref={contentRef}
          value={content}
          placeholder="내용을 입력해주세요"
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">수정완료</button>
        <button type="button" onClick={cancelPost}>취소</button>
        {/* button type='button'한 이유는 Form 형태여서 기본 타입이 submit임. 따라서 더 논리적으로 작성 */}
      </form>
    </div>
  );
};

export default EditPost;