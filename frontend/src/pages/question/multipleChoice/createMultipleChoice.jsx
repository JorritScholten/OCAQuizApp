import React, { useState } from "react";
import NewAnswerList from "./newAnswerList";
import NewTagList from "./newTagList";
import { performJSONFetch } from "../../../utils/fetch";

export default function CreateMultipleChoice() {
  const [answersOBJ, setAnswers] = useState({
    correctAnswer: "",
    allAnswers: [],
  });
  const [tagsOBJ, setTags] = useState({ tags: [] });
  const [question, setQuestion] = useState("");
  const [referenceToBook, setReferenceToBook] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postBody = {
      type: "MULTIPLECHOICE",
      title: question,
      referenceToBook: referenceToBook,
      answers: answersOBJ.allAnswers.map((ans) => {
        return {
          answer: ans,
          isCorrect: ans === answersOBJ.correctAnswer,
        };
      }),
      tags: tagsOBJ.tags.map((tag) => {
        return { name: tag };
      }),
    };
    await performJSONFetch(
      "http://localhost:8080/api/v1/question",
      "POST",
      JSON.stringify(postBody)
    ).then((res) => {
      if (res.ok) {
        setQuestion("");
        setReferenceToBook("");
        setTags({ tags: [] });
        setAnswers({
          correctAnswer: "",
          allAnswers: [],
        });
      }
    });
  };

  return (
    <form
      className="flex flex-col w-full md:justify-start justify-center bg-slate-100 gap-2"
      method="post"
      encType="multipart/form-data"
    >
      <h2 className="text-center">Multiple choice question</h2>
      <label
        htmlFor="question"
        className="text-center flex md:flex-row flex-col"
      >
        <span className="px-2 md:w-1/3">Question:</span>
        <input
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          type="text"
          id="question"
          required
          className="w-full"
          value={question}
        />
      </label>
      <label
        htmlFor="bookreference"
        className="text-center flex md:flex-row flex-col"
      >
        <span className="px-2 md:w-1/3">Reference to book:</span>
        <input
          onChange={(e) => {
            setReferenceToBook(e.target.value);
          }}
          type="text"
          id="bookreference"
          required
          className="w-full"
          value={referenceToBook}
        />
      </label>
      <div className="flex justify-evenly w-full bg-slate-300 flex-col md:flex-row p-2 gap-2">
        {
          <NewAnswerList
            allAnswers={answersOBJ.allAnswers}
            handleChange={(e) => {
              setAnswers(e);
            }}
          />
        }
        <NewTagList
          tags={tagsOBJ.tags}
          handleChange={(tagsOBJ) => {
            setTags(tagsOBJ);
          }}
        />
      </div>
      {answersOBJ.allAnswers.length < 2 ||
      answersOBJ.correctAnswer === "" ||
      question === "" ||
      referenceToBook === "" ||
      tagsOBJ.tags.length === 0 ? (
        <div
          className="bg-slate-300 text-center text-red-700 self-center px-2"
          id="type"
          value="multiple-choice"
          title="All fields must be filled."
        >
          Submit
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          className="bg-green-300 text-center self-center px-2"
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
