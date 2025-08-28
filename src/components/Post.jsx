import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import uuid4 from 'uuid4';

const Post = () => {
  const navigate = useNavigate();
  const postId = useParams().id;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  // currUser null 체크 추가
  const [currUser] = useState(() => {
    try {
      const user = localStorage.getItem('currUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Failed to parse currUser from localStorage:', error);
      return null;
    }
  });

  useEffect(() => {
    // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
    if (!currUser) {
      alert('로그인이 필요합니다.');
      navigate('/login'); // 또는 적절한 로그인 페이지 경로
      return;
    }
    
    loadPost();
    loadComments();
  }, [postId, currUser, navigate]);


  const loadPost = () => {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const foundPost = posts.find((p) => p.postId === postId);
    setPost(foundPost);
  };

  const handleEditPost = (postId) => {
    navigate(`/editpost/${postId}`);
  };

  // 게시글 삭제
	const handleDeletePost = (postId) => {
	if (!post) return;

	// 본인 글만 삭제
	if (post.user?.id !== currUser?.id) {
		alert('본인 게시글만 삭제할 수 있습니다.');
		return;
	}

	if (!window.confirm('정말 이 게시글을 삭제할까요?')) return;

	// 1) posts에서 해당 글 제거
	const posts = JSON.parse(localStorage.getItem('posts') || '[]');
	const updatedPosts = posts.filter(p => p.postId !== postId);
	localStorage.setItem('posts', JSON.stringify(updatedPosts));

	// 2) comments에서 해당 글의 댓글 제거
	const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
	const filteredComments = allComments.filter(c => c.postId !== postId);
	localStorage.setItem('comments', JSON.stringify(filteredComments));

	// (선택) 작성자 누적 좋아요 조정이 필요하면 여기서 처리

	// 3) 목록(또는 이전 페이지)으로 이동
	navigate(-1); // 필요하면 navigate('/board') 등으로 변경
	};

  const loadComments = () => {
    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const postComments = allComments.filter((c) => c.postId === postId);
    setComments(postComments);
  };

  const saveComments = (updatedComments) => {
    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const otherComments = allComments.filter((c) => c.postId !== postId);
    const newAllComments = [...otherComments, ...updatedComments];
    localStorage.setItem('comments', JSON.stringify(newAllComments));
  };

  const handleLike = () => {
    if (!post) return;

    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const newIsLiked = !post.isLiked;
    const likeChange = newIsLiked ? 1 : -1;

    const updatedPosts = posts.map((p) =>
      p.postId === postId
        ? { ...p, postLikes: p.postLikes + likeChange, isLiked: newIsLiked }
        : p
    );

    const updatedUsers = users.map((u) =>
      u.nickname === post.user
        ? { ...u, userLikes: u.userLikes + likeChange }
        : u
    );

    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setPost((prev) => ({
      ...prev,
      postLikes: prev.postLikes + likeChange,
      isLiked: newIsLiked,
    }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const newCommentObj = {
      id: uuid4(),
      postId,
      user: currUser,
      content: newComment.trim(),
      date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
        2,
        '0'
      )} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(
        2,
        '0'
      )}:${String(seconds).padStart(2, '0')}`,
    };

    const updatedComments = [...comments, newCommentObj];
    setComments(updatedComments);
    saveComments(updatedComments);
    setNewComment('');
  };

  const handleEditComment = (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    setEditingComment(commentId);
    setEditCommentText(comment.content);
  };

  const handleSaveEdit = () => {
    if (!editCommentText.trim()) return;

    const updatedComments = comments.map((c) =>
      c.id === editingComment ? { ...c, content: editCommentText.trim() } : c
    );

    setComments(updatedComments);
    saveComments(updatedComments);
    setEditingComment(null);
    setEditCommentText('');
  };

  const handleDeleteComment = (commentId) => {

    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      const updatedComments = comments.filter((c) => c.id !== commentId);
      setComments(updatedComments);
      saveComments(updatedComments);
    }
  };

  if (!post) {
    return <div className="text-center text-gray-500">게시글을 찾을 수 없습니다.</div>;
  }

  return (
	<div className="flex items-center justify-center h-screen bg-[#FFFAE9]">
    <div className="w-[800px] h-[771px] mx-auto mt-12 bg-custom-div rounded-[40px] flex flex-col items-center p-8 shadow-lg">
      {/* 게시글 영역 */}
      <div className="bg-white w-[600px] rounded-[30px] shadow-md p-6">
        {/* 게시글 헤더 */}
        <div className="border-b border-gray-200 pb-3 mb-4">
          <h2 className="text-xl font-bold text-orange-500 mb-2">{post.title}</h2>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
              <span className="mr-2">{post.user.userNickname}</span>
              <span>{post.date}</span>
            </div>
            {post.user.id === currUser.id && (
              <div className="space-x-2">
                <button
                  onClick={() => handleEditPost(post.postId)}
                  className="px-3 py-1 bg-orange-400 text-white rounded-md hover:bg-orange-500"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDeletePost(post.postId)}
                  className="px-3 py-1 bg-red-400 text-white rounded-md hover:bg-red-500"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 게시글 내용 */}
        <div className="text-gray-700 leading-relaxed mb-4">{post.content}</div>

        {/* 좋아요 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleLike}
            className="px-4 py-2 bg-orange-400 text-white rounded-full"
          >
            ♥ 좋아요 {post.postLikes}
          </button>
        </div>
      </div>

      {/* 댓글 영역 */}
      <div className="bg-white w-[600px] rounded-[30px] shadow-md p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          댓글 {comments.length}
        </h3>

        {/* 댓글 작성 */}
        <div className="flex mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성해보세요."
            className="flex-1 border border-gray-300 rounded-lg p-2 resize-none"
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="ml-2 px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 disabled:opacity-50"
          >
            댓글 작성
          </button>
        </div>

        {/* 댓글 목록 */}
        <div>
          {comments.length === 0 ? (
            <div className="text-gray-400">첫 번째 댓글을 작성해보세요!</div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-gray-200 py-3 last:border-b-0"
              >
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <div>
                    <span className="mr-2 font-medium text-gray-700">
                      {comment.user.userNickname}
                    </span>
                    <span>{comment.date}</span>
                  </div>
                  {comment.user.userId === currUser.userId && (
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEditComment(comment.id)}
                        className="px-2 py-1 bg-custom-b-btn text-white rounded-md"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="px-2 py-1 bg-custom-r-btn text-white rounded-md"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
                {editingComment === comment.id ? (
                  <div>
                    <textarea
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 resize-none mb-2"
                    />
                    <div className="space-x-2">
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-1 bg-custom-b-btn text-white rounded-md"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => setEditingComment(null)}
                        className="px-3 py-1 bg-custom-r-btn text-white rounded-md"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-700">{comment.content}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
	</div>
  );
};

export default Post;