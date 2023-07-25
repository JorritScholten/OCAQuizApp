import React, { useState } from "react";

export default function NewAnswerList({ answers, handleChange }) {
  const [newAnswer, setNewAnswer] = useState("");

  function add(event) {
    event.preventDefault();
    let tempAnwers = answers;
    tempAnwers.push(newAnswer);
    let resAnswers = tempAnwers;

    handleChange(resAnswers);
    setNewAnswer("");
  }

  function handleChangeAnswer(event) {
    event.preventDefault();
    setNewAnswer(event.target.value);
  }

  const remove = (answer) => {
    let tempAnwers = tags;
    let resAnswers = tempAnwers.filter((item) => item != answer);

    handleChange(resAnswers);
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
              key={item}
              value={item}
              removehandler={(e) => {
                remove(e);
              }}
            ></AnswerInput>
          );
        })}
      </div>
    </div>
  );
}
function AnswerInput({ value, removehandler }) {
  return (
    <div>
      <span>{value}</span>
      <button
        onClick={(event) => {
          event.preventDefault();
          removehandler(value);
        }}
      >
        remove
      </button>
    </div>
  );
}
