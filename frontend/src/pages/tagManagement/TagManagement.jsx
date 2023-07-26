import React, { useState, useEffect } from "react";
import { FiRefreshCw, FiDelete } from "react-icons/fi";
import Header from "../../components/header";

export default function TagManagement() {
  const [tags, setTags] = useState([]);
  function UpdateTags() {
    fetch("http://localhost:8080/api/v1/tag")
      .then((res) => res.json())
      .then((data) => setTags(data));
  }
  useEffect(() => UpdateTags(), []);

  return (
    <div className="w-screen flex flex-col">
      <Header />
      <h1>Tag management</h1>
      <CreateTag updateTags={UpdateTags} />
      <ShowTags tags={tags} updateTags={UpdateTags} />
    </div>
  );
}

function CreateTag({ updateTags }) {
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
      updateTags();
    });
  };
  return (
    <div className="bg-slate-100 mx-2 px-2 flex flex-col">
      <h2 className="text-center">Create new tag</h2>
      <form
        className="flex flex-col w-full md:w-96 text-center self-center"
        onSubmit={submitTag}
      >
        <label htmlFor="name" className="w-fit mx-2">
          Name:
          <input
            type="text"
            value={tag}
            id="name"
            className=""
            onChange={(e) => setTag(e.target.value)}
          />
        </label>
        <button
          className="items-center m-1 bg-green-300 md:w-40 self-center"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}

function ShowTags({ tags, updateTags }) {
  async function deleteTag(tag) {
    fetch("http://localhost:8080/api/v1/tag", {
      method: "DELETE",
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
      updateTags();
    });
  }
  return (
    <>
      <div className="bg-slate-100 m-2 pb-2">
        <div className="flex flex-row justify-around py-2 items-center">
          <div />
          <h2 className="">All tags</h2>
          <button className="" onClick={() => updateTags()}>
            <FiRefreshCw className="text-xl text-green-700" />
          </button>
        </div>
        <div className="w-full flex flex-col space-y-2 items-center px-2">
          {tags.map((tag) => (
            <div
              className="w-full md:w-80 justify-center bg-slate-300 grid grid-cols-6"
              key={tag.name}
            >
              <div className="text-center col-span-5 place-self-center">
                {tag.name}
              </div>
              <button
                className="place-self-center"
                onClick={() => deleteTag(tag.name)}
              >
                <FiDelete className="text-red-700" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
