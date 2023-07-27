import React, { useState } from "react";
import SelectionAnswerList from "./selectionNewAnswerList";
import NewTagList from "../multipleChoice/newTagList";

export default function CreateSelectionChoice() {
  const [answersOBJ, setAnswers] = useState({
    allAnswers: [],
    correctAnswers: [],
  });
  const [tagsObj, setTags] = useState({tags:[]});
  const [question, setQuestion] = useState("");
  const [referenceToBook, setReferenceToBook] = useState("");

  const handleSubmit = async () => {
    if (answersOBJ.correctAnswers.length < 1) {
      return;
    }
    const postBody = {
      type: "MULTIPLESELECTION",
      title: question,
      referenceToBook: referenceToBook,
      answers: answersOBJ.allAnswers.map((ans) => {
        return {
          answer: ans,
          isCorrect: answersOBJ.correctAnswers.includes(ans),
        };
      }),
      tags: tagsObj.map((tag) => {
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
    })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.status;
        }
        console.log(resp.status);
      })
      .then(() => {
        setQuestion(""),
          setReferenceToBook(""),
          setTags([]),
          setAnswers({
            allAnswers: [],
            correctAnswers: [],
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
            answers={answersOBJ.allAnswers}
            handleChange={(e) => {
              setAnswers(e);
            }}
          />
        }
        <NewTagList
          tags={tagsObj.tags}
          handleChange={(e) => {
            setTags(e);
          }}
        />
      </div>
      {answersOBJ.allAnswers.length === 0 ||
      question === "" ||
      referenceToBook === "" ||
      tagsObj.length === 0 ? (
        <div
          className="bg-gray-300 text-center"
          id="type"
          value="multiple-choice"
        >
          Submit
        </div>
      ) : (
        <button
          onClick={(ev) => {
            ev.preventDefault();
            handleSubmit();
          }}
          className="bg-green-300 text-center"
          type="submit"
          id="type"
          value="multiple-choice"
        >
          Submit
        </button>
      )}
    </form>
  );
}
