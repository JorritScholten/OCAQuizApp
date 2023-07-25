import React, { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import Header from "../../components/header";

export default function TagManagement() {
  return (
    <div className="w-screen flex flex-col">
      <Header />
      <h1>Tag management</h1>
      <ShowTags />
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
      <div className="bg-slate-100 mx-2 pb-2">
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
