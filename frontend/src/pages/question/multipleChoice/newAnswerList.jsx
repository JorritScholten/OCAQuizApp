import React, { useState } from "react";

export default function NewAnswerList({ allAnswers, handleChange }) {
  const [newAnswer, setNewAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  function add(event) {
    event.preventDefault();
    if (allAnswers.length === 0) {
      setCorrectAnswer(newAnswer);
    }
    let tempAnwers = allAnswers;
    tempAnwers.push(newAnswer);
    let resAnswers = tempAnwers;
    handleChange({ allAnswers: resAnswers, correctAnswer: correctAnswer });
    setNewAnswer("");
  }

  function handleChangeAnswer(event) {
    event.preventDefault();
    setNewAnswer(event.target.value);
  }

  const remove = (answer) => {
    let tempAnwers = allAnswers;
    let resAnswers = tempAnwers.filter((item) => item != answer);

    handleChange({ allAnswers: resAnswers, correctAnswer: { correctAnswer } });
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
        {allAnswers.map((answer) => {
          return (
            <AnswerInput
              className="flex flex-row justify-between"
              key={answer}
              value={answer}
              isCorrect={answer === correctAnswer}
              removeHandler={(answerToRemove) => {
                remove(answerToRemove);
              }}
              setCorrectHandler={(newCorrectAnswer) => {
                setCorrectAnswer(newCorrectAnswer);
                let tempAnwers = allAnswers;
                handleChange({
                  allAnswers: tempAnwers,
                  correctAnswer: newCorrectAnswer,
                });
              }}
            />
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
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          correct
        </button>
      ) : (
        <button
          className="bg-red-300 text-center p-1 m-1 rounded-full"
          onClick={(event) => {
            event.preventDefault();
            setCorrectHandler(value);
          }}
        >
          set correct
        </button>
      )}
    </div>
  );
}
