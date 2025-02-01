import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import QuizItem from "./QuizItem";


const API_BASE ='https://tortoiseshell-large-bed.glitch.me';

export default function Quiz (){
  const [questions,setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading ,setLoading] =useState(true);
  const [error , setError] = useState("");
  const {user} = useAuth();
  const navigate = useNavigate();

useEffect(()=>{
const fecthQuestions = async()=>{
  try{
    const response = await fetch(`${API_BASE}/questions`);
    if(!response.ok)throw new Error("Failed to fetch questions");
    const data = await response.json();
    setQuestions(data);
  }catch(err){
    setError(err.message);
  }finally{
    setLoading(false);
  }
};
fecthQuestions();
},[])

const handleAnswerSelect = (questionId, answer) =>{
  setAnswers(prev=>({...prev ,[questionId]:answer}));
};

const handleSubmit = async()=>{
  try{
    const response =await fetch(`${API_BASE}/submit`,{
      method:"POST",
      headers:{
        'Content-Type': "application/json",
      },
      body:JSON.stringify({
        userId:user?.username,answers
      }),
    });
    if(!response.ok) throw new Error('Submission failed');
    const result =await response.json();

    navigate('result',{
      state:{
        score:result.score,
        total:questions.length
      }
    });
  }catch(err){
    setError(err.message);
  }
};

if(!user)return <div>Please Login first</div>
if(loading) return <div>Loading questions...</div>;
if(error) return <div>{error}</div>;

return(
  <div className="quiz">
    <h1>Quiz Page</h1>
    {questions.map((q)=>(
      <QuizItem key={q.id}
      question={q.options}
      selectedAnswer ={answers[q.id]}
      onSelect={(answer)=> handleAnswerSelect(q.id,answer)}
      />
    ))}

    <button onClick={handleSubmit} disabled={Object.keys(answers).length  !== questions.length}>
      Submit Quiz
    </button>
  </div>
);

}