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
    >
      <h2>Yes/No question</h2>
      <label htmlFor="title">
        Title:
        <input
          type="text"
          id="title"
          pattern="/[A-Z]{1}[ \S]+[.?]{1}/g"
          required
        />
      </label>
      <button type="submit" id="type" value="yesno" className="bg-blue-300">
        Submit
      </button>
    </form>
  );
}
