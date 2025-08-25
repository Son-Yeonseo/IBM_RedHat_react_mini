import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState({ userId: "", userPassword: "" });
  const navigate = useNavigate();

  const logInUser = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loginUser = users.find(
      (user) =>
        user.userId === login.userId && user.userPassword === login.userPassword
    );

    if (loginUser) {
      alert(`환영합니다, ${loginUser.userNickname}님!`);
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
      navigate("/Home");
    } else {
      alert("아이디 또는 비밀번호가 틀립니다.");
    }
  };

  const userSignUp = () => {
    navigate("/SignIn");
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

export default Login;
