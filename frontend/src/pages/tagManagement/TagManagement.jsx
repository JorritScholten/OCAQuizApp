import React, { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import Header from "../../components/header";

export default function TagManagement() {
  return (
    <div className="w-screen flex flex-col">
      <Header />
      <h1>Tag management</h1>
      <CreateTag />
      <ShowTags />
    </div>
  );
}

function CreateTag() {
  const [tag, setTag] = useState("");
  const submitTag = async (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/v1/tag", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        name: tag,
      }),
    }).then((res) => {
      console.log(res);
      setTag("");
      // UpdateTags();
    });
  };
  return (
    <div className="bg-slate-100 m-2">
      <h2 className="text-center">Create new tag</h2>
      <form className="flex flex-col" onSubmit={submitTag}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            value={tag}
            id="name"
            onChange={(e) => setTag(e.target.value)}
          />
        </label>
        <button className="items-center m-1 bg-green-300" type="submit">Create</button>
      </form>
    </div>
  );
}

function ShowTags() {
  const [tags, setTags] = useState([]);
  function UpdateTags() {
    fetch("http://localhost:8080/api/v1/tag")
      .then((res) => res.json())
      .then((data) => setTags(data));
  }
  useEffect(() => UpdateTags(), []);

  return (
    <>
      <div className="bg-slate-100 m-2 pb-2">
        <div className="flex flex-row justify-around py-2 items-center">
          <div />
          <h2 className="">All tags</h2>
          <button className="" onClick={() => UpdateTags()}>
            <FiRefreshCw className="text-xl" />
          </button>
        </div>
        <div className="w-full flex flex-col space-y-2 items-center px-2">
          {tags.map((tag) => (
            <div
              className="w-full flex justify-center bg-slate-300"
              key={tag.name}
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
