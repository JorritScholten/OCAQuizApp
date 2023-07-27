import React, { useState } from "react";
import SelectionAnswerList from "./selectionNewAnswerList";
import NewTagList from "../components";
import { performJSONFetch } from "../../../utils/fetch";

export default function CreateSelectionChoice() {
  const [answersOBJ, setAnswers] = useState({
    allAnswers: [],
    correctAnswers: [],
  });
  const [tagsObj, setTags] = useState({ tags: [] });
  const [question, setQuestion] = useState("");
  const [referenceToBook, setReferenceToBook] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      tags: tagsObj.tags.map((tag) => {
        return { name: tag };
      }),
    };
    console.log(postBody);
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
          allAnswers: [],
          correctAnswers: [],
        });
      }
    });
  };

  return (
    <form
      className="flex flex-col w-full md:justify-start justify-center bg-slate-200 gap-2"
      // method="post"
      // encType="multipart/form-data"
    >
      <h2 className="text-center">Multiple selection question</h2>
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
          className="bg-gray-300 text-center text-red-700 self-center px-2"
          id="type"
          value="multiple-choice"
          title="All fields must be filled."
        >
          Submit
        </div>
      ) : (
        <button
          onClick={(ev) => {
            ev.preventDefault();
            handleSubmit();
          }}
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
