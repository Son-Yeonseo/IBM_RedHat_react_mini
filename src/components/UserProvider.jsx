import React, { createContext, useState, useEffect } from 'react';
import App from '../App';

export const UserContext = createContext();

export const UserProvider = () => {
    // 전역으로 관리할 상태들을 Context에서 관리하도록 수정
    const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem('currUser') || 'null'));
    const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('posts') || '[]'));
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users') || '[]'));

    // 초기 데이터 로딩 - localStorage에서 데이터를 가져와 전역 상태로 설정
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currUser') || 'null');
        const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        
        setCurrUser(storedUser);
        setPosts(storedPosts);
        setUsers(storedUsers);
    }, []);

    // posts 상태가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    // users 상태가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    // currUser 상태가 변경될 때마다 localStorage에 저장 또는 삭제
    useEffect(() => {
        if (currUser) {
            localStorage.setItem('currUser', JSON.stringify(currUser));
        } else {
            localStorage.removeItem('currUser');
        }
    }, [currUser]);

    return (
        <UserContext.Provider value={{
            currUser, setCurrUser,
            posts, setPosts,
            users, setUsers
        }}>
            <App/>
        </UserContext.Provider>
    );
};