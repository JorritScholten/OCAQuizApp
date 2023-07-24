import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/" className="bg-green-600 text-white px-2 py-2 rounded">
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
