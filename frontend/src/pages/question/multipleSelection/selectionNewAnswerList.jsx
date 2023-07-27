import React, { useState } from "react";
import { FiCheck, FiDelete, FiPlus, FiX } from "react-icons/fi";

export default function SelectionAnswerList({ answers, handleChange }) {
  const [newAnswer, setNewAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);

  function addToanswers(value) {
    let tempList = correctAnswers;
    tempList.push(value);
    setCorrectAnswers(tempList);
    handleChange({ allAnswers: answers, correctAnswers: correctAnswers });
  }

  function removeFromAnswers(value) {
    let tempList = correctAnswers;
    setCorrectAnswers(
      tempList.filter((ans) => {
        ans != value;
      })
    );
    handleChange({ allAnswers: answers, correctAnswers: correctAnswers });
  }

  function add(event) {
    event.preventDefault();
    let tempAnwers = answers;
    tempAnwers.push(newAnswer);
    let resAnswers = tempAnwers;
    handleChange({ allAnswers: resAnswers, correctAnswers: correctAnswers });
    setNewAnswer("");
  }

  function handleChangeAnswer(event) {
    event.preventDefault();
    setNewAnswer(event.target.value);
  }

  const remove = (answer) => {
    let tempAnwers = answers;
    let resAnswers = tempAnwers.filter((item) => item != answer);
    setCorrectAnswers(
      correctAnswers.filter((item) => {
        item != answer;
      })
    );

    handleChange({
      allAnswers: resAnswers,
      answer: { correctAnswer: correctAnswers },
    });
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
          <FiPlus className="w-full" />
        </button>
      </label>
      <div className="flex flex-col gap-2">
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
              unsetCorrectHandler={(e) => {
                removeFromAnswers(e);
              }}
              setCorrectHandler={(e) => {
                addToanswers(e);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function AnswerInput({
  value,
  isCorrect,
  unsetCorrectHandler,
  setCorrectHandler,
  removeHandler,
}) {
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
        <button
          className="text-center place-self-center"
          title="Is correct answer"
          onClick={(e) => {
            e.preventDefault();
            unsetCorrectHandler(value);
          }}
        >
          <FiCheck className="text-green-700 w-full" />
        </button>
      ) : (
        <button
          className="text-center place-self-stretch "
          onClick={(e) => {
            e.preventDefault();
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
