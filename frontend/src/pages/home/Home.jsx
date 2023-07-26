import React from "react";
import Header from "../../components/header";
import GotoTagManagement from "./components/gotoTagManagement";

export default function Home() {
  return (
    <div className="w-screen flex flex-col">
      <Header />
      <h1>home page</h1>
      <GotoTagManagement />
    </div>
  );
}
