import React, { useState } from "react";
import NewAnswerList from "./newAnswerList";
import NewTagList from "./newTagList";

export default function CreateMultipleChoice() {
  const [answers, setAnswers] = useState(["testw","test"]);
  const [tags, setTags] = useState(["testw", "test"]);

  return (
    <form
      className="flex flex-col w-full md:justify-start justify-center bg-slate-200"
      method="post"
      encType="multipart/form-data"
    >
      <h2 className="text-center">Multiple choice question</h2>
      <label htmlFor="title" className="text-center">
        Title:
        <input
          type="text"
          id="title"
          pattern="[A-Z]{1}[ \S]+[.?]{1}"
          required
        />
      </label>
      <div className="flex flex-row justify-evenly w-full bg-slate-300">
        { <NewAnswerList answers={answers}  handleChange={e=>{setAnswers(e)}}/> }
        <NewTagList
          tags={tags}
          handleChange={(e) => {
            setTags(e);
          }}
        />
      </div>
      <button
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
