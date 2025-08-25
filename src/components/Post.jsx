import React, { useState } from 'react';

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

  const postId = '1';     // 실제 라우팅에서는 /post/:postId URL에서 추출(useParams()), 여기서는 기본값 설정

  const [post, setPost] = useState(null);                      // 현재 게시글 데이터
  const [comments, setComments] = useState([]);                // 댓글 목록
  const [newComment, setNewComment] = useState('');            // 새 댓글 입력값
  const [editingComment, setEditingComment] = useState(null);  // 수정 중인 댓글 ID
  const [editCommentText, setEditCommentText] = useState('');  // 수정 중인 댓글 내용
  const [currentUser, setCurrentUser] = useState('');          // 현재 로그인 사용자

  // 데이터 초기화(useEffect) : 컴포넌트가 마운트되거나 postId가 변경될 때 실행

	// 게시글 생성

  // 좋아요 시스템 구현

  // 댓글 CRUD

  return (
    <div>
			{/* 게시글 영역 */}
      <div>
        {/* 게시글 헤더 */}
        <div>
					<h2>{post.title}</h2>
					<div>
						<div>
							<span>{post.user}</span>
							<span>{post.date}</span>
						</div>
						{post.user === currentUser && (
							<div>
								<button>수정</button>
								<button>삭제</button>
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
						<div></div>
					) : (comments.map((comment) => (
						<div key={comment.id}>
							<div>
								<div>
									<span>{comment.author}</span>
									<span>{comment.date}</span>
								</div>
								{comment.user === currentUser && (
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