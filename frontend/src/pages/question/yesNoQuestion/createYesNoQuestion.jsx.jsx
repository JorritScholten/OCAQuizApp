import React, { useState } from "react";
import NewTagList from "../components";
import { performJSONFetch } from "../../../utils/fetch";

export default function CreateYesNoQuestion() {
  const [tagsOBJ, setTags] = useState({ tags: [] });
  const [question, setQuestion] = useState("");
  const [referenceToBook, setReferenceToBook] = useState("");
  const [yesIsCorrect, setYesIsCorrect] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postBody = {
      type: "YESNO",
      title: question,
      referenceToBook: referenceToBook,
      answers: [
        {
          answer: "Yes",
          isCorrect: yesIsCorrect,
        },
        {
          answer: "No",
          isCorrect: !yesIsCorrect,
        },
      ],
      tags: tagsOBJ.tags.map((tag) => {
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
        setYesIsCorrect(true);
      }
    });
  };

  return (
    <form
      className="flex flex-col w-full md:justify-start justify-center bg-slate-100 gap-2"
      method="post"
      encType="multipart/form-data"
    >
      <h2 className="text-center">Yes/No question</h2>
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
      <div className="text-center place-self-center w-fit">
        <label htmlFor="yesiscorrect" className="px-2">
          {yesIsCorrect ? "Yes is correct" : "No is correct"}
        </label>
        <button
          onClick={() => setYesIsCorrect(!yesIsCorrect)}
          className="bg-green-300 text-center self-center px-2"
          id="yesiscorrect"
          type="button"
        >
          Toggle
        </button>
      </div>
      <NewTagList
        tags={tagsOBJ.tags}
        handleChange={(tagsOBJ) => {
          setTags(tagsOBJ);
        }}
      />
      {question === "" ||
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
