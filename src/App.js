import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TitleNaviBar from './components/TitleNaviBar';
import Home from './components/Home';
import LogIn from './components/LogIn';
import SignIn from './components/SignIn';
import Post from './components/Post';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import Ranking from './components/Ranking';


const App = () => {
  return (
    <BrowserRouter>
    <TitleNaviBar />
      <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='/logIn' element={<LogIn />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/post/:postId' element={<Post />} />
          <Route path='/addpost' element={<AddPost />} />
          <Route path='/editpost/:postId' element={<EditPost />} />
          <Route path='/ranking' element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;