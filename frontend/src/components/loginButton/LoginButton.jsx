import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link
              to="/login"
              className="bg-green-600 text-white px-2 py-2 rounded text-lg md:text-2xl"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
