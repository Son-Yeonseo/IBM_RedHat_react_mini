import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const navigate = useNavigate();

  const signInUser = (e) => {
    e.preventDefault();
    const newUser = { userId, userPassword, userNickname };
    const users=JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/Login");
  };

  return (
    <>
      <form onSubmit={signInUser}>
        ID{" "}
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          onChange={(e) => setUserId(e.target.value)}
        />
        <br />
        PW{" "}
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <br />
        Nickname{" "}
        <input
          type="text"
          placeholder="닉네임을 입력해주세요"
          onChange={(e) => setUserNickname(e.target.value)}
        />
        <br />
        <button type="submit">Confirm</button>
        <button type="reset">Cancel</button>
      </form>
    </>
  );
};

export default SignIn;
