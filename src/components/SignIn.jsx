import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserProvider";

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
    const existingUser = users.find((user) => user.userId === userId);
    if (existingUser) {
      alert("이미 존재하는 아이디입니다.");
      return;
    }

    const newUser = { userId, userPassword, userNickname };
    // Context의 users 상태 업데이트
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    alert("회원가입이 완료되었습니다!");
    navigate("/login");
  };

  const resetForm = () => {
    setUserId("");
    setUserPassword("");
    setUserNickname("");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#FFFAE9]">
      <form
        className="bg-custom-div w-[800px] h-[500px] rounded-[40px] flex-col flex items-center justify-center px-8"
        onSubmit={signInUser}
      >
        <h1 className="text-[60px] mb-[50px] text-white font-display font-title font-black text-stroke">
          Join us
        </h1>
        
        <div className="flex flex-col items-center justify-center space-y-6 w-full">
          {/* ID */}
          <div className="flex items-center space-x-4">
            <span className="text-[35px] text-white w-[80px] text-right font-button font-black text-stroke">
              ID
            </span>
            <input
              type="text"
              className="bg-white w-[500px] h-[50px] rounded-[50px] px-4"
              placeholder="아이디를 입력해주세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          {/* PW */}
          <div className="flex items-center space-x-4">
            <span className="text-[35px] text-white w-[80px] text-right font-button font-black text-stroke">
              PW
            </span>
            <input
              type="password"
              className="bg-white w-[500px] h-[50px] rounded-[50px] px-4"
              placeholder="비밀번호를 입력해주세요"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>

          {/* Nickname */}
          <div className="flex items-center space-x-4">
            <span className="text-[35px] text-white w-[80px] text-right font-button font-black text-stroke">
              NN
            </span>
            <input
              type="text"
              className="bg-white w-[500px] h-[50px] rounded-[50px] px-4"
              placeholder="닉네임을 입력해주세요"
              value={userNickname}
              onChange={(e) => setUserNickname(e.target.value)}
              required
            />
          </div>

          {/* 버튼들 */}
          <div className="flex justify-end w-full pt-4 mr-[140px]">
            <button
              type="submit"
              className="bg-custom-r-btn w-[100px] h-[40px] rounded-[50px] mr-[20px] text-white font-cute font-black"
            >
              Confirm
            </button>
            <button
              type="button"
              className="bg-custom-b-btn w-[100px] h-[40px] rounded-[50px] text-white font-cute font-black"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;