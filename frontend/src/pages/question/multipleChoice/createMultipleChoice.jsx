import React, { useState } from "react";
import NewAnswerList from "./newAnswerList";
import NewTagList from "./newTagList";

export default function CreateMultipleChoice() {
  const [answersOBJ, setAnswers] = useState({
    answer: "test",
    answers: ["testw", "test"],
  });
  const [tags, setTags] = useState(["testw", "test"]);
  const [question, setQuestion] = useState("");
  const [referenceToBook, setReferenceToBook] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postBody = {
      type: "MULTIPLECHOICE",
      title: question,
      referenceToBook: referenceToBook,
      answers: answersOBJ.answers.map((ans) => {
        return {
          answer: ans,
          isCorrect: ans === answersOBJ.answer,
        };
      }),
      tags: tags.map((tag) => {
        return { name: tag };
      }),
    };
    console.log(postBody);
    await fetch("http://localhost:8080/api/v1/question", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(postBody),
    });
  };

  return (
    <form
      className="flex flex-col w-full md:justify-start justify-center bg-slate-200"
      method="post"
      encType="multipart/form-data"
    >
      <h2 className="text-center">Multiple choice question</h2>
      <label htmlFor="bookreference" className="text-center">
        <span>reference</span>
        <input
          onChange={(e) => {
            setReferenceToBook(e.target.value);
          }}
          type="text"
          id="bookreference"
          //pattern="[A-Z]{1}[ \S]+[.?]{1}"
          required
        />
      </label>
      <label htmlFor="question" className="text-center">
        <span>question</span>
        <input
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          type="text"
          id="question"
          //pattern="[A-Z]{1}[ \S]+[.?]{1}"
          required
        />
      </label>
      <div className="flex flex-row justify-evenly w-full bg-slate-300">
        {
          <NewAnswerList
            answers={answersOBJ.answers}
            handleChange={(e) => {
              console.log(e);
              setAnswers(e);
            }}
          />
        }
        <NewTagList
          tags={tags}
          handleChange={(e) => {
            console.log(e);
            setTags(e);
          }}
        />
      </div>
      <button
        onClick={handleSubmit}
        type="submit"
        id="type"
        value="multiple-choice"
        className="bg-gray-300 text-center"
      >
        Submit
      </button>
    </form>
  );
}
