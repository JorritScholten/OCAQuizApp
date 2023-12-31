import React, { useState, useEffect } from "react";
import { FiRefreshCw, FiDelete, FiPlus, FiEdit, FiShare } from "react-icons/fi";
import Header from "../../components/header";
import { performJSONFetch } from "../../utils/fetch";

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
    performJSONFetch(
      "http://localhost:8080/api/v1/tag",
      "POST",
      JSON.stringify({
        name: newTag,
      })
    ).then(() => {
      setNewTag("");
      updateTags();
    });
  };
  async function deleteTag(tag) {
    performJSONFetch(
      "http://localhost:8080/api/v1/tag",
      "DELETE",
      JSON.stringify({
        name: tag,
      })
    ).then((res) => {
      if (res.ok) {
        updateTags();
      }
    });
  }
  const [currentlyEditing, setCurrentlyEditing] = useState("");
  const [updatedTagValue, setUpdatedTagValue] = useState("");
  const updateTag = async (e) => {
    e.preventDefault();
    performJSONFetch(
      "http://localhost:8080/api/v1/tag",
      "PATCH",
      JSON.stringify({
        name: currentlyEditing,
        newName: updatedTagValue,
      })
    ).then((res) => {
      if (res.ok) {
        setUpdatedTagValue("");
        setCurrentlyEditing("");
        updateTags();
      }
    });
  };
  return (
    <>
      <div className="bg-slate-100 m-2 pb-2  flex flex-col">
        <div className="justify-center py-2 w-full md:w-80 grid grid-cols-9 place-self-center md:px-0 px-2">
          <h2 className="text-center col-span-7 place-self-center w-full">
            All tags
          </h2>
          <button
            className="place-self-stretch col-span-2"
            onClick={() => updateTags()}
            title="Refresh tags"
          >
            <FiRefreshCw className="text-xl text-green-700 w-full" />
          </button>
        </div>
        <div className="w-full flex flex-col space-y-2 items-center px-2">
          <form className="w-full md:w-80 justify-center bg-slate-300 grid grid-cols-9">
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
              title="Store new tag"
            >
              <FiPlus className="text-green-700 w-full" />
            </button>
          </form>
          {tags.map((tag) => {
            if (tag.name === currentlyEditing) {
              return (
                <form
                  className="w-full md:w-80 justify-center bg-slate-300 grid grid-cols-9"
                  key={tag.name}
                >
                  <input
                    className="text-center col-span-7 place-self-center w-full"
                    type="text"
                    id="name"
                    value={updatedTagValue}
                    onChange={(e) => setUpdatedTagValue(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="place-self-center"
                    onClick={updateTag}
                    title="Save changes"
                  >
                    <FiShare className="text-green-700" />
                  </button>
                  <button
                    className="place-self-center"
                    onClick={() => setCurrentlyEditing("")}
                    title="Undo changes"
                  >
                    <FiEdit className="text-red-700" />
                  </button>
                </form>
              );
            } else {
              return (
                <div
                  className="w-full md:w-80 justify-center bg-slate-300 grid grid-cols-9"
                  key={tag.name}
                >
                  <div className="text-center col-span-7 place-self-center">
                    {tag.name}
                  </div>
                  <button
                    className="place-self-center"
                    onClick={() => {
                      setCurrentlyEditing(tag.name);
                      setUpdatedTagValue(tag.name);
                    }}
                    title="Update tag spelling"
                  >
                    <FiEdit className="text-black" />
                  </button>
                  <button
                    className="place-self-center"
                    onClick={() => deleteTag(tag.name)}
                    title="Delete tag"
                  >
                    <FiDelete className="text-red-700" />
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
