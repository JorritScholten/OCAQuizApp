import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Question from "./pages/question";
import Login from "./pages/login";
import TagManagement from "./pages/tagManagement";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question" element={<Question />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/tagManagement" element={<TagManagement />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
