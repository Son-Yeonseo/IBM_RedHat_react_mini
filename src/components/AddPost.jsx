import React, { useState, useEffect, useRef } from 'react';
import uuid4 from 'uuid4';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([
    { postId: '', user: '', title: '', content: '', date: '', postLikes: '' },
  ]);
  const contentRef = useRef(null);
  const [currUser, setCurrUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setCurrUser(JSON.parse(localStorage.getItem('currUser')) || {});
    setPosts(JSON.parse(localStorage.getItem('posts')) || []);
  }, []);

  const savePost = (e) => {
    e.preventDefault();

    if (title && content) {
      let saveCK = window.confirm('저장하시겠습까?');
      if (saveCK) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();

        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(
          day
        ).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(
          minutes
        ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        let post = {
          postId: uuid4(),
          user: currUser,
          title,
          content,
          date: formattedDate,
          postLikes: 0,
        };

        const newPosts = [...posts, post];
        setPosts(newPosts);
        localStorage.setItem('posts', JSON.stringify(newPosts));
        navigate('/글리스트');
      }
    } else {
      alert('제목과 내용을 입력해주세요');
    }
  };

  const cancelPost = () => {
    const check = window.confirm('게시물 작성을 취소하시겠습니까?');
    if (check) {
      navigate('/Post');
    }
  };

  const titleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (contentRef) contentRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-bg">
      {/* 상단 제목 */}
      <h1 className="text-5xl font-title font-title text-custom-r-btn mb-8">
        Hi! Study
      </h1>

      {/* 글쓰기 카드 */}
      <div className="w-[800px] bg-custom-div rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-cute font-bold text-center text-custom-line-col mb-6">
          Write
        </h2>

        {currUser ? (
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
        ) : (
          navigate('/Login')
        )}
      </div>
    </div>
  );
};

export default AddPost;
