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
  const updatePost = (e) => {
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
  const cancelEdit = () => {
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
              onKeyDown={titleKeyDown}
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