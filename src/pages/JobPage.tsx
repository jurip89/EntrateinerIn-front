import React, { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { getJobsThunk } from "../app/jobs/thunks";
import { JobList } from "../components";
const JobPage = () => {
  
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getJobsThunk());
  }, [dispatch]);
  

  

  return <JobList/>
};

export default JobPage;
