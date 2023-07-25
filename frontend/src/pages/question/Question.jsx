import React from "react";
import Header from "../../components/header";
export default function Question() {
  return (
    <div className="w-screen flex flex-col">
      <Header title="Question" />
      <h1 className="self-center">Create a question</h1>
      <CreateYesNo />
    </div>
  );
}

function CreateYesNo() {
  return (
    <form
      className="grid w-full md:justify-start justify-center bg-slate-200"
      method="post"
      encType="multipart/form-data"
    >
      <h2>Yes/No question</h2>
      <label htmlFor="title">
        Question:
        <input
          type="text"
          id="title"
          // The question must start with a capital letter and end with a full stop or question mark.
          pattern="[A-Z]{1}[ \S]+[.?]{1}"
          required
        />
      </label>
      <button type="submit" id="type" value="yesno" className="bg-blue-300">
        Submit
      </button>
      <label htmlFor="answer">
        Answer:
        <input
          type="text"
          id="answer"
          // REGEX
          pattern=""
          required
        />
      </label>
      <button type="submit" id="type" value="yesno" className="bg-blue-300">
        Submit
      </button>
      <label htmlFor="name">
        tag:
        <input
          type="text"
          id="name"
          // REGEX
          pattern=""
        />
      </label>
      <button type="submit" id="type" value="yesno" className="bg-blue-300">
        Submit
      </button>
      <label htmlFor="name">
        tag:
        <input
          type="text"
          id="name"
          // REGEX
          pattern=""
        />
      </label>
      <button type="submit" id="type" value="yesno" className="bg-blue-300">
        Submit
      </button>
      <label htmlFor="name">
        tag:
        <input
          type="text"
          id="name"
          // REGEX
          pattern=""
        />
      </label>
      <button type="submit" id="type" value="yesno" className="bg-blue-300">
        Submit
      </button>
    </form>
  );
}
