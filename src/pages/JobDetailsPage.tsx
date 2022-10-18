import React, { useEffect } from "react";

import { useAppDispatch } from "../app/hooks";
import {useParams } from "react-router-dom";
import { getSingleJob } from "../app/jobs/thunks";
import { JobDetails } from "../components";


type JobParam = {
  id: string;
};

const JobDetailsPage = () => {
  const { id } = useParams<JobParam>();
  
  const dispatch = useAppDispatch();
  
  
  useEffect(() => {
    dispatch(getSingleJob(id));
  }, [dispatch, id]);

  

  return <JobDetails/>
};

export default JobDetailsPage;
