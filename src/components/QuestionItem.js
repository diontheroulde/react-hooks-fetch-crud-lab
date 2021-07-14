import React from "react";

function QuestionItem({ question, questions, onDeleteQuestion, setQuestions }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    onDeleteQuestion(id)
  }

  const handleChangeAnswer = (event) => {
   const configObject = {
    method: "PATCH",
    headers:{
     "Content-Type": "application/json" 
    },
    body: JSON.stringify({correctIndex: parseInt(event.target.value)})
  }
    fetch(`http://localhost:4000/questions/${id}`, configObject)
      .then(res => res.json())
      .then(data => {
        const updatedQuestions = questions.map(question => {
            if (question.id === data.id) {
              return data
            } else {
              return question
            }
        })
        setQuestions(updatedQuestions)
      })
    }

  
  
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChangeAnswer}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
