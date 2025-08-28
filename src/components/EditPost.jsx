/* eslint-disable no-unreachable */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([
    { postId: '', user: '', title: '', content: '', date: '', postLikes: '' },
  ]);
  const contentRef = useRef(null);
  const [currUser, setCurrUser] = useState({});
  const { ID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const storedUser = JSON.parse(localStorage.getItem('currUser')) || {};
    setCurrUser(storedUser);
    setPosts(storedPosts);

    // 수정할 대상 불러오기
    const targetPost = storedPosts.find((p) => p.postId === ID);
    if (targetPost) {
      setTitle(targetPost.title);
      setContent(targetPost.content);
    }
  }, [ID]);

  const updatePost = (e) => {
    e.preventDefault();
    if (title && content) {
      const updatedPosts = posts.map((p) =>
        p.postId === ID ? { ...p, title, content } : p
      );
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      navigate('/');
    } else {
      alert('제목과 내용을 입력해주세요');
    }
  };

  const cancelEdit = () => {
    const check = window.confirm('게시물 수정을 취소하시겠습니까?');
    if (check) navigate('/Post');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFAE9]">
      {/* 상단 제목 */}
      <h1 className="text-5xl font-bold text-[#FF5A2D] mb-8">
        Hi! <span className="text-[#23A491]">Study</span>
      </h1>

      {/* 수정 카드 */}
      <div className="w-[800px] bg-[#23A491]/20 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#23A491] mb-6">
          Modify
        </h2>

        {currUser ? (
          <form onSubmit={updatePost} className="flex flex-col gap-6">
            {/* 제목 입력 */}
            <input
              type="text"
              value={title}
              placeholder="제목을 입력해주세요..."
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 rounded-xl border border-[#5ABBEC] focus:outline-none focus:ring-2 focus:ring-[#23A491] bg-[#FFFFFF] text-[#555555]"
            />

            {/* 내용 입력 */}
            <textarea
              ref={contentRef}
              value={content}
              placeholder="내용을 입력해주세요..."
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full p-4 rounded-xl border border-[#5ABBEC] focus:outline-none focus:ring-2 focus:ring-[#23A491] bg-[#FFFFFF] text-[#555555]"
            />

            {/* 버튼 영역 */}
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-[#FF5A2D] text-[#FFFFFF] font-semibold shadow-md hover:opacity-90"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-2 rounded-lg bg-[#5ABBEC] text-[#FFFFFF] font-semibold shadow-md hover:opacity-90"
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

export default EditPost;