import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useParams } from "react-router-dom";
import { getSingleJob } from "../app/jobs/thunks";

type JobParam = {
    id: string;
}


const JobDetailsPage = () => {
    const { id } = useParams<JobParam>();
    console.log(typeof id)
  const dispatch = useAppDispatch();
  const job = useAppSelector((state) => state.jobs.job);
  useEffect(() => {
    dispatch(getSingleJob(id));
  }, [dispatch,id]);
  return <div>JobDetailsPage</div>;
};

export default JobDetailsPage;
