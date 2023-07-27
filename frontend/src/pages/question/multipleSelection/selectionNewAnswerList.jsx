import React, { useState } from "react";

export default function SelectionAnswerList({ answers, handleChange }) {
  const [newAnswer, setNewAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);

  function addToanswers(value){
    let tempList=correctAnswers;
    tempList.push(value);
    setCorrectAnswers(tempList);
    handleChange({allAnswers:answers,correctAnswers:correctAnswers});
  }

  function add(event) {
    event.preventDefault();
    let tempAnwers = answers;
    tempAnwers.push(newAnswer);
    let resAnswers = tempAnwers;
    handleChange({allAnswers:resAnswers,correctAnswers:correctAnswers});
    setNewAnswer("");
  }

  function handleChangeAnswer(event) {
    event.preventDefault();
    setNewAnswer(event.target.value);
  }

  const remove = (answer) => {
    let tempAnwers = answers;
    let resAnswers = tempAnwers.filter((item) => item != answer);
    setCorrectAnswers(correctAnswers.filter((item)=>{item!= answer}))

    handleChange({allAnswers:resAnswers,answer:{correctAnswer: correctAnswers}});
    
  };

  return (
    <div className="flex flex-col">
      <p className="text-center">answers</p>
      <label htmlFor="add-answer">
        <input
          type="text"
          id="add-answer"
          onChange={handleChangeAnswer}
          value={newAnswer}
        />
        <button className="bg-blue-200 text-center" onClick={(e) => add(e)}>
          add
        </button>
      </label>
      <div className="flex flex-col">
        {answers.map((item) => {
          return (
            <AnswerInput
            className="flex flex-row justify-between"
              key={item}
              value={item}
              isCorrect={correctAnswers.includes(item)}
              removeHandler={(e) => {
                remove(e);
              }}
              setCorrectHandler={(e) => {
                addToanswers(e);
              }}
            ></AnswerInput>
          );
        })}
      </div>
    </div>
  );
}
function AnswerInput({ value, isCorrect, setCorrectHandler, removeHandler }) {
  return (
    <div>
      <span>{value}</span>
      <button
      className="text-center p-1 bg-slate-500 m-1 rounded-full"
        onClick={(event) => {
          event.preventDefault();
          removeHandler(value);
        }}
      >
        remove
      </button>
      {isCorrect ? (
        <button
          className="bg-green-300 text-center p-1 m-1 rounded-full"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          correct
        </button>
      ) : (
        <button
          className="bg-red-300 text-center p-1 m-1 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            setCorrectHandler(value);
          }}
        >
          set correct
        </button>
      )}
    </div>
  );
}
