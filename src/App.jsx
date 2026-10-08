import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ContactMe from "./components/ContactMe/ContactMe";

import "./App.css";
import Home from "./pages/Home/Home";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactme" element={<ContactMe />} />
      </Routes>
    </>
  );
}

export default App;
