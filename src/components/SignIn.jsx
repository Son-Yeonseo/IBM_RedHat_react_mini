import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserProvider'; // Context 사용하도록 수정

const SignIn = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const navigate = useNavigate();
  
  // Context에서 전역 상태 가져오기
  const { users, setUsers } = useContext(UserContext);

  const signInUser = (e) => {
    e.preventDefault();
    
    // 중복 아이디 검사 추가
    const existingUser = users.find(user => user.userId === userId);
    if (existingUser) {
      alert("이미 존재하는 아이디입니다.");
      return;
    }
    
    const newUser = { userId, userPassword, userNickname };
    // Context의 users 상태 업데이트
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    alert("회원가입이 완료되었습니다!");
    navigate("/login"); // 경로를 App.js에 맞춰 수정
  };

  return (
    <>
      <form onSubmit={signInUser}>
        ID{" "}
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          value={userId} // value 추가로 제어 컴포넌트로 만들기
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <br />
        PW{" "}
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
        <br />
        Nickname{" "}
        <input
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={userNickname}
          onChange={(e) => setUserNickname(e.target.value)}
          required
        />
        <br />
        <button type="submit">Confirm</button>
        <button type="reset" onClick={() => {
          setUserId("");
          setUserPassword("");
          setUserNickname("");
        }}>Cancel</button> {/* Cancel 버튼 기능 추가 */}
      </form>
    </>
  );
};

export default SignIn;