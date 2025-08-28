import { useMemo, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider'; // Context 사용하도록 수정

const Home = () => {
    // Context에서 전역 상태 가져오기
    const { currUser, setCurrUser, posts, users } = useContext(UserContext);
    const navigate = useNavigate();

    // localStorage에서 데이터를 직접 가져오는 대신 Context 사용하도록 수정
    // useEffect는 UserProvider에서 이미 처리하므로 제거

    // 좋아요 계산 로직 수정 - post.likes -> post.postLikes로 통일
    const maxLikes = posts.length > 0 ? 
        Math.max(...posts.map(post => Number(post.postLikes) || 0)) 
        : 0;

    // 게시글 분류 - likes -> postLikes로 수정
    const popularPosts = posts.filter(post => (Number(post.postLikes) || 0) === maxLikes);
    const restPosts = posts.filter(post => (Number(post.postLikes) || 0) !== maxLikes);

    // 받은 좋아요 수 집계 - user.nickname -> user.userNickname, likes -> postLikes로 수정
    const receivedLikes = useMemo(() => {
        if (!currUser) return 0;
        return posts.filter(post => post.user?.userNickname === currUser.userNickname)
                   .reduce((sum, post) => sum + (Number(post.postLikes) || 0), 0);
    }, [currUser, posts]);

    // 로그아웃 - Context의 setCurrUser 사용
    const handleLogout = () => {
        setCurrUser(null);
    };

    // 게시글 등록 버튼 클릭 시 - 경로 수정 및 새 게시글 ID 생성
    const handlePostSubmit = () => {
        if (!currUser) {
            alert("로그인이 필요한 기능입니다. 로그인 창으로 이동합니다.");
            navigate("/login");
            return;
        }
        // 새 게시글 작성을 위해 'new' ID 사용
        navigate("/addpost");
    }

    return (
      <main className="min-h-screen bg-[#F5F5DC] text-black pt-12 md:pt-16">
  <div className="mx-auto max-w-5xl p-6 md:grid md:grid-cols-3 md:gap-6 rounded-[28px] bg-[#CFF5EA] ring-1 ring-[#BDEDE1]">
<section className="md:col-span-1 md:col-start-3 md:row-start-1 rounded-2xl border border-[#E6E6E6] bg-white shadow-sm">      <div className="p-6">
        {!currUser ? (
          <div className="space-y-4 text-center">
            <p className="text-black/60">로그인 해주세요.</p>
            <button
              onClick={() => navigate("/login")}
              className="rounded-full bg-[#FF5A2D] px-6 py-2 text-white transition hover:bg-[#ff6f4a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A2D]/60"
            >
              로그인
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <p className="text-lg font-semibold">{currUser.userNickname}님</p>
              <p className="text-sm text-black/70">환영합니다.</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="rounded-xl border border-[#23A491]/40 bg-[#23A491]/5 px-4 py-2">
                <p className="text-xs font-bold tracking-wide text-[#FF5A2D]">Likes</p>
                <p className="text-base font-semibold">{receivedLikes}</p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full bg-[#FF5A2D] px-4 py-2 text-white transition hover:bg-[#ff6f4a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A2D]/60"
              >
                로그아웃
              </button>
            </div>
          </div>
        )}
      </div>
    </section>

  <section className="md:col-span-2 md:col-start-1 md:row-span-2 rounded-2xl border border-[#BDEDE1] bg-white/90 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-[#BDEDE1] p-6">
        <h2 className="text-2xl font-extrabold text-[#FF5A2D]">Study Board</h2>
        <button
          onClick={handlePostSubmit}
          className="rounded-full bg-[#FF5A2D] px-5 py-2 text-white transition hover:bg-[#ff6f4a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A2D]/60"
        >
          게시글 등록
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="p-6 text-black/70">현재 게시글이 없습니다.</p>
      ) : (
        <ul className="divide-y divide-[#EAEAEA]">
          {restPosts.map((post) => (
            <li key={post.postId} className="px-6">
              <Link
                to={`/post/${post.postId}`}
                className="group block rounded-xl p-5 transition-colors hover:bg-[#23A491]/10"
              >
                <p className="font-semibold">{post.title}</p>
                <p className="mt-1 text-sm text-black/70">
                  {post.user?.userNickname}
                  <span className="mx-2 text-[#23A491]">•</span>
                  {post.postLikes}개 좋아요
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>

 <section className="md:col-span-1 md:col-start-3 md:row-start-2 rounded-2xl border border-[#BDEDE1] bg-white/90 shadow-sm backdrop-blur-sm">
      <div className="border-b border-[#BDEDE1] p-6">
        <h2 className="inline-flex items-center gap-2 rounded-full bg-[#FF5A2D]/10 px-3 py-1 text-xl font-bold text-[#FF5A2D]">
          오늘의 게시글 🔥
        </h2>
      </div>

      {popularPosts.length === 0 ? (
        <p className="p-6 text-black/70">인기 게시글이 없습니다.</p>
      ) : (
        <ul className="divide-y divide-[#EAEAEA]">
          {popularPosts.map((post) => (
            <li key={post.postId}>
              <Link
                to={`/post/${post.postId}`}
                className="block p-5 transition-colors hover:bg-[#23A491]/10"
              >
                <p className="font-semibold group-hover:underline">{post.title}</p>
                <p className="mt-1 text-sm text-black/70">
                  {post.user?.userNickname}
                  <span className="mx-2 text-[#23A491]">/</span>
                  {Number(post.postLikes) || 0}개 좋아요
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  </div>
</main>


    );
};

export default Home;