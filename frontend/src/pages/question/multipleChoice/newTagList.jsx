import React, { useState } from "react";
import { FiDelete, FiPlus } from "react-icons/fi";

export default function NewTagList({ tags, handleChange }) {
  const [newTag, setNewTag] = useState("");

  function addTag(event) {
    event.preventDefault();
    if (newTag === "") {
      return;
    }
    let tempTags = tags;
    tempTags.push(newTag);
    let resTags = tempTags;

    handleChange(resTags);
    setNewTag("");
  }

  function handleChangeTag(event) {
    event.preventDefault();
    setNewTag(event.target.value);
  }

  function removeTag(tag) {
    let tempTags = tags;
    let resTags = tempTags.filter((item) => item != tag);

    handleChange(resTags);
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <h2 className="text-center">Tags:</h2>
      <label htmlFor="add-tag" className="w-full grid grid-cols-9">
        <input
          type="text"
          id="add-tag"
          onChange={handleChangeTag}
          value={newTag}
          className="w-full col-span-8"
        />
        <button
          className="bg-green-300 place-self-stretch text-center px-2"
          onClick={addTag}
          title="Add tag"
        >
          <FiPlus className="w-full" />
        </button>
      </label>

      <div className="flex flex-col gap-2">
        {tags.map((tag) => (
          <TagInput
            className="flex flex-row justify-between"
            key={tag}
            value={tag}
            removeHandler={(tagToRemove) => {
              removeTag(tagToRemove);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function TagInput({ value, removeHandler }) {
  return (
    <div className="grid grid-cols-9 bg-slate-100 justify-center">
      <span className="col-span-8 text-center place-self-center">{value}</span>
      <button
        className="text-center place-self-stretch "
        onClick={(event) => {
          event.preventDefault();
          removeHandler(value);
        }}
        title="Delete tag"
      >
        <FiDelete className="text-red-700 w-full" />
      </button>
    </div>
  );
}
