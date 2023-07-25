import React from "react";
import Header from "../../components/header";
import CreateQuestionButton from "./components/createQuestionButton";
// import TakeQuizButton from "./components/takeQuizButton";

export default function Home() {
  return (
    <div className="w-screen flex flex-col">
      <Header title="Homepage" />
      <p>home page</p>
      {/* <TakeQuizButton /> */}
      <CreateQuestionButton />
    </div>
  );
}
