import React, { useState, useEffect } from "react";
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
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/tag")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTags(data);
      });
  }, []);

  return (
    <>
      <TagList tags={tags} />
    </>
  );
}

function TagList({ tags }) {
  return (
    <div className="bg-slate-100 mx-2 pb-2">
      <h2 className="text-center py-2">All tags</h2>
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
  );
}
