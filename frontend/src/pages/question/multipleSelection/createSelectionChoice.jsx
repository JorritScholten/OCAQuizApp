import React, { useState } from "react";
import SelectionAnswerList from "./selectionNewAnswerList";
import NewTagList from "../multipleChoice/newTagList";

export default function CreateSelectionChoice() {
  const [answersOBJ, setAnswers] = useState({
    answers: [],
    correctAnswers: [],
  });
  const [tags, setTags] = useState([]);
  const [question, setQuestion] = useState("");
  const [referenceToBook, setReferenceToBook] = useState("");

  const handleSubmit = async (e) => {

    if(answersOBJ.correctAnswers.length<1){return;}
    e.preventDefault();
    const postBody = {
      type: "SELECTIONCHOICE",
      title: question,
      referenceToBook: referenceToBook,
      answers: answersOBJ.answers.map((ans) => {
        return {
          answer: ans,
          isCorrect: answersOBJ.answer.includes(ans),
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
    }).then(() => {
      setQuestion(""),
        setReferenceToBook(""),
        setTags([]),
        setAnswers({
          answer: "",
          answers: [],
        });
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
          required
        />
      </label>
      <div className="flex flex-row justify-evenly w-full bg-slate-300">
        {
          <SelectionAnswerList
            answers={answersOBJ.answers}
            handleChange={(e) => {
              setAnswers(e);
            }}
          />
        }
        <NewTagList
          tags={tags}
          handleChange={(e) => {
            setTags(e);
          }}
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
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
