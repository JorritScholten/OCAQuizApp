import React, { useState } from "react";

export default function NewAnswerList({ answers, handleChange }) {
  const [newAnswer, setNewAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  function add(event) {
    event.preventDefault();
    let tempAnwers = answers;
    tempAnwers.push(newAnswer);
    let resAnswers = tempAnwers;
    handleChange({answers:resAnswers,answer:correctAnswer});
    setNewAnswer("");
  }

  function handleChangeAnswer(event) {
    event.preventDefault();
    setNewAnswer(event.target.value);
  }

  const remove = (answer) => {
    let tempAnwers = answers;
    let resAnswers = tempAnwers.filter((item) => item != answer);

    handleChange({answers:resAnswers,answer:{correctAnswer}});
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
              isCorrect={item === correctAnswer}
              removeHandler={(e) => {
                remove(e);
              }}
              setCorrectHandler={(e) => {
                setCorrectAnswer(e);
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
