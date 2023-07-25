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
    tempTags.push(newTag)
    let resTags = tempTags

    console.log(tags);
    console.log(tempTags);
    console.log(resTags);

    console.log(resTags);
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
        {tags.map((item) => (
          <TagInput
            key={item}
            value={item}
            removehandler={(e) => {
              removeTag(e);
            }}
          ></TagInput>
        ))}
      </div>
    </div>
  );
}

function TagInput({ value, removehandler }) {
  return (
    <div>
      <span>{value}</span>
      <button
        className="bg-red-300"
        onClick={(event) => {
          event.preventDefault();
          removehandler(value);
        }}
      >
        remove
      </button>
    </div>
  );
}
