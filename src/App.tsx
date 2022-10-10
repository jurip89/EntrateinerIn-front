import React from "react";
import { Home, Jobs, JobsD, Talents,Talent } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobsD />} />
        <Route path="/talents" element={<Talents />} />
        <Route path="/talents/:id" element={<Talent />} />
      </Routes>
    </div>
  );
}

export default App;
