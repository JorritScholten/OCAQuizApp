import React from "react";
import { Link } from "react-router-dom";

export default function TakeQuizButton() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link
              to="/question"
              className="bg-green-600 text-white px-2 py-2 rounded flex items-center"
            >
              Take a Quiz
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
