import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
  

  useEffect(() =>{
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(data =>setQuestions(data))
  },[]) 

  const deleteQuestion = (id) => {
   const updatedQuestion = questions.filter(question => question.id !== id) 
    setQuestions(updatedQuestion)
  }



  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm questions={questions} setQuestions={setQuestions} /> : <QuestionList onDeleteQuestion={deleteQuestion} setQuestions={setQuestions} questions={questions} />}
    </main>
  );
}

export default App;
