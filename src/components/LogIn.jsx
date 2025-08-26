import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserProvider'; // Context 사용하도록 수정

const LogIn = () => {
  const [login, setLogin] = useState({ userId: "", userPassword: "" });
  const navigate = useNavigate();
  
  // Context에서 전역 상태 가져오기
  const { users, setCurrUser } = useContext(UserContext);

  const logInUser = (e) => {
    e.preventDefault();
    // localStorage 대신 Context의 users 사용
    const currUser = users.find(
      (user) =>
        user.userId === login.userId && user.userPassword === login.userPassword
    );

    if (currUser) {
      alert(`환영합니다, ${currUser.userNickname}님!`);
      // Context의 setCurrUser 사용
      setCurrUser(currUser);
      navigate("/"); // Home 경로를 App.js에 맞춰 "/"로 수정
    } else {
      alert("아이디 또는 비밀번호가 틀립니다.");
    }
  };

  const userSignUp = () => {
    navigate("/signIn"); // 경로를 App.js에 맞춰 수정
  };

  return (
    <>
      <form onSubmit={logInUser}>
        ID{" "}
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          onChange={(e) => setLogin({...login, userId: e.target.value})}
        />
        <br />
        PW{" "}
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => setLogin({...login, userPassword: e.target.value})}
        />
        <br />
        <button type="submit">Log in</button>
        <button type="button" onClick={userSignUp}>Join</button>
      </form>
    </>
  );
};

export default LogIn;