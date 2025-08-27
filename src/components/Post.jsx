import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import uuid4 from 'uuid4';

/*
  - path : /post/:postId
  - 구조
    - 게시글 : 제목, 작성자, 작성일시, 내용, 좋아요 버튼, 
            (작성자일 시)수정, 삭제 버튼
    - 댓글 : 작성자, 작성일시, 내용, 
          (작성자일 시)수정, 삭제 버튼
  - 기능
    - 좋아요 버튼 누를 때마다 좋아요 상태 변경
    - 좋아요 눌리면
      - 로컬스토리지 posts 내 해당 게시글 postLikes + 1
      - 로컬스토리지 users 내 해당 게시글 작성자 userLikes + 1
*/

const Post = () => {

  const navigate = useNavigate();
  const postId = useParams().id;

  const [post, setPost] = useState(null);                      // 현재 게시글 데이터
  const [comments, setComments] = useState([]);                // 댓글 목록
  const [newComment, setNewComment] = useState('');            // 새 댓글 입력값
  const [editingComment, setEditingComment] = useState(null);  // 수정 중인 댓글 ID
  const [editCommentText, setEditCommentText] = useState('');  // 수정 중인 댓글 내용
  const [currUser] = useState(JSON.parse(localStorage.getItem('currUser')));         						// 현재 로그인 사용자

  // 컴포넌트 초기화(useEffect) : 컴포넌트가 마운트되거나 postId가 변경될 때 실행
	useEffect(() => {
		// initializeSampleData();		// 1. 샘플 데이터 생성
		loadPost();								// 2. 게시글 로드
		loadComments();						// 3. 댓글 로드
	}, [postId]);

	// 1. 샘플 데이터 생성
	// const initializeSampleData = () => {
	// 	const samplePosts = [
	// 		{
	// 			postId: '1',
	// 			user: '사용자1',
	// 			title: '제목1',
	// 			content: '내용1',
	// 			date: '2025-08-28 10:00',		// 작성일시
	// 			postLikes: 0,			// 좋아요 수
	// 			isLiked: false,		// 현재 사용자의 좋아요 상태
	// 		},
	// 	];

	// 	const sampleUsers = [
	// 		{
	// 			id: '아이디1',
	// 			password: '비밀번호1',
	// 			nickname: '사용자1',
	// 			userLikes: 0,				// 해당 사용자가 받은 총 좋아요 수
	// 		},
	// 	];

	// 	// 기존 데이터가 없을 때만 초기화 (중복 방지, 기존 데이터 보존)
	// 	if (!localStorage.getItem('posts')) {
	// 		localStorage.setItem('posts', JSON.stringify(samplePosts));
	// 	}
		
	// 	if (!localStorage.getItem('users')) {
	// 		localStorage.setItem('users', JSON.stringify(sampleUsers));
	// 	}
	// }

	// 2. 게시글 로드
	const loadPost = () => {
  	const posts = JSON.parse(localStorage.getItem('posts') || '[]');	// localStorage가 비어 있으면 빈 배열 사용
    const foundPost = posts.find(p => p.postId === postId);		// 고유번호가 일치하는 특정 게시글을 반환
    setPost(foundPost);
  };

  const handleEditPost = (postId) =>{
    navigate(`/editpost/${postId}`);
  }

  const handleDeletePost = (postId) =>{
    navigate(`/editpost/${postId}`);
  }

	// 3. 댓글 로드
  const loadComments = () => {
    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const postComments = allComments.filter(c => c.postId === postId);	// 현재 게시글(postId)에 해당하는 댓글만 필터링(추출)
    setComments(postComments);
  };


	// 댓글 저장
  const saveComments = (updatedComments) => {
    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');		// 전체 댓글 가져오기
    const otherComments = allComments.filter(c => c.postId !== postId);			// 현재 게시글이 아닌 댓글들 분리
    const newAllComments = [...otherComments, ...updatedComments];					// 업데이트된 현재 게시글 댓글과 합치기 
    localStorage.setItem('comments', JSON.stringify(newAllComments));				// 댓글 전체를 다시 저장
  };


  // 좋아요 시스템 구현
	const handleLike = () => {
		if (!post) return;  // 게시글이 없으면 종료

		const posts = JSON.parse(localStorage.getItem('posts') || '[]');
		const users = JSON.parse(localStorage.getItem('users') || '[]');

		// 좋아요 상태 토글
		const newIsLiked = !post.isLiked;     // true <-> false
		const likeChange = newIsLiked ? 1 : -1; // +1 또는 -1

		// 게시글 좋아요 수 업데이트
		const updatedPosts = posts.map(p => 
			p.postId === postId 
				? { ...p, postLikes: p.postLikes + likeChange, isLiked: newIsLiked }
				: p  // 다른 게시글은 그대로
		);

		// 작성자 좋아요 수 업데이트
		const updatedUsers = users.map(u => 
			u.nickname === post.user 
				? { ...u, userLikes: u.userLikes + likeChange }
				: u  // 다른 사용자는 그대로
		);

		// localStorage 업데이트
		localStorage.setItem('posts', JSON.stringify(updatedPosts));
		localStorage.setItem('users', JSON.stringify(updatedUsers));

		// UI 즉시 업데이트 (함수형 업데이트)
		setPost(prev => ({ 
			...prev, 
			postLikes: prev.postLikes + likeChange,
			isLiked: newIsLiked,
		}));
	}

  // 댓글 CRUD

	// 1. 댓글 추가
	const handleAddComment = () => {
		if (!newComment.trim()) return;  // 빈 댓글 방지

		// 날짜 포맷팅
		const currentDate = new Date();
		const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

		const newCommentObj = {
			id: uuid4(),     							 // uuid4 : 고유 식별자 생성
			postId,                        // 어떤 게시글의 댓글인지
			user:  currUser,           	 // 작성자
			content: newComment.trim(),    // 내용 (공백 제거)
			date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} 
          	${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
		};

		const updatedComments = [...comments, newCommentObj];  // 기존 + 새 댓글
		setComments(updatedComments);   // UI(댓글 목록) 업데이트
		saveComments(updatedComments);  // localStorage 저장
		setNewComment('');              // 입력창 비우기
	};

	// 2. 댓글 수정
	// 2-1. 댓글 수정 시작
	const handleEditComment = (commentId) => {
		const comment = comments.find(c => c.id === commentId);
		setEditingComment(commentId);      	 // 수정 모드 활성화
		setEditCommentText(comment.content); // 기존 내용을 텍스트박스에 로드
	};

	// 2-2. 댓글 수정 저장
	const handleSaveEdit = () => {
		if (!editCommentText.trim()) return;	// 빈 댓글 방지

		const updatedComments = comments.map(c => 
			c.id === editingComment 
				? { ...c, content: editCommentText.trim() }  // 해당 댓글만 내용 변경
				: c  // 다른 댓글은 그대로
		);

		setComments(updatedComments);
		saveComments(updatedComments);
		setEditingComment(null);     // 수정 모드 해제
		setEditCommentText('');      // 텍스트 초기화
	};

	// 3. 댓글 삭제
	const handleDeleteComment = (commentId) => {
		if (window.confirm('댓글을 삭제하시겠습니까?')) {  // 확인 창
			const updatedComments = comments.filter(c => c.id !== commentId);  // 해당 댓글 제외
			setComments(updatedComments);
			saveComments(updatedComments);
		}
	};

	if (!post) {
  	return <div>게시글을 찾을 수 없습니다.</div>;
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
							<span>{post.user.userNickname}</span>
							<span>{post.date}</span>
						</div>
						{post.user.id ===  currUser.id && (
							<div>
								<button onClick={() => handleEditPost(post.postId)}>수정</button>
								<button onClick={() => handleDeletePost(post.postId)}>삭제</button>
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
					<button onClick={handleLike}><span>좋아요 {post.postLikes}</span></button>
				</div>
      </div>
			{/* 댓글 영역 */}
			<div>
				<h3>댓글 {comments.length}</h3>
				{/* 댓글 작성 */}
				<div>
					<div>
						<textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}
						placeholder='댓글을 작성해보세요.'/>
					</div>
					<div>
						<button onClick={handleAddComment} disabled={!newComment.trim()}>댓글 작성</button>
					</div>
				</div>
				{/* 댓글 목록 */}
				<div>
					{comments.length === 0 ? (
						<div>첫 번째 댓글을 작성해보세요!</div>
					) : (comments.map((comment) => (
						<div key={comment.id}>
							<div>
								<div>
									<span>{comment.user.userNickname}</span>
									<span>{comment.date}</span>
								</div>
								{comment.user.id ===  currUser.id && (
									<div>
										<button onClick={() => handleEditComment(comment.id)}>수정</button>
										<button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
									</div>
								)}
							</div>
							{editingComment === comment.id ? (
								<div>
									<textarea value={editCommentText} onChange={(e) => setEditCommentText(e.target.value)}/>
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