import React, { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { getUserWithStoredToken } from "./app/user/thunks";
import {
  Home,
  Jobs,
  JobsD,
  Talents,
  Talent,
  Login,
  SignUp,
  CreateJob,
  EditJob,
  MyJobsRecruiter,
  MyJobsRecruiterD,
  MyJobsTalent,
  EditProfile,
} from "./pages";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobsD />} />
        <Route path="/jobs/create" element={<CreateJob />} />
        <Route path="/jobs/:id/edit" element={<EditJob />} />
        <Route path="/jobs/myjobs/recruiter" element={<MyJobsRecruiter />} />
        <Route path="/jobs/myjobs/star" element={<MyJobsTalent />} />
        <Route
          path="/jobs/myjobs/recruiter/:id"
          element={<MyJobsRecruiterD />}
        />
        <Route path="/talents" element={<Talents />} />
        <Route path="/talents/:id" element={<Talent />} />
        <Route path="/talents/:id/edit" element={<EditProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
