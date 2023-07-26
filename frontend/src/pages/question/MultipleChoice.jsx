import React, { useState } from "react";

//todo: to be tested
export default function MultipleChoice({ question, answerList }) {
  const [selected, setSelected] = useState(" ");

  const handleChange = (value) => {
    setSelected(value);
  };
  const handleSubmit = () => {
    //todo: post request to question
  };
  return (
    <form
      className="grid w-full md:justify-start justify-center bg-slate-200"
      method="post"
      encType="multipart/form-data"
      onSubmit={handleSubmit()}
    >
      <h2>Multiple Choice Question</h2>
      <p>{question}</p>
      <span>currently selected: {selected}</span>

      {answerList.map((value, index) => (
        <MultipleChoiceAnswer
          index={index}
          value={value}
          changeEvent={handleChange}
        ></MultipleChoiceAnswer>
      ))}

      <button
        type="submit"
        id="type"
        value="selectedAnswer"
        className="bg-blue-300"
      >
        Submit
      </button>
    </form>
  );

  function MultipleChoiceAnswer({ index, value, changeEvent }) {
    return (
      <>
        <label htmlFor={index}>
          {value} :
          <input
            className=""
            type="radio"
            name={value}
            id={index}
            key={index}
            onClick={changeEvent(value)}
          />
        </label>
      </>
    );
  }
}
