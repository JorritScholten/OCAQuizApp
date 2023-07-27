import React, { useState } from "react";
import { FiCheck, FiDelete, FiPlus, FiX } from "react-icons/fi";

export default function NewAnswerList({ allAnswers, handleChange }) {
  const [newAnswer, setNewAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  function add(event) {
    event.preventDefault();
    if (newAnswer === "") {
      return;
    }
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
    <div className="flex flex-col w-full gap-2">
      <h2 className="text-center">Answers:</h2>
      <label htmlFor="add-answer" className="w-full grid grid-cols-9">
        <input
          type="text"
          id="add-answer"
          onChange={handleChangeAnswer}
          value={newAnswer}
          className="w-full col-span-8"
        />
        <button
          className="bg-green-300 place-self-stretch text-center px-2"
          onClick={(e) => add(e)}
          title="Add answer"
        >
          <FiPlus className="w-full"/>
        </button>
      </label>
      <div className="flex flex-col gap-2">
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
    <div className="grid grid-cols-9 bg-slate-100 justify-center">
      <span className="col-span-7 text-center place-self-center">{value}</span>
      <button
        className="text-center place-self-stretch "
        onClick={(event) => {
          event.preventDefault();
          removeHandler(value);
        }}
        title="Delete answer"
      >
        <FiDelete className="text-red-700 w-full" />
      </button>
      {isCorrect ? (
        <div className="text-center place-self-center" title="Is correct answer">
          <FiCheck className="text-green-700 w-full" />
        </div>
      ) : (
        <button
          className="text-center place-self-stretch "
          onClick={(event) => {
            event.preventDefault();
            setCorrectHandler(value);
          }}
          title="Set as correct answer"
        >
          <FiX className="text-red-700 w-full" />
        </button>
      )}
    </div>
  );
}
