import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserProvider";

const LogIn = () => {
  const [login, setLogin] = useState({ userId: "", userPassword: "" });
  const navigate = useNavigate();

  const { users, setCurrUser } = useContext(UserContext);

  const logInUser = (e) => {
    e.preventDefault();
    const currUser = users.find(
      (user) =>
        user.userId === login.userId && user.userPassword === login.userPassword
    );

    if (currUser) {
      alert(`환영합니다, ${currUser.userNickname}님!`);
      setCurrUser(currUser);
      navigate("/");
    } else {
      alert("아이디 또는 비밀번호가 틀립니다.");
    }
  };

  const userSignUp = () => {
    navigate("/signIn");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#FFFAE9]">
      <form
        className="bg-custom-div w-[800px] h-[500px] rounded-[40px] flex-col flex items-center justify-center px-8"
        onSubmit={logInUser}
      >
        <h1 className="text-[60px] mb-[50px] text-white font-display font-title font-black text-stroke">Login</h1>
        
        <div className="flex flex-col items-center justify-center space-y-6 w-full">
          {/* ID */}
          <div className="flex items-center space-x-4">
            <span className="text-[35px] text-white w-[80px] text-right font-button font-black text-stroke">
              ID
            </span>
            <input
              className="bg-white w-[500px] h-[50px] rounded-[50px] px-4"
              type="text"
              placeholder="아이디를 입력해주세요"
              onChange={(e) => setLogin({ ...login, userId: e.target.value })}
            />
          </div>

          {/* PW */}
          <div className="flex items-center space-x-4">
            <span className="text-[35px] text-white w-[80px] text-right font-button font-black text-stroke">
              PW
            </span>
            <input
              className="bg-white w-[500px] h-[50px] rounded-[50px] px-4"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={(e) =>
                setLogin({ ...login, userPassword: e.target.value })
              }
            />
          </div>

          {/* 버튼들 */}
          <div className="flex justify-end w-full pt-4 mr-[140px]">
            <button
              className="bg-custom-r-btn w-[100px] h-[40px] rounded-[50px] mr-[20px] text-white font-cute font-black"
              type="submit"
            >
              Log in
            </button>
            <button
              className="bg-custom-b-btn w-[100px] h-[40px] rounded-[50px] text-white font-cute font-black"
              type="button"
              onClick={userSignUp}
            >
              Join us
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;