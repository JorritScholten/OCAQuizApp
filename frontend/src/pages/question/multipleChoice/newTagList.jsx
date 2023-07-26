import React, { useState } from "react";

export default function NewTagList({ tags, handleChange }) {
  const [newTag, setNewTag] = useState("");

  function handleChangeTag(event) {
    event.preventDefault();
    setNewTag(event.target.value);
  }

  function addTag(event) {
    event.preventDefault();
    let tempTags = tags;
    tempTags.push(newTag);
    let resTags = tempTags;

    handleChange(resTags);
    setNewTag("");
  }

  function removeTag(tag) {
    let tempTags = tags;
    let resTags = tempTags.filter((item) => item != tag);

    handleChange(resTags);
  }

  return (
    <div className="flex flex-col">
      <p className="text-center">tags</p>
      <label htmlFor="add-tag">
        <input
          type="text"
          id="add-tag"
          onChange={handleChangeTag}
          value={newTag}
        />
        <button className="bg-blue-200 text-center" onClick={addTag}>
          add
        </button>
      </label>

      <div className="flex flex-col">
        {tags.map((tag) => (
          <TagInput
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
    <div>
      <span>{value}</span>
      <button
        className="bg-slate-500  text-center p-1 m-1 rounded-full"
        onClick={(event) => {
          event.preventDefault();
          removeHandler(value);
        }}
      >
        remove
      </button>
    </div>
  );
}
