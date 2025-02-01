import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const AuthContext = createContext();


export function AuthProvider({children}){
  const [user,setUser] = useState(null);
  
useEffect(()=>{
  const storedUser =localStorage.getItem('quizUser');
  if(storedUser){
    setUser(JSON.parse(storedUser));
  }
},[]);

  const login = (username) =>{
    const userData ={username,timestamp: new Date().toISOString()};
    setUser(userData);
    localStorage.setItem('quizUser', JSON.stringify(userData));
  };

  const logout = ()=>{
    setUser(null);
    localStorage.removeItem('quizUser');
  };

  return(<AuthContext.Provider value={{user,login,logout}}>
    {children}
  </AuthContext.Provider>

  );
}

export function useAuth(){
  return useContext(AuthContext);
}