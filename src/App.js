import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TitleNaviBar from './components/TitleNaviBar'; // Header와 NaviBar 대신 TitleNaviBar 사용

import Home from './components/Home';
import LogIn from './components/LogIn';
import SignIn from './components/SignIn';
import Post from './components/Post';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';

const App = () => {
  return (
    <BrowserRouter>
      <TitleNaviBar /> {/* Header와 NaviBar를 TitleNaviBar로 통합 */}
      <Routes> 
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LogIn />} /> {/* 경로 통일: logIn -> login */}
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/addpost' element={<AddPost />} />
        <Route path='/editpost/:id' element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;