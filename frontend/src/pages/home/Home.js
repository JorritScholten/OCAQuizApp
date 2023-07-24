import React from "react";
import Header from "../../components/header";
import CreateQuizQuestionButton from "./components/createQuizQuestion/CreateQuizQuestionButton";

export default function Home() {
  return (
    <div className="w-screen flex flex-col">
      <Header title="Homepage" />
      <p>home page</p>
      <CreateQuizQuestionButton />
    </div>
  );
}
