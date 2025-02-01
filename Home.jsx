import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import "../App.css"


export default function Home(){
  const [username , setUserName] = useState("");
  const [password , setPassword] = useState("");
  const[error,setError] =useState("");
  const {login}  = useAuth();
  const navigate = useNavigate();

  const handleLogin =(e)=>{
    e.preventDefault();
    try{
      const response= fetch('https://tortoiseshell-large-bed.glitch.me/login',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({username,password}),
      });
      if(!response.ok) throw new Error ("Login failed");
      login(username);
      navigate("/quiz");
    }catch(err){
      setError(err.message);
    }
    
  };

  return(
    <div className="home">
      <h1>🎉Welcome to Quiz App</h1>
      <p>Test Your knowledge and challenge yourself with our quiz. please <button type="submit">Login</button>n  to get started</p>

      <form onSubmit={handleLogin}>
        <input type="text" 
        placeholder="UserName"
        value={username}
        onChange={(e)=> setUserName(e.target.value)}
        />

        <input type="text"
        placeholder="Password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        />
        {error && <p error>{error}</p>}
      </form>
    </div>
  )
}
