import { createContext, useContext, useEffect, useState } from 'react'; // ✅ useContext import 추가
import App from '../App';

export const UserContext = createContext();

export const UserProvider = ({children}) => {

  const jsonCurrUser = window.localStorage.getItem('currUser') || JSON.stringify(null);
  const [currUser, setCurrUser] = useState(JSON.parse(jsonCurrUser));
  
  return (
    <UserContext.Provider value={{jsonCurrUser, currUser}}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(){
  return useContext(UserContext); 
}