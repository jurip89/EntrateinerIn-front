import React from "react";
import { Home, Jobs, Talents } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/talents" element={<Talents />} />
      </Routes>
    </div>
  );
}

export default App;
