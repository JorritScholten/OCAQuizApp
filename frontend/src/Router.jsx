import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Question from "./pages/question";
import Login from "./pages/login";
import CreateMultipleChoice from "./pages/question/multipleChoice/createMultipleChoice";
import CreateSelectionChoice from "./pages/question/multipleSelection/createSelectionChoice";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/question/m" element={<CreateMultipleChoice/>}></Route>
        <Route path="/question/s" element={<CreateSelectionChoice/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
