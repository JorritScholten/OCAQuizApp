import React from "react";
import { Link } from "react-router-dom";

export default function CreateQuestionButton() {
  return (
    <>
      <nav>
        <ul>
          <li className="">
            <div></div>
            <Link
              to="/question"
              className="bg-green-600 text-white px-2 py-2 rounded flex justify-items-center w-72"
            >
              Create Quiz Question
            </Link>
            <div></div>
          </li>
        </ul>
      </nav>
    </>
  );
}
