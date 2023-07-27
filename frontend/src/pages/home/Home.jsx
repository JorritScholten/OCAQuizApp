import React from "react";
import Header from "../../components/header";
import GotoButton from "./components/gotoButton";

export default function Home() {
  return (
    <div className="w-screen flex flex-col">
      <Header />
      <h1 className="text-white">home page</h1>
      <div className="flex flex-col gap-2 m-2">
        <GotoButton to="/question" text="Create a new question" />
        <GotoButton to="/tagManagement" text="Tag Management" />
      </div>
    </div>
  );
}
