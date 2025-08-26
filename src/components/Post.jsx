import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider'; // Context 사용하도록 수정
import uuid4 from 'uuid4';

const Post = () => {
  const { id: postId } = useParams(); // URL에서 postId 추출
  const navigate = useNavigate();
  
  // Context에서 전역 상태 가져오기
  const { currUser, posts, setPosts } = useContext(UserContext);
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  // 컴포넌트 마운트 시 게시글과 댓글 데이터 로드
  useEffect(() => {
    const foundPost = posts.find(p => p.postId === postId);
    if (foundPost) {
      setPost(foundPost);
      // 댓글은 localStorage에서 별도 관리 (실제로는 서버에서 가져올 데이터)
      const storedComments = JSON.parse(localStorage.getItem(`comments_${postId}`) || '[]');
      setComments(storedComments);
    } else {
      alert("존재하지 않는 게시글입니다.");
      navigate('/');
    }
  }, [postId, posts, navigate]);

  // 댓글이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (postId) {
      localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
    }
  }, [comments, postId]);

  // 좋아요 기능
  const handleLike = () => {
    if (!currUser) {
      alert("로그인이 필요한 기능입니다.");
      navigate('/login');
      return;
    }

    // posts 상태에서 해당 게시글의 좋아요 수 증가
    const updatedPosts = posts.map(p => 
      p.postId === postId 
        ? { ...p, postLikes: (Number(p.postLikes) || 0) + 1 }
        : p
    );
    setPosts(updatedPosts);
    
    // 현재 post 상태도 업데이트
    setPost(prev => ({ 
      ...prev, 
      postLikes: (Number(prev.postLikes) || 0) + 1 
    }));
  };

  // 댓글 추가
  const handleAddComment = () => {
    if (!currUser) {
      alert("로그인이 필요한 기능입니다.");
      navigate('/login');
      return;
    }

    if (!newComment.trim()) return;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    const comment = {
      id: uuid4(),
      postId,
      user: currUser,
      content: newComment.trim(),
      date: formattedDate
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  // 댓글 수정 시작
  const handleEditComment = (commentId) => {
    const comment = comments.find(c => c.id === commentId);
    if (comment && comment.user?.userNickname === currUser?.userNickname) {
      setEditingComment(commentId);
      setEditCommentText(comment.content);
    }
  };

  // 댓글 수정 저장
  const handleSaveEdit = () => {
    if (!editCommentText.trim()) return;

    const updatedComments = comments.map(comment =>
      comment.id === editingComment
        ? { ...comment, content: editCommentText.trim() }
        : comment
    );
    
    setComments(updatedComments);
    setEditingComment(null);
    setEditCommentText('');
  };

  // 댓글 삭제
  const handleDeleteComment = (commentId) => {
    const comment = comments.find(c => c.id === commentId);
    if (comment && comment.user?.userNickname === currUser?.userNickname) {
      if (window.confirm("댓글을 삭제하시겠습니까?")) {
        setComments(prev => prev.filter(c => c.id !== commentId));
      }
    }
  };

  // 게시글 수정
  const handleEditPost = () => {
    if (post.user?.userNickname === currUser?.userNickname) {
      navigate(`/editpost/${postId}`);
    } else {
      alert("본인이 작성한 게시글만 수정할 수 있습니다.");
    }
  };

  // 게시글 삭제
  const handleDeletePost = () => {
    if (post.user?.userNickname === currUser?.userNickname) {
      if (window.confirm("게시글을 삭제하시겠습니까?")) {
        const updatedPosts = posts.filter(p => p.postId !== postId);
        setPosts(updatedPosts);
        // 댓글도 함께 삭제
        localStorage.removeItem(`comments_${postId}`);
        alert("게시글이 삭제되었습니다.");
        navigate('/');
      }
    } else {
      alert("본인이 작성한 게시글만 삭제할 수 있습니다.");
    }
  };

  if (!post) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      {/* 게시글 영역 */}
      <div>
        {/* 게시글 헤더 */}
        <div>
          <h2>{post.title}</h2>
          <div>
            <div>
              <span>{post.user?.userNickname || '알 수 없음'}</span>
              <span>{post.date}</span>
            </div>
            {post.user?.userNickname === currUser?.userNickname && (
              <div>
                <button onClick={handleEditPost}>수정</button>
                <button onClick={handleDeletePost}>삭제</button>
              </div>
            )}
          </div>
        </div>
        
        {/* 게시글 내용 */}
        <div>
          {post.content}
        </div>
        
        {/* 좋아요 버튼 */}
        <div>
          <button onClick={handleLike}>
            <span>좋아요 {post.postLikes || 0}</span>
          </button>
        </div>
      </div>

      {/* 댓글 영역 */}
      <div>
        <h3>댓글 {comments.length}</h3>
        
        {/* 댓글 작성 */}
        <div>
          <div>
            <textarea 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)}
              placeholder='댓글을 작성해보세요.'
            />
          </div>
          <div>
            <button onClick={handleAddComment} disabled={!newComment.trim()}>
              댓글 작성
            </button>
          </div>
        </div>
        
        {/* 댓글 목록 */}
        <div>
          {comments.length === 0 ? (
            <div>댓글이 없습니다.</div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id}>
                <div>
                  <div>
                    <span>{comment.user?.userNickname || '알 수 없음'}</span>
                    <span>{comment.date}</span>
                  </div>
                  {comment.user?.userNickname === currUser?.userNickname && (
                    <div>
                      <button onClick={() => handleEditComment(comment.id)}>수정</button>
                      <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                    </div>
                  )}
                </div>
                {editingComment === comment.id ? (
                  <div>
                    <textarea 
                      value={editCommentText} 
                      onChange={(e) => setEditCommentText(e.target.value)}
                    />
                    <div>
                      <button onClick={handleSaveEdit}>저장</button>
                      <button onClick={() => setEditingComment(null)}>취소</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {comment.content}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;