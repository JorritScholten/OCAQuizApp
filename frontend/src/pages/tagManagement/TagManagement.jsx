import React, { useState, useEffect } from "react";
import { FiRefreshCw, FiDelete, FiPlus, FiEdit } from "react-icons/fi";
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
      <ShowTags tags={tags} updateTags={UpdateTags} />
    </div>
  );
}

function ShowTags({ tags, updateTags }) {
  const [newTag, setNewTag] = useState("");
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
        name: newTag,
      }),
    }).then((res) => {
      console.log(res);
      setNewTag("");
      updateTags();
    });
  };
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
      <div className="bg-slate-100 m-2 pb-2  flex flex-col">
        <div className="justify-center py-2 w-full md:w-80 grid grid-cols-9 px-2">
          <h2 className="text-center col-span-7 place-self-center w-full">
            All tags
          </h2>
          <button
            className="place-self-stretch col-span-2"
            onClick={() => updateTags()}
          >
            <FiRefreshCw className="text-xl text-green-700 w-full" />
          </button>
        </div>
        <div className="w-full flex flex-col space-y-2 items-center px-2">
          <form
            className="w-full md:w-80 justify-center bg-slate-300 grid grid-cols-9"
            onSubmit={() => console.log("create tag")}
          >
            <input
              type="text"
              value={newTag}
              id="name"
              className="text-center col-span-7 place-self-center w-full"
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button
              type="submit"
              className="place-self-stretch col-span-2"
              onClick={submitTag}
            >
              <FiPlus className="text-green-700 w-full" />
            </button>
          </form>
          {tags.map((tag) => (
            <div
              className="w-full md:w-80 justify-center bg-slate-300 grid grid-cols-9"
              key={tag.name}
            >
              <div className="text-center col-span-7 place-self-center">
                {tag.name}
              </div>
              <button
                className="place-self-center"
                onClick={() => console.log("update:" + tag.name)}
              >
                <FiEdit className="text-black" />
              </button>
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
