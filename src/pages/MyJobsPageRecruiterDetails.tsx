import React, { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { getMyJobDetailRecruiter } from "../app/jobs/thunks";
import { useParams } from "react-router-dom";
import { JobDetails } from "../components";
const MyJobsPageRecruiterDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<string>();
  useEffect(() => {
    dispatch(getMyJobDetailRecruiter(id));
  }, [dispatch, id]);
return <JobDetails/>
}

export default MyJobsPageRecruiterDetails;
