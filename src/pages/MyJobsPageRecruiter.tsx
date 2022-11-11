import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { getMyJobsRecruiter } from "../app/jobs/thunks";

import { JobList } from "../components";

const MyJobsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("token");
  useEffect(() => {
    !token && navigate("/");
    dispatch(getMyJobsRecruiter());
  }, [dispatch, navigate, token]);

  
 

  return (
    <JobList/>
  );
};

export default MyJobsPage;
