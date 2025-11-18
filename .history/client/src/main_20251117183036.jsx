import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup.jsx";

import "./index.css";
import Login from "./pages/Login.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
  <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
  </Routes>
</BrowserRouter>
);



