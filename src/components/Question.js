import { set } from "date-fns";
import React, { useEffect,useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(()=>{
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if(prev === 0){
          onAnswered(false)
          return 10;
         }
        return prev - 1;
      })
    }, 1000);
    return function intervaltime(){
      clearTimeout(interval)
     }
  },[onAnswered])


  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
