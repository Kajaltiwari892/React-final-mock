export default function QuizItem({question,options,selectedAnswer, onSelect}){

  return(
    <div className="quiz-item">
      <h3>{question}</h3>
      <div className="options">
        {options.map((option)=>(
          <button key={option} onClick={()=>onSelect(option)}
          className={selectedAnswer=== option  ? 'selected': ""}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}