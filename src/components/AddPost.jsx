import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import uuid4 from 'uuid4'; 
import { UserContext } from './UserProvider';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const contentRef = useRef(null);
  const navigate = useNavigate();

  // 전역 상태 불러오기
  const { currUser, posts, setPosts } = useContext(UserContext);

  // 저장
  const savePost = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('제목과 내용을 입력해주세요');
      return;
    }

    const saveCK = window.confirm('저장하시겠습니까?');
    if (!saveCK) return;

    // 시간 포맷
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(
      currentDate.getHours()
    ).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(
      currentDate.getSeconds()
    ).padStart(2, '0')}`;

    // 새 포스트 객체
    const newPost = {
      postId: uuid4(),
      user: currUser,
      title,
      content,
      date: formattedDate,
      postLikes: 0,
    };

    // posts 배열 업데이트
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts); // Context 상태 업데이트 → localStorage 자동 반영

    navigate('/'); // 메인 화면으로 이동
  };

  // 취소
  const cancelPost = () => {
    const check = window.confirm('게시물 작성을 취소하시겠습니까?');
    if (check) {
      navigate('/');
    }
  };

  // 엔터 → content 입력칸으로 이동
  const titleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (contentRef.current) contentRef.current.focus();
    }
  };

  // 로그인 안된 경우 → Login 화면으로
  if (!currUser) {
    navigate('/Login');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-bg">
      {/* 상단 제목 */}
      <h1 className="text-5xl font-title text-custom-r-btn mb-8">
        Hi! Study
      </h1>

      {/* 글쓰기 카드 */}
      <div className="w-[800px] bg-custom-div rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-cute font-bold text-center text-custom-line-col mb-6">
          Write
        </h2>

        <form onSubmit={savePost} className="flex flex-col gap-6">
          {/* 제목 입력 */}
          <input
            type="text"
            value={title}
            placeholder="제목을 입력해주세요..."
            onKeyDown={titleKeyDown}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-xl border border-custom-b-btn focus:outline-none focus:ring-2 focus:ring-custom-line-col bg-white text-gray-700 font-cute"
          />

          {/* 내용 입력 */}
          <textarea
            ref={contentRef}
            value={content}
            placeholder="내용을 입력해주세요..."
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full p-4 rounded-xl border border-custom-b-btn focus:outline-none focus:ring-2 focus:ring-custom-line-col bg-white text-gray-700 font-cute"
          />

          {/* 버튼 영역 */}
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-custom-r-btn text-white font-button font-semibold shadow-md hover:opacity-90"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={cancelPost}
              className="px-6 py-2 rounded-lg bg-custom-b-btn text-white font-button font-semibold shadow-md hover:opacity-90"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;