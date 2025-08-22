import React, { createContext, useState } from 'react';
import App from '../App';


export const UserContext = createContext();

export const UserProvider = () => {

    const [currUser, setCurrUser] = useState(null);

    return (
        <UserContext.Provider value={{currUser, setCurrUser}}>
            <App/>
        </UserContext.Provider>
    );
};