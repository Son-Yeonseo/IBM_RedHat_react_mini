import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import NaviBar from './components/NaviBar';

import Home from './components/Home';
import Login from './components/Login';
import SignIn from './components/SignIn';
import Post from './components/Post';
import AddEditPost from './components/AddEditPost';
import Ranking from './components/Ranking';


const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/post/:postId' element={<Post />} />
          <Route path='/addEditpost/:postId' element={<AddEditPost />} />
          <Route path='/ranking' element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;