import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_BASE ='https://tortoiseshell-large-bed.glitch.me';

export default function Result(){
  const [detailedResults,setDetailedResults] = useState(null);
  const {state} =useLocation();
  const {user} = useAuth();

  useEffect(()=>{
    const fetchResults = async()=>{
      try{
        const response = await fecth (`${API_BASE}/results/${user?.username}`);
        if(!response.ok) throw new  Error("Failed to fetch results");
        const data = await response.json();
        setDetailedResults(data);
      }catch(err){
        console.error(err);
      }
    };
    fetchResults();
  },[user]);

  if(!user) return <div>Please login to view Results</div>
  if(!state) return <div>No results found</div>;

  return(
    <div className="result">
      <h1>Quiz Results</h1>
      <p>User :{user.username}</p>
      <p>Score:{state.score}/{state.total}</p>
      {detailedResults &&(
        <div className="detailed-results">
          <h3>Detailed Analysis :</h3>
          {detailedResults.map((result,index)=>(
          <div key={index} className="question-result">
            <p>Question{index + 1}:{result.correct ? "✔️" :"❌"}</p>
          </div>
          ))}
        </div>
      )}
    </div>
  )
}