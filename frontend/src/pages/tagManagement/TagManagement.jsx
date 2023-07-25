import React from "react";
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
  return <div>tags</div>;
}
