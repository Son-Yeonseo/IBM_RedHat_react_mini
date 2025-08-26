/* eslint-disable no-unreachable */
import React, { useState,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditPost =()=>{

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [posts,setPosts] = useState([{postId:'',user:'',title:'',content:'', date:'', postLikes:'',}])
    const contentRef= useRef(null);
    const [currUser,setCurrUser] = useState({});
    const {ID} =useParams();
    const navigate = useNavigate();
  

    return
    <>
    <form>
      <input type='text'
      />
    </form>
    </>
};

export default EditPost;
