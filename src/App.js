import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import NaviBar from './components/NaviBar';

import Home from './components/Home';
import Login from './components/Login';
import SignIn from './components/SignIn';
import Post from './components/Post';
import AddEditPost from './components/AddEditPost';


const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <NaviBar />
      <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='/addEditpost/:id' element={<AddEditPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;