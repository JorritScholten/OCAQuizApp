import React from "react";
import LoginButton from "../loginButton";
import HomeButton from "../homeButton";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-green-500 text-gray-800 font-bold text-4xl shadow-md border border-gray-200">
      <HomeButton />
      <h1>
        JAVA OCA 8 Quiz <h2>from Mala Gupta book</h2>
      </h1>
      <LoginButton />
    </div>
  );
}
